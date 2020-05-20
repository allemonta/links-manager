import React, { useState, useEffect } from 'react'
import {
    Container,
    LinearProgress,
    Typography,
    Button,
    Grid,
    Breadcrumbs,
    Link
} from '@material-ui/core';

import SingleSectionForm from './SingleSectionForm'
import SingleItemForm from '../item/SingleItemForm'

import {
    sortableContainer,
    sortableElement
} from 'react-sortable-hoc';

import arrayMove from 'array-move';

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

    function removeItemFromList(id) {
        console.log(id)
        let newSection = { ...section }
        newSection.items = newSection.items.filter(e => e.id !== id)
        setSection(newSection)
    }

    useEffect(() => {
        getSection(props.match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function onSortEnd({ oldIndex, newIndex }) {
        let newSection = { ...section }
        newSection.items = arrayMove(newSection.items, oldIndex, newIndex)
        setSection(newSection)

        let itemsPosition = newSection.items.map((e, i) => ({ id: e.id, position: i }))

        fetch(`https://api-links.montanari.live/itemsPosition`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.jwtToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemsPosition: itemsPosition })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
            })
    };

    const SortableContainer = sortableContainer(({ section }) => {
        return (
            <Grid container spacing={2}>
                {section.items.map((e, index) => (
                    <SortableItem
                        key={`item-${index}`}
                        index={index}
                        item={e}
                    />
                ))}
            </Grid>
        )
    });

    const SortableItem = sortableElement(({ item }) =>
        <SingleItemForm
            {...item}
            key={"ITEM_" + item.id}
            removeItemFromList={() => removeItemFromList(item.id)}
        />
    );

    return (
        <Container>
            {!isSectionLoaded ? (
                <LinearProgress />
            ) : (
                    <Container>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                alessandro.montanari7@gmail.com
                            </Link>
                            <Link color="inherit" href="/modify/page/55">
                                Università
                            </Link>
                            <Typography color="textPrimary">{section.title}</Typography>
                        </Breadcrumbs>

                        <Typography variant="h3">
                            Item collegati
                        </Typography>
                        <br /> <br />
                        <SortableContainer
                            useDragHandle
                            onSortEnd={onSortEnd}
                            section={section}
                        />
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
                )
            }
        </Container >
    )
}

export default ModifySection