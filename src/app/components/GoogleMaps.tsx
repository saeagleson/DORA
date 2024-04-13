'use client'
import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapIcon from './MapIcon'

interface Props {
    missions: any
}



const GoogleMaps: React.FC<Props> = ({ missions }) => {

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if ("geolocation" in navigator) {
            // Prompt user for permission to access their location
            navigator.geolocation.getCurrentPosition(
                // Success callback function
                (position) => {
                    // Get the user's latitude and longitude coordinates
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    // Do something with the location data, e.g. display on a map
                    console.log(`Latitude: ${lat}, longitude: ${lng}`);

                    // Initialize the map with user's location
                    const initializeMap = async () => {
                        const loader = new Loader({
                            apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                            version: 'quartely' //quarterly?
                        });

                        const { Map } = await loader.importLibrary('maps');

                        const locationInMap = {
                            lat: lat,
                            lng: lng,
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
                },
                // Error callback function
                (error) => {
                    // Handle errors, e.g. user denied location sharing permissions
                    console.error("Error getting user location:", error);
                }
            );
        } else {
            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

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
            missions.forEach((mission:any) => {
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