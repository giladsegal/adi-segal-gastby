import React from "react"
import { Helmet } from "react-helmet"
import Header from "./header"
import "normalize.css"
import styles from "./layout.module.scss"
import { useStaticQuery, graphql } from "gatsby"
import { Site } from "../types"

export type LayoutProps = {
    children?: React.ReactNode
}

export type SiteQuery = {
    site: Site
}

const metadataQuery = graphql`
    query metadataQuery {
        site {
            siteMetadata {
                title
                facebookMetadata {
                    url
                    type
                    title
                    description
                    image {
                        uri
                        width
                        height
                    }
                }
            }
        }
    }
`

export default function Layout({ children }: LayoutProps) {
    const { title, facebookMetadata } = useStaticQuery<SiteQuery>(
        metadataQuery
    ).site.siteMetadata

    return (
        <React.Fragment>
            <Helmet
                htmlAttributes={{ lang: "en" }}
                title={""}
                titleTemplate={`${title} · %s`}
                meta={[
                    { property: "og:url", content: facebookMetadata.url },
                    { property: "og:type", content: facebookMetadata.type },
                    { property: "og:title", content: facebookMetadata.title },
                    {
                        property: "og:image",
                        content: facebookMetadata.image.uri,
                    },
                    {
                        property: "og:image::width",
                        content: facebookMetadata.image.width,
                    },
                    {
                        property: "og:image:height",
                        content: facebookMetadata.image.height,
                    },
                    {
                        property: "og:description",
                        content: facebookMetadata.description,
                    },
                ]}
            />
            <Header>
                <Header.Link to="/">HOME</Header.Link>
                {/*<Header.Link to="/documentaries">DOCUMENTARIES</Header.Link>*/}
                <Header.Link to="/weddings">WEDDINGS</Header.Link>
                {/*<Header.Link to="/publications">PUBLICATIONS</Header.Link>*/}
                <Header.Link to="/about">ABOUT</Header.Link>
                <Header.Link to="/contact">CONTACT</Header.Link>
            </Header>
            <main className={styles.mainContent}>{children}</main>
        </React.Fragment>
    )
}
