import {useMemo, useState, useEffect} from "react";
import { useParams, useLocation } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Paper, Box, Card, CardContent, Typography } from '@mui/material';
import Event from './InfoCard'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const mdTheme = createTheme();

function LocationPage() {
        const { id } = useParams()
        const [ events, setEvents ] = useState([])
        const [ center, setCenter ] = useState('')
        const [ venue, setVenue ] = useState('')
        const [ comment, setComment] = useState('')
        const options = useMemo(()=>({
            disableDefaultUI: true,
        }),[]);

        const handleFetchData = () => {
            fetch(`http://localhost:4000/user/api/venue/${id}`)
                .then((data) => data.json())
                .then((data) => {
                    setCenter({lat: data.latitude, lng: data.longitude})
                    setVenue(data)
                })
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

        const handleAddFav = (e) =>{
            e.preventDefault()
            console.log(venue.venueID)
            const username = window.sessionStorage.getItem("username")
            fetch('http://localhost:4000/favLoc/api',{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username: username,
                location:venue.venueID,
            }),
            })
        }

        return (
            <ThemeProvider theme={mdTheme}>
                <CssBaseline />
                <AppBar position="absolute">
                    <Toolbar sx={{pr: '24px',}}>
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 , display: 'flex'}}
                        >
                            {venue.venueName}
                        </Typography>
                        <Button size="large"
                                aria-label="AddFavourite"
                                onClick={handleAddFav}
                                sx={{background:"white",
                                    ':hover': {
                                        bgcolor: '#bdbdbd',
                                        color: 'white',
                                    },}}>
                            <Typography
                                variant="h5"
                                noWrap
                                sx={{ flexGrow: 1, mr: 1}}
                            >
                                Add Favourite Location
                            </Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
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
            </ThemeProvider>
        )
}

export default LocationPage;