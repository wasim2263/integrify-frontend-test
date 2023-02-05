import {useEffect, useState} from "react";
import axios from "axios";

export const Country = () => {
    const [countries, setCountries] = useState([])

    const hook = () => {
        const eventHandler = (response: any) => {
            console.log('promise fulfilled')
            setCountries(response.data)
        }
        const promise = axios.get('https://restcountries.com/v3.1/all')
        promise.then(eventHandler)
    }
    useEffect(hook, [])
    return (
        <>
            {console.log('render', countries.length, 'notes')}
        </>
    );

}