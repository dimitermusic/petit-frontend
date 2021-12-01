import React from "react";
import { Provider } from "react-redux";
import store from "./store";

export const ApiProvider = (props) => {
    return(
        <Provider
          store={store} {...props}
        />
    )
}