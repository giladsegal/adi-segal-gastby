import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { PageProps, graphql } from 'gatsby';
import { FluidImage } from '../types';
import { shuffle } from '../utils';

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

export default function Home(props: HomeProps) {
  const {
    defaultPhoto: {
      nodes: [{ defaultPhoto }],
    },
    topicPhotos: { nodes: photoNodes },
  } = props.data;

  const [photos] = React.useState<Array<DefaultPhoto>>([
    defaultPhoto,
    ...shuffle(photoNodes.map(p => p.photo)),
  ]);

  console.log(photos);

  return (
    <Layout>
      <SEO title="Home" />
      {photos.map(p => {
        return <img src={p.fluid.src} key={p.id} alt="" height="533" />;
      })}
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
