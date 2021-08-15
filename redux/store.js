import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loadingReducer from "./loading/loadingReducer";
import tabReducer from "./tab/tabReducer";
import pinsReducer from "./pins/pinReducer";

const rootReducers = combineReducers({
  loadingReducer,
  tabReducer,
  pinsReducer
})

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
)
console.log("STORE: ", store.getState());
export default store;