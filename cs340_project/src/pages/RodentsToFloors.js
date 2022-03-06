import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdEdit, MdDelete} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import {AddressInUse} from "../ServerConstant.js";

function RodentsToFloors() {
    useEffect(() => {
        loadRodentsToFloors();
    }, []);

    const [rodentToFloorList, setRodentToFloorList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadRodentsToFloors = async () => {
        const response = await fetch(`${AddressInUse}/GET/rodentsToFloors`);
        const rodentToFloorList = await response.json();
        setRodentToFloorList(rodentToFloorList);
    }

    const addRTF = async() => {
        let rodentID = document.getElementById("rodentIDInp").value;
        let floorNum = document.getElementById("floorNumInp").value;
        const newRTF = {rodentID, floorNum}
        //console.log(JSON.stringify(newAptOwner));
        const response = await fetch(`${AddressInUse}/POST/rodentsToFloors`, {
            method: 'POST',
            body: JSON.stringify(newRTF),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the record!");
            loadRodentsToFloors();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const delRodentsToFloors = async(rodentID, floorNum) => {
        console.log(`Starting process with ${rodentID}+${floorNum}`)
        const response = await fetch(`${AddressInUse}/DELETE/rodentsToFloors/${rodentID}/${floorNum}`, {
            method: 'DELETE'
        });
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            //document.getElementById(`${rodentID}-${floorNum}`).remove();
            loadRodentsToFloors();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }

    const RodentToFloorInput = () => {
        return <tr>
                    <td><input id="rodentIDInp" placeholder="Rodent ID"/></td>
                    <td><input id="floorNumInp" placeholder="Floor Number"/></td>
                    <td><MdAdd onClick={addRTF}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };
    
    const onAddClick = event => {
        setAddField(<RodentToFloorInput/>);
    };

    const removeAddClick = event => {
        setAddField();
    };

        // Row of AptFloor data
        function RTFList({ rtfList, filterResults}) {
            return (
                <table>
                    <thead>
                    <tr>
                        <th>Rodent ID [int]<FilterColumn fieldToSearch={"rodentID"}/></th>
                        <th>Floor Number [int]<FilterColumn fieldToSearch={"floorNum"}/></th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addField}
                    {rtfList.map((rtf, idx) => <RTFmap rtf={rtf} key={idx} />)}
                    </tbody>
                </table>
            );
        }
        function RTFmap({rtf}) {
            return (
                <tr id={`${rtf.rodentID}-${rtf.floorNum}`}>
                    <td>{rtf.rodentID}</td>
                    <td>{rtf.floorNum}</td>
                    <td><MdEdit/></td>
                    <td><MdDelete onClick={() => delRodentsToFloors(rtf.rodentID,rtf.floorNum)}/></td>
                </tr>
            );
        }
    
        return(
            <>
            <Header/>
            <SideBar />
            <h1>Rodents To Apartment Floors</h1>
            <p>Rodents to Apartment Floors table tracks the possibly multiple floors that rodents are currently on at a given period of time</p>
            <RTFList rtfList={rodentToFloorList}/>
            <MdAdd onClick={onAddClick}></MdAdd>
            </>
            
        )
}

export default RodentsToFloors;