import { useLoadScript } from '@react-google-maps/api'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Map from './userPageComponents/Map'
import EventList from './userPageComponents/EventList'

const mdTheme = createTheme();

export default function UserPage() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });
    if (!isLoaded) return <div>Loading...</div>;

    return (
    <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar position="absolute">
                <Toolbar sx={{pr: '24px',}}>
                    <Typography
                        component="h1"
                        variant="h3"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Map
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xlg" sx={{ mt: 4, mb: 4}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: "85vh",
                            }}>
                                <EventList/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: "85vh",}}>
                                <Map />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    </ThemeProvider>
    );
}
