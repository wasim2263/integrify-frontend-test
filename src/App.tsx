import React from 'react';
import './App.css';
import {Routes,Route, useParams} from 'react-router-dom';
import {Country} from "./components/Country";

function App() {
   return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Country/>}
                />
            </Routes>
        </div>
   );
}

export default App;
