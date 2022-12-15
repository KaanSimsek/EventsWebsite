import {useMemo, useState, useEffect} from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import EventInfo from "./InfoCards";

function LocationPage() {
        const [ events, setEvents ] = useState('')
        const [ comment, setComment ] = useState('')

        const center = useMemo(() => ({lat: 22.4196299, lng: 114.2045719}), []);

        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:4000/user/api/event/')
                const events = await response.json()
                setEvents(events)
                console.log(events)
            } catch(error) {
                console.log(error)
            }
        }
        useEffect(()=>{
            fetchEvents()
        }, [])

        const fetchComment = async () => {
            try {
                const response = await fetch('http://localhost:4000/user/api/comments')
                const comments = await response.json()
                setComment(comments)
                console.log(comments)
            } catch(error) {
                console.log(error)
            }
        }
        useEffect(()=>{
            fetchComment()
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
                    mapContainerClassName="map-container">

                    <MarkerF position={{lat: 22.4196299, lng: 114.2045719}}/>
                </GoogleMap>
            </Paper>

            <EventInfo events={events} comments={comment} />

            </>
        )
}

export default LocationPage;