import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { PageProps, graphql } from 'gatsby';
import { FluidImage, TopicPhoto } from '../types';
import { preloadTopicPhoto, shuffle } from '../utils';
import Slideshow from '../components/slideshow';
import useSlideshow from '../hooks/useSlideshow';

export type DefaultPhoto = {
  id: string;
  fluid: FluidImage['fluid'];
};

export type HomeData = {
  topicPhotos: {
    nodes: Array<{ photo: DefaultPhoto }>;
  };
  defaultPhoto: {
    nodes: Array<{ defaultPhoto: DefaultPhoto }>;
  };
};

export type HomeContext = {
  siteType: string;
};

export type HomeProps = PageProps<HomeData, HomeContext>;

const PHOTO_SWITCH_DURATION_MS = 1200;

export default function Home(props: HomeProps) {
  const {
    defaultPhoto: {
      nodes: [{ defaultPhoto }],
    },
    topicPhotos: { nodes: photoNodes },
  } = props.data;

  const [photos] = React.useState<Array<Pick<TopicPhoto, 'id' | 'photo'>>>([
    {
      id: defaultPhoto.id,
      photo: {
        fluid: defaultPhoto.fluid,
      },
    },
    ...shuffle(
      photoNodes.map(p => ({
        id: p.photo.id,
        photo: {
          fluid: p.photo.fluid,
        },
      }))
    ),
  ]);

  const { current, status } = useSlideshow({
    autoplay: true,
    initialSlideIndex: 0,
    interval: 4000 + PHOTO_SWITCH_DURATION_MS,
    slides: photos,
    preloadNext: preloadTopicPhoto,
  });

  return (
    <Layout>
      <SEO title="Home" />
      <Slideshow
        status={status}
        current={current}
        transitionDuration={PHOTO_SWITCH_DURATION_MS}
      ></Slideshow>
    </Layout>
  );
}

export const query = graphql`
  query getTopicPhotosQueryForHome($siteType: String) {
    topicPhotos: allContentfulDefaultTopicPhoto(
      filter: { defaultTopic: { name: { eq: $siteType } } }
    ) {
      nodes {
        photo {
          fluid(maxWidth: 800) {
            src
          }
          id
        }
      }
    }
    defaultPhoto: allContentfulDefaultTopic(
      filter: { name: { eq: $siteType } }
    ) {
      nodes {
        defaultPhoto {
          fluid {
            src
          }
          id
        }
      }
    }
  }
`;
