import React, { useState, useEffect } from 'react'
import {
    Container,
    LinearProgress,
    Typography,
    Button,
    Link,
    Breadcrumbs
} from '@material-ui/core';

import SinglePageForm from './SinglePageForm'
import SingleSectionForm from '../section/SingleSectionForm'
import SharedPageUser from './SharedPageUser'

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
                console.log(result)
                if (result.section) {
                    let newPage = { ...page }
                    newPage.sections = newPage.sections.concat(result.section)
                    setPage(newPage)
                }
            })
    }

    function removeSectionFromList(id) {
        let newPage = { ...page }
        newPage.sections = newPage.sections.filter(e => e.id !== id)
        setPage(newPage)
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
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                alessandro.montanari7@gmail.com
                            </Link>
                            <Typography color="textPrimary">{page.title}</Typography>
                        </Breadcrumbs>

                        <Typography variant="h3">
                            Sezioni collegate
                        </Typography>
                        <br /> <br />
                        {page.sections.map(e => (
                            <SingleSectionForm
                                {...e}
                                key={"singleSectionForm_" + e.id}
                                removeSectionFromList={() => removeSectionFromList(e.id)}
                            />
                        ))}

                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            size="large"
                            onClick={addNewSection}
                        >
                            AGGIUNGI SEZIONE
                        </Button>

                        <br /> <br />
                        {page.sharedUsers.length > 0 && (
                            <React.Fragment>
                                <Typography variant="h3">
                                    Utenti in condivisione
                                </Typography>
                                {page.sharedUsers.map(e => (
                                    <SharedPageUser
                                        {...e}
                                    />
                                ))}
                            </React.Fragment>
                        )}
                    </Container>
                )}
        </Container>
    )
}

export default ModifyPage