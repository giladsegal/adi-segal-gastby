import React from "react"
import Layout from "../components/Layout"
import { Link, PageProps, graphql } from "gatsby"
import { Topic } from "../types"

export type GalleryContext = {
    slug: string
}

export type GalleryData = {
    topicPhotos: {
        nodes: Array<Topic>
    }
}

export type GalleryProps = PageProps<GalleryData, GalleryContext>

export default function Gallery(props: GalleryProps) {
    console.log(props)

    return (
        <Layout>
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
    }
`
