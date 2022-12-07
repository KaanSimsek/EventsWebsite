import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    EmailField,
  } from 'react-admin';
function UsersList(props) {
    //console.log(props)
    return (
        <List {...props}>
          <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="name" />
            <EmailField source="email"/>
            <TextField source="password"/>
            <EditButton label="Edit" />
            <DeleteButton label="Delete"/>
          </Datagrid>
        </List>
      );
}

export default UsersList
