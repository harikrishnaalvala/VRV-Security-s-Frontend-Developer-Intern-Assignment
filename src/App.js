import './App.css';
import Admin from "./Components/Admin";
import Navbar from "./Components/Navbar";
import AddModal from "./Components/AddModal";
import {useState} from "react";
import EditModal from "./Components/EditModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [displayAddModal, setDisplayAddModal] = useState(false)
    const [displayEditModal, setDisplayEditModal] = useState(false)
    const [editRowId, setEditRowId] = useState()
    const localRows = JSON.parse(localStorage.getItem("rows"));
    const defaultRow = localRows===null?[
        {id: "1", name: "Hari", creation_date: "2024-11-17", role: "Admin", permissions: ["Delete", "Write"], status: "Active"},
        {id: "2", name: "Shiva", creation_date: "2024-11-24", role: "Admin", permissions: ["Delete","Write","Read"], status: "Active"},
        {id: "3", name: "Ram", creation_date: "2024-11-22", role: "User", permissions: ["Read","Write"], status: "Active"},
        {id: "4", name: "Krishna", creation_date: "2024-11-21", role: "User", permissions: ["Write"], status: "Active"},
        {id: "5", name: "Arjun", creation_date: "2024-11-29", role: "User", permissions: ["Write"], status: "Inactive"},
        {id: "6", name: "Sai", creation_date: "2024-11-19", role: "Admin", permissions: ["Delete"], status: "Active"}
    ]:localRows;
    const [rows, setRows] = useState(defaultRow);
  return (
      <>
        <Navbar/>
        <Admin setDisplayModal={setDisplayAddModal} rows={rows} setRows={setRows} setDisplayEditModal={setDisplayEditModal} setEditRowId={setEditRowId}/>
          <AddModal displayAddModal={displayAddModal} setDisplayAddModal={setDisplayAddModal} rows={rows} setRows={setRows}/>
          <EditModal displayEditModal={displayEditModal} setDisplayEditModal={setDisplayEditModal} rows={rows} editRowId={editRowId} setRows={setRows}/>
          <ToastContainer/>
      </>
  );
}

export default App;
