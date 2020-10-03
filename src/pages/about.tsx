import React from "react"
import Layout from "../components/Layout"
import { useAboutDetails } from "../queries/useAboutDetails"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

export default function About() {
    const aboutDocument = useAboutDetails()

    return (
        <Layout>
            {documentToReactComponents(aboutDocument, {
                renderNode: {
                    [BLOCKS.EMBEDDED_ASSET]: node => {
                        return (
                            <img
                                style={{ float: "left" }}
                                src={node.data.target.fields.file["en-US"].url}
                            />
                        )
                    },
                },
            })}
            {/* <div dangerouslySetInnerHTML={{ __html: detailsHTML }} /> */}
        </Layout>
    )
}
