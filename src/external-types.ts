declare module "*.scss" {
    const content: Record<string, string>
    export default content
}

declare module "gatsby-plugin-transition-link/AniLink" {
    import React from "react"
    import { GatsbyLinkProps } from "gatsby"

    type AniLinkCommonProps = GatsbyLinkProps<any> & {
        to?: string
        duration?: number
        direction?: AniLinkDirection
    }

    type AniLinkDirection = "up" | "right" | "down" | "up"

    type AniLinkFadeProps = AniLinkCommonProps & {
        fade: true
    }

    type AniLinkPaintDripProps = AniLinkCommonProps & {
        paintDrip: true
        color?: string
        hex?: string
    }

    type AniLinkSwipeProps = AniLinkCommonProps & {
        swipe: true
        top?: "exit" | "entry"
        entryOffset?: number
    }

    type AniLinkCoverProps = AniLinkCommonProps & {
        cover: true
        bg?: string
    }

    type AniLinkProps =
        | AniLinkFadeProps
        | AniLinkPaintDripProps
        | AniLinkSwipeProps
        | AniLinkCoverProps

    const AniLink: React.SFC<AniLinkProps>
    export default AniLink
}
