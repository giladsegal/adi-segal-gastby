import React from "react"
import Layout from "./layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import Img, { FluidObject } from "gatsby-image"
import { graphql, PageProps } from "gatsby"
import { SiteMetadata } from "../types"
import styles from "./about.module.scss"
import classNames from "classnames"

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

    const isWeddingsPage = props.pageContext.siteType === "weddings"

    return (
        <Layout>
            <div
                className={classNames(styles.root, {
                    [styles.weddingsLayout]: isWeddingsPage,
                })}
            >
                <Img
                    fluid={fluid}
                    className={styles.image}
                    style={{
                        "--width": `${width}px`,
                        "--height": `${height}px`,
                    }}
                />
                <div>
                    {documentToReactComponents(JSON.parse(resume), {
                        renderMark: {
                            [MARKS.BOLD]: text => {
                                return (
                                    <strong className={styles.strong}>
                                        {text}
                                    </strong>
                                )
                            },
                            [MARKS.ITALIC]: text => {
                                return (
                                    <cite className={styles.cite}>{text}</cite>
                                )
                            },
                        },
                        renderNode: {
                            [BLOCKS.PARAGRAPH]: (_, children) => {
                                return (
                                    <p className={styles.paragraph}>
                                        {children}
                                    </p>
                                )
                            },
                            [BLOCKS.HEADING_3]: (_, children) => {
                                return <h3 className={styles.h3}>{children}</h3>
                            },
                            [BLOCKS.OL_LIST]: (_, children) => {
                                return <ol className={styles.ol}>{children}</ol>
                            },
                            [BLOCKS.UL_LIST]: (_, children) => {
                                return <ul className={styles.ul}>{children}</ul>
                            },
                            [INLINES.HYPERLINK]: (node, children) => {
                                console.log(node.data.uri)
                                return (
                                    <a
                                        href={node.data.uri}
                                        className={styles.link}
                                    >
                                        {children}
                                    </a>
                                )
                            },
                        },
                    })}
                </div>
            </div>
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
