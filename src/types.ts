import { FixedObject } from "gatsby-image"

export type ContactDetails = {
    addressLine1: string
    addressLine2: string
    email: string
    mobileNumber: string
    photo: {
        fixed: FixedObject
    }
}

export type Site = {
    siteMetadata: SiteMetadata
}

export type SiteMetadata = {
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
