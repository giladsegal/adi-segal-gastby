import { FixedObject, FluidObject } from "gatsby-image"

export type Topic = {
    id: string
    name: string
    slug: string
    thumb: FluidImage
}

export type TopicPhoto = {
    id: string
    photo: FluidImage
}

export type ContactDetails = {
    addressLine1: string
    addressLine2: string
    email: string
    mobileNumber: string
    photo: FluidImage
}

export type Site = {
    siteMetadata: SiteMetadata
}

export type SiteMetadata = {
    type: SiteType
    topicsSlug: SiteTopicsSlug
    title: string
    facebookMetadata: {
        url: string
        type: string
        title: string
        image: {
            uri: string
            width: string
            height: string
        }
        description: string
    }
}

export type SiteType = "weddings" | "documentaries"

export type SiteTopicsSlug = "weddings" | "documentaries"

export type FluidImage = {
    fluid: FluidObject
}

export type FixedImage = {
    fixed: FixedObject
}
