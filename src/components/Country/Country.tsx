import {ReactNode, useEffect, useState} from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from "axios";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import {Header} from "./Header";

interface Column {
    id: 'flag' | 'name' | 'region' | 'population' | 'languages' | "details";
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    format?: (value: string | number) => string;
}

const columns: readonly Column[] = [
    {id: 'flag', label: 'Flag', minWidth: 100},
    {id: 'name', label: 'Name', minWidth: 100},
    {
        id: 'region',
        label: 'Region',
        minWidth: 100,
    },
    {
        id: 'population',
        label: 'Population',
        minWidth: 100,
        align: 'left',
        format: (value: string | number) => value.toLocaleString('en-US'),
    },
    {
        id: 'languages',
        label: 'Languages',
        minWidth: 100,
        align: 'left',
    },
    {id: 'details', label: '', minWidth: 100, align: 'right'},

];

interface Data {
    flag: string;
    name: string;
    region: string;
    population: number;
    languages: ReactNode;
    details: ReactNode;
}

function createData(
    flag: string,
    name: string,
    region: string,
    population: number,
    languagesObject: Record<string, string>,
): Data {
    let languages = <LanguageList languages={languagesObject}/>;
    const details = <a href={name}> <ChevronRightIcon sx={{mr: 2}}/> </a>;
    return {flag, name, region, population, languages, details};
}

type Country = {
    flags: {
        svg: string;
    };
    name: {
        common: string;
    };

    region: string;
    population: number;
    languages: Record<string, string>;

};
type LanguagesProps = { languages: Record<string, string> };
const LanguageList = ({languages}: LanguagesProps) => {
    return (
        <ul>
            {Object.values(languages).map((language, index) => <li key={index}>{language}</li>)}
        </ul>
    )
}
export const Country = () => {
    const [countries, setCountries] = useState<Data[]>([])
    const [allCountries, setAllCountries] = useState<Data[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const hook = () => {
        const eventHandler = (response: any) => {
            console.log('promise fulfilled')
            const countries = response.data.map((country: Country) => createData(country.flags.svg, country.name.common, country.region, country.population, country.languages))
            setCountries(countries)
            setAllCountries(countries)
        }
        const promise = axios.get('https://restcountries.com/v3.1/all')
        promise.then(eventHandler)
    }
    useEffect(hook, [])
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const searchCountry = (countryName:string) =>{
        const searchedCountries = allCountries.filter(country => country.name.toLowerCase().search(countryName) >= 0 );
        setCountries(searchedCountries);
        console.log('in country searching',countryName, searchedCountries);
    }
    return (
        <>
            <Header searchCountry={searchCountry}/>
            <Box sx={{flexGrow: 1}}>
                <TableContainer sx={{maxHeight: 500}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countries
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((country) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={country.name}>
                                            {columns.map((column) => {
                                                const value = country[column.id];
                                                const type = typeof value;
                                                console.log(type)
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && type === 'number'
                                                            ? column.format(value + "")
                                                            : column.id !== 'flag'
                                                                ? value
                                                                :
                                                                <img src={value + ""} height={"50px"} width={"auto"}/>}
                                                    </TableCell>

                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    component="div"
                    count={countries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );

}