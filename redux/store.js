import { createStore, combineReducers } from "redux";
import loadingReducer from "./loading/loadingReducer";

const rootReducers = combineReducers({
  loadingReducer
})

const store = createStore(
  rootReducers
)
export default store;