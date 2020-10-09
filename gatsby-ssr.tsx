import React from "react"
import { RenderBodyArgs } from "gatsby"

export const onRenderBody = ({
    setPreBodyComponents,
    setHeadComponents,
}: RenderBodyArgs) => {
    if (process.env.GATSBY_DEPLOY_PREVIEW === "true") {
        setHeadComponents([
            <meta
                name="robots"
                content="noindex, nofollow, noimageindex, noarchive"
                key="meta-robots"
            />,
        ])
    }

    setPreBodyComponents([<div id="fb-root" key="fb-root"></div>])
}
