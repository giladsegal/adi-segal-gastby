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

export const createPages: GatsbyNode["createPages"] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions
    const { slugPrefix, topics } = await getTopics(graphql)

    topics.forEach(topic => {
        createPage({
            path: `${slugPrefix}/${topic.slug}`,
            context: topic,
            component: resolve(__dirname, "./src/templates/gallery.tsx"),
        })

        createPage({
            path: `${slugPrefix}/${topic.slug}/thumbs`,
            context: {
                slug: topic.slug,
            },
            component: resolve(__dirname, "./src/templates/thumbnails.tsx"),
        })
    })
}
