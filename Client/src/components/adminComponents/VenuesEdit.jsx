import React from 'react'

import { Edit,PasswordInput, SimpleForm, TextInput } from 'react-admin';

function VenuesEdit(props) {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="venueName" />
                <TextInput source="latitude" />
                <TextInput source="longitude"/>
            </SimpleForm>
        </Edit>
    );
}

export default VenuesEdit