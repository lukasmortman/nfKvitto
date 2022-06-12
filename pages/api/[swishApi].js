import {default as axios} from "axios";

export default async function handler(req, res) {
    const  data = req.query
    const replacerFunc = () => {
        const visited = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (visited.has(value)) {
                    return;
                }
                visited.add(value);
            }
            return value;
        };
    };

    let body = {
        format: "svg",
        payee: {value: data.swishnummer, editable: false},
        amount: {value: data.pris, editable: false},
        message: {value: data.swishApi, editable: false},
    }

    let response = await axios.post('https://mpc.getswish.net/qrg-swish/api/v1/prefilled', body)
    await res.status(200).json(JSON.stringify(response.data, replacerFunc()))
}
