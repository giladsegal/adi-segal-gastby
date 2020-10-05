import React from "react"
import Layout from "./layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"
import Img, { FluidObject, FixedObject } from "gatsby-image"
import { graphql, PageProps } from "gatsby"
import { SiteMetadata } from "../types"

export default function About(props: AboutProps) {
    console.log(props)
    const {
        allContentfulAboutDetails: {
            nodes: [
                {
                    childContentfulAboutDetailsResumeRichTextNode: { resume },
                },
            ],
        },
        allContentfulAboutDetailsPhoto: { photoNodes: images },
    } = props.data

    return (
        <Layout>
            {documentToReactComponents(JSON.parse(resume), {
                renderNode: {
                    [BLOCKS.PARAGRAPH]: (node, children) => {
                        const hasInlineImage = node.content.some(
                            c => c.nodeType === "embedded-entry-inline"
                        )
                        return (
                            <p>
                                {hasInlineImage ? (
                                    <div style={{ display: "flex" }}>
                                        {children}
                                    </div>
                                ) : (
                                    children
                                )}
                            </p>
                        )
                    },
                    [INLINES.EMBEDDED_ENTRY]: node => {
                        const id =
                            node.data.target.fields.photo["en-US"].sys
                                .contentful_id

                        const photo = images.find(
                            img => img.photo.contentful_id === id
                        )?.photo

                        return photo ? (
                            <Img fixed={photo.fixed} /*fluid={photo.fluid}*/ />
                        ) : null
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
    allContentfulAboutDetailsPhoto: {
        photoNodes: Array<{
            photo: {
                contentful_id: string
                fluid: FluidObject
                fixed: FixedObject
            }
        }>
    }
}

export type AboutContext = {
    siteType: SiteMetadata["type"]
}

export type AboutProps = PageProps<AboutData, AboutContext>

export const query = graphql`
    query aboutWeddingsDetailsQuery($siteType: String) {
        allContentfulAboutDetails(filter: { type: { eq: $siteType } }) {
            nodes {
                childContentfulAboutDetailsResumeRichTextNode {
                    resume
                }
            }
        }
        allContentfulAboutDetailsPhoto {
            photoNodes: nodes {
                photo {
                    contentful_id
                    fluid {
                        ...GatsbyContentfulFluid_withWebp
                    }
                    fixed(width: 135, height: 135) {
                        ...GatsbyContentfulFixed_withWebp
                    }
                }
            }
        }
    }
`
