import React from "react"
import { Helmet } from "react-helmet"
import { useMetadata } from "../../queries/useMetadata"

export type LayoutProps = {
  children?: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { title, facebookMetadata } = useMetadata()

  return (
    <React.Fragment>
      <Helmet
        title={""}
        titleTemplate={`${title} · %s`}
        meta={[
          { property: "og:url", content: facebookMetadata.url },
          { property: "og:type", content: facebookMetadata.type },
          { property: "og:title", content: facebookMetadata.title },
          { property: "og:image", content: facebookMetadata.image.uri },
          {
            property: "og:image::width",
            content: facebookMetadata.image.width,
          },
          {
            property: "og:image:height",
            content: facebookMetadata.image.height,
          },
          { property: "og:description", content: facebookMetadata.description },
        ]}
      />
      <div>{children}</div>
    </React.Fragment>
  )
}
