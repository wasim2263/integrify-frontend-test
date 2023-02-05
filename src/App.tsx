import React from 'react';
import './App.css';
import {Routes,Route, useParams} from 'react-router-dom';
import {Layout} from "./components/Layout";
import {Country} from "./components/Country";

function App() {
   return (
        <div className="App">
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<Country/>}
                    />
                </Route>
            </Routes>
        </div>
   );
}

export default App;
