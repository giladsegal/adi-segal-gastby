import React from 'react';
import { FacebookIcon, InstragramIcon } from './social-icons';
import styles from './social-icons-bar.module.scss';
import classNames from 'classnames';

export type SocialIconsBarProps = {
  className?: string;
};

export default function SocialIconsBar({ className }: SocialIconsBarProps) {
  return (
    <div className={classNames(styles.socialBar, className)}>
      <InstragramIcon className={styles.socialLink} />
      <FacebookIcon className={styles.socialLink} />
    </div>
  );
}
