import { baseUrl } from "../config";

export async function deleteData (dest) {
    try {
        await fetch(`${baseUrl}/${dest}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
    } catch (err) {
        console.log(err);
    }
}

export async function fetchData (dest, setFunc) {
    try {
        await fetch(`${baseUrl}/${dest}`, {
            method: "GET",
        }).then(async resp => {
            setFunc(await resp.json())});
    } catch (err) {
        console.log(err);
    }
}

export async function getData (dest) {
    try {
        const response = await fetch(`${baseUrl}/${dest}`, {
            method: "GET",
        })
        return await response.json()
    } catch (err) {
        console.log(err);
    }
}

export async function postData (dest, body_data) {
    try {
        const response = await fetch(`${baseUrl}/${dest}`, {
            method: "POST",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify(body_data)
        }).then(async resp => resp.json());
        // console.log((await response).insertedId);
        return await response;
    } catch (err) {
        console.log(err);
    }
}

export async function putData (dest, body_data) {
    try {
        await fetch(`${baseUrl}/${dest}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body_data)
        }).then(resp => resp.json());
    } catch (err) {
        console.log(err);
    }
}
