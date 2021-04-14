/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    InputAdornment,
   
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


function applyFilters(mutual_funds, query) {
    return mutual_funds.filter((mutual_fund) => {
        let matches = true;

        if (query) {
            const properties = ['scheme_name'];
            let containsQuery = false;

            properties.forEach((property) => {
                if (mutual_fund[property].toLowerCase().includes(query.toLowerCase())) {
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

function Results({ className, mutual_funds, ...rest }) {
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
    const filteredMutualFunds = applyFilters(mutual_funds, query);
    const paginatedMutualFunds = applyPagination(filteredMutualFunds, page, limit);

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
                        placeholder="Search Mutual Fund Schemes"
                        value={query}
                        variant="outlined"
                    />

                </Box>
            </Box>
            <Divider/>
            <Box minWidth={1200}>
                <Table>
          
                    <TableBody>
                        {paginatedMutualFunds.map((mf) => {
                            return (
                                <TableRow
                                    hover
                                    key={mf.id}
                                >
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Avatar src={mf.logo_url} className={classes.avatar} />
                                            <Box ml={2}>
                                                <Link
                                                    variant="body1"
                                                    color="textPrimary"
                                                    component={RouterLink}
                                                    underline="none"
                                                    to="#"
                                                >
                                                    {mf.scheme_name}
                                                </Link>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                   
                                                    {mf.category}
                                                    {" . "}
                                                    {mf.risk}
                                                    {" . "}
                                                    {mf.risk_rating} ★
                                                    
                                                </Typography>
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
                                                    {mf.return1d} %
                                                </Link>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                   
                                                    1D
                                                   
                                                    
                                                </Typography>
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
                                                    {mf.return1y} %
                                                </Link>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                   
                                                    1Y
                                                   
                                                    
                                                </Typography>
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
                                                    {mf.return3y} %
                                                </Link>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                   
                                                    3Y
                                                   
                                                    
                                                </Typography>
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
                                                    {mf.return5y} %
                                                </Link>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                   
                                                    5Y
                                                   
                                                    
                                                </Typography>
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
                count={filteredMutualFunds.length}
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
    mutual_funds: PropTypes.array
};

Results.defaultProps = {
    mutual_funds: []
};

export default Results;
