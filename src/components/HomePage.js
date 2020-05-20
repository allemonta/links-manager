import React, { useState, useEffect } from 'react'
import {
    LinearProgress,
    Typography,
    Container,
    Button,
    Snackbar,
    IconButton,
    Grid
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import SinglePageForm from './page/SinglePageForm'

function HomePage() {

    const [open, setOpen] = React.useState(false);
    const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);
    const [isUserPagesLoaded, setIsUserPagesLoaded] = useState(false);
    const [user, setUser] = useState({});
    const [pages, setPages] = useState([]);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function getGoogleInfo() {
        fetch(`https://api-links.montanari.live/google/user`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.jwtToken
            }
        })
            .then(res => res.json())
            .then((result) => {
                if (result.isAuthenticated) {
                    setUser(result.user)
                    setIsUserInfoLoaded(true)
                } else
                    sessionStorage.setItem('jwtToken', undefined)
            })
    }

    function getUserPages() {
        fetch(`https://api-links.montanari.live/pages`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.jwtToken
            }
        })
            .then(res => res.json())
            .then((result) => {
                setPages(result.pages || [])
                setIsUserPagesLoaded(true)
            })
    }

    function addNewPage() {
        let newPage = {
            title: "NEW_PAGE" + Math.floor(Math.random() * 100),
            description: "",
            private: false
        }

        fetch(`https://api-links.montanari.live/pages`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: newPage })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.page)
                    setPages(pages.concat(result.page))
            })
    }

    function removePageFromList(id) {
        console.log(id)
        setPages(pages.filter(e => e.id !== id))
    }

    useEffect(() => {
        getGoogleInfo()
        getUserPages()
    }, [])

    return (
        <Container>
            {!isUserInfoLoaded ? (
                <LinearProgress />
            ) : (
                    <Container>
                        <Typography variant="h2">
                            Dati utente
                        </Typography>

                        <Grid container>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3} style={{ textAlign: 'center', height: 'inherit' }}>
                                <img src={user.picturePath} height="100px" alt="userPicture" />
                            </Grid>
                            <Grid item xs={3} style={{ height: 'inherit' }}>
                                Nome: {user.name}
                                <br />
                                Cognome: {user.surname}
                                <br />
                                Email: {user.email}
                                <br />
                                Id:  {user.id}
                            </Grid>
                            <Grid item xs={3}></Grid>
                        </Grid>

                    </Container>
                )}

            {!isUserPagesLoaded ? (
                <LinearProgress />
            ) : (
                    <Container>
                        <Typography variant="h2"> Pagine create </Typography>
                        <br />
                        <br />
                        <Grid container spacing={2}>
                            {pages.map((e, index) => (
                                <SinglePageForm
                                    key={index}
                                    removePageFromList={() => removePageFromList(e.id)}
                                    openSnackbar={() => setOpen(true)}
                                    {...e}
                                    summaryButtons={true}
                                />
                            ))}
                        </Grid>

                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                            onClick={addNewPage}
                        >
                            AGGIUNGI PAGINA
                        </Button>

                    </Container>
                )
            }

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="Link copiato nelle note"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Container>
    )
}


export default HomePage
