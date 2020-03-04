/**
 * events.js
 * @author Andrew Roberts
 */
import produce from "immer";

export function UserRegistrationEvent({ name, email, phoneNumber }) {
  return produce({}, draft => {
    draft.name = name;
    draft.email = email;
    draft.phoneNumber = phoneNumber;
  });
}
