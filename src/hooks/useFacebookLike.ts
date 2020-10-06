import React from "react"

export type FacebookSdk = {
    init: (options: any) => void
    XFBML: {
        parse: (node?: HTMLElement) => void
    }
}

interface WindowWithFacebookSdk extends Window {
    fbAsyncInit: () => void
    FB?: FacebookSdk
    __fbLoadPromise__?: Promise<FacebookSdk>
    __fbInit__?: boolean
}

declare let window: WindowWithFacebookSdk

export default function useFacebookLike() {
    const ref = React.useCallback((node?: HTMLDivElement | null) => {
        if (!node) {
            return
        }

        window.__fbLoadPromise__ =
            window.__fbLoadPromise__ ??
            new Promise(resolve => {
                if (window.FB) {
                    resolve(window.FB)
                } else {
                    window.fbAsyncInit = () => {
                        resolve(window.FB)
                    }
                }
            })

        window.__fbLoadPromise__.then(sdk => {
            if (!window.__fbInit__) {
                window.__fbInit__ = true
                sdk.init({
                    xfbml: true,
                    version: "v8.0",
                })
            }

            sdk.XFBML.parse(node)
        })
    }, [])

    return ref
}
