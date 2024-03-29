import React from 'react';
import Layout from '../components/layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import Img, { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';
import { SiteMetadata } from '../types';
import styles from './about.module.scss';
import classNames from 'classnames';
import SEO from '../components/seo';

export default function About(props: AboutProps) {
  const {
    allContentfulAboutDetails: {
      nodes: [
        {
          childContentfulAboutDetailsResumeRichTextNode: { resume },
        },
      ],
    },
    contentfulAboutDetailsPhoto: {
      photo: {
        file: {
          details: {
            image: { height, width },
          },
        },
        fluid,
      },
    },
  } = props.data;

  const isWeddingsPage = props.pageContext.siteType === 'weddings';

  return (
    <Layout withGutter>
      <SEO title="About" />
      <div
        onContextMenu={e => e.preventDefault()}
        className={classNames(styles.root, {
          [styles.weddingsLayout]: isWeddingsPage,
        })}
      >
        <Img
          fluid={fluid}
          alt="Adi Segal"
          className={styles.image}
          style={{
            '--width': `${width}px`,
            '--height': `${height}px`,
          }}
        />
        <div>
          {documentToReactComponents(JSON.parse(resume), {
            renderMark: {
              [MARKS.BOLD]: function RichTextBold(text) {
                return <strong className={styles.strong}>{text}</strong>;
              },
              [MARKS.ITALIC]: function RichTextItalic(text) {
                return <cite className={styles.cite}>{text}</cite>;
              },
            },
            renderNode: {
              [BLOCKS.PARAGRAPH]: function RichTextParagraph(_, children) {
                return <p className={styles.paragraph}>{children}</p>;
              },
              [BLOCKS.HEADING_3]: function RichTextHeading3(_, children) {
                return <h3 className={styles.h3}>{children}</h3>;
              },
              [BLOCKS.OL_LIST]: function RichTextOrderedList(_, children) {
                return <ol className={styles.ol}>{children}</ol>;
              },
              [BLOCKS.UL_LIST]: function RichTextUnorderedList(_, children) {
                return <ul className={styles.ul}>{children}</ul>;
              },
              [INLINES.HYPERLINK]: function RichTextHyperlink(node, children) {
                const linkUrl: string = node.data.uri;

                const whitelistUrls = [
                  'https://weddings.adi-segal.com',
                  'https://adi-segal.com',
                  'https://www.adi-segal.com',
                ];

                const nofollow =
                  whitelistUrls.some(url => url === linkUrl) ||
                  whitelistUrls.some(url => linkUrl.startsWith(url + '/'))
                    ? ''
                    : 'nofollow';

                return (
                  <a
                    href={linkUrl}
                    className={styles.link}
                    rel={`noopener noreferrer ${nofollow}`.trimEnd()}
                  >
                    {children}
                  </a>
                );
              },
            },
          })}
        </div>
      </div>
    </Layout>
  );
}

export type AboutData = {
  allContentfulAboutDetails: {
    nodes: Array<{
      childContentfulAboutDetailsResumeRichTextNode: {
        resume: string;
      };
    }>;
  };
  contentfulAboutDetailsPhoto: {
    photo: {
      file: {
        details: {
          image: {
            height: number;
            width: number;
          };
        };
      };
      fluid: FluidObject;
    };
  };
};

export type AboutContext = {
  siteType: SiteMetadata['type'];
};

export type AboutProps = PageProps<AboutData, AboutContext>;

export const query = graphql`
  query aboutDetailsQuery($siteType: String) {
    allContentfulAboutDetails(filter: { type: { eq: $siteType } }) {
      nodes {
        childContentfulAboutDetailsResumeRichTextNode {
          resume
        }
      }
    }
    contentfulAboutDetailsPhoto {
      photo {
        file {
          details {
            image {
              height
              width
            }
          }
        }
        fluid(maxWidth: 135, quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;
