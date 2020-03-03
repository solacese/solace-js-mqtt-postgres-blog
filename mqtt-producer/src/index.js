/**
 * index.js
 * @author Andrew Roberts
 */

// polyfill async
import "core-js";
import "regenerator-runtime";
// load env variables
import dotenv from "dotenv";
let result = dotenv.config();
if (result.error) {
  throw result.error;
}

import MqttClient from "./mqtt-client";

async function run() {
  console.log("=== Starting MQTT producer ===");

  // initialize and connect mqtt client
  let mqttClientConfig = {
    hostUrl: process.env.SOLACE_MQTT_HOST_URL,
    username: process.env.SOLACE_USERNAME,
    password: process.env.SOLACE_PASSWORD
  };
  let mqttClient;
  try {
    mqttClient = MqttClient(mqttClientConfig);
    console.log("Connecting MQTT client to Solace...");
    await mqttClient.connect();
    console.log("MQTT client connected to Solace.");
  } catch (err) {
    console.error(err);
  }

  // form mock user registration event
  let userRegistrationEvent = {
    name: "Andrew Roberts",
    email: "blah@gmail.com",
    phoneNumber: "000-000-0000"
  };

  // send event
  await mqttClient.send(
    "User/Registration/Add",
    JSON.stringify(userRegistrationEvent),
    0
  );
}

run();
