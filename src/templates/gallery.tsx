import React from 'react';
import Layout from '../components/layout';
import { Link, PageProps, graphql } from 'gatsby';
import { Topic, TopicPhoto } from '../types';
import SEO from '../components/seo';
import { capitalize } from '../utils';
import styles from './gallery.module.scss';
import Img from 'gatsby-image';

export type GalleryContext = {
  slug: string;
};

export type GalleryData = {
  topicPhotos: {
    nodes: Array<TopicPhoto>;
  };
  topic: {
    nodes: [Pick<Topic, 'name'>];
  };
};

export type GalleryProps = PageProps<GalleryData, GalleryContext>;

export default function Gallery(props: GalleryProps) {
  const {
    topic: {
      nodes: [{ name: topicName }],
    },
    topicPhotos: { nodes: photoNodes },
  } = props.data;

  return (
    <Layout>
      <SEO title={capitalize(topicName)} />
      <div className={styles.photosContainer}>
        <Img fluid={photoNodes[0].photo.fluid} key={photoNodes[0].id} />
      </div>
      <div className={styles.controlsContainer}>
        <Link to="./thumbs">Thumbs</Link>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query getTopicPhotosQueryForGallery($slug: String) {
    topicPhotos: allContentfulTopicPhoto(
      filter: { topic: { slug: { eq: $slug } } }
      sort: { fields: order }
    ) {
      nodes {
        photo {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        id
      }
    }
    topic: allContentfulTopic(filter: { slug: { eq: $slug } }) {
      nodes {
        name
      }
    }
  }
`;
