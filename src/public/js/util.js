
async function request (query, variables) {
    let response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    })
    response = await response.json()
    return response.data
}

function createElement (...elements) {
    let res = []
    for(let el of elements) {
        res.push(document.createElement(el))
    }
    return res
}

function getElement (...elements) {
    let res = []
    for(let el of elements) {
        res.push(document.querySelector(el))
    }
    return res
}