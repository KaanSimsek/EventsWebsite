import React from 'react'
import userDataProvider from '../../dataProviders/adminDataProviderForUser'
import {Admin, Resource} from 'react-admin'
import UsersList from './UsersList'
import UsersEdit from './UsersEdit'
import CreateNewUser from './CreateNewUser'
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
        />
      </Admin>
    )
}

export default AdminPage
