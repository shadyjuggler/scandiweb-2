const http = async (body) => {
    const resp = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .catch(error => {throw new Error(error.message)});
        
    return resp;
}

export default http;