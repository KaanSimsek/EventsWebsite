import React from 'react'
import { Create, DateTimeInput , EmailField, NumberInput, PasswordInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

function CreateNewEvent(props) {

    return (
        <Create {...props}>

            <SimpleForm>
                <TextInput required source="title"  />
                <NumberInput required source="venueID" />
                <TextInput required source="presenter" />
                <TextInput source='description'/>
                <NumberInput required source='price' />
                <DateTimeInput required source="dateTime" />
            </SimpleForm>
        </Create>
    );
}

export default CreateNewEvent