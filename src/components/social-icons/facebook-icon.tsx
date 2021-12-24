import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import styles from './common.module.scss';
import classNames from 'classnames';

export type FacebookIconProps = {
  className?: string;
};

export function FacebookIcon({ className }: FacebookIconProps) {
  return (
    <a
      href="https://www.facebook.com/AdisegalPhotographer/"
      target="_blank"
      aria-label="Adi Segal photography facbeook page"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={faFacebookSquare}
        className={classNames(styles.socialLink, className)}
      />
    </a>
  );
}
