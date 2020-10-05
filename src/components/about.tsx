import React from "react"
import Layout from "./layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"
import Img, { FluidObject } from "gatsby-image"
import { graphql, PageProps } from "gatsby"
import { SiteMetadata } from "../types"
import styles from "./about.module.scss"

export default function About(props: AboutProps) {
    const {
        allContentfulAboutDetails: {
            nodes: [
                {
                    childContentfulAboutDetailsResumeRichTextNode: { resume },
                },
            ],
        },
        contentfulAboutDetailsPhoto: {
            photo: {
                file: {
                    details: {
                        image: { height, width },
                    },
                },
                fluid,
            },
        },
    } = props.data

    return (
        <Layout>
            <Img
                fluid={fluid}
                className={styles.image}
                style={{ "--width": `${width}px`, "--height": `${height}px` }}
            />
            {documentToReactComponents(JSON.parse(resume), {
                renderNode: {
                    [BLOCKS.PARAGRAPH]: (_, children) => {
                        return <p className={styles.paragraph}>{children}</p>
                    },
                    [INLINES.HYPERLINK]: (node, children) => {
                        console.log(node.data.uri)
                        return (
                            <a href={node.data.uri} className={styles.link}>
                                {children}
                            </a>
                        )
                    },
                },
            })}
        </Layout>
    )
}

export type AboutData = {
    allContentfulAboutDetails: {
        nodes: Array<{
            childContentfulAboutDetailsResumeRichTextNode: {
                resume: string
            }
        }>
    }
    contentfulAboutDetailsPhoto: {
        photo: {
            file: {
                details: {
                    image: {
                        height: number
                        width: number
                    }
                }
            }
            fluid: FluidObject
        }
    }
}

export type AboutContext = {
    siteType: SiteMetadata["type"]
}

export type AboutProps = PageProps<AboutData, AboutContext>

export const query = graphql`
    query aboutDetailsQuery($siteType: String) {
        allContentfulAboutDetails(filter: { type: { eq: $siteType } }) {
            nodes {
                childContentfulAboutDetailsResumeRichTextNode {
                    resume
                }
            }
        }
        contentfulAboutDetailsPhoto {
            photo {
                file {
                    details {
                        image {
                            height
                            width
                        }
                    }
                }
                fluid {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
        }
    }
`
