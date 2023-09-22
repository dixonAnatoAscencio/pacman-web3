import {createStore} from "redux"
import {initialState} from "./initialState"
import {reducer} from "./reducer"
import { composeWithDevTools } from "@redux-devtools/extension";

export const store = createStore(reducer, initialState, composeWithDevTools());