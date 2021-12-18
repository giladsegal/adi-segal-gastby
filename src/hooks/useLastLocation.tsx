import React from 'react';
import { LastLocationContext } from './LastLocationProvider';

export default function useLastLocation() {
  return React.useContext(LastLocationContext);
}
