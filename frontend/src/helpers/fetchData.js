import { baseUrl } from "../config";

const fetchData = async (dest, setFunc) => {
    try {
        await fetch(`${baseUrl}/${dest}`, {
            method: "GET",
        }).then(async resp => {
            setFunc(await resp.json())});
    } catch (err) {
        console.log(err);
    }
}

export default fetchData;