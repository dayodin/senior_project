import { baseUrl } from "../config";

const postData = async (dest, body_data ) => {
    try {
        await fetch(`${baseUrl}/${dest}`, {
            method: "POST",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify(body_data)
        }).then(resp => resp.json());
    } catch (err) {
        console.log(err);
    }
}

export default postData;