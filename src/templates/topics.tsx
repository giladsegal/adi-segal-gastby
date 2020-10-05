import React from "react"
import { PageProps, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { Topic } from "../types"

export default function Topics(props: TopicsProps) {
    console.log(props)
    debugger
    const {
        data: {
            topics: { nodes },
        },
    } = props

    return (
        <Layout>
            {nodes.map(t => {
                return (
                    <Link to={t.slug} key={t.id}>
                        {t.name}
                    </Link>
                )
            })}
        </Layout>
    )
}

export type TopicsProps = PageProps<TopicsData, TopicsContext>

export type TopicsData = {
    topics: {
        nodes: Array<Topic>
    }
}

export type TopicsContext = {
    siteType: string
}

export const query = graphql`
    query topicsQuery($siteType: String) {
        topics: allContentfulTopic(
            sort: { fields: order }
            filter: { type: { eq: $siteType } }
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
