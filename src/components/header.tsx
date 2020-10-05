import React from "react"
import styles from "./header.module.scss"
import { Link } from "gatsby"

export type HeaderProps = {
    children: React.ReactNode
}

export type HeaderLinkProps = {
    to: string
    children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
    return (
        <header className={styles.root}>
            <nav>
                <Link to="/">ADI SEGAL PHOTOGRAPHY</Link>
                <ul className={styles.linksList}>
                    {React.Children.map(children, child => {
                        if (!React.isValidElement<HeaderLinkProps>(child)) {
                            return null
                        }

                        return <li>{child}</li>
                    })}
                </ul>
            </nav>
        </header>
    )
}

Header.Link = ({ to, children }: HeaderLinkProps) => {
    return <Link to={to}>{children}</Link>
}

export default Header
