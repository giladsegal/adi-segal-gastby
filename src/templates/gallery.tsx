import React from 'react';
import Layout from '../components/layout';
import { Link, PageProps, graphql } from 'gatsby';
import { Topic, TopicPhoto } from '../types';
import SEO from '../components/seo';
import { capitalize, debounceCount, preloadTopicPhoto } from '../utils';
import styles from './gallery.module.scss';
import classNames from 'classnames';
import useSlideshow from '../hooks/useSlideshow';
import usePrevious from '../hooks/usePrevious';
import PlayAnimation from '../components/play-animation';
import PauseAnimation from '../components/pause-animation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Slideshow from '../components/slideshow';

// using font-awesome v4 because v5 free addition contains
// only bold icons
import '../styles/font-awesome.css';

export type GalleryContext = {
  slug: string;
};

export type GalleryData = {
  topicPhotos: {
    nodes: Array<TopicPhoto>;
  };
  topic: {
    nodes: [Pick<Topic, 'name' | 'description'>];
  };
};

export type GalleryProps = PageProps<GalleryData, GalleryContext>;

const PHOTO_SWITCH_DURATION_MS = 1200;

export default function Gallery(props: GalleryProps) {
  const {
    topic: {
      nodes: [{ name: topicName, description }],
    },
    topicPhotos: { nodes: photoNodes },
  } = props.data;

  const firstPhoto =
    parseInt(new URLSearchParams(props.location.search).get('p') || '1') || 1;

  const { current, play, pause, seek, status } = useSlideshow({
    autoplay: process.env.NODE_ENV !== 'development',
    initialSlideIndex: firstPhoto - 1,
    interval: 4000 + PHOTO_SWITCH_DURATION_MS,
    slides: photoNodes,
    preloadNext: preloadTopicPhoto,
  });

  React.useEffect(() => {
    const queryParams = new URLSearchParams(props.location.search);
    queryParams.set(
      'p',
      (photoNodes.findIndex(p => p === current) + 1).toString()
    );
    const url = new URL(props.location.href);
    url.search = queryParams.toString();
    history.replaceState(undefined, '', url.toString());
  }, [current, photoNodes, props.location.search, props.location.href]);

  const prevSlideshowStatus = usePrevious(status);

  const [areCaptionsActive, setCaptionActive] = React.useState(false);
  const captionAnimationCount = React.useRef(0);

  const toggleCaptions = () => {
    captionAnimationCount.current++;
    setCaptionActive(!areCaptionsActive);
  };

  const debouncedNext = debounceCount(clicks => {
    seek({ offset: clicks });
  }, 200);

  const debouncedPrevious = debounceCount(clicks => {
    seek({ offset: clicks * -1 });
  }, 200);

  return (
    <Layout>
      <SEO title={capitalize(topicName)} />
      <Slideshow
        status={status}
        current={current}
        captions={{
          className: classNames(styles.caption, {
            [styles.active]: areCaptionsActive,
          }),
          text: current.description.description || topicName,
        }}
        next={debouncedNext}
        prev={debouncedPrevious}
        transitionDuration={PHOTO_SWITCH_DURATION_MS}
        onClick={status === 'playing' ? pause : play}
      >
        {prevSlideshowStatus === 'paused' && status === 'playing' && (
          <PlayAnimation
            className={classNames(
              styles.galleryCenter,
              styles.playPauseAnimation
            )}
          />
        )}
        {prevSlideshowStatus === 'playing' && status === 'paused' && (
          <PauseAnimation
            className={classNames(
              styles.galleryCenter,
              styles.playPauseAnimation
            )}
          />
        )}
      </Slideshow>
      <div className={styles.controlsContainer}>
        <i
          onClick={debouncedPrevious}
          className={classNames(
            styles.galleryButton,
            styles.galleryButtonArrows,
            styles.galleryButtonLarge,
            'fa fa-angle-left'
          )}
        ></i>
        <span className={classNames(styles.photoNumber)}>{`${
          photoNodes.findIndex(p => p === current) + 1
        } of ${photoNodes.length}`}</span>
        <i
          onClick={debouncedNext}
          className={classNames(
            styles.galleryButton,
            styles.galleryButtonArrows,
            styles.galleryButtonLarge,
            'fa fa-angle-right'
          )}
        ></i>
        <i
          onClick={status === 'playing' ? pause : play}
          className={classNames(
            styles.galleryButton,
            'fa',
            status === 'playing' ? 'fa-pause' : 'fa-play'
          )}
        ></i>
        <Link
          to="./thumbs"
          className={classNames(
            styles.galleryButton,
            styles.galleryButtonThumbs
          )}
        >
          <i className={classNames('fa fa-th')}></i>
        </Link>
        <i
          onClick={toggleCaptions}
          className={classNames(
            styles.galleryButton,
            styles.galleryButtonLarge,
            styles.galleryButtonCaptions,
            'fa fa-angle-double-up'
          )}
          style={{
            transform: `rotate(${captionAnimationCount.current * 180}deg)`,
          }}
        ></i>
        {description && (
          <Link
            to={`./description?p=${
              photoNodes.findIndex(p => p === current) + 1
            }`}
          >
            <i
              className={classNames(
                styles.galleryButton,
                styles.galleryButtonInfo,
                'fa fa-info'
              )}
            ></i>
          </Link>
        )}
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div>
          <div className={classNames(styles.playPauseLayout)}>
            <div className={classNames(styles.pauseBar, styles.left)}></div>
            <div className={classNames(styles.pauseBar, styles.right)}></div>
          </div>

          <div className={classNames(styles.playPauseLayout)}>
            <div className={styles.playTriangleOutline}></div>
            <div className={styles.playTriangle}></div>
          </div>
          <div>{status.toUpperCase()}</div>
          <button onClick={pause}>pause</button>
          <button onClick={play}>play</button>
          <button onClick={debouncedNext}>next</button>
          <button onClick={debouncedPrevious}>prev</button>
          <button onClick={seek.bind(null, { offset: 3 })}>next by 3</button>
          <button onClick={seek.bind(null, { offset: -3 })}>prev by 3</button>
          <div>{`${photoNodes.findIndex(p => p === current) + 1} out of ${
            photoNodes.length
          }`}</div>
          <Link to="./thumbs">Thumbs</Link>
          {description && (
            <div>
              {documentToReactComponents(JSON.parse(description.description))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export const query = graphql`
  query getTopicPhotosQueryForGallery($slug: String) {
    topicPhotos: allContentfulTopicPhoto(
      filter: { topic: { slug: { eq: $slug } } }
      sort: { fields: order }
    ) {
      nodes {
        photo {
          fluid(maxWidth: 800) {
            src
          }
        }
        description {
          description
        }
        id
      }
    }
    topic: allContentfulTopic(filter: { slug: { eq: $slug } }) {
      nodes {
        name
        description {
          description
        }
      }
    }
  }
`;
