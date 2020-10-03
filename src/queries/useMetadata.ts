import { graphql, useStaticQuery } from "gatsby"
import { SiteQuery } from "../types"

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
export const useMetadata = () => useStaticQuery<SiteQuery>(metadataQuery)
