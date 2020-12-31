import { createStore } from "easy-peasy";
import storeModel from "./model/index";

const store = createStore(storeModel);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./model/", () => {
      store.reconfigure(storeModel);
    });
  }
}

export default store;
