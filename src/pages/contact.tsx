import React from "react"
import Layout from "../components/layout"
import { useContactDetails } from "../static-queries/useContactDetails"
import Img from "gatsby-image"

export default function Contact() {
    const details = useContactDetails()

    return (
        <Layout>
            <div>
                <Img fixed={details.photo.fixed} />
            </div>
            <div>{details.email}</div>
            <div>{details.mobileNumber}</div>
            <div>{details.addressLine1}</div>
            <div>{details.addressLine2}</div>
        </Layout>
    )
}
