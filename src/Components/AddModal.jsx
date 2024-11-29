import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {useState} from "react";
import {Button} from "@mui/material";
import * as React from "react";
import MultiSelect from "./MultiSelect";
import {toast} from 'react-toastify';


const AddModal = (props) => {
    const {rows, displayAddModal, setDisplayAddModal, setRows}= props

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: "10px",
        outline: "none",
        p: 4,
    };

    const permissionsOption = ['Read', "Write", "Delete"]
    const [permissions, setPermissions] = useState([]);
    const [name, setName] = useState()
    const [ID, setID] = useState()
    const [role, setRole] = useState("Admin")
    const [status, setStatus] = useState("Active")
    const handleClose = () => setDisplayAddModal(false);

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

    const handleAddSubmit = (e)=>{
        e.preventDefault();

        const isDuplicate = rows.some((row) => row.id === ID);

        if (isDuplicate) {
            toast.error("A row with this ID already exists!");
            return;
        }

        const sortedPermissions = permissions.sort();
        const row = {
            id: ID,
            name,
            creation_date: new Date().toJSON().slice(0,10),
            role,
            permissions: sortedPermissions,
            status
        }
        console.log(row)
        const updatedRow = [...rows, row]
        setRows(updatedRow)
        localStorage.setItem("rows", JSON.stringify(updatedRow))
        setID(null)
        setName(null)
        setRole("Admin")
        setPermissions([])
        setStatus("Active")
        toast.success("Row Added", data)
        handleClose()
    }

    const handleID = (e)=>{
        setID(e.target.value)
    }

    const handleName = (e)=>{
        setName(e.target.value)
    }

    const handleRole = (e)=>{
        setRole(e.target.value)
    }

    const handleStatus = (e)=>{
        setStatus(e.target.value)
    }

    return (
        <div>
            <Modal
                open={displayAddModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleAddSubmit}>
                        <div className={"flex sm:space-x-10 sm:flex-row flex-col"}>
                            <div>
                                <div className={"flex flex-col p-2"}>
                                    <label id={"Add ID"}>ID</label>
                                    <input name={"Add ID"} className={"shadow-md rounded-md p-2"} type={"number"} required={true} pattern={" 0*[1-9][0-9]*(\\.[0-9]+)?"} onChange={handleID}
                                           placeholder={"Enter ID"}/>
                                </div>
                                <div className={"flex flex-col my-4"}>
                                    <label className={"sm:mb-6"}>Role</label>
                                    <select className={"rounded-md shadow-md p-2"} onChange={handleRole}>
                                        <option disabled={true}>Select the role</option>
                                        <option value={"Admin"}>Admin</option>
                                        <option value={"User"}>User</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className={"flex flex-col p-2"}>
                                    <label>Name</label>
                                    <input className={"shadow-md rounded-md p-2"} placeholder={"Enter Name"} required={true} pattern={"^([a-zA-Z]|\\s)*$"} onChange={handleName}/>
                                </div>
                                <div className={"flex flex-col my-4 sm:space-y-2"}>
                                    <label>Permissions</label>
                                    <MultiSelect values={permissionsOption} permissions={permissions} setPermissions={setPermissions}/>
                                </div>
                            </div>
                        </div>
                        <div className={"my-4 text-center"}>
                            <label>Status</label>
                            <select className={"rounded-md shadow-md p-2 ml-2"} onChange={handleStatus}>
                                <option disabled={true}>Select the status</option>
                                <option value={"Active"}>Active</option>
                                <option value={"Inactive"}>Inactive</option>
                            </select>
                        </div>
                        <div className={"font-bold flex flex-row-reverse"}>
                            <Button variant="outlined" type={"submit"} className={"!font-semibold !border-2"}>Add</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AddModal;
