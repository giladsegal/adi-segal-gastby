import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"

export default function Gallery() {
    return (
        <Layout>
            <Link to="./thumbs">Thumbs</Link>
        </Layout>
    )
}
