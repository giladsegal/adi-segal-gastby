import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { capitalize } from '../utils';
import { Link, PageProps, graphql } from 'gatsby';
import { Topic } from '../types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './topic-description.module.scss';

export type TopicDescriptionData = {
  topic: {
    nodes: [Pick<Topic, 'description' | 'name'>];
  };
};

export type TopicDescriptionContext = {
  slug: string;
};

export type TopicDescriptionProps = PageProps<
  TopicDescriptionData,
  TopicDescriptionContext
>;

export default function TopicDescription(props: TopicDescriptionProps) {
  const {
    topic: {
      nodes: [{ description, name }],
    },
  } = props.data;

  const returnToPhoto =
    new URLSearchParams(props.location.search).get('p') || 1;

  return (
    <Layout>
      <SEO title={capitalize(name)} />
      <div className={styles.root}>
        <div className={styles.content}>
          {description &&
            documentToReactComponents(JSON.parse(description.description))}
        </div>
        <Link to={`..?p=${returnToPhoto}`} className={styles.backToCategory}>
          Back
        </Link>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query getTopicDescriptionQuery($slug: String) {
    topic: allContentfulTopic(filter: { slug: { eq: $slug } }) {
      nodes {
        description {
          description
        }
        name
      }
    }
  }
`;
