import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { Site } from '../types';

export type SiteQuery = {
  site: Site;
};

export type SEOProps = {
  title: string;
};

export default function SEO({ title }: SEOProps) {
  const {
    title: titleSuffix,
    facebook,
    siteUrl,
    description,
    keywords,
  } = useStaticQuery<SiteQuery>(metadataQuery).site.siteMetadata;

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      titleTemplate={`%s · ${titleSuffix}`}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords.join(','),
        },
        { property: 'og:url', content: siteUrl },
        { property: 'og:type', content: facebook.type },
        { property: 'og:title', content: facebook.title },
        {
          property: 'og:image',
          content: facebook.image.uri,
        },
        {
          property: 'og:image::width',
          content: facebook.image.width,
        },
        {
          property: 'og:image:height',
          content: facebook.image.height,
        },
        {
          property: 'og:description',
          content: description,
        },
      ]}
    />
  );
}

const metadataQuery = graphql`
  query metadataQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        keywords
        facebook {
          type
          title
          image {
            uri
            width
            height
          }
        }
      }
    }
  }
`;
