import { GatsbyNode, CreatePagesArgs } from "gatsby"
import { resolve } from "path"
import _ from "lodash"

const topicType = "weddings"

type TopicsQuery = {
    topics: {
        nodes: Array<{
            slug: string
        }>
    }
}

const getTopics = async (graphql: CreatePagesArgs["graphql"]) => {
    const slugPrefix = "weddings"
    const result = await graphql<TopicsQuery>(
        `
            query getTopicsQuery($topicType: String) {
                topics: allContentfulTopic(
                    filter: { type: { eq: $topicType } }
                ) {
                    nodes {
                        slug
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

    createPage({
        path: "about",
        component: resolve(__dirname, `./src/components/about.tsx`),
        context: {
            type: topicType,
        },
    })

    topics.forEach(topic => {
        createPage({
            path: `${slugPrefix}/${topic.slug}`,
            context: {
                slug: topic.slug,
            },
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
