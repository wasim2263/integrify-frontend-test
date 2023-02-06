import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
import './Details.css'
interface CountryDetails {
    flag: string;
    name: string;
    region: string;
    population: number;
    latitude: number;
    longitude: number;
    capital: string;
    subreagion: string;
}

type Country = {
    flags: {
        svg: string;
    };
    region: string;
    subregion: string;
    population: number;
    capitalInfo: {}
    latlng: number[];
    capital: string[];


};
export const CountryDetails = () => {
    let {countryName} = useParams();
    const [country, setCountry] = useState<CountryDetails>({
        capital: "",
        flag: "",
        latitude: 0,
        longitude: 0,
        name: "",
        population: 0,
        region: "",
        subreagion: ""
    })

    const hook = () => {
        const eventHandler = (response: any) => {
            console.log('promise fulfilled')
            const responseData: Country = response.data[0];
            // console.log(responseData.latlng[0])
            const countryDetails: CountryDetails = {
                latitude: responseData.latlng[0],
                longitude: responseData.latlng[1],
                flag: responseData.flags.svg,
                population: responseData.population,
                region: responseData.region,
                subreagion: responseData.subregion,
                name: countryName + "",
                capital: responseData.capital.reduce((previousValue, currentValue) => previousValue + currentValue + ", ")

            }
            setCountry(countryDetails)
        }
        const promise = axios.get('https://restcountries.com/v3.1/name/'.concat(countryName + ""))
        promise.then(eventHandler)
    }
    useEffect(hook, [countryName])
    return (
        <>

            <Box sx={{flexGrow: 1}}>

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <button className="circular-button">A</button>

                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        align="left"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        <Box>
                            <b>{countryName?.toUpperCase()}</b>
                        </Box>
                        <Box>
                            {country.capital}
                        </Box>
                    </Typography>
                    <MoreVertIcon/>
                </Toolbar>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <img src={country.flag} height="350px"/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                This country belongs to <Typography component="span"
                                                    color="blue"><b>{country.region}</b></Typography> region
                and <Typography
                component="span" color="blue"><b>{country.subreagion}</b></Typography> sub-region.
                Located at the <Typography component="span" color="blue"><b>{country.latitude}</b></Typography> &deg;N
                and <Typography component="span" color="blue"><b>{country.longitude}</b></Typography> &deg;W, this
                country
                has
                population
                of <Typography component="span" color="blue"><b>{country.population}</b></Typography> and it has gained
                the
                independent, according tho the CIA World Factbook.
            </Box>
            <Box sx={{flexGrow: 1}}>

                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        noWrap
                        component="div"
                        align="left"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <LocationOnIcon />
                        </IconButton>
                    </Typography>
                    <ExpandMoreIcon/>
                </Toolbar>
            </Box>
        </>
    );
}