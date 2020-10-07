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

const rowToRatios = (row: Array<TopicPhoto>, length: number) => {
    const [{ photo: firstPhoto }, ...restPhotoNodes] = row
    const { N: firstPhotoWidthRatio, D: firstPhotoHeightRatio } = toFraction(
        firstPhoto.fluid.aspectRatio
    )

    const restRatios = restPhotoNodes
        .map(({ photo }) => {
            return toFraction(Number(photo.fluid.aspectRatio.toFixed(2)))
        })
        .map(({ N: photoWidthRatio, D: photoHeightRatio }) => {
            return (firstPhotoHeightRatio / photoHeightRatio) * photoWidthRatio
        })
        .map(ratio => Number(ratio.toFixed(2)))

    return fillMissingRatios([firstPhotoWidthRatio, ...restRatios], length)
}

// last row might not contain maximum amount of photos so
// placeholder ratios are added based over existing photos e.g.
// [3] --> [3, 3, 3, 3]
// [3, 2] --> [3, 2, 3, 2]
// [3, 2, 3] --> [3, 2, 3, 3]
// [3, 3, 3, 3] --> [3, 3, 3, 3]
const fillMissingRatios = (ratios: number[], size: number) => {
    return Array(size)
        .fill(undefined)
        .map((_, i) => ratios[i % ratios.length])
}

export default function Thumbnails(props: ThumbnailsProps) {
    const {
        topicPhotos: { nodes },
    } = props.data

    const rowLength = 4
    const rows = splitToSubgroups(nodes, rowLength)

    return (
        <Layout>
            <div>
                {rows.map((row, rowIdx) => {
                    const columnSizes = rowToRatios(row, rowLength)
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
                                        <Img
                                            fluid={photo.fluid}
                                            className={styles.photo}
                                        />
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
