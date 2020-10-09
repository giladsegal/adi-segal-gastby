import React from "react"
import Header from "./header"
import "normalize.css"
import styles from "./layout.module.scss"
import SEO from "./seo"
export type LayoutProps = {
    children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <React.Fragment>
            <SEO title="Home" />
            <Header>
                <Header.Link to="/">HOME</Header.Link>
                {/*<Header.Link to="/documentaries">DOCUMENTARIES</Header.Link>*/}
                <Header.Link to="/weddings">WEDDINGS</Header.Link>
                {/*<Header.Link to="/publications">PUBLICATIONS</Header.Link>*/}
                <Header.Link to="/about">ABOUT</Header.Link>
                <Header.Link to="/contact">CONTACT</Header.Link>
            </Header>
            <main className={styles.mainContent}>{children}</main>
        </React.Fragment>
    )
}
