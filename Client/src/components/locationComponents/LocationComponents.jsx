import {useMemo, useState, useEffect} from "react";
import { useParams, useLocation } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { Paper, Box, Card, CardContent, Typography, CssBaseline, Toolbar, Container, AppBar , Grid , Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import Event from './InfoCard'
import Comment from './CommentCard'
import CommentForm from './CommentForm'

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

            fetch(`http://localhost:4000/comment/api/comments/${id}`)
                .then((data) => data.json())
                .then((data) => setComment(data))
                .catch((err) => {console.log(err)})
        }

        useEffect(()=>{
            handleFetchData()
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
                        <Stack direction="row" spacing={2}>
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
                        <Button size="large"
                                aria-label="Back"
                                href="/user-page"
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
                                Back
                            </Typography>
                        </Button>
                    </Stack>
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

                <div className='title'>
                        <h1>Comments</h1>
                    <div className='underline'></div>
                </div>

                <div className='comment-div'>
                    {Object.keys(comment).map((key, index) => <Comment comment={comment[index]}/>)}
                </div>

                <div className='title'>
                        <h1>Post Your Comment</h1>
                    <div className='underline'></div>
                </div>

                <CommentForm venueID={venue.venueID}/>

            </ThemeProvider>
        )
}

export default LocationPage;