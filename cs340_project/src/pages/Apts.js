import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdDelete, MdEdit} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import {AddressInUse} from "../ServerConstant.js";

function Apts() {
    useEffect(() => {
        loadApts();
    }, []);

    const [aptList, setAptList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadApts = async () => {
        const response = await fetch(`${AddressInUse}/GET/apts`);
        const aptList = await response.json();
        setAptList(aptList);
    }

    const filterResults = async (id) => {
        if(id == null){
            id = '';
        }
        const response = await fetch(`${AddressInUse}/GET/apts/${id}`)
        const aptList = await response.json();
        setAptList(aptList);
    }

    const addApts = async() => {
        let aptNum = document.getElementById("aptNumInp").value;
        let sqFeet = document.getElementById("sqFeetInp").value;
        let floorNum = document.getElementById("floorNumInp").value;
        const newApt = {aptNum, sqFeet, floorNum}
        //console.log(JSON.stringify(newAptOwner));
        const response = await fetch(`${AddressInUse}/POST/apts`, {
            method: 'POST',
            body: JSON.stringify(newApt),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the record!");
            loadApts();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const delApts = async(aptNum) => {
        console.log(`Starting process with ${aptNum}`)
        const response = await fetch(`${AddressInUse}/DELETE/apts/${aptNum}`, {
            method: 'DELETE'
        });
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            //document.getElementById(`${aptNum}`).remove();
            loadApts();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }

    const AptInput = () => {
        return <tr>
                    <td><input id="aptNumInp" placeholder="Apartment Number"/></td>
                    <td><input id="sqFeetInp" placeholder="Square Footage"/></td>
                    <td><input id="floorNumInp" placeholder="Floor Number"/></td>
                    <td><MdAdd onClick={addApts}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };

    const onAddClick = event => {
        setAddField(<AptInput/>);
    };

    const removeAddClick = event => {
        setAddField();
    };

    // Row of AptFloor data
    function AptList({ apts, filterResults}) {
        return (
            <table>
                <thead>
                <tr>
                    <th>Apartment Number [int]<FilterColumn fieldToSearch="aptNum" filter={filterResults}/></th>
                    <th>Square Footage (ft^2) [int]<FilterColumn fieldToSearch={"sqFeet"}/></th>
                    <th>Floor Number<FilterColumn fieldToSearch={"floorNum"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {apts.map((apt, idx) => <Apt apt={apt} key={idx} />)}
                </tbody>
            </table>
        );
    }

    function Apt({apt}) {
        return (
            <tr id={apt.aptNum}>
                <td>{apt.aptNum}</td>
                <td>{apt.sqFeet}</td>
                <td>{apt.floorNum}</td>
                <td><MdEdit/></td>
                <td><MdDelete onClick={() => delApts(apt.aptNum)}/></td>
            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Apartments</h1>
        <p class = "DatabaseText">Apartments database table tracks specific information regarding an apartment including the floor number, and apartment number.</p>
        <AptList apts={aptList} filterResults={filterResults}/>
        <MdAdd onClick={onAddClick}/>        
        </>
    )
}

export default Apts;