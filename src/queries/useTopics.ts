import { graphql, useStaticQuery } from "gatsby"
import { Topic } from "../types"

export type TopicsQuery = {
    topics: {
        nodes: Array<Topic>
    }
}

export const topicsQuery = graphql`
    query weddingsTopicsQuery {
        topics: allContentfulTopic(
            sort: { fields: order }
            filter: { type: { eq: "weddings" } }
        ) {
            nodes {
                id
                name
                slug
                thumb {
                    fluid {
                        src
                    }
                }
            }
        }
    }
`

export const useTopics = () => {
    const {
        topics: { nodes },
    } = useStaticQuery<TopicsQuery>(topicsQuery)

    return nodes
}
