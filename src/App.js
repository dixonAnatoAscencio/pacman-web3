import './App.css';
import GamePage from "../src/components/gamePage"
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux"
import {store} from "./redux/store"
import InitialPage from "./components/initialPage";

function App() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<InitialPage/>}/>
            <Route path="/game" element={<GamePage/>}/>
          </Routes>
        </Provider>
      </BrowserRouter>
    );
}

export default App;
