import React from 'react';
import classNames from 'classnames';
import styles from './menu-button.module.scss';

export type MenuButtonProps = {
  isPressed: boolean;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'value' | 'children'>;

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  function MenuButton(props, ref) {
    const { isPressed, className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={classNames(
          styles.hamburger,
          styles.hamburgerSqueeze,
          className,
          {
            [styles.isPressed]: isPressed,
          }
        )}
        {...rest}
      >
        <span className={styles.hamburgerBox}>
          <span className={styles.hamburgerInner} />
        </span>
      </button>
    );
  }
);

export default MenuButton;
