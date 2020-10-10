import React from 'react';
import styles from './header.module.scss';
import { Link } from 'gatsby';
import MenuButton from './menu-button';
import Logo from './logo';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

export type HeaderProps = {
  className?: string;
  children: React.ReactNode;
};

export type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
};

const enteringStyles = {
  transform: 'translateX(0)',
  transitionTimingFunction: 'cubic-bezier(0.12, 1.11, 0.27, 1.06)',
  transitionDuration: '250ms',
};

const enteredStyles = {
  transform: 'translateX(0)',
};

const exitingStyles = {
  transform: 'translateX(-100%)',
  transitionTimingFunction: 'ease-out',
  transitionDuration: '150ms',
};

const exitedStyles = {
  boxShadow: 'none',
  transform: 'translateX(-100%)',
};

const transitions: Record<TransitionStatus, Record<string, string>> = {
  entering: enteringStyles,
  entered: enteredStyles,
  exiting: exitingStyles,
  exited: exitedStyles,
  unmounted: {},
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
          isPressed={isOpen}
          className={styles.menuButton}
        />
        <Link to="/" className={classNames(styles.link, styles.logo)}>
          <Logo />
        </Link>
        <Transition in={isOpen} timeout={{ enter: 250, exit: 150 }}>
          {state => {
            return (
              <ul className={styles.linksList} style={transitions[state]}>
                {React.Children.map(children, child => {
                  if (!React.isValidElement<HeaderLinkProps>(child)) {
                    return null;
                  }

                  return <li>{child}</li>;
                })}
              </ul>
            );
          }}
        </Transition>
      </nav>
    </header>
  );
};

Header.displayName = 'Header';

function HeaderLink({ to, children }: HeaderLinkProps) {
  return (
    <Link
      to={to}
      className={classNames(styles.link, styles.linkMenu)}
      activeClassName={styles.linkActive}
    >
      {children}
    </Link>
  );
}

Header.Link = HeaderLink;

export default Header;
