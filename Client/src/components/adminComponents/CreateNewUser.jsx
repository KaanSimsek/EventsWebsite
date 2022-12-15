import React from 'react'
import { Create, EmailField, PasswordInput, SimpleForm, TextInput } from 'react-admin';
function CreateNewUser(props) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" required />
                <TextInput source="username" required />
                <TextInput source="email" required />
                <PasswordInput source="password" required/>
            </SimpleForm>
        </Create>
    );
}

export default CreateNewUser