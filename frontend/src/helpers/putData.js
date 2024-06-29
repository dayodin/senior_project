import { baseUrl } from "../config";

const putData = async (dest, body_data ) => {
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

export default putData;