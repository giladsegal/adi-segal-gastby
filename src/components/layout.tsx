import React from 'react';
import Header from './header';
import 'normalize.css';
import styles from './layout.module.scss';
import SEO from './seo';
import classNames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetadata, SiteType } from '../types';

export type LayoutProps = {
  className?: string;
  withGutter?: boolean;
  children?: React.ReactNode;
};

const query = graphql`
  query layoutQuery {
    site {
      siteMetadata {
        type
      }
    }
  }
`;

export type LayoutQuery = {
  site: {
    siteMetadata: Pick<SiteMetadata, 'type'>;
  };
};

const topicTypeToLinks = (type: SiteType) => {
  const typeTopics: Record<SiteType, React.ReactNode[]> = {
    documentaries: [
      <Header.Link to="/documentaries/" key="documentaries">
        DOCUMENTARIES
      </Header.Link>,
      <Header.Link to="/publications/" key="publications">
        PUBLICATIONS
      </Header.Link>,
    ],
    weddings: [
      <Header.Link to="/weddings/" key="weddings">
        WEDDINGS
      </Header.Link>,
    ],
  };

  return typeTopics[type];
};

export default function Layout({ children, withGutter }: LayoutProps) {
  const { type } = useStaticQuery<LayoutQuery>(query).site.siteMetadata;

  return (
    <div className={styles.root}>
      <SEO title="Home" />
      <Header className={styles.header}>
        <Header.Link to="/">HOME</Header.Link>
        {topicTypeToLinks(type)}
        <Header.Link to="/about/">ABOUT</Header.Link>
        <Header.Link to="/contact/">CONTACT</Header.Link>
      </Header>
      <main className={classNames({ [styles.gutter]: withGutter })}>
        {children}
      </main>
    </div>
  );
}
