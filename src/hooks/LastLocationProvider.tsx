import React from 'react';
import usePrevious from './usePrevious';

export const LastLocationContext = React.createContext<string | null>(null);

export type LastLocationProviderProps = {
  currentLocation: string;
};

const LastLocationProvider: React.FC<LastLocationProviderProps> = function LastLocationProvider({
  children,
  currentLocation,
}) {
  const previousLocation = usePrevious(currentLocation, null);

  return (
    <LastLocationContext.Provider value={previousLocation}>
      {children}
    </LastLocationContext.Provider>
  );
};

export default LastLocationProvider;
