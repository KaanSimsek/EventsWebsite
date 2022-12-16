import React from 'react'
import { Edit, PasswordInput, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, NumberInput} from 'react-admin';
import Typography from "@mui/material/Typography"

function UsersEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput required source="username" />
                <TextInput required source="email" />
                <Typography component="span" variant="body2">
                    Fav Location
                </Typography>
                <ArrayInput source="-">
                    <SimpleFormIterator>
                        <NumberInput source="favourite location ID"/>
                    </SimpleFormIterator>
                </ArrayInput>
                <PasswordInput required source="password"/>
            </SimpleForm>
        </Edit>
    );
}

export default UsersEdit