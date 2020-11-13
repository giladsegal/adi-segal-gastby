import React from 'react';
import Layout from '../components/layout';
import { Link, PageProps, graphql } from 'gatsby';
import { Topic, TopicPhoto } from '../types';
import SEO from '../components/seo';
import { capitalize } from '../utils';
import styles from './gallery.module.scss';
import Img from 'gatsby-image';
import classNames from 'classnames';
import useSlideshow from '../hooks/useSlideshow';

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

  const { current, next, play, pause, previous, seek, status } = useSlideshow({
    autoplay: true,
    initialSlideIndex: 0,
    interval: 4000,
    slides: photoNodes,
  });

  return (
    <Layout>
      <SEO title={capitalize(topicName)} />
      <div className={styles.photosContainer}>
        <Img fluid={current.photo.fluid} key={current.id} />
      </div>
      <div className={styles.controlsContainer}>
        <Link to="./thumbs">Thumbs</Link>
      </div>

      <div className={classNames(styles.playPauseLayout)}>
        <div className={classNames(styles.pauseBar, styles.left)}></div>
        <div className={classNames(styles.pauseBar, styles.right)}></div>
      </div>

      <div className={classNames(styles.playPauseLayout)}>
        <div className={styles.playTriangleOutline}></div>
        <div className={styles.playTriangle}></div>
      </div>
      <div>{status.toUpperCase()}</div>
      <button onClick={pause}>pause</button>
      <button onClick={play}>play</button>
      <button onClick={next}>next</button>
      <button onClick={previous}>prev</button>
      <button onClick={seek.bind(null, { offset: 3 })}>next by 3</button>
      <button onClick={seek.bind(null, { offset: -3 })}>prev by 3</button>
      <div>{`${photoNodes.findIndex(p => p === current) + 1} out of ${
        photoNodes.length
      }`}</div>
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
