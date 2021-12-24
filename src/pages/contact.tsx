import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import styles from './contact.module.scss';
import { graphql, PageProps } from 'gatsby';
import { ContactDetails } from '../types';
import SEO from '../components/seo';
import classNames from 'classnames';
import SocialIconsBar from '../components/social-icons-bar';

export type ContactData = {
  contact: ContactDetails;
};

export type ContactProps = PageProps<ContactData>;

export default function Contact(props: ContactProps) {
  const { contact } = props.data;

  return (
    <Layout withGutter>
      <SEO title="contact" />
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
          className={classNames(
            styles.socialLinksWrapper,
            styles.smSecondColumn
          )}
        >
          <SocialIconsBar />
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
