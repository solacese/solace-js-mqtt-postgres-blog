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
import * as EventHandlers from "./event-handlers";
//import { PrismaClient } from "@prisma/client";

async function run() {
  console.log("=== Starting MQTT consumer ===");

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

  //initialize and connect prisma client
  // let prismaClient;
  // try {
  //   prismaClient = new PrismaClient();
  //   console.log("Connecting Prisma client ...");
  //   await prismaClient.connect();
  //   console.log("Prisma client connected.");
  // } catch (err) {
  //   console.error(err);
  // }

  // When you are setting up Prisma uncomment above and delete this line
  let prismaClient = null;

  // add event handlers to the mqtt client
  try {
    console.log("Subscribing to User Registration Events...");
    await mqttClient.addEventHandler(
      "User/Registration/Add",
      EventHandlers.handleUserRegistrationEvent(prismaClient), // fix prismaClient argument so we have access to it in our event handler
      0 // qos
    );
    console.log("MQTT client subscribed to User Registration Events.");
  } catch (err) {
    console.error(err);
  }

  // run until a kill signal is received
  console.log(
    "Client started successfully. Running until a SIGINT signal is received..."
  );
  process.stdin.resume();
  process.on("SIGINT", function() {
    process.exit();
  });
}

run();
