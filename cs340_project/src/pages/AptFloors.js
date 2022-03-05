import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import App from "../App";
import * as db from "../ServerConstant";

function AptFloors() {
    useEffect(() => {
        loadAptFloors();
    }, []);

    const [aptFloorList, setAptFloorList] = useState([]);
    const [addField, setAddField] = useState([])
    const dbAddress = 'http://flip2.engr.oregonstate.edu:6363/GET/aptFloors';
    const dbAddressLocal = 'http://localhost:6363/GET/aptFloors/'

    const loadAptFloors = async () => {
        const response = await fetch(`${dbAddress}`);
        const aptFloorList = await response.json();
        setAptFloorList(aptFloorList);
    }

    const filterResults = async (id) => {
        const response = await fetch(`${dbAddress}${id}`)
        const aptFloorList = await response.json();
        setAptFloorList(aptFloorList);
    }

    const addAptFloors = async() => {
        
        //const newAptFloor = {floorNum: document.getElementById("floorNumInp").value, fireExits: document.getElementById("fireExitInp").value};
        let floorNum = document.getElementById("floorNumInp").value;
        let fireExits = document.getElementById("fireExitInp").value;
        const newAptFloor = {floorNum, fireExits}
        //console.log(JSON.stringify(newAptFloor));
        const response = await fetch('http://flip2.engr.oregonstate.edu:6363/POST/aptFloors', {
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

    const delAptFloors = async() => {
        //IN PROGRESS
        const response = await fetch(db.AddressInUse + '/DELETE/aptFloors', {
            method: 'POST',
            body: JSON.stringify(newAptFloor),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully deleted the record!");
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
            <tr>
                <td>{aptFloor.floorNum}</td>
                <td>{aptFloor.fireExits}</td>
                <td><EditButton/></td>
                <td><DeleteButton/></td>
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