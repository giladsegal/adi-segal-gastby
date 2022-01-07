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
  description: {
    description: string;
  } | null;
};

export type TopicPhoto = {
  id: string;
  photo: {
    file: {
      url: string;
      details?: {
        image: {
          height: number;
          width: number;
        };
      };
    };
  };
  description?: {
    description: string;
  };
};

export type FluidTopicPhoto = {
  id: string;
  photo: FluidImage;
  description?: {
    description: string;
  };
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
  awsBucketName: string;
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
