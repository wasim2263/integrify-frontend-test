import {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@mui/material";

type country = {
    name: {
        common: string;
    };
    coatOfArms: {
        svg: string;
    };
};
export const Country = () => {
    const [countries, setCountries] = useState<country[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const hook = () => {
        const eventHandler = (response: any) => {
            console.log('promise fulfilled')
            setCountries(response.data)
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
    return (
        <>
            {console.log('render', countries.length, 'notes')}

            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                        {countries
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.name?.common}>
                                        <TableCell>
                                            <img
                                                src={row?.coatOfArms?.svg}
                                                height={"50px"}
                                                width={"auto"}
                                            />

                                        </TableCell>
                                        <TableCell>
                                            {row?.name?.common}
                                        </TableCell>

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
        </>
    );

}