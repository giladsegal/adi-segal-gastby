import React from "react"
import Layout from "../components/Layout"
import { PageProps, graphql } from "gatsby"
import { TopicPhoto } from "../types"

export type ThumbnailsContext = {
    slug: string
}

export type ThumbnailsData = {
    topicPhotos: {
        nodes: Array<TopicPhoto>
    }
}

export type ThumbnailsProps = PageProps<ThumbnailsData, ThumbnailsContext>

export default function Thumbnails(props: ThumbnailsProps) {
    console.log(props)
    return <Layout>asd</Layout>
}

export const query = graphql`
    query getTopicPhotosQuery($slug: String) {
        topicPhotos: allContentfulTopicPhoto(
            filter: { topic: { slug: { eq: $slug } } }
            sort: { fields: order }
        ) {
            nodes {
                photo {
                    fluid {
                        src
                    }
                }
                id
            }
        }
    }
`
