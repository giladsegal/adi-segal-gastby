import React from 'react';
import classNames from 'classnames';
import styles from './pause-animation.module.scss';

export type PauseAnimationProps = {
  className?: string;
};

const PauseAnimation = ({ className }: PauseAnimationProps) => {
  return (
    <div className={classNames(className, styles.pauseLayout)}>
      <div className={classNames(styles.pauseBar, styles.left)}></div>
      <div className={classNames(styles.pauseBar, styles.right)}></div>
    </div>
  );
};

export default PauseAnimation;
