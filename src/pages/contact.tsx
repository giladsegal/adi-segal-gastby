import React from "react"
import Layout from "../components/layout"
import { useContactDetails } from "../static-queries/useContactDetails"
import Img from "gatsby-image"
import styles from "./contact.module.scss"

export default function Contact() {
    const details = useContactDetails()

    return (
        <Layout>
            <div className={styles.centeredColumnLayout}>
                <dl className={styles.details}>
                    <dd>contact:</dd>
                    <dt>{details.email}</dt>
                    <dd>mobile:</dd>
                    <dt>{details.mobileNumber}</dt>
                    <dd>location:</dd>
                    <dt>
                        {details.addressLine1}
                        <br />
                        {details.addressLine2}
                    </dt>
                </dl>
                <Img fluid={details.photo.fluid} className={styles.fullWidth} />
                <footer className={styles.copyrights}>
                    All rights reserved © {new Date().getFullYear()} Adi Segal
                </footer>
            </div>
        </Layout>
    )
}
