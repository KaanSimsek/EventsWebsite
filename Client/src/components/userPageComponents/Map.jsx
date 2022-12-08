import { useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

export default function Map(){
    const mapRef = useRef();
    const center = useMemo(()=>({lat: 22.501639, lng: 114.128911}), []);
    const options = useMemo(()=>({
        disableDefaultUI: true,
    }),[]);
    const onLoad = useCallback((map) => (mapRef.current = map),[]);

    return(
        <GoogleMap
            zoom={20}
            center={center}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}>
            <Marker position={center}/>
        </GoogleMap>
    )
}