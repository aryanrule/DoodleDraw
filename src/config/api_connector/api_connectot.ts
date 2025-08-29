import axios from "axios";

const axiousInstance = axios.create({});

const Api_Connector = (method:string , url:string, bodyData:any , headers:any, params:any) => {
  return axiousInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  })
}


export default Api_Connector;