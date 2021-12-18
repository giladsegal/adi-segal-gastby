import React from 'react';
// import { AnimatePresence } from 'framer-motion';
import LastLocationProvider from './src/hooks/LastLocationProvider';

// let previousRouteState = null; // string | null

export const wrapPageElement = ({ element }) => {
  return (
    // <AnimatePresence exitBeforeEnter>
    <LastLocationProvider currentLocation={element.props.location.pathname}>
      {element}
    </LastLocationProvider>
    // </AnimatePresence>
  );
};

// // Logs when the client route changes
// export const onRouteUpdate = ({ location, prevLocation }) => {
//   // previousRouteState = prevLocation ? prevLocation.pathname : null;
//   // console.log('onRouteUpdate: ', { prevLocation, previousRouteState });
// };
