import React from 'react'
import userDataProvider from '../../dataProviders/adminDataProviderForUser'
import {Admin, Resource} from 'react-admin'
import UsersList from './UsersList'
import EventsList from './EventsList'
import UsersEdit from './UsersEdit'
import EventsEdit from './EventsEdit'
import CreateNewUser from './CreateNewUser'
import CreateNewEvent from './CreateNewEvent'

function AdminPage() {
  
    return (
      
      <Admin basename="/admin-page" dataProvider={userDataProvider} >
        <Resource
                name="User List"
                list={UsersList}
                edit={UsersEdit}
                create={CreateNewUser}
        />
        <Resource
                name="Event List"
                list={EventsList}
                edit={EventsEdit}
                create={CreateNewEvent}

        />
      </Admin>
    )
}

export default AdminPage
