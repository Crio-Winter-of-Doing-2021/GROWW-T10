/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'src/utils/axios';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    InputAdornment,
    IconButton,
    Link,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    colors,
    makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import getCommaFormat from 'src/utils/getCommaFormat';


function applyFilters(stocks, query) {
    return stocks.filter((stock) => {
        let matches = true;

        if (query) {
            const properties = ['companyName'];
            let containsQuery = false;

            properties.forEach((property) => {
                if (stock[property].toLowerCase().includes(query.toLowerCase())) {
                    containsQuery = true;
                }
            });

            if (!containsQuery) {
                matches = false;
            }
        }

        return matches;
    });
}


function applyPagination(customers, page, limit) {
    return customers.slice(page * limit, page * limit + limit);
}

const useStyles = makeStyles((theme) => ({
    root: {},
    queryField: {
        width: 500
    },
}));

function Results({ className, stocks, ...rest }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState('');

    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
    };

    const addToWatchList = (id) => {
        axios
            .post('/api/watchlist/add', { id: id })
            .then((response) => {
                console.log(response.data)
            });
    }


    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    // Usually query is done on backend with indexing solutions
    const filteredStocks = applyFilters(stocks, query);
    const paginatedStocks = applyPagination(filteredStocks, page, limit);

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box p={2}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <TextField
                        className={classes.queryField}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SvgIcon
                                        fontSize="small"
                                        color="action"
                                    >
                                        <SearchIcon />
                                    </SvgIcon>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleQueryChange}
                        placeholder="Search Stocks"
                        value={query}
                        variant="outlined"
                    />

                </Box>
            </Box>
            <Box minWidth={1200}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                COMPANY
                </TableCell>
                            <TableCell>
                                MARKET PRICE
                </TableCell>
                            <TableCell>
                                CLOSE PRICE
                </TableCell>
                            <TableCell>
                                MARKET CAP ( CR )
                </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedStocks.map((stock) => {
                            return (
                                <TableRow
                                    hover
                                    key={stock.isin}
                                >
                                    <TableCell>
                                        <Link
                                            variant="subtitle2"
                                            color="textPrimary"
                                            component={RouterLink}
                                            underline="none"
                                            to="#"
                                        >
                                            {stock.companyName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        ₹ {getCommaFormat(stock.ltp)}
                                    </TableCell>
                                    <TableCell>
                                        ₹ {getCommaFormat(stock.closePrice)}
                                    </TableCell>
                                    <TableCell>
                                        ₹ {getCommaFormat(Math.floor(stock.marketCap / 10000000))}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(event) => addToWatchList(stock.isin)}
                                        >
                                            <SvgIcon fontSize="small" color="primary">
                                                <AddCircleOutlineIcon />
                                            </SvgIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                component="div"
                count={filteredStocks.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}

Results.propTypes = {
    className: PropTypes.string,
    stocks: PropTypes.array
};

Results.defaultProps = {
    stocks: []
};

export default Results;
