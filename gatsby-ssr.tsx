import React from "react"
import { RenderBodyArgs } from "gatsby"

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
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
