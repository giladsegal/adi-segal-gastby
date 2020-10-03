import { graphql, useStaticQuery } from "gatsby"
import { Topic } from "../types"

export type TopicsQuery = {
    topics: {
        nodes: Array<Topic>
    }
}

export const topicsQuery = graphql`
    query topicsQuery {
        topics: allContentfulTopic(sort: { fields: order }) {
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
