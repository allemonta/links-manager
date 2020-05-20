import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core';


export default function Item(props) {

    return (
        <ListItem
            button
            component="a"
            target="_blank"
            href={props.path}
            divider
        >
            <img
                src={props.iconPath}
                alt="iconImage"
                style={{
                    marginRight: '20px'
                }}
                width='20px'
            />

            <ListItemText
                primary={props.title}
                secondary={props.description}
            />
        </ListItem>
    )

}
