import React from 'react';
import styles from './header.module.scss';
import { Link, GatsbyLinkProps } from 'gatsby';
import MenuButton from './menu-button';
import Logo from './logo';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import useClickOutside from '../hooks/useClickOutside';

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
  const menuRef = React.createRef<HTMLUListElement>();
  const menuButtonRef = React.createRef<HTMLButtonElement>();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(menuRef, closeMenu, menuButtonRef);

  return (
    <header className={classNames(styles.root, className)}>
      <nav className={styles.nav}>
        <MenuButton
          ref={menuButtonRef}
          onClick={toggleMenu}
          isPressed={isOpen}
          className={styles.menuButton}
        />
        <Link to="/" className={classNames(styles.link, styles.logo)}>
          <Logo />
        </Link>
        <Transition in={isOpen} timeout={{ enter: 250, exit: 150 }}>
          {state => {
            return (
              <ul
                className={styles.linksList}
                style={transitions[state]}
                ref={menuRef}
              >
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

const getLinkClasses: GatsbyLinkProps<any>['getProps'] = ({
  href,
  isPartiallyCurrent,
  isCurrent,
}) => {
  const classes = [styles.link, styles.linkMenu];

  // root page is always partially current to all pages
  // root is checked for exact match when calculating active links
  if (href === '/' && isCurrent) {
    classes.push(styles.linkActive);
  } else if (href !== '/' && isPartiallyCurrent) {
    classes.push(styles.linkActive);
  }

  return {
    className: classNames(classes),
  };
};

function HeaderLink({ to, children }: HeaderLinkProps) {
  return (
    <Link to={to} getProps={getLinkClasses}>
      {children}
    </Link>
  );
}

Header.Link = HeaderLink;

export default Header;
