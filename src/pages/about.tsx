import React from "react"
import Layout from "../components/Layout"
import { useAboutDetails } from "../queries/useAboutDetails"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"
import Img from "gatsby-image"

export default function About() {
    const { images, resume } = useAboutDetails()

    return (
        <Layout>
            {documentToReactComponents(resume, {
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
