import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapWithLocations = () => {
  const locations = [
    { lat: 40.7128, lng: -74.0060, name: 'New York' },
    { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
    { lat: 51.5074, lng: -0.1278, name: 'London' },
    // Add more locations as needed
  ];

  const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default center for the map

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={defaultCenter}
        zoom={8}
        mapTypeId={'satellite'}
      >
        {/* Loop through locations and add markers to the map */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithLocations;
