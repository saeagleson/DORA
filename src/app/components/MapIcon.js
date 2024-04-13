import React, { useEffect } from 'react';

function MapIcon({ map }) {
  useEffect(() => {
    if (!map) return;

    const iconLocation = { lat: 36.06929715362643, lng: -94.17600312141396 };

    const marker = new window.google.maps.Marker({
      position: iconLocation,
      map: map,
      icon: '/mapIcon.svg'
    });

    marker.addListener('click', () => {
      alert('Marker clicked!');
    });
  }, [map]);

  return null; // MapIcon doesn't render anything directly
}

export default MapIcon;