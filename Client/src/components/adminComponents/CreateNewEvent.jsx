import React from 'react'
import { Create, DateInput, EmailField, NumberInput, PasswordInput, SimpleForm, TextInput } from 'react-admin';

function CreateNewEvent(props) {
    return (
        <Create {...props}>
          <SimpleForm>
            <TextInput source="title" required />
            <TextInput source="presenter" required/>
            <NumberInput source="venueID" required/>
            <TextInput source='description'required/>
            <NumberInput source='price' required/>
            <DateInput source="dateTime" required/>
          </SimpleForm>
        </Create>
      );
}

export default CreateNewEvent