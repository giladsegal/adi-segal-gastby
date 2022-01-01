# Bugs

- gallery image min-height - arrows appear ontop before image loads (take height from graphql)

# Product

- Gallery component
  - next/prev/play - should trigger loader, and transition only when loaded

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
