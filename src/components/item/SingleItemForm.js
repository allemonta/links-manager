import React, { useState, useEffect } from 'react'
import {
    TextField,
    Button,
    ButtonGroup,
    CircularProgress,
    Grid,
    Checkbox
} from '@material-ui/core';

import { 
    sortableHandle
} from 'react-sortable-hoc';
const DragHandle = sortableHandle(() => <img src="/img/icons/drag.png" alt="trashIcon" width="25px" />);

function SinglePageForm(props) {
    const [title, setTitle] = useState(props.title || "")
    const [path, setPath] = useState(props.path || "")
    const [visible, setVisible] = useState(props.visible)
    const [nested, setNested] = useState(props.nested)

    const [firstRender, setFirstRender] = useState(true)
    const [idTimeoutUpdate, setIdTimeoutUpdate] = useState(null)

    function updateItem() {
        let item = {
            id: props.id,
            title: title,
            path: path,
            visible: visible,
            nested: nested,
        }

        fetch(`https://api-links.montanari.live/items`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
            },
            body: JSON.stringify({ item: item })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.update)
                    setIdTimeoutUpdate(null)
            })
    }

    function removeItem() {
        fetch(`https://api-links.montanari.live/items/${props.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
            }
        })
            .then(res => res.json())
            .then((result) => {
                if (result.deleted)
                    props.removeItemFromList()
            })
    }

    useEffect(() => {
        if (firstRender)
            setFirstRender(false)
        else {
            clearTimeout(idTimeoutUpdate);
            setIdTimeoutUpdate(setTimeout(updateItem, 2000))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, path, visible, nested])

    return (
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            {/* Colonna 1*/}
            <Grid item xs={2} md={1}>
                {!!idTimeoutUpdate && <CircularProgress size="30px" />}
            </Grid>

            {/* Colonna 2*/}
            <Grid item xs={3} md={4}>
                <TextField
                    fullWidth
                    label="Titolo"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>

            {/* Colonna 3*/}
            <Grid item xs={3} md={4}>
                <TextField
                    fullWidth
                    label="Path"
                    variant="outlined"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
            </Grid>

            {/* Colonna 4*/}
            <Grid item xs={1} md={1}>
                <Checkbox
                    checked={!!visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />
            </Grid>

            {/* Colonna 5*/}
            <Grid item xs={1} md={1}>
                <Checkbox
                    checked={!!nested}
                    onChange={(e) => setNested(e.target.checked)}
                />
            </Grid>

            {/* Colonna 6*/}
            <Grid item xs={12} md={1} style={{ paddingTop: "17px" }} >
                <ButtonGroup
                    color="primary"
                    aria-label="contained primary button group"
                    fullWidth
                >
                    <Button
                        variant="contained"
                        onClick={removeItem}
                    >
                        <img src="/img/icons/trash.png" alt="trashIcon" width="25px" />
                    </Button>

                    <Button
                        variant="contained"
                    >
                        <DragHandle />
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default SinglePageForm