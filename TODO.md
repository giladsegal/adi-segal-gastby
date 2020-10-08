# Infra

-   Links with animations (`transition-links` branch OR https://medium.com/free-code-camp/how-to-animate-page-transitions-in-gatsby-js-b36e3ae14c29)
-   automatic lint
-   update title on navigation\*
-   SEO (gatsby-plugin-sitemap)
-   SEO component

# Before going live

-   scrap fonts as part of the build using `npm run preload:fonts`
-   facebook:
    -- ask Adi for a picture for sharing weddings subdomain
    -- make sure share is working as expected: https://developers.facebook.com/tools/debug/?q=adi-segal.com
    -- make sure share is working as expected: https://developers.facebook.com/tools/debug/?q=weddings.adi-segal.com
-   Upload all data to contentful using a script (https://www.contentful.com/developers/docs/references/content-management-api/#/reference/assets/asset)
-   AWS automatic deploy (weddings + documentaries)
-   trigger AWS deploy from contentful publish
-   make sure adi's account in contentful, can only add/edit specific content types

# Bugs

-   `react-helmet` doesn't work in SSR
-   load facebook SDK only for contact page?
-   a11y

# Product

-   Layout component
    -   render header component
    -   render main node
    -   render children
-   Header component\*
    -   links: home / documentaries / publications / about / contact
    -   mobile hamburger
    -   mobile menu
    -   close menu upon navigation
    -   highlight selected page
-   Logo component\*
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
    -   last row - not 4 pics
-   About page
    -   description (rich text?), picture, Exhibitions (?)
    -   different about for documentaries / weddings
-   Contact page\*
    -   add links to fields
    -   email, mobile, location, picture
    -   facebook sdk
    -   make sure facebook is loaded on navigation
-   Home (Default category)
    -   should receive data from server about type
    -   random order
    -   support first category
