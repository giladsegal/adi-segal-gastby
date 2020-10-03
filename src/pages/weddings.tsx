import React from "react"
import Layout from "../components/Layout"
import { useTopics } from "../queries/useTopics"
import { Link } from "gatsby"

export default function Weddings() {
    const topics = useTopics()

    return (
        <Layout>
            {topics.map(t => {
                return (
                    <Link to={t.slug} key={t.id}>
                        {t.name}
                    </Link>
                )
            })}
        </Layout>
    )
}
