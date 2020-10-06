import React from "react"
import Layout from "../components/layout"
import { PageProps, graphql, Link } from "gatsby"
import { TopicPhoto } from "../types"
import styles from "./thumbnails.module.scss"
import Img from "gatsby-image"
import { toFraction, splitToSubgroups } from "../utils"

export type ThumbnailsContext = {
    slug: string
}

export type ThumbnailsData = {
    topicPhotos: {
        nodes: Array<TopicPhoto>
    }
}

export type ThumbnailsProps = PageProps<ThumbnailsData, ThumbnailsContext>

/*
TODO:

* pass height 100% to gatsby-image-wrapper
* memozation for comuptations
* rows without 4 pics

*/

const rowToRatios = ([firstTopic, ...restTopics]: Array<TopicPhoto>) => {
    const { N: firstPhotoWidthRatio, D: firstPhotoHeightRatio } = toFraction(
        firstTopic.photo.fluid.aspectRatio,
        0.01
    )

    const restRatios = restTopics
        .map(topic => toFraction(topic.photo.fluid.aspectRatio, 0.01))
        .map(({ N: photoWidthRatio, D: photoHeightRatio }) => {
            return (firstPhotoHeightRatio / photoHeightRatio) * photoWidthRatio
        })
        .map(ratio => Number(ratio.toFixed(2)))

    return [firstPhotoWidthRatio, ...restRatios]
}

export default function Thumbnails(props: ThumbnailsProps) {
    const {
        topicPhotos: { nodes },
    } = props.data

    const rows = splitToSubgroups(nodes, 4)

    return (
        <Layout>
            <div className={styles.root}>
                {rows.map((row, rowIdx) => {
                    const columnSizes = rowToRatios(row)
                        .map(ratio => `${ratio}fr`)
                        .join(" ")

                    return (
                        <div
                            className={styles.row}
                            key={`row_${rowIdx}`}
                            style={{ gridTemplateColumns: columnSizes }}
                        >
                            {row.map(({ id, photo }, colIdx) => {
                                return (
                                    <Link
                                        to={`../?p=${rowIdx * colIdx + 1}`}
                                        key={id}
                                    >
                                        <Img fluid={photo.fluid} />
                                    </Link>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query getTopicPhotosQueryForThumbnails($slug: String) {
        topicPhotos: allContentfulTopicPhoto(
            filter: { topic: { slug: { eq: $slug } } }
            sort: { fields: order }
        ) {
            nodes {
                photo {
                    fluid {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
                id
            }
        }
    }
`
