import { GatsbyNode, CreatePagesArgs, Actions } from 'gatsby';
import { resolve } from 'path';
import { SiteMetadata } from './src/types';

type TopicsQuery = {
  topics: {
    nodes: Array<{
      slug: string;
      description: null | string;
    }>;
  };
};

const getMetadata = async (graphql: CreatePagesArgs['graphql']) => {
  const result = await graphql<{
    site: { siteMetadata: Pick<SiteMetadata, 'type' | 'topicsSlug'> };
  }>(
    `
      query getMetadata {
        site {
          siteMetadata {
            type
            topicsSlug
          }
        }
      }
    `
  );

  return result.data!.site.siteMetadata;
};

const getTopics = async (
  graphql: CreatePagesArgs['graphql'],
  siteType: string
) => {
  const result = await graphql<TopicsQuery>(
    `
      query getTopicsQuery($siteType: String) {
        topics: allContentfulTopic(filter: { type: { eq: $siteType } }) {
          nodes {
            slug
            description {
              description
            }
          }
        }
      }
    `,
    { siteType }
  );

  return result.data!.topics.nodes;
};

type CreateTopicPageOptions = {
  basePath: string;
  slug: string;
  description: string | null;
};

const createTopicPage = (
  createPage: Actions['createPage'],
  { basePath, slug, description }: CreateTopicPageOptions
) => {
  createPage({
    path: `${basePath}/${slug}`,
    context: {
      slug: slug,
    },
    component: resolve(__dirname, './src/templates/gallery.tsx'),
  });

  createPage({
    path: `${basePath}/${slug}/thumbs`,
    context: {
      slug: slug,
    },
    component: resolve(__dirname, './src/templates/thumbnails.tsx'),
  });

  description &&
    createPage({
      path: `${basePath}/${slug}/description`,
      context: {
        slug: slug,
      },
      component: resolve(__dirname, './src/templates/topic-description.tsx'),
    });
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions: { createPage },
  graphql,
}) => {
  const metadata = await getMetadata(graphql);
  const topics = await getTopics(graphql, metadata.type);

  createPage({
    path: 'about',
    component: resolve(__dirname, './src/templates/about.tsx'),
    context: {
      siteType: metadata.type,
    },
  });

  createPage({
    path: metadata.topicsSlug,
    component: resolve(__dirname, './src/templates/topics.tsx'),
    context: {
      siteType: metadata.type,
    },
  });

  // TODO: home

  if (metadata.type === 'documentaries') {
    const publications = topics.find(topic => topic.slug === 'publications');

    publications &&
      createTopicPage(createPage, {
        basePath: '',
        slug: publications.slug,
        description: publications.description,
      });
  }

  topics.forEach(topic => {
    if (metadata.type === 'documentaries' && topic.slug === 'publications') {
      return;
    }

    createTopicPage(createPage, {
      basePath: metadata.topicsSlug,
      slug: topic.slug,
      description: topic.description,
    });
  });
};
