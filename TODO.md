# Infra

- investigate `gatsby-default-starter` layout.scss

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

- mobile menu doesn't have close animation on navigation
- preserve image aspect ratio (+captions)
- refactor menu mobile to use CSSTransition
- font scraping should be done for both website types
- refactor facebook hook to use context

# Product

- desktop layout
- Gallery component
  - reexport gallery component and consume in home page (hide controls)
  - deep link to a picture using query param
  - use modal for topic description
  - update history on modal navigation
  - cache busting?
  - pause gallery when mobile menu is opened
  - next/prev - should trigger loader, and transition only when loaded
- a11y
- instagram

# DONE:

- Home (Default category)
  - should receive data from server about type (category type in contentful support)
  - random order
  - support first category
- Gallery component
  - description per photo
  - play/pause
  - next prev arrows
  - debouncing
  - animation
  - link to thumbnails
  - swipe using hammerJS
  - display loader when loading images
  - animation - show only two last photos
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
