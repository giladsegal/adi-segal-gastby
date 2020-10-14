# Infra

- Links with animations (`transition-links` branch OR https://medium.com/free-code-camp/how-to-animate-page-transitions-in-gatsby-js-b36e3ae14c29)
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
- refactor menu mobile to use CSSTransition
- font scraping should be done for both website types
- refactor facebook hook to use context

# Product

- desktop layout
- Modal component
  - click outside for desktop
  - mobile full page layout
  - close button
  - pause slideshow
- Gallery component
  - play/pause
  - next prev arrows
  - debouncing
  - animation
  - link to thumbnails
  - use modal for topic description
  - update history on modal navigation
  - swipe using hammerJS
  - cache busting?
  - display loader when loading images
  - pause gallery when mobile menu is opened
- Home (Default category)
  - should receive data from server about type
  - random order
  - support first category
- a11y

# DONE:

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
