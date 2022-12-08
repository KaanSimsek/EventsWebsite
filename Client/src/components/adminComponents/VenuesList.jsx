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
function VenuesList(props) {
    //console.log(props)
    return (
        <List {...props}>
          <Datagrid>
            <TextField source="venueID"/>
            <TextField source="venueName" />
            <TextField source="latitude" />
            <TextField source="longitude"/>
            <EditButton label="Edit" />
            <DeleteButton label="Delete"/>
          </Datagrid>
        </List>
      );
}

export default VenuesList