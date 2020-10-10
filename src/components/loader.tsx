import React from 'react';
import styles from './loader.module.scss';
import classNames from 'classnames';

export type LoaderProps = {
  shown?: boolean;
};

export default function Loader(props: LoaderProps) {
  const { shown = true } = props;

  return (
    <div
      className={classNames(styles.root, { [styles.hidden]: !shown })}
      role="img"
      aria-label="Loading indication"
    >
      <div className={styles.skCircle}>
        {Array(12)
          .fill(undefined)
          .map((_, index) => {
            return (
              <div
                key={`circle-${index}`}
                className={styles.skChild}
                style={
                  {
                    '--delay': `${-1 * (1.2 - index * 0.1)}s`,
                    '--angle': `${30 * index}deg`,
                  } as any
                }
              />
            );
          })}
      </div>
    </div>
  );
}
