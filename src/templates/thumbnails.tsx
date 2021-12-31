import React from 'react';
import Layout from '../components/layout';
import { PageProps, graphql, Link } from 'gatsby';
import { FluidTopicPhoto, Topic } from '../types';
import styles from './thumbnails.module.scss';
import Img from 'gatsby-image';
import { toFraction, splitToSubgroups, capitalize } from '../utils';
import SEO from '../components/seo';

export type ThumbnailsContext = {
  slug: string;
};

export type ThumbnailsData = {
  topicPhotos: {
    nodes: Array<FluidTopicPhoto>;
  };
  topic: {
    nodes: [Pick<Topic, 'name'>];
  };
};

export type ThumbnailsProps = PageProps<ThumbnailsData, ThumbnailsContext>;

const rowToRatios = (row: Array<FluidTopicPhoto>, length: number) => {
  const [{ photo: firstPhoto }, ...restPhotoNodes] = row;
  const { N: firstPhotoWidthRatio, D: firstPhotoHeightRatio } = toFraction(
    firstPhoto.fluid.aspectRatio
  );

  const restRatios = restPhotoNodes
    .map(({ photo }) => {
      return toFraction(Number(photo.fluid.aspectRatio.toFixed(2)));
    })
    .map(({ N: photoWidthRatio, D: photoHeightRatio }) => {
      return (firstPhotoHeightRatio / photoHeightRatio) * photoWidthRatio;
    })
    .map(ratio => Number(ratio.toFixed(2)));

  return fillMissingRatios([firstPhotoWidthRatio, ...restRatios], length);
};

// last row might not contain maximum amount of photos so
// placeholder ratios are added based over existing photos e.g.
// [3] --> [3, 3, 3, 3]
// [3, 2] --> [3, 2, 3, 2]
// [3, 2, 3] --> [3, 2, 3, 3]
// [3, 3, 3, 3] --> [3, 3, 3, 3]
const fillMissingRatios = (ratios: number[], size: number) => {
  return Array(size)
    .fill(undefined)
    .map((_, i) => ratios[i % ratios.length]);
};

export default function Thumbnails(props: ThumbnailsProps) {
  const {
    topicPhotos: { nodes },
    topic: {
      nodes: [{ name: topicName }],
    },
  } = props.data;

  const rowLength = 4;
  const rows = splitToSubgroups(nodes, rowLength);
  const preventRightClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
  };
  return (
    <Layout>
      <SEO title={`${capitalize(topicName)}, photos overview`} />
      <div>
        {rows.map((row, rowIdx) => {
          const columnSizes = rowToRatios(row, rowLength)
            .map(ratio => `${ratio}fr`)
            .join(' ');

          return (
            <div
              className={styles.row}
              key={`row_${rowIdx}`}
              style={{ gridTemplateColumns: columnSizes }}
            >
              {row.map(({ id, photo }, colIdx) => {
                return (
                  <Link
                    to={`../?p=${rowIdx * rowLength + colIdx + 1}`}
                    key={id}
                    onContextMenu={preventRightClick}
                  >
                    <Img fluid={photo.fluid} className={styles.photo} />
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query getTopicPhotosQueryForThumbnails($slug: String) {
    topicPhotos: allContentfulTopicPhoto(
      filter: { topic: { slug: { eq: $slug } } }
      sort: { fields: order }
    ) {
      nodes {
        photo {
          fluid(maxWidth: 250) {
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
