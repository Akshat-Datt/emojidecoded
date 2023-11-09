class NetLine {
  get(route) {
    return executer(route);
  }

  post(route, body) {
    return executer(route, body, "POST");
  }

  delete(route) {
    return executer(route, null, "DELETE");
  }

  patch(route, body) {
    return executer(route, body, "PATCH");
  }
}

async function executer(route, body, method) {
  let requestType = "GET";
  if (body) requestType = "POST";
  if (method) requestType = method;

  let headerParam = {
    withCredentials: true,
    "Content-type": "application/json",
  };

  let requestObject = {
    method: requestType,
    headers: headerParam,
    withCredntials: true,
    credentials: "include",
  };

  if (body) requestObject.body = JSON.stringify(body);

  let base = "http://127.0.0.1:8000/";
  if (process.env.REACT_APP_SERVER) base = process.env.REACT_APP_SERVER;

  route = base + "/api/" + route;

  let res = await fetch(route, requestObject);

  let jsonData = await res.json();

  return jsonData.data;
}

const netLine = new NetLine();

export default netLine;
