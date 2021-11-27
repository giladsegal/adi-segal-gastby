import React from 'react';
import styles from './spinner.module.scss';
import classNames from 'classnames';

export type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={classNames(styles.spinnerContainer, className)}>
      <div className={styles.skCircle}>
        <div className={classNames(styles.skCircle1, styles.skChild)}></div>
        <div className={classNames(styles.skCircle2, styles.skChild)}></div>
        <div className={classNames(styles.skCircle3, styles.skChild)}></div>
        <div className={classNames(styles.skCircle4, styles.skChild)}></div>
        <div className={classNames(styles.skCircle5, styles.skChild)}></div>
        <div className={classNames(styles.skCircle6, styles.skChild)}></div>
        <div className={classNames(styles.skCircle7, styles.skChild)}></div>
        <div className={classNames(styles.skCircle8, styles.skChild)}></div>
        <div className={classNames(styles.skCircle9, styles.skChild)}></div>
        <div className={classNames(styles.skCircle10, styles.skChild)}></div>
        <div className={classNames(styles.skCircle11, styles.skChild)}></div>
        <div className={classNames(styles.skCircle12, styles.skChild)}></div>
      </div>
    </div>
  );
};

export default Spinner;
