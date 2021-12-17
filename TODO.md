# Infra

- refactor facebook hook to use context
- investigate `gatsby-default-starter` layout.scss
- cache busting for gallery?

# Before going live

- scrap fonts as part of the deploy using `npm run preload:fonts`
- facebook:
  -- ask Adi for a picture for sharing weddings subdomain
  -- make sure share is working as expected: https://developers.facebook.com/tools/debug/?q=https://adi-segal.com
  -- make sure share is working as expected: https://developers.facebook.com/tools/debug/?q=https://weddings.adi-segal.com
  -- missing appId

- AWS deploy command using `gatsby-plugin-s3` (weddings + documentaries)
- make sure adi's account in contentful, can only add/edit specific content types
- e2e tests before deployment

# Bugs

- mobile menu doesn't have close animation on navigation (consider https://janessagarrow.com/blog/gatsby-framer-motion-page-transitions/ or react-transition-group)
- mobile menu should close when clicked outside
- font scraping should be done for both website types

# Product

- Gallery component
  - next/prev/play - should trigger loader, and transition only when loaded
- a11y
- instagram

# DONE:

- Home (Default category)
  - should receive data from server about type (category type in contentful support)
  - random order
  - support first category
- Gallery component
- - Gallery click should play/pause on img click
  - description per photo
  - play/pause
  - next prev arrows
  - debouncing
  - animation
  - link to thumbnails
  - swipe using hammerJS
  - display loader when loading images
  - animation - show only two last photos
  - deep link to a picture using query param
  - reexport gallery component and consume in home page (hide controls)
- Layout component
  - render header component
  - render main node
  - render children
- Logo component
- Topics page
  - display images
  - description on hover
  - link
  - mobile static description
- Thumbnails page
  - display all images
  - links with query params
  - responsiveness (ratio?)
  - last row - not 4 pics
- About page
  - description (rich text?), picture, Exhibitions (?)
  - different about for documentaries / weddings
- Contact page
  - add links to fields
  - email, mobile, location, picture
  - facebook sdk
  - make sure facebook is loaded on navigation
- Loader component
- Header component\*
  - links: home / documentaries / publications / about / contact
  - mobile hamburger
  - mobile menu
  - close menu upon navigation
  - highlight selected page
- Desktop layout
