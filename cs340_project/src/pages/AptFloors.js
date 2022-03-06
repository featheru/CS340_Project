import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdDelete, MdEdit} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import App from "../App";
import {AddressInUse} from "../ServerConstant.js";

function AptFloors() {
    useEffect(() => {
        loadAptFloors();
    }, []);

    const [aptFloorList, setAptFloorList] = useState([]);
    const [addField, setAddField] = useState([])
    //const dbAddress = 'http://flip2.engr.oregonstate.edu:6363/GET/aptFloors';
    //const dbAddressLocal = 'http://localhost:6363/GET/aptFloors/'

    const loadAptFloors = async () => {
        console.log("MakingRequest")
        console.log(`${AddressInUse}/GET/aptFloors`)
        const response = await fetch(`${AddressInUse}/GET/aptFloors`);
        const aptFloorList = await response.json();
        console.log(response);
        setAptFloorList(aptFloorList);
    }

    const filterResults = async (id) => {
        const response = await fetch(`${AddressInUse}/GET/aptFloors${id}`)
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
            loadAptFloors();
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
                    <th>floorNum <FilterColumn fieldToSearch={"floorNum"} onChange={filterResults}/></th>
                    <th>fireExits</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {aptFloors.map((aptFloor, idx) => <AptFloor aptFloor={aptFloor} key={idx} />)}
                </tbody>
            </table>
        );
    }

    function AptFloor({ aptFloor}) {
        return (
            <tr id={aptFloor.floorNum}>
                <td>{aptFloor.floorNum}</td>
                <td>{aptFloor.fireExits}</td>
                <td><MdEdit/></td>
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
        <MdAdd onClick={onAddClick}/>
        </>
    )
}


export default AptFloors;