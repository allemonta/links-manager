import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core';

export default function Item(props) {

    return (
        <ListItem
            button
            component="a"
            href={props.path}
            divider
        >
            <img
                src={props.itemPath}
                alt="iconImage"
                style={{
                    marginRight: '20px'
                }}
            />

            <ListItemText
                primary={props.primary}
                secondary={props.secondary}
            />
        </ListItem>
    )

}
