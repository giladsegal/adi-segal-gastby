import React from "react"
import Topic from "../components/TopicList/Topic"
import { useStaticQuery, graphql } from "gatsby"

const getDocumentariesTopics = graphql`
  query getDocumentariesTopics {
    allContentfulWeddingTopic(sort: { fields: order }) {
      nodes {
        name
        slug
        order
        thumb {
          fluid {
            src
          }
        }
      }
    }
  }
`

export default function Documentaries() {
  const { allContentfulWeddingTopic: nodes } = useStaticQuery(
    getDocumentariesTopics
  )
  console.log(nodes.nodes)
  return (
    <div>
      <Topic />
    </div>
  )
}
