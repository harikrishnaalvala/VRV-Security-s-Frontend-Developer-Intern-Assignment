import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import {visuallyHidden} from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Chip from "@mui/material/Chip";
import {toast} from "react-toastify";


function descendingComparator(a, b, orderBy) {
    if(orderBy==="id"){
        return parseInt(b[orderBy]) - parseInt(a[orderBy]);
    }

    if (Array.isArray(b[orderBy]) && Array.isArray(a[orderBy])) {

        if (b[orderBy].length !== a[orderBy].length) {
            return b[orderBy].length - a[orderBy].length;
        }

        const aString = a[orderBy].join(",").toLowerCase();
        const bString = b[orderBy].join(",").toLowerCase();
        if (bString < aString) {
            return -1;
        }
        if (bString > aString) {
            return 1;
        }
        return 0;
    }

    if (b[orderBy]?.toLocaleLowerCase() < a[orderBy]?.toLocaleLowerCase()) {
        return -1;
    }
    if (b[orderBy]?.toLocaleLowerCase() > a[orderBy]?.toLocaleLowerCase()) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        width: 250,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        width: 250,
        label: 'Name',
    },
    {
        id: 'creation_date',
        numeric: false,
        disablePadding: false,
        width: 250,
        label: 'Creation Date',
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        width: 250,
        label: 'Role',
    },
    {
        id: 'permissions',
        numeric: false,
        disablePadding: false,
        width: 250,
        label: 'Permissions',
    }, {
        id: 'status',
        numeric: false,
        disablePadding: false,
        width: 250,
        label: 'Status',
    }, {
        id: 'action',
        numeric: false,
        disablePadding: false,
        width: 250,
        label: 'Action',
    },
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all ',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'right'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const {numSelected, changeDisplayModal, handleDelete} = props;


    const openModal = () => {
        changeDisplayModal(true)
    }

    return (
        <Toolbar
            sx={[
                {
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
           
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%',textAlign:'center',fontWeight:'700'}}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                    
                >
                    Role-Based Access Control
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add list">
                    <IconButton sx={{color:'green',fontSize:"20px"}}onClick={openModal}>Add list
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function Admin(props) {
    const {setDisplayModal, rows, setDisplayEditModal, setEditRowId, setRows} = props
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('ID');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [rows, order, orderBy, page, rowsPerPage],
    );

    const handleEdit = (e, id) => {
        e.stopPropagation();
        setDisplayEditModal(true)
        setEditRowId(()=>(id))
    }

    const data = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }

    const handleDelete = ()=>{

        const updatedRows = rows.filter((row) => !selected.includes(row.id));

        setRows(updatedRows);

        localStorage.setItem("rows", JSON.stringify(updatedRows));
        toast.success("Row/s Deleted", data)
        setSelected([])
    }

    return (
        <div className={"mx-8"}>
            <Box sx={{width: '100%'}} className={"my-10"}>
                <Paper sx={{width: '100%', mb: 2, borderRadius: "20px", padding:"16px", boxShadow:"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))"}} >
                    <EnhancedTableToolbar numSelected={selected.length} handleDelete={handleDelete}
                                          changeDisplayModal={setDisplayModal}/>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows?.length}
                            />
                            <TableBody >
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = selected.includes(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.creation_date}</TableCell>
                                            <TableCell align="right">{row.role}</TableCell>
                                            <TableCell align="right">
                                                {row?.permissions?.map((value) => (
                                                    <Chip key={value} label={value}  className={"mr-2"}/>
                                                ))}
                                            </TableCell>
                                            <TableCell align="right"><Chip key={row.status} label={row.status}  className={`mr-2 ${row.status==="Active"?"!bg-green-400":"!bg-red-500"} !text-white !font-bold`}/></TableCell>
                                            <TableCell align="right" onClick={(e) => handleEdit(e, row.id)}>{
                                                <EditIcon/>}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </div>
    );
}
