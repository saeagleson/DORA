'use client'
import React, { useEffect} from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMaps = () => {
    
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async() => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'quartely' //quarterly?
            });

            const { Map } = await loader.importLibrary('maps');

            const locationInMap={
                lat: 36.06929715362643,
                lng: -94.17600312141396,
            };

            // MARKER
            36.06929715362643, -94.17600312141396

            const options: google.maps.MapOptions = {
                center: locationInMap,
                zoom: 15,
                mapId: 'NEXT_MAPS_TUTS',
            };

            const map = new Map(mapRef.current as HTMLDivElement, options);
        };

        initializeMap();
    }, []);
    
    return(
        <div className="h-[600px] w-[800px]" ref={mapRef}>
            Google Maps
        </div>
    )
}

export default GoogleMaps;