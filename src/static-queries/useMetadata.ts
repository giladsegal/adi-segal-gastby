import { graphql, useStaticQuery } from "gatsby"
import { Site } from "../types"

export type SiteQuery = {
  site: Site
}

const metadataQuery = graphql`
  query metadataQuery {
    site {
      siteMetadata {
        title
        facebookMetadata {
          url
          type
          title
          description
          image {
            uri
            width
            height
          }
        }
      }
    }
  }
`
export const useMetadata = () => {
  return useStaticQuery<SiteQuery>(metadataQuery).site.siteMetadata
}
