import React from 'react';
import Header from './header';
import 'normalize.css';
import styles from './layout.module.scss';
import SEO from './seo';

export type LayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.root}>
      <SEO title="Home" />
      <Header className={styles.header}>
        <Header.Link to="/">HOME</Header.Link>
        {/* <Header.Link to="/documentaries/">DOCUMENTARIES</Header.Link> */}
        <Header.Link to="/weddings/">WEDDINGS</Header.Link>
        {/* <Header.Link to="/publications/">PUBLICATIONS</Header.Link> */}
        <Header.Link to="/about/">ABOUT</Header.Link>
        <Header.Link to="/contact/">CONTACT</Header.Link>
      </Header>
      <main>{children}</main>
    </div>
  );
}
