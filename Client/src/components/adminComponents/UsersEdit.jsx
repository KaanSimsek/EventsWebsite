import React from 'react'

import { Edit, PasswordInput, SimpleForm, TextInput } from 'react-admin';

function UsersEdit(props) {
    return (
        <Edit {...props}>
          <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput required source="username" />
            <PasswordInput required source="password"/>
          </SimpleForm>
        </Edit>
    );
}

export default UsersEdit
