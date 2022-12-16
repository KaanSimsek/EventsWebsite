import React from 'react'
import { Edit, PasswordInput, SimpleForm, TextInput} from 'react-admin';
import Typography from "@mui/material/Typography"

function UsersEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput required source="username" />
                <TextInput required source="email" />
                <PasswordInput required source="password"/>
            </SimpleForm>
        </Edit>
    );
}

export default UsersEdit