import React, { useState, useEffect } from 'react'
import {
    TableRow,
    TableCell,
    TextField,
    Button,
    ButtonGroup,
    CircularProgress,
    Checkbox
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

    useEffect(() => {
        if (firstRender)
            setFirstRender(false)
        else
        {
            clearTimeout(idTimeoutUpdate);
            setIdTimeoutUpdate(setTimeout(updateSection, 3000))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, description, visible])

    return (
        <TableRow>
            <TableCell align="center">
                {!!idTimeoutUpdate && <CircularProgress size="30px" />}
            </TableCell>
            <TableCell align="center">
                <TextField
                    id="outlined-basic"
                    label="Titolo"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </TableCell>
            <TableCell align="center">
                <TextField
                    id="outlined-basic"
                    label="Descrizione" 
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </TableCell>
            <TableCell align="center">
                <Checkbox 
                    checked={!!visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />
            </TableCell>
            <TableCell align="center">
                <ButtonGroup color="primary" aria-label="contained primary button group">
                    <Button 
                        variant="contained"
                        href={"/modify/section/" + props.id}
                    > 
                        <img src="/img/icons/modify.png" alt="modifyIcon" width="25px" /> 
                    </Button>
                    <Button variant="contained"> <img src="/img/icons/copy.png" alt="modifyIcon" width="25px" /> </Button>
                    <Button variant="contained"> <img src="/img/icons/modify.png" alt="modifyIcon" width="25px" /> </Button>
                </ButtonGroup>
            </TableCell>
        </TableRow>
    )
}

export default SinglePageForm