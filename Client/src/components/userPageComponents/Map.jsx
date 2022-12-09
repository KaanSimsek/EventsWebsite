import {useMemo, useCallback, useRef, useState, useEffect} from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Alert from '@mui/material/Alert'
import axios from 'axios'

const columns = [
    {field: 'venueName', headerName: 'Venue', flex: 1, minWidth: 150},
    {field: 'venueID', headerName: 'ID'},
]

export default function Map(){
    const [venue, setVenue] = useState('');
    useEffect(() => {
        fetch('http://localhost:4000/user/api/venue')
            .then((data) => data.json())
            .then((data) => setVenue(data))
    },[])

    const mapRef = useRef();
    const [center, setCenter] = useState({lat: 22.4196299, lng: 114.2045719});
    const options = useMemo(()=>({
        disableDefaultUI: true,
    }),[]);
    const onLoad = useCallback((map) => (mapRef.current = map),[]);

    const [message, setMessage] = useState('');

    const { data } = useDemoData({
        dataSet: 'Employee',
        rowLength: 100,
        editable: true,
        visibleFields: ['name', 'dateCreated']
    });

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
                        initialState={{sorting: {sortModel: [{field: 'name',sort: 'desc',},],},}}
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
                        <MarkerF position={center}/>
                    </GoogleMap>
                </Paper>
            </Grid>
        </Grid>
    )
}