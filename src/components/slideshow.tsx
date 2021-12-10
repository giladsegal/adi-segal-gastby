import React from 'react';
import styles from './slideshow.module.scss';
import { TopicPhoto } from '../types';
import { SlideShow } from '../hooks/useSlideshow';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Hammer from 'hammerjs';

export type SlideshowProps = {
  next: () => void;
  prev: () => void;
  current: TopicPhoto;
  children?: React.ReactNode;
};

export type SlideshowImperativeApi = SlideShow<TopicPhoto>;

const PHOTO_SWITCH_DURATION_MS = 1200;

const Slideshow: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SlideshowProps
> = (props, ref) => {
  const { current, children, next, prev } = props;

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
          '--photo-switch-duration': `${PHOTO_SWITCH_DURATION_MS}ms`,
        } as React.CSSProperties
      }
    >
      <TransitionGroup component={null}>
        <CSSTransition
          key={current.id}
          timeout={PHOTO_SWITCH_DURATION_MS}
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
      {children}
    </div>
  );
};

export default React.forwardRef(Slideshow);
