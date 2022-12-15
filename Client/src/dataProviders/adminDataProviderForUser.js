import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:4000/admin/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        let url=""
        if (resource==="User List"){
            url=apiUrl+"/user"
        }

        else if(resource==="Event List"){
            url=apiUrl+"/event"
        }

        else if(resource==="Venue List"){
            url=apiUrl+"/venue"
        }
        return httpClient(url).then(({ headers, json }) => ({
            data: json.map((resource) => ({ ...resource, id: resource._id })),
            total: parseInt(json["length"], 10),
        }));

    },
    getOne: (resource, params) =>{
        let url=""
        if (resource==="User List"){
            url=apiUrl+"/user"
        }

        else if(resource==="Event List"){
            url=apiUrl+"/event"
        }

        else if(resource==="Venue List"){
            url=apiUrl+"/venue"
        }
        console.log(params.id)
        return httpClient(`${url}/${params.id}`).then(({ json }) => ({
            data: { ...json, id: json._id }, //!
        }))},

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({
            data: json.map((resource) => ({ ...resource, id: resource._id })),
        }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.map((resource) => ({ ...resource, id: resource._id })),
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>{
        let url=""
        if (resource==="User List"){
            url=apiUrl+"/user"
        }

        else if(resource==="Event List"){
            url=apiUrl+"/event"
        }

        else if(resource==="Venue List"){
            url=apiUrl+"/venue"
        }
        console.log(params.id)
        return httpClient(`${url}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params),
        }).then(({ json }) => ({data: { ...json, id: json._id }}))},

    updateMany: (resource, params) => {
        let url=""
        if (resource==="User List"){
            url=apiUrl+"/users"
        }

        else if(resource==="Event List"){
            url=apiUrl+"/events"
        }

        else if(resource==="Venue List"){
            url=apiUrl+"/venue"
        }
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>{
        let url=""
        if (resource==="User List"){
            url=apiUrl+"/user"
        }

        else if(resource==="Event List"){
            url=apiUrl+"/event"
        }

        else if(resource==="Venue List"){
            url=apiUrl+"/venue"
        }
        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json._id },
        }))},

    delete: (resource, params) =>{
        let url=""
        if (resource==="User List"){
            url=apiUrl+"/user/delete"
        }

        else if(resource==="Event List"){
            url=apiUrl+"/event/delete"
        }

        else if(resource==="Venue List"){
            url=apiUrl+"/venue/delete"
        }
        console.log("Hiii");
        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params),
        }).then(({ json }) => ({
            ...json,
            id: json._id,
        }))},

    deleteMany: (resource, params) => {
        let url=""
        if (resource==="User List"){
            url=apiUrl+"/users/delete"
        }

        else if(resource==="Event List"){
            url=apiUrl+"/events/delete"
        }

        else if(resource==="Venue List"){
            url=apiUrl+"/venue"
        }

        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params),
        }).then(({ json }) => ({ data: json }));
    },
};