import React from 'react';
import Header from './header';
import 'normalize.css';
import styles from './layout.module.scss';
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

  const css = `
  @keyframes route-fadeIn {
    0% {
      opacity: 0;
      transform: translateY(7px);
    }
  
    70% {
      transform: translateY(0);
    }
  
    100% {
      opacity: 1;
    }
  }`;

  return (
    <div className={styles.root}>
      <Header className={styles.header}>
        <Header.Link to="/">HOME</Header.Link>
        {topicTypeToLinks(type)}
        <Header.Link to="/about/">ABOUT</Header.Link>
        <Header.Link to="/contact/">CONTACT</Header.Link>
      </Header>
      <style>{css}</style>
      <main
        className={classNames({ [styles.gutter]: withGutter })}
        style={{ animation: 'route-fadeIn 250ms ease-in forwards', opacity: 0 }}
      >
        {children}
      </main>
    </div>
  );
}
