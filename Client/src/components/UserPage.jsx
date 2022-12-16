import { useLoadScript } from '@react-google-maps/api';
import { Link } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Map from './userPageComponents/Map';
import FavLocations from './userPageComponents/FavLocations';

const mdTheme = createTheme();

export default function UserPage() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });
    if (!isLoaded) return <div>Loading...</div>;

    const handleLogout = () => {
        window.sessionStorage.setItem("auth", null);
        window.location.href = "/";
    }

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
                            sx={{ flexGrow: 1 , display: 'flex'}}
                        >
                            Hi, {window.sessionStorage.getItem("username")}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Link to='/fav-loc'>
                                <Button size="large" aria-label="fav locations" sx={{background:"white",
                                ':hover': {
                                    bgcolor: '#bdbdbd',
                                    color: 'white',
                                },}}>
                                    <Typography
                                        variant="h5"
                                        noWrap
                                        sx={{ flexGrow: 1, mr: 1}}
                                    >
                                        Fav Locations
                                    </Typography>
                                </Button>
                            </Link>
                            <Button size="large" aria-label="Logout" onClick={handleLogout}
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
                                    Logout
                                </Typography>
                                <LogoutIcon />
                            </Button>
                        </Stack>

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
                        <Map />
                    </Container>

                    <Toolbar />
                </Box>

            </Box>
        </ThemeProvider>
    );
}