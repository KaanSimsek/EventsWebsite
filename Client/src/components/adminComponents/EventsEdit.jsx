import React from 'react'

import { Edit,PasswordInput, SimpleForm, TextInput,NumberInput, DateTimeInput } from 'react-admin';

function EventsEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput required source="title" />
                <NumberInput required source="venueID" />
                <TextInput required source="presenter"/>
                <TextInput source="description"/>
                <NumberInput required source="price" />
                <DateTimeInput required source="dateTime"/>

            </SimpleForm>
        </Edit>
    );
}

export default EventsEdit