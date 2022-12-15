import {useMemo, useState, useEffect} from "react";
import { useParams, useLocation } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Paper, Box, Card, CardContent, Typography } from '@mui/material';
import Event from './InfoCard'

function LocationPage() {
        const { id } = useParams()
        const [ events, setEvents ] = useState([])
        const [ center, setCenter ] = useState('')
        const options = useMemo(()=>({
            disableDefaultUI: true,
        }),[]);

        const handleFetchData = () => {
            fetch('http://localhost:4000/user/api/venue')
                .then((data) => data.json())
                .then((data) => setCenter({lat: data[0].latitude, lng: data[0].longitude}))
                .catch((err) => {console.log(err)})

            fetch(`http://localhost:4000/user/api/event/query/${id}`)
                .then((data) => data.json())
                .then((data) => setEvents(data))
                .catch((err) => {console.log(err)})
            // await fetch('http://localhost:4000/user/api/event/')
            // .then((data) => data.json())
            // .then((data) => {
            //     setEvents(data)
            //     console.log(events)
            // })
        }

        useEffect(()=>{
            handleFetchData()
        }, [])

        // const onLoad = useCallback((map) => (mapRef.current = map),[]);
        const {isLoaded} = useLoadScript({
            googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        });
        if (!isLoaded) return <div>Loading...</div>;

        return (
            <>
                <Paper sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: "85vh",}}>
                    <GoogleMap
                        zoom={17}
                        center={center}
                        mapContainerClassName="map-container"
                        options={options}>
                        <MarkerF position={center}/>
                    </GoogleMap>
                </Paper>

                <div className='title'>
                    <h1>Event Information</h1>
                    <div className='underline'></div>
                </div>

                <div className='event-div'>
                    {Object.keys(events).map((key, index) => <Event event={events[key]}/>)}
                </div>

                <Typography variant="h1" display="block" gutterBottom>
                    Comment Session
                </Typography>
            </>
        )
}

export default LocationPage;