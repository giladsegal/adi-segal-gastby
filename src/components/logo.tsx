import React from 'react';
import styles from './logo.module.scss';
import classNames from 'classnames';

export type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div
      className={classNames(styles.root, className)}
      aria-label="Adi Segal photography logo"
      role="img"
    >
      <span className={styles.firstRow}>
        <span>ADI</span>
        <span>SEGAL</span>
      </span>
      <span className={styles.secondRow}>
        <span>P</span>
        <span>H</span>
        <span>O</span>
        <span>T</span>
        <span>O</span>
        <span>G</span>
        <span>R</span>
        <span>A</span>
        <span>P</span>
        <span>H</span>
        <span>Y</span>
      </span>
    </div>
  );
}
