import React from 'react';
import classNames from 'classnames';
import styles from './play-animation.module.scss';

export type PlayAnimationProps = {
  className?: string;
};

const PlayAnimation = ({ className }: PlayAnimationProps) => {
  return (
    <div className={classNames(className, styles.playLayout)}>
      <div className={styles.playTriangleOutline}></div>
      <div className={styles.playTriangle}></div>
    </div>
  );
};

export default PlayAnimation;
