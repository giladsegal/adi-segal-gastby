import React from 'react';

export type SlideShowOptions<T> = {
  slides: ReadonlyArray<T>; // shuffle outside
  preloadNext?: (slide: T) => Promise<void>;
  initialSlideIndex?: number;
  autoplay?: boolean;
  interval?: number;
};

export type SlideShow<T> = {
  current: T;
  status: SlideshowStatus;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (options: { offset: number }) => void;
};

export type SlideshowStatus = 'playing' | 'paused' | 'loading';

// promise that waits using Promise.all([4 seconds (then if image not loaded display spinner), preload next image]).then(hide spinner, schedule next)

// set timeout to load next photo
// when timeout is ellapsed check if image is in the cache
// if it is, switch to it
// if it isn't start loading it, and display a spinner

// switch to photo:
// preload next photo
// hide spinner
// clear loading cache

const _seek = ({
  position,
  length,
  offset,
}: {
  position: number;
  length: number;
  offset: number;
}) => {
  const boundOffset = offset % length;
  const deltaToMove = position + boundOffset;
  return deltaToMove >= 0 ? deltaToMove % length : length + deltaToMove;
};

const delay = (ms: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
};

const withoutPreloading = () => delay(6000); // () => Promise.resolve();

export default function useSlideshow<T>({
  initialSlideIndex = 0,
  autoplay = true,
  slides,
  interval = 5000,
  preloadNext = withoutPreloading,
}: SlideShowOptions<T>): SlideShow<T> {
  const lastExecution = React.useRef(0);

  const [slideIndex, setSlideIndex] = React.useState(initialSlideIndex);
  const [status, setStatus] = React.useState<SlideshowStatus>(
    autoplay ? 'playing' : 'paused'
  );

  // reset state when slides change?

  const play = React.useCallback(() => {
    setStatus('playing');
  }, []);

  const pause = React.useCallback(() => {
    // ignore next scheduled
    lastExecution.current++;
    setStatus('paused');
  }, []);

  const next = React.useCallback(() => {
    const nextSlide = _seek({
      position: slideIndex,
      length: slides.length,
      offset: 1,
    });

    setSlideIndex(nextSlide);
  }, [slideIndex, slides]);

  const previous = React.useCallback(() => {
    const previousSlide = _seek({
      position: slideIndex,
      length: slides.length,
      offset: -1,
    });

    setSlideIndex(previousSlide);
  }, [slideIndex, slides]);

  const seek = React.useCallback(
    ({ offset }: { offset: number }) => {
      const nextSlide = _seek({
        position: slideIndex,
        length: slides.length,
        offset,
      });

      setSlideIndex(nextSlide);
    },
    [slideIndex, slides]
  );

  const isUnmounted = React.useRef(false);

  React.useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  React.useEffect(() => {
    if (status !== 'playing') {
      return;
    }

    lastExecution.current++;
    const currentExecution = lastExecution.current;

    const nextId = _seek({
      position: slideIndex,
      length: slides.length,
      offset: 1,
    });

    let wasNextLoaded = false;

    Promise.all([
      delay(interval).then(() => {
        if (isUnmounted) {
          return;
        }

        if (currentExecution === lastExecution.current && !wasNextLoaded) {
          setStatus('loading');
        }
      }),
      preloadNext(slides[nextId]).then(() => {
        wasNextLoaded = true;
      }),
    ]).then(() => {
      if (isUnmounted) {
        return;
      }

      if (currentExecution === lastExecution.current) {
        setStatus('playing');
        next();
      }
    });
  }, [interval, status, next, preloadNext, slideIndex, slides]);

  return {
    current: slides[slideIndex],
    status,
    play,
    pause,
    next,
    previous,
    seek,
  };
}
