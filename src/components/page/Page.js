import React, { useState, useEffect } from 'react'
import Section from '../section/Section'
import {
    Container,
    LinearProgress,
    Typography
} from '@material-ui/core';

export default function Page(props) {
    const [page, setPage] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    //props.match.params.id

    function getPage(pageId) {
        fetch(`https://api-links.montanari.live/pages/${pageId}`)
            .then(res => res.json())
            .then((result) => {
                setPage(result.page)
                setIsLoaded(true)
            })
    }

    useEffect(() => {
        getPage(props.match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>

            {!isLoaded ? (
                <LinearProgress />
            ) : (
                    <Container>
                        <Typography variant="h2">
                            {page.title}
                        </Typography>
                        <br />
                        {page.sections.map((e, i) => (
                            <Section
                                {...e}
                                key={i}
                            />
                        ))}
                    </Container>
                )}
        </Container>
    )
}