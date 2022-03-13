import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdDelete, MdEdit, MdUpdate} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import App from "../App";
import {AddressInUse} from "../ServerConstant.js";
import ReactDOM from "react-dom";
function AptFloors() {
    useEffect(() => {
        loadAptFloors();
    }, []);

    const [aptFloorList, setAptFloorList] = useState([]);
    const [addField, setAddField] = useState([]);
    const [aptFloorForUpdate, setAptFloorForUpdate] = useState([])
    const [isShowing, setIsShowing] = useState(false);
    const [floorNum, setFloorNum] = useState([]);
    const [fireExits, setFireExits] = useState([]);

    const toggle = (isShowing) => {
      setIsShowing(!isShowing);
    }

    const loadAptFloors = async () => {
        console.log("MakingRequest")
        console.log(`${AddressInUse}/GET/aptFloors`)
        const response = await fetch(`${AddressInUse}/GET/aptFloors`);
        const aptFloorList = await response.json();
        console.log(response);
        setAptFloorList(aptFloorList);
    }

    const filterResults = async (id) => {
        if(id == null){
            id = '';
        }
        const response = await fetch(`${AddressInUse}/GET/aptFloors/${id}`)
        const aptFloorList = await response.json();
        setAptFloorList(aptFloorList);
    }

    const addAptFloors = async() => {        
        let floorNum = document.getElementById("floorNumInp").value;
        let fireExits = document.getElementById("fireExitInp").value;
        const newAptFloor = {floorNum, fireExits}
        const response = await fetch(`${AddressInUse}/POST/aptFloors`, {
            method: 'POST',
            body: JSON.stringify(newAptFloor),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the record!");
            await loadAptFloors();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const delAptFloors = async(flrNum) => {
        const response = await fetch(`${AddressInUse}/DELETE/aptFloors/${flrNum}`, {
            method: 'DELETE'
        });
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            //document.getElementById(`${flrNum}`).remove();
            loadAptFloors();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }

    const updateAptFloors = async(aptFloorForUpdate, floorNum, fireExits) => {
        if(typeof floorNum === "object"){
            floorNum = aptFloorForUpdate.floorNum;
        }
        if(typeof fireExits === "object"){
            fireExits = aptFloorForUpdate.fireExits;
        }
        const response = await fetch(`${AddressInUse}/PUT/aptFloors/${aptFloorForUpdate.floorNum}`, {
            method: 'PUT',
            body: JSON.stringify({floorNum:floorNum, fireExits:fireExits}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status >= 200 && response.status < 400 ){
            alert("Successfully updated the record!");
            await loadAptFloors();
            window.location.reload();
            }
        else {
            alert(`Failed to update record, status code = ${response.status}`)
        }

    }

    const openUpdateForm = async(aptFloor) => {
        setAptFloorForUpdate(aptFloor)
        toggle(isShowing);
    }

    const AptFloorInput = () => {
        return<tr>
                    <td><input id="floorNumInp" placeholder="Enter Floor Number Here" /></td>
                    <td><input id="fireExitInp" placeholder="Enter Fire Exits Here"/></td>
                    <td><MdAdd onClick = {addAptFloors}/></td>
                    <td><MdCancel onClick = {removeAddClick}/></td>
                </tr>
    };

    const onAddClick = event => {
        setAddField(<AptFloorInput/>);
    };

    const removeAddClick = event => {
        setAddField();
    };

    // Row of AptFloor data
    function AptFloorList({ aptFloors, filterResults}) {
        return (
            <table id="aptFloors">
                <thead>
                <tr>
                    <th>floorNum <FilterColumn fieldToSearch={"floorNum"} filter={filterResults}/></th>
                    <th>fireExits</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {aptFloors.map((aptFloor, idx) => <AptFloor aptFloor={aptFloor} key={idx}/>)}
                </tbody>
            </table>
        );
    }

    function AptFloor({ aptFloor}) {
        return (
            <tr id={aptFloor.floorNum}>
                <td>{aptFloor.floorNum}</td>
                <td>{aptFloor.fireExits}</td>
                <td><MdEdit onClick={() => openUpdateForm (aptFloor)}/></td>
                <td><MdDelete onClick={() => delAptFloors(aptFloor.floorNum)}/></td>

            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar/>
        <h1>Apartment Floors</h1>
        <p>Apartment Floor table tracks floor specific information of each apartment including fire exits.</p>
        <AptFloorList aptFloors={aptFloorList} filterResults={filterResults}/>
        <Modal isShowing={isShowing} hide={toggle} aptFloorForUpdate={aptFloorForUpdate} setFloorNum={setFloorNum} setFireExits={setFireExits} updateAptFloors={updateAptFloors} floorNum={floorNum} fireExits={fireExits}/>
        <MdAdd onClick={onAddClick}/>
        </>

    )
}

const Modal = ({ isShowing, hide ,aptFloorForUpdate, setFloorNum, setFireExits, updateAptFloors, floorNum, fireExits}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form>
                    <p>Floor Number</p>
                    <input placeholder={aptFloorForUpdate.floorNum} type={"number"} onChange={e => setFloorNum(e.target.value)}/>
                    <p>Fire Exits</p>
                    <input placeholder={aptFloorForUpdate.fireExits} type={"number"} onChange={e => setFireExits(e.target.value)}/>
                    <MdUpdate onClick={e => updateAptFloors(aptFloorForUpdate, floorNum, fireExits)}/>
                </form>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;


export default AptFloors;