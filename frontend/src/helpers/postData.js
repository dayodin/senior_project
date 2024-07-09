import { baseUrl } from "../config";

const postData = async (dest, body_data) => {
    try {
        const response = await fetch(`${baseUrl}/${dest}`, {
            method: "POST",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify(body_data)
        }).then(async resp => await resp.json());
        // console.log((await response).insertedId);
        return (await response);
    } catch (err) {
        console.log(err);
    }
}

export default postData;