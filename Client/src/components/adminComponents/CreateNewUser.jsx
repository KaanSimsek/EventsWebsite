import React from 'react'
import { Create, EmailField, PasswordInput, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, NumberInput  } from 'react-admin';
import Typography from "@mui/material/Typography"
function CreateNewUser(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" required />
                <TextInput source="username" required />
                <TextInput source="email" required />
                <Typography component="span" variant="body2">
                    Fav Location
                </Typography>
                <ArrayInput source="favLoc">
                    <SimpleFormIterator>
                        <NumberInput source="favLocID"/>
                    </SimpleFormIterator>
                </ArrayInput>
                <PasswordInput source="password" required/>
            </SimpleForm>
        </Create>
    );
}

export default CreateNewUser