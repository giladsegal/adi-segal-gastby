# Infra

-   Redirect to root from unknown routes (404.tsx in src/pages)
-   Links with animations
-   Upload all data to contentful using a script (https://www.contentful.com/developers/docs/references/content-management-api/#/reference/assets/asset)
-   Two web sites configuration and deploy
-   AWS automatic deploy
-   trigger AWS deploy from contentful publish
-   favico
-   create font file for header
-   serve global fonts (header + general)
-   automatic lint
-   icons
-   global styles?
-   facebook meta tags (weddings / documentaries) - maybe different siteMetadata?
-   update title on navigation
-   all <head/> tags
-   SEO (sitemap)

# Bugs

-   `react-helmet` doesn't work in SSR
-   Use `gatsby-image` along site contentful rich text for about page, see this [issue](https://github.com/contentful/rich-text/issues/70) in git
-   Maybe use https://www.gatsbyjs.com/plugins/@contentful/gatsby-transformer-contentful-richtext/ and put `display: inline` for `img` instead of `@contentful/rich-text-react-renderer`

# Product

-   Layout component
    -   render header component
    -   render main node
    -   render children
-   Header component
    -   links: home / documentaries / publications / about / contant
    -   mobile hamburger
    -   mobile menu
    -   highlight selected page
-   Logo component
-   Loader component
-   Modal component
    -   click outside for desktop
    -   mobile full page layout
    -   close button
    -   pause slideshow
-   Gallery component
    -   play/pause
    -   next prev arrows
    -   debouncing
    -   animation
    -   link to thumbnails
    -   use modal for topic description
    -   update history on modal navigation
    -   swipe using hammerJS
    -   cache busting?
    -   display loader when loading images
-   Topics page
    -   display images
    -   description on hover
    -   link
    -   mobile static description
-   Thumbnails page
    -   display all images
    -   links with query params
    -   responsiveness (ratio?)
-   About page
    -   description (rich text?), picture, Exhibitions (?)
    -   different about for documentaries / weddings
-   Contact page
    -   email, mobile, location, picture, facebook sdk
-   Home (Default category)
    -   random order
    -   support first category
