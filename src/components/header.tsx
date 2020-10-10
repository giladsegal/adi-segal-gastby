import React from 'react';
import styles from './header.module.scss';
import { Link } from 'gatsby';
import MenuButton from './menu-button';
import Logo from './logo';
import classNames from 'classnames';

export type HeaderProps = {
  className?: string;
  children: React.ReactNode;
};

export type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
};

const Header = ({ children, className }: HeaderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={classNames(styles.root, className)}>
      <nav className={styles.nav}>
        <MenuButton
          onClick={toggleOpen}
          isActive={isOpen}
          className={styles.menuButton}
        />
        <Link to="/" className={classNames(styles.link, styles.logo)}>
          <Logo />
        </Link>
        <ul className={styles.linksList}>
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
    <Link to={to} className={styles.link} activeClassName={styles.linkActive}>
      {children}
    </Link>
  );
}

Header.Link = HeaderLink;

export default Header;
