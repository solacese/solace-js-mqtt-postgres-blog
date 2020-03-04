/**
 * event-handlers.js
 * @author Andrew Roberts
 */

import * as Events from "./events";

export const handleUserRegistrationEvent = prismaClient => async event => {
  // guard: attempt to parse event, fail if event is malformed
  let userRegistrationEvent;
  try {
    let eventObj = JSON.parse(event);
    userRegistrationEvent = Events.UserRegistrationEvent(eventObj);
  } catch (e) {
    console.error(e);
    return false;
  }

  // do some business logic
  // const newUser = await prismaClient.user.create({
  //   data: {
  //     name: userRegistrationEvent.name,
  //     email: userRegistrationEvent.email,
  //     phone_number: userRegistrationEvent.phoneNumber
  //   }
  // });
  // console.log(`Successfully added new user: ${newUser.email}`);

  return true;
};
