import events from "events";
import ajax from "./ajax";

const emitter = new events.EventEmitter();

export const ajaxGet = async (endPoint) => {
    try {
        const axios = await ajax();
        const response = await axios.get(endPoint);
          //console.log(response.data)
        if (response.data) {
          return response.data;
        }
      } catch (e) {
        alert(e);
      }
}

export const ajaxPost = async (endPoint, node) => {
    try {
        const axios = await ajax();
        const response = await axios.post(endPoint, node);
        console.log("Node created: ", response.data);
        emitter.emit("NODE_UPDATED");
      } catch (e) {
        alert(e);
      }
}

export const getProjects = async () => {
  ajaxGet("/node/osproject2").then(res => {
    console.log("getProjects", res);
    return res;
  });
};