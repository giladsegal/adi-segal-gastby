import React from "react"
import Layout from "../components/layout"
import { Link, PageProps, graphql } from "gatsby"
import { Topic, TopicPhoto } from "../types"
import SEO from "../components/seo"
import { capitalize } from "../utils"

export type GalleryContext = {
    slug: string
}

export type GalleryData = {
    topicPhotos: {
        nodes: Array<TopicPhoto>
    }
    topic: {
        nodes: [Pick<Topic, "name">]
    }
}

export type GalleryProps = PageProps<GalleryData, GalleryContext>

export default function Gallery(props: GalleryProps) {
    const {
        topic: {
            nodes: [{ name: topicName }],
        },
    } = props.data

    return (
        <Layout>
            <SEO title={capitalize(topicName)} />
            <Link to="./thumbs">Thumbs</Link>
        </Layout>
    )
}

export const query = graphql`
    query getTopicPhotosQueryForGallery($slug: String) {
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
        topic: allContentfulTopic(filter: { slug: { eq: $slug } }) {
            nodes {
                name
            }
        }
    }
`
