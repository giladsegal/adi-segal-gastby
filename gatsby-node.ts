import { GatsbyNode, CreatePagesArgs } from "gatsby"
import { resolve } from "path"
import { SiteMetadata } from "./src/types"

type TopicsQuery = {
    topics: {
        nodes: Array<{
            slug: string
        }>
    }
}

const getMetadata = async (graphql: CreatePagesArgs["graphql"]) => {
    const result = await graphql<{
        site: { siteMetadata: Pick<SiteMetadata, "type" | "topicsSlug"> }
    }>(
        `
            query getMetadata {
                site {
                    siteMetadata {
                        type
                        topicsSlug
                    }
                }
            }
        `
    )

    return result.data!.site.siteMetadata
}

const getTopics = async (
    graphql: CreatePagesArgs["graphql"],
    siteType: string
) => {
    const result = await graphql<TopicsQuery>(
        `
            query getTopicsQuery($siteType: String) {
                topics: allContentfulTopic(
                    filter: { type: { eq: $siteType } }
                ) {
                    nodes {
                        slug
                    }
                }
            }
        `,
        { siteType }
    )

    return result.data!.topics.nodes
}

export const createPages: GatsbyNode["createPages"] = async ({
    actions: { createPage },
    graphql,
}) => {
    const metadata = await getMetadata(graphql)
    const topics = await getTopics(graphql, metadata.type)

    createPage({
        path: "about",
        component: resolve(__dirname, "./src/templates/about.tsx"),
        context: {
            siteType: metadata.type,
        },
    })

    createPage({
        path: metadata.topicsSlug,
        component: resolve(__dirname, "./src/templates/topics.tsx"),
        context: {
            siteType: metadata.type,
        },
    })

    // TODO: home

    // TODO: publications for documentaries

    topics.forEach(topic => {
        createPage({
            path: `${metadata.topicsSlug}/${topic.slug}`,
            context: {
                slug: topic.slug,
            },
            component: resolve(__dirname, "./src/templates/gallery.tsx"),
        })

        createPage({
            path: `${metadata.topicsSlug}/${topic.slug}/thumbs`,
            context: {
                slug: topic.slug,
            },
            component: resolve(__dirname, "./src/templates/thumbnails.tsx"),
        })
    })
}
