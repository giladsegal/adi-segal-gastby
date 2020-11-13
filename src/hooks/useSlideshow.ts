import React from 'react';

export type SlideShowOptions<T> = {
  initialSlideIndex?: number;
  autoplay?: boolean;
  slides: ReadonlyArray<T>; // shuffle outside
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

// set timeout to load next photo
// when timeout is ellapsed check if image is in the cache
// if it is, switch to it
// if it isn't start loading it, and display a spinner

// switch to photo:
// preload next photo
// hide spinner
// clear loading cache

// pressing next/prev should reset current timeout?

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

export default function useSlideshow<T>({
  initialSlideIndex = 0,
  autoplay = true,
  slides,
  interval = 5000,
}: SlideShowOptions<T>): SlideShow<T> {
  const nextSlideInterval = React.useRef<number | undefined>();
  const [slideIndex, setSlideIndex] = React.useState(initialSlideIndex);
  const [status, setStatus] = React.useState<SlideshowStatus>(
    autoplay ? 'playing' : 'paused'
  );

  // reset state when slides change?

  const play = React.useCallback(() => {
    setStatus('playing');
  }, []);

  const pause = React.useCallback(() => {
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

  React.useEffect(() => {
    if (status === 'playing') {
      nextSlideInterval.current = setTimeout(next, interval) as any;
    }

    return () => {
      nextSlideInterval.current && clearTimeout(nextSlideInterval.current);
    };
  }, [interval, status, next]);

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
