import { FixedObject, FluidObject } from 'gatsby-image';

export type FluidImage = {
  fluid: FluidObject;
};

export type FixedImage = {
  fixed: FixedObject;
};

export type Topic = {
  id: string;
  name: string;
  slug: string;
  thumb: FluidImage;
};

export type TopicPhoto = {
  id: string;
  photo: FluidImage;
};

export type ContactDetails = {
  addressLine1: string;
  addressLine2: string;
  email: string;
  mobileNumber: string;
  photo: FluidImage;
};

export type SiteType = 'weddings' | 'documentaries';

export type SiteTopicsSlug = 'weddings' | 'documentaries';

export type SiteMetadata = {
  type: SiteType;
  siteUrl: string;
  topicsSlug: SiteTopicsSlug;
  title: string;
  description: string;
  keywords: string[];
  facebook: {
    type: string;
    title: string;
    image: {
      uri: string;
      width: string;
      height: string;
    };
  };
};

export type Site = {
  siteMetadata: SiteMetadata;
};
