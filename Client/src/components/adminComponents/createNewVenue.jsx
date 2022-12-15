import React from 'react'
import { Create, EmailField, PasswordInput, SimpleForm, TextInput } from 'react-admin';

function CreateNewVenue(props) {
    return (
        <Create {...props}>
          <SimpleForm>
            <TextInput source="venueName" />
            <TextInput source="latitude" />
            <TextInput source="longitude"/>
          </SimpleForm>
        </Create>
      );
}

export default CreateNewVenue