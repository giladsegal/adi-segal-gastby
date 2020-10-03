import { GatsbyNode, CreatePagesArgs } from "gatsby"
import { resolve } from "path"
import { TopicsQuery } from "./src/queries/useTopics"
import { Topic, TopicPhoto } from "./src/types"
import _ from "lodash"

const topicType = "weddings"

const getTopics = async (graphql: CreatePagesArgs["graphql"]) => {
    const slugPrefix = "weddings"
    const result = await graphql<TopicsQuery>(
        `
            query getTopicsQuery($topicType: String) {
                topics: allContentfulTopic(
                    filter: { type: { eq: $topicType } }
                ) {
                    nodes {
                        thumb {
                            fluid {
                                src
                            }
                        }
                        slug
                        name
                        id
                    }
                }
            }
        `,
        { topicType }
    )

    return {
        slugPrefix,
        topics: result.data!.topics.nodes,
    }
}

export type TopicPhotosQuery = {
    topicPhotos: {
        nodes: Array<
            TopicPhoto & {
                order: number
                topic: Pick<Topic, "name">
            }
        >
    }
}

const getTopicPhotos = async (graphql: CreatePagesArgs["graphql"]) => {
    const result = await graphql<TopicPhotosQuery>(
        `
            query getTopicPhotosQuery($topicType: String) {
                topicPhotos: allContentfulTopicPhoto(
                    filter: { topic: { type: { eq: $topicType } } }
                ) {
                    nodes {
                        order
                        topic {
                            name
                        }
                        photo {
                            fluid {
                                src
                            }
                        }
                        id
                    }
                }
            }
        `,
        {
            topicType,
        }
    )

    const groupedTopicPhotos = _.groupBy(
        result.data!.topicPhotos.nodes,
        t => t.topic.name
    )

    _.forEach(groupedTopicPhotos, (value, key) => {
        groupedTopicPhotos[key] = _.sortBy(value, tp => tp.order)
    })

    return groupedTopicPhotos
}

export const createPages: GatsbyNode["createPages"] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions
    const [{ slugPrefix, topics }, topicPhotos] = await Promise.all([
        getTopics(graphql),
        getTopicPhotos(graphql),
    ])

    topics.forEach(topic => {
        createPage({
            path: `${slugPrefix}/${topic.slug}`,
            context: topic,
            component: resolve(__dirname, "./src/templates/gallery.tsx"),
        })

        createPage({
            path: `${slugPrefix}/${topic.slug}/thumbs`,
            context: topicPhotos,
            component: resolve(__dirname, "./src/templates/thumbnails.tsx"),
        })
    })
}
