import { SiteMetadata } from './src/types';

const weddingsSiteUrl = 'https://weddings.adi-segal.com';
const weddingsSiteMetadata: SiteMetadata = {
  title: 'Adi Segal Photography',
  type: 'weddings',
  topicsSlug: 'weddings',
  siteUrl: weddingsSiteUrl,
  description: 'Wedding photography from a different point of view',
  keywords: ['weddings', 'photography'],
  facebook: {
    type: 'website',
    title: 'Wedding photography - Adi Segal',
    image: {
      uri: `${weddingsSiteUrl}/images/facebook-share-weddings.jpg`,
      width: '2097',
      height: '1278',
    },
  },
};

const documentariesSiteUrl = 'https://www.adi-segal.com';
const documentariesSiteMetadata: SiteMetadata = {
  title: 'Adi Segal Photography',
  type: 'documentaries',
  topicsSlug: 'documentaries',
  siteUrl: documentariesSiteUrl,
  description: 'Visual story telling and Documentary photography',
  keywords: ['documentaries', 'photography'],
  facebook: {
    type: 'website',
    title: 'Documentary photography - Adi Segal Photography',
    image: {
      uri: `${documentariesSiteUrl}/images/facebook-share.jpg`,
      width: '1419',
      height: '946',
    },
  },
};

export const siteMetadata: SiteMetadata =
  process.env.WEBSITE_TYPE === 'weddings'
    ? weddingsSiteMetadata
    : documentariesSiteMetadata;

export const plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-typescript',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/pages/`,
    },
  },
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  },
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-preload-fonts',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Adi Segal Photography',
      short_name: 'AdiSegal',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      display: 'standalone',
      icon: 'src/images/icon.png',
    },
  },
  'gatsby-plugin-sitemap',
  'gatsby-plugin-robots-txt',
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      siteUrl: siteMetadata.siteUrl,
      stripQueryString: true,
    },
  },
];
