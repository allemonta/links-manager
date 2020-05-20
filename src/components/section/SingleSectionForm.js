import React, { useState, useEffect } from 'react'
import {
    TextField,
    Button,
    ButtonGroup,
    CircularProgress,
    Checkbox,
    Grid
} from '@material-ui/core';

function SinglePageForm(props) {
    const [title, setTitle] = useState(props.title || "")
    const [description, setDescription] = useState(props.description || "")
    const [visible, setVisible] = useState(props.visible)

    const [firstRender, setFirstRender] = useState(true)
    const [idTimeoutUpdate, setIdTimeoutUpdate] = useState(null)

    function updateSection() {
        let section = {
            id: props.id,
            title: title,
            description: description,
            visible: visible,
            idPage: props.idPage
        }

        fetch(`https://api-links.montanari.live/sections`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
            },
            body: JSON.stringify({ section: section })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                if (result.update)
                    setIdTimeoutUpdate(null)
            })
    }

    function removeSection() {
        fetch(`https://api-links.montanari.live/sections/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
            }
        })
            .then(res => res.json())
            .then((result) => {
                if (result.deleted)
                    props.removeSectionFromList()
            })
    }

    useEffect(() => {
        if (firstRender)
            setFirstRender(false)
        else {
            clearTimeout(idTimeoutUpdate);
            setIdTimeoutUpdate(setTimeout(updateSection, 2000))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description, visible])

    return (
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            {/* Colonna 1 */}
            <Grid item xs={2} md={1}>
                {!!idTimeoutUpdate && <CircularProgress size="30px" />}
            </Grid>

            {/* Colonna 2 */}
            <Grid item xs={4} md={4}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Titolo"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>

            {/* Colonna 3 */}
            <Grid item xs={4} md={4}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Descrizione"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Grid>

            {/* Colonna 4*/}
            <Grid item xs={2} md={1}>
                <Checkbox
                    checked={!!visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />
            </Grid>

            {/* Colonna 5*/}
            <Grid item xs={12} md={2} style={{ paddingTop: "17px" }} >
                <ButtonGroup
                    color="primary"
                    aria-label="contained primary button group"
                    fullWidth
                >
                    <ButtonGroup color="primary" aria-label="contained primary button group">
                        <Button
                            variant="contained"
                            href={"/modify/section/" + props.id}
                        >
                            <img src="/img/icons/modify.png" alt="modifyIcon" width="25px" />
                        </Button>
                        <Button
                            variant="contained"
                            onClick={removeSection}
                        >
                            <img src="/img/icons/trash.png" alt="trashIcon" width="25px" />
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default SinglePageForm