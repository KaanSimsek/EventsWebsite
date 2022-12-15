import {useMemo, useCallback, useRef, useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { DataGrid } from '@mui/x-data-grid';

function FavLocations() {
    const [favLocations, setFavLocations] = useState('');
    const columns = [
        {field: 'loc_name', headerName: 'Venue Name', flex: .6, headerClassName: 'data-grid-header',},
        {field: 'loc_id', headerName: 'Venue Id', flex: .6, headerClassName: 'data-grid-header',},
    ]
    const handleFetchData= async()=>{
        const userName = window.sessionStorage.getItem("username")
        await fetch('http://localhost:4000/favLoc/'+userName,{
            method: "GET",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            params: JSON.stringify({
                userName,
            }),})
            .then((data) => data.json())
            .then((data) => {
                setFavLocations(data.favLocations)
            })
    }
    useEffect(() => { handleFetchData() },[])
    return (
        <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: "85vh",
                }}>
                    <DataGrid
                        rows={favLocations}
                        getRowId={(row) => row.loc_id}
                        disableSelectionOnClick
                        columns={columns}
                        rowsPerPageOptions={[]}
                        
                    />
                </Paper>
            </Grid>
  )
}

export default FavLocations
