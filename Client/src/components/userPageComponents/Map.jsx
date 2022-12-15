import {useMemo, useCallback, useRef, useState, useEffect} from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';

// data grid columns header format
const columns = [
    {field: 'venueName', headerName: 'Venue', flex: .6, headerClassName: 'data-grid-header',},
    {field: 'eventNum', headerName: '# of Events',flex: .4, headerClassName: 'data-grid-header',},
]

export default function Map(){
    const [venue, setVenue] = useState('');
    // Google Map variable initialization
    const mapRef = useRef();
    const [center, setCenter] = useState({lat: 22.4196299, lng: 114.2045719});
    const options = useMemo(()=>({
        disableDefaultUI: true,
    }),[]);
    const onLoad = useCallback((map) => (mapRef.current = map),[]);

    const handleFetchData = async () => {
        await fetch('http://localhost:4000/user/api/venue')
            .then((data) => data.json())
            .then((data) => {
                // count # of event for venues
                data.forEach(item => {
                    fetch('http://localhost:4000/user/api/event/query/' + item.venueID)
                        .then((data) => data.json())
                        .then((data) => {item.eventNum = data.length})
                })
                setVenue(data)
                setCenter({lat: data[0].latitude, lng: data[0].longitude})
            })
    }

    const venueIDStore = (v) =>{
        window.sessionStorage.setItem("venueObj",JSON.stringify(v));
    }
    // fetch venueInfo
    useEffect(() => { handleFetchData() },[])


    //const [message, setMessage] = useState('');

    // onClick event on data grid row item
    const handleRowClick = (params) => {
        setCenter({lat: params.row.latitude, lng: params.row.longitude})
    };

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: "85vh",
                }}>
                    <DataGrid
                        rows={venue}
                        getRowId={(row) => row.venueID}
                        disableSelectionOnClick
                        onRowClick={handleRowClick}
                        columns={columns}
                        rowsPerPageOptions={[]}
                        initialState={{sorting: {sortModel: [{field: 'venueID',sort: 'asc',},],},}}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: "85vh",}}>
                    <GoogleMap
                        zoom={17}
                        center={center}
                        mapContainerClassName="map-container"
                        options={options}
                        onLoad={onLoad}>
                        {Object.keys(venue).map((key, index) =>
                            <MarkerF key={venue[key].venueID} onClick={venueIDStore(venue[key])} position={{lat: venue[key].latitude, lng: venue[key].longitude}}/>
                        )}
                    </GoogleMap>
                </Paper>
            </Grid>
        </Grid>
    )
}