const HttpRequest = async (params,cb) => {

    const host = "http://localhost:8000" //replace this with your actual server
    const xhr = new XMLHttpRequest()
    // const params = new URLSearchParams(data).toString()
    xhr.open("POST", host + "/routes.php" /*+ params*/, true)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = null
            if (xhr.response) response = JSON.parse(xhr.response)
            if (cb) cb(response)
        }
    }
    xhr.send(JSON.stringify(params))
}

export default HttpRequest;