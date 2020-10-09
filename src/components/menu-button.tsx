import React from 'react';
import classNames from 'classnames';
import styles from './menu-button.module.scss';

export type MenuButtonProps = {
  isActive: boolean;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'value' | 'children'>;

export default function MenuButton(props: MenuButtonProps) {
  const { isActive, className, ...rest } = props;
  return (
    <button
      className={classNames(
        styles.hamburger,
        styles.hamburgerSqueeze,
        className,
        {
          [styles.isActive]: isActive,
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
