import React from 'react';
import styles from './header.module.scss';
import { Link } from 'gatsby';
import MenuButton from './menu-button';

export type HeaderProps = {
  children: React.ReactNode;
};

export type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <MenuButton
          onClick={toggleOpen}
          isActive={isOpen}
          className={styles.menuButton}
        />
        <Link to="/" className={styles.link}>
          ADI SEGAL PHOTOGRAPHY
        </Link>
        <ul className={styles.linksList} style={{ display: 'none' }}>
          {React.Children.map(children, child => {
            if (!React.isValidElement<HeaderLinkProps>(child)) {
              return null;
            }

            return <li>{child}</li>;
          })}
        </ul>
      </nav>
    </header>
  );
};

Header.displayName = 'Header';

function HeaderLink({ to, children }: HeaderLinkProps) {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
}

Header.Link = HeaderLink;

export default Header;
