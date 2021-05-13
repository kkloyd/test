const API = {
  postJson(url, json) {
    return fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(json),
    })
  }
}

export default API;