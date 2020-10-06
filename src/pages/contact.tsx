import React from "react"
import Layout from "../components/layout"
import { useContactDetails } from "../static-queries/useContactDetails"
import Img from "gatsby-image"
import styles from "./contact.module.scss"
import useFacebookLike from "../hooks/useFacebookLike"

export default function Contact() {
    const details = useContactDetails()

    const ref = useFacebookLike()

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
                <div className={styles.fbWrapper} ref={ref}>
                    <div
                        className="fb-like"
                        data-href="https://www.facebook.com/AdisegalPhotographer"
                        data-layout="button_count"
                        data-action="like"
                        data-size="large"
                        data-share="true"
                    />
                </div>
                <Img fluid={details.photo.fluid} className={styles.fullWidth} />
                <footer className={styles.copyrights}>
                    All rights reserved © {new Date().getFullYear()} Adi Segal
                </footer>
            </div>
        </Layout>
    )
}
