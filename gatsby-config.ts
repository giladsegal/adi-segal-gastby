import { SiteMetadata } from "./src/types"

const weddingsSiteMetadata: SiteMetadata = {
    title: "Adi Segal Photography",
    type: "weddings",
    topicsSlug: "weddings",
    facebookMetadata: {
        url: "http://weddings.adi-segal.com/",
        type: "website",
        title: "Wedding photography - Adi Segal",
        image: {
            uri:
                "https://www.adi-segal.com/assets/images/facebook-share-weddings.jpg",
            width: "2097",
            height: "1278",
        },
        description: "Wedding photography from a different point of view",
    },
}

const documentariesSiteMetadata: SiteMetadata = {
    title: "Adi Segal Photography",
    type: "documentaries",
    topicsSlug: "documentaries",
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

export const siteMetadata: SiteMetadata =
    process.env.WEBSITE_TYPE === "weddings"
        ? weddingsSiteMetadata
        : documentariesSiteMetadata

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
    `gatsby-plugin-preload-fonts`,
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `Adi Segal Photography`,
            short_name: `AdiSegal`,
            start_url: `/`,
            background_color: `#ffffff`,
            theme_color: `#ffffff`,
            display: `standalone`,
            icon: `src/images/icon.png`,
        },
    },
]
