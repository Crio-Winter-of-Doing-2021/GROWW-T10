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
    makeStyles,
    Avatar,
    Divider
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';



function applyFilters(fixedDeposits, query) {
    return fixedDeposits.filter((fixedDeposit) => {
        let matches = true;

        if (query) {
            const properties = ['bankName'];
            let containsQuery = false;

            properties.forEach((property) => {
                if (fixedDeposit[property].toLowerCase().includes(query.toLowerCase())) {
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

function Results({ className, fixedDeposits, ...rest }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState('');

    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
    };



    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    // Usually query is done on backend with indexing solutions
    const filteredFixedDeposits = applyFilters(fixedDeposits, query);
    const paginatedFixedDeposits = applyPagination(filteredFixedDeposits, page, limit);

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
                        placeholder="Search Fixed Deposits"
                        value={query}
                        variant="outlined"
                    />

                </Box>
            </Box>
            <Divider />
            <Box minWidth={1200}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Bank Name
                </TableCell>
                            <TableCell>
                                Tenure
                </TableCell>
                            <TableCell>
                                Interest Rate
                </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedFixedDeposits.map((fd) => {
                            return (
                                <TableRow
                                    hover
                                    key={fd.id}
                                >
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Avatar src={fd.logo_url} className={classes.avatar} />
                                            <Box ml={2}>
                                                <Link
                                                    variant="body1"
                                                    color="textPrimary"
                                                    component={RouterLink}
                                                    underline="none"
                                                    to="#"
                                                >
                                                    {fd.bankName}
                                                </Link>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            textAlign="center"
                                        >

                                            <Box ml={2}>
                                                <Link
                                                    variant="body1"
                                                    color="textPrimary"
                                                    component={RouterLink}
                                                    underline="none"
                                                    to="#"
                                                >
                                                    {fd.tenure}
                                                </Link>

                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            textAlign="center"
                                        >

                                            <Box ml={2}>
                                                <Link
                                                    variant="body1"
                                                    color="textPrimary"
                                                    component={RouterLink}
                                                    underline="none"
                                                    to="#"
                                                >
                                                    {fd.interestRate}%
                                                </Link>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                component="div"
                count={filteredFixedDeposits.length}
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
    fixedDeposits: PropTypes.array
};

Results.defaultProps = {
    fixedDeposits: []
};

export default Results;
