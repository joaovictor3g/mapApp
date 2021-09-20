import React, { useState } from 'react';
import MapView, { MarkerAnimated } from "react-native-maps";

const REGION = {
  latitude: -3.3484309,
  longitude: -39.1389627,
  latitudeDelta: 0,
  longitudeDelta: 0,
}

export function Map() {
  const [region, setRegion] = useState(REGION);

  return (
    <MapView 
      region={region}
      style={{
        flex: 1
      }}
      onRegionChange={(region) => setRegion(region)}
      zoomEnabled
      scrollDuringRotateOrZoomEnabled
    >
      <MarkerAnimated 
        coordinate={{ 
          latitude: -3.3484309,
          longitude: -39.1389627,
        }}
        onSelect={() => console.log('Lagoinha')}
      />
    </MapView>
  );
}