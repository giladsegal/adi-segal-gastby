import { SiteMetadata } from "./src/types"

export const siteMetadata: SiteMetadata = {
    title: "Adi Segal Photography",
    facebookMetadata: {
        url: "http://www.adi-segal.com/",
        type: "website",
        title: "Documentary photography - Adi Segal Photography",
        image: {
            uri: "http://www.adi-segal.com/assets/images/facebook-share.jpg",
            width: "1419",
            height: "946",
        },
        description: "Visual story telling and Documentary photography",
    },
}

export const plugins = [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/pages/`,
        },
    },
    {
        resolve: `gatsby-source-contentful`,
        options: {
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
]
