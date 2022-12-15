import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    EmailField,
    DateField,
} from 'react-admin';

function EventsList(props) {
    //console.log(props)
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="eventID"/>
                <TextField source="venueID"/>
                <TextField source="title" />
                <TextField source="price" />
                <TextField source="description"/>
                <TextField source="presenter"/>
                <DateField source="dateTime"/>
                <EditButton label="Edit" />
                <DeleteButton label="Delete"/>
            </Datagrid>
        </List>
    );
}

export default EventsList