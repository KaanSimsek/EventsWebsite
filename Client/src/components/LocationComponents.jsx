import {useMemo, useState, useEffect} from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AvTimerIcon from '@mui/icons-material/AvTimer';

export default function LocationPage(props) {

        const center = useMemo(() => ({lat: 22.4196299, lng: 114.2045719}), []);
        // const onLoad = useCallback((map) => (mapRef.current = map),[]);
        const {isLoaded} = useLoadScript({
            googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        });
        if (!isLoaded) return <div>Loading...</div>;

        // fetch venue information
        // useEffect(() => {
        //     fetch('http://localhost:4000/user/api/venue')
        //         .then((data) => data.json())
        // }, [])


        return (
            <>
            <Paper sx={{
                display: 'flex',
                flexDirection: 'column',
                height: "85vh",}}>
                <GoogleMap
                    zoom={17}
                    center={center}
                    mapContainerClassName="map-container">

                    <Marker position={{lat: 22.4196299, lng: 114.2045719}}/>
                </GoogleMap>
            </Paper>
            
            <Typography variant="h1" display="block" gutterBottom>
                Event Information
                <EventAvailableIcon fontSize="large"/>
            </Typography>
            <h2>Event:</h2>
            <h3>Date: </h3>
            <h3>Time <AvTimerIcon fontSize="large"/>: </h3>
            <h4>Description: </h4>
            <h4>Presenter: </h4>
            <h4>Price: </h4>
            <Typography variant="h4" display="block" gutterBottom style={{textAlign: 'Left'}}>
                Comment Session
            </Typography>
            </>
        )
}