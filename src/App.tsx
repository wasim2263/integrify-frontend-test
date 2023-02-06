import React from 'react';
import './App.css';
import {Routes,Route, useParams} from 'react-router-dom';
import {Country, CountryDetails} from "./components/Country";

function App() {
   return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Country/>}
                />
                <Route path=":countryName" element={<CountryDetails />} />
            </Routes>
        </div>
   );
}

export default App;
