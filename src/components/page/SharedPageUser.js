import React, { useState, useEffect } from 'react'
import {
    TextField,
    Button,
    ButtonGroup,
    CircularProgress,
    Grid,
    Checkbox,
    Avatar,
    Typography
} from '@material-ui/core';

function SharedPageUser(props) {
    const [editable, setEditable] = useState(props.editable)

    const [firstRender, setFirstRender] = useState(true)
    const [idTimeoutUpdate, setIdTimeoutUpdate] = useState(null)

    function updateSharedPage() {
        let sharedPage = {
            id: props.id,
            editable: editable
        }

        fetch(`https://api-links.montanari.live/sharedpages`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
            },
            body: JSON.stringify({ sharedPage: sharedPage })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.updated)
                    setIdTimeoutUpdate(null)
            })
    }

    useEffect(() => {
        if (firstRender)
            setFirstRender(false)
        else {
            clearTimeout(idTimeoutUpdate);
            setIdTimeoutUpdate(setTimeout(updateSharedPage, 2000))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editable])

    return (
        <Grid container spacing={2} style={{ marginBottom: '20px' }} align="center">
            <Grid item xs={1}>
                <Avatar alt="picturePath" src={props.picturePath} />
            </Grid>

            <Grid item xs={2}>
                <Typography variant="body1" gutterBottom>
                    {props.name}
                </Typography>
            </Grid>

            <Grid item xs={2}>
                <Typography variant="body1" gutterBottom>
                    {props.surname}
                </Typography>
            </Grid>

            <Grid item xs={5}>
                <Typography variant="body1" gutterBottom>
                    {props.email}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <Checkbox
                    checked={!!editable}
                    onChange={(e) => setEditable(e.target.checked)}
                />
            </Grid>

            <Grid item xs={1}>
                <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                //onClick={removeItem}
                >
                    <img src="/img/icons/trash.png" alt="trashIcon" width="25px" />
                </Button>
            </Grid>
        </Grid>
    )
}

export default SharedPageUser