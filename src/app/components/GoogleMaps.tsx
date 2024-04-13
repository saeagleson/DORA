'use client'
import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapIcon from './MapIcon'

const GoogleMaps = ({ missions }) => {

    console.log("in googleMaps")
    console.log(missions)
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'quartely' //quarterly?
            });

            const { Map } = await loader.importLibrary('maps');

            const locationInMap = {
                lat: 36.06929715362643,
                lng: -94.17600312141396,
            };

            const options: google.maps.MapOptions = {
                center: locationInMap,
                zoom: 15,
                mapId: 'NEXT_MAPS_TUTS',
            };

            const map = new Map(mapRef.current as HTMLDivElement, options);
            setMapInstance(map);
        };

        initializeMap();
    }, []);

    useEffect(() => {
        // Check if mapInstance exists and missions are available
        if (mapInstance && missions.length > 0) {
            // Iterate over missions array and create map icons
            missions.forEach((mission) => {
                const marker = new window.google.maps.Marker({
                    position: { lat: mission.location._lat, lng: mission.location._long }, // Use mission coordinates
                    map: mapInstance,
                    icon: '/mapIcon.svg'
                });

                marker.addListener('click', () => {
                    alert('Marker clicked for mission: ' + mission.action);
                });
            });
        }
    }, [mapInstance, missions]);

    return (
        <div className="h-[600px] w-[800px]" ref={mapRef}>
            Google Maps
        </div>
    );
};



export default GoogleMaps;