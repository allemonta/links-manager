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

import SinglePageForm from './SinglePageForm'
import SingleSectionForm from '../section/SingleSectionForm'

function ModifyPage(props) {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [page, setPage] = useState({})

    function getPage(pageId) {
        fetch(`https://api-links.montanari.live/pages/${pageId}`)
            .then(res => res.json())
            .then((result) => {
                setPage(result.page)
                setIsPageLoaded(true)
            })
    }

    function addNewSection() {
        let newSection = {
            title: "NEW_SECTION_" + Math.floor(Math.random() * 100),
            description: "",
            visible: true,
            idPage: props.match.params.id
        }

        fetch(`https://api-links.montanari.live/sections`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ section: newSection })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.section) {
                    let newPage = { ...page }
                    newPage.sections = newPage.sections.concat(result.section)
                    setPage(newPage)
                }
            })
    }

    useEffect(() => {
        getPage(props.match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            {!isPageLoaded ? (
                <LinearProgress />
            ) : (
                    <Container>
                        <Grid container spacing={2}>
                            <SinglePageForm
                                {...page}
                            />
                        </Grid>

                        <Typography variant="h3">
                            Sezioni collegate
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
                                {page.sections.map((e, i) => (
                                    <SingleSectionForm
                                        {...e}
                                        key={"singleSectionForm_" + i}
                                    />
                                ))}
                            </TableBody>
                        </Table>

                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                            onClick={addNewSection}
                        >
                            AGGIUNGI SEZIONE
                        </Button>
                    </Container>
                )}
        </Container>
    )
}

export default ModifyPage