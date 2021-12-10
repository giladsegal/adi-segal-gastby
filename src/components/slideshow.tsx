import React from 'react';
import styles from './slideshow.module.scss';
import { TopicPhoto } from '../types';
import { SlideshowStatus } from '../hooks/useSlideshow';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Hammer from 'hammerjs';
import Spinner from './spinner';

export type SlideshowProps = {
  next: () => void;
  prev: () => void;
  current: TopicPhoto;
  status: SlideshowStatus;
  transitionDuration: number;
  children?: React.ReactNode;
};

const Slideshow = (props: SlideshowProps) => {
  const { current, children, next, prev, status, transitionDuration } = props;

  const photoContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!photoContainerRef.current) {
      return;
    }

    const hammer = new Hammer(photoContainerRef.current);

    hammer.on('swipeleft', prev);
    hammer.on('swiperight', next);

    return () => {
      hammer.destroy();
    };
  }, [prev, next]);

  return (
    <div
      ref={photoContainerRef}
      className={styles.photosContainer}
      style={
        {
          '--photo-switch-duration': `${transitionDuration}ms`,
        } as React.CSSProperties
      }
    >
      <TransitionGroup component={null}>
        <CSSTransition
          key={current.id}
          timeout={transitionDuration}
          classNames={{
            enter: styles.photoEnter,
            enterActive: styles.photoEnterActive,
            exit: styles.photoExit,
            exitActive: styles.photoExitActive,
          }}
        >
          <img
            src={current.photo.fluid.src}
            key={current.id}
            className={styles.photo}
            alt=""
            height="533"
          />
        </CSSTransition>
      </TransitionGroup>
      {status === 'loading' && <Spinner className={styles.galleryCenter} />}
      {children}
    </div>
  );
};

export default Slideshow;
