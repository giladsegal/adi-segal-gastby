import React from 'react';
import { PageProps, graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import { Topic } from '../types';
import Img from 'gatsby-image';
import styles from './topics.module.scss';
import SEO from '../components/seo';
import { capitalize } from '../utils';

export type TopicsData = {
  topics: {
    nodes: Array<Topic>;
  };
};

export type TopicsContext = {
  siteType: string;
};

export type TopicsProps = PageProps<TopicsData, TopicsContext>;

export default function Topics(props: TopicsProps) {
  const {
    topics: { nodes },
  } = props.data;

  const { siteType } = props.pageContext;

  const preventRightClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
  };

  return (
    <Layout>
      <SEO title={capitalize(siteType)} />
      <div className={styles.root}>
        {nodes.map(t => {
          return (
            <Link
              to={t.slug}
              key={t.id}
              className={styles.topic}
              onContextMenu={preventRightClick}
            >
              <Img fluid={t.thumb.fluid} className={styles.photo} />
              <div className={styles.topicText}>{t.name}</div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query topicsQuery($siteType: String) {
    topics: allContentfulTopic(
      sort: { fields: order }
      filter: { type: { eq: $siteType } }
    ) {
      nodes {
        id
        name
        slug
        thumb {
          fluid {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`;
