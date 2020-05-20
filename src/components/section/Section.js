import React from 'react'
import { Typography, List, Box } from '@material-ui/core';
import Item from '../item/Item'

export default function Section(props) {
    function getIconPath(namePath) {
        if (namePath.endsWith('pdf'))
            return "/img/icons/pdf.png"

        if (namePath.endsWith('docx'))
            return "/img/icons/word.png"

        if (namePath.endsWith('png'))
            return "/img/icons/png.png"

        if (namePath.includes('docs.google.com'))
            return "/img/icons/docs.png"

        if (namePath.includes('meet.google.com'))
            return "/img/icons/meet.png"

        if (namePath.includes('links.montanari.live'))
            return "/img/icons/icon.png"

        if (namePath.includes('microsoftstream'))
            return "/img/icons/microsoft-stream.png"

        if (namePath.includes('unimore'))
            return "/img/icons/unimore.png"

        return "/img/icons/link.png"
    }

    return (
        <Box mb={4}>
            <Typography variant="h4" gutterBottom>
                {props.title}
            </Typography>
            <List dense>
                {props.items.map((e, i) => (
                    <Item
                        {...e}
                        key={"ITEM_" + e.id}
                        iconPath={getIconPath(e.path)}
                    />
                ))}
            </List>
        </Box>
    )
}

