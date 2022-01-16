import React from 'react';
import styles from './slideshow.module.scss';
import { TopicPhoto } from '../types';
import { SlideshowStatus } from '../hooks/useSlideshow';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from './spinner';
import classNames from 'classnames';

export type SlideshowProps = {
  next?: () => void;
  prev?: () => void;
  current: Pick<TopicPhoto, 'photo' | 'id'>;
  status: SlideshowStatus;
  transitionDuration: number;
  children?: React.ReactNode;
  captions?: { text: string; className: string };
  onClick?: React.ReactEventHandler<HTMLElement>;
};

const Slideshow = (props: SlideshowProps) => {
  const {
    current,
    children,
    next,
    prev,
    status,
    transitionDuration,
    captions,
    onClick,
  } = props;

  const photoContainerRef = React.useRef<HTMLDivElement>(null);
  const photoRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (!photoContainerRef.current) {
      return;
    }

    if (!prev && !next) {
      return;
    }

    let hammer: any;

    // Hammer accesses window on import so it breaks gatsby build
    if (typeof window !== `undefined`) {
      const Hammer: any = require('hammerjs');

      hammer = new Hammer(photoContainerRef.current);

      prev && hammer.on('swipeleft', prev);
      next && hammer.on('swiperight', next);
    }

    return () => {
      hammer?.destroy();
    };
  }, [prev, next]);

  const removeHeightCallback = React.useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      // after load remove the height to allow responsive resizing of the image
      // the height is set only for initial rendering
      e.currentTarget.removeAttribute('height');
    },
    []
  );

  return (
    <div
      ref={photoContainerRef}
      className={classNames(styles.photosContainer, {
        [styles.clickable]: !!onClick,
      })}
      onClick={onClick}
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
          <div className={styles.photoContainer}>
            <img
              ref={photoRef}
              src={current.photo.file.url}
              key={current.id}
              height={current.photo.file.details?.image.height}
              onLoad={removeHeightCallback}
              className={styles.photo}
              alt=""
            />
            {captions && (
              <div className={captions.className}>{captions.text}</div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
      {status === 'loading' && <Spinner className={styles.galleryCenter} />}
      {children}
    </div>
  );
};

export default Slideshow;
