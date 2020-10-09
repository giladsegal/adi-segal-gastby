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
            />,
        ])
    }

    setPreBodyComponents([
        <div id="fb-root" key="fb-root"></div>,
        <script
            key="facebook-connect-sdk"
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js"
            nonce="0NMFsjUW"
        ></script>,
    ])
}
