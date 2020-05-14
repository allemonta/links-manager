import React from 'react'
import { Typography, List, Box } from '@material-ui/core';
import Item from '../item/Item'

export default function Section(props) {
    return (
        <Box mb={4}>
            <Typography variant="h4" gutterBottom>
                {props.title}
            </Typography>
            <List dense>
                {props.items.map((e, i) => (
                    <Item {...e} key={i} />
                ))}
            </List>
        </Box>
    )
}

