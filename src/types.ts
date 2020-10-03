export type SiteQuery = {
  site: Site
}

export type Site = {
  siteMetadata: SiteMetadata
}

export type SiteMetadata = {
  title: string
  facebookMetadata: {
    url: string
    type: string
    title: string
    image: {
      uri: string
      width: string
      height: string
    }
    description: string
  }
}
