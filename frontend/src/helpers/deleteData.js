import { baseUrl } from "../config";

const deleteData = async (dest) => {
    try {
        await fetch(`${baseUrl}/${dest}`, {
            method: 'DELETE',
        })
        .then(res => res.text())
    } catch (err) {
        console.log(err);
    }
}

export default deleteData;