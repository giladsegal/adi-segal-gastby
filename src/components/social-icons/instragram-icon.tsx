import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from './common.module.scss';
import classNames from 'classnames';

export type InstragramIconProps = {
  className?: string;
};

export function InstragramIcon({ className }: InstragramIconProps) {
  return (
    <a
      href="https://www.instagram.com/adi_segal_photography/"
      target="_blank"
      aria-label="Adi Segal photography instagram page"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={faInstagram}
        className={classNames(
          styles.socialLink,
          styles.instragramLink,
          className
        )}
      />
    </a>
  );
}
