/**
 * mqtt-client.js
 * @author Andrew Roberts
 */

import mqtt from "mqtt";
import produce from "immer";

function MqttClient({ hostUrl, username, password }) {
  let client = null;

  // connects client to message broker and ensures connack is received
  async function connect() {
    return new Promise((resolve, reject) => {
      client = mqtt.connect(hostUrl, {
        username: username,
        password: password
      });
      client.on("connect", function onConnAck(connAck) {
        resolve(client);
      });
      client.on("error", function onConnError(error) {
        reject(error);
      });
    });
  }

  // publishes message to provided topic and ensures puback is received
  async function send(topic, message, qos = 0) {
    return new Promise((resolve, reject) => {
      // guard: prevent attempting to interact with client that does not exist
      if (!client) {
        reject("Client has not connected yet");
      }

      client.publish(
        topic,
        message,
        { qos }, // options
        function onPubAck(err) {
          // guard: err != null indicates client is disconnecting
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  return produce({}, draft => {
    draft.connect = connect;
    draft.send = send;
  });
}

export default MqttClient;
