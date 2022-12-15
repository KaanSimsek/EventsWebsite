import React from 'react'

import { Edit,PasswordInput, SimpleForm, TextInput,NumberInput, DateInput } from 'react-admin';

function EventsEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput required source="title" />
                <TextInput required source="presenter"/>
                <TextInput required source="description"/>
                <NumberInput required source="price" />
                <DateInput required source="dateTime"/>

            </SimpleForm>
        </Edit>
    );
}

export default EventsEdit