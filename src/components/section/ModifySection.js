import React, { useState, useEffect } from 'react'
import {
    TableRow,
    TableCell,
    Container,
    LinearProgress,
    Table,
    TableHead,
    TableBody,
    Typography,
    Button,
    Grid
} from '@material-ui/core';

import SingleSectionForm from './SingleSectionForm'

function ModifySection(props) {
    const [isSectionLoaded, setIsSectionLoaded] = useState(false);
    const [section, setSection] = useState({})

    function getSection(sectionId) {
        fetch(`https://api-links.montanari.live/sections/${sectionId}`)
            .then(res => res.json())
            .then((result) => {
                setSection(result.section)
                setIsSectionLoaded(true)
            })
    }

    function addNewItem() {
        let newItem = {
            title: 'NEW_ITEM_' + Math.floor(Math.random() * 100),
            path: 'https://google.it',
            visible: true,
            nested: false,
            idSection: section.id
        }

        fetch(`https://api-links.montanari.live/items`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: newItem })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                if (result.item) {
                    /* WRONG */
                    let newSection = { ...section }
                    newSection.items = newSection.items.concat(result.item)
                    setSection(newSection)
                }
            })
    }

    useEffect(() => {
        getSection(props.match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            {!isSectionLoaded ? (
                <LinearProgress />
            ) : (
                    <Container>
                        <Grid container spacing={2}>
                            <SingleSectionForm
                                {...section}
                            />
                        </Grid>

                        <Typography variant="h3">
                            Item collegati
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"> Saving </TableCell>
                                    <TableCell align="center"> Titolo </TableCell>
                                    <TableCell align="center"> Descrizione </TableCell>
                                    <TableCell align="center"> Visibile </TableCell>
                                    <TableCell align="center"> Utility </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {section.items.map((e, i) => (
                                    <React.Fragment>
                                        <p> e.id </p>
                                        <p> e.title </p>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>

                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                            onClick={addNewItem}
                        >
                            AGGIUNGI ITEM
                        </Button>
                    </Container>
                )}
        </Container>
    )
}

export default ModifySection