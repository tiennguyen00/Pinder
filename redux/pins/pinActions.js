export const SET_DATA = "SET_DATA";

export const uploadImage = (inputFromUser) => {
  return {
    type: SET_DATA,
    payLoad: inputFromUser
  }
}