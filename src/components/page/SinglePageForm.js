import React, { useState, useEffect } from 'react'
import {
    TableRow,
    TableCell,
    TextField,
    Button,
    ButtonGroup,
    CircularProgress,
    Grid
} from '@material-ui/core';

function SinglePageForm(props) {
    const [title, setTitle] = useState(props.title || "")
    const [description, setDescription] = useState(props.description || "")

    const [firstRender, setFirstRender] = useState(true)
    const [idTimeoutUpdate, setIdTimeoutUpdate] = useState(null)

    function updatePage() {
        let page = {
            id: props.id,
            title: title,
            description: description
        }

        fetch(`https://api-links.montanari.live/pages`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
            },
            body: JSON.stringify({ page: page })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.update)
                    setIdTimeoutUpdate(null)
            })
    }

    function removePage() {
        fetch(`https://api-links.montanari.live/pages/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                if (result.deleted)
                    props.removePageFromList()
            })
    }

    useEffect(() => {
        if (firstRender)
            setFirstRender(false)
        else {
            clearTimeout(idTimeoutUpdate);
            setIdTimeoutUpdate(setTimeout(updatePage, 3000))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description])

    return (
        <Grid container spacing={2} style={{marginBottom: '20px'}}>
            {/* Colonna 1*/}
            <Grid item xs={2} md={1}>
                {!!idTimeoutUpdate && <CircularProgress size="30px" />}
            </Grid>

            {/* Colonna 2*/}
            <Grid item xs={5} md={4}>
                <TextField
                    fullWidth
                    label="Titolo"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>

            {/* Colonna 3*/}
            <Grid item xs={5} md={4}>
                <TextField
                    fullWidth
                    label="Descrizione"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Grid>

            {/* Colonna 4*/}
            <Grid item xs={12} md={3} style={{ paddingTop: "17px"}} >
                <ButtonGroup
                    color="primary"
                    aria-label="contained primary button group"
                    fullWidth
                >
                    <Button
                        variant="contained"
                        href={"/modify/page/" + props.id}
                    >
                        <img src="/img/icons/modify.png" alt="modifyIcon" width="25px" />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigator.clipboard.writeText("https://links.montanari.live/page/" + props.id)
                            props.openSnackbar()
                        }}
                    >
                        <img src="/img/icons/copy.png" alt="modifyIcon" width="25px" />
                    </Button>
                    <Button
                        variant="contained"
                        href={"/page/" + props.id}
                    >
                        <img src="/img/icons/linkEsterno.png" alt="linkEsterno" width="25px" />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={removePage}
                    >
                        <img src="/img/icons/trash.png" alt="trashIcon" width="25px" />
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default SinglePageForm