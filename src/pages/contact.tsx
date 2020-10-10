import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import styles from './contact.module.scss';
import useFacebookLike from '../hooks/useFacebookLike';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { graphql, PageProps } from 'gatsby';
import { ContactDetails } from '../types';
import { Helmet } from 'react-helmet';
import SEO from '../components/seo';
import classNames from 'classnames';

export type ContactData = {
  contact: ContactDetails;
};

export type ContactProps = PageProps<ContactData>;

export default function Contact(props: ContactProps) {
  const { contact } = props.data;

  const ref = useFacebookLike();

  return (
    <Layout withGutter>
      <SEO title="contact" />
      <Helmet
        script={[
          {
            async: true,
            defer: true,
            crossorigin: 'anonymous',
            src: 'https://connect.facebook.net/en_US/sdk.js',
            nonce: '0NMFsjUW',
          },
        ]}
      />
      <div className={styles.root}>
        <dl className={classNames(styles.details, styles.smSecondColumn)}>
          <dd>contact:</dd>
          <dt>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </dt>
          <dd>mobile:</dd>
          <dt>
            <a href={`tel:${contact.mobileNumber}`}>{contact.mobileNumber}</a>
          </dt>
          <dd>location:</dd>
          <dt>
            {contact.addressLine1}
            <br />
            {contact.addressLine2}
          </dt>
        </dl>
        <div
          className={classNames(styles.fbWrapper, styles.smSecondColumn)}
          ref={ref}
        >
          <div className={styles.fbLikeWrapper}>
            <div
              className="fb-like"
              data-href="https://www.facebook.com/AdisegalPhotographer"
              data-layout="button_count"
              data-action="like"
              data-size="large"
              data-share="true"
            />
          </div>
          <a
            href="https://www.facebook.com/AdisegalPhotographer/"
            target="_blank"
            aria-label="Adi Segal photography facbeook group"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebookSquare}
              className={styles.fbLink}
            />
          </a>
        </div>
        <Img
          fluid={contact.photo.fluid}
          className={classNames(styles.fullWidth, styles.smFirstColumn)}
          alt="Contact me"
        />
        <footer
          className={classNames(styles.copyrights, styles.smSecondColumn)}
        >
          All rights reserved © Adi Segal
        </footer>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query contactDetailsQuery {
    contact: contentfulContactDetails {
      addressLine1
      addressLine2
      email
      mobileNumber
      photo {
        fluid(maxWidth: 355) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;
