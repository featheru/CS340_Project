import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdEdit, MdDelete} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import {AddressInUse} from "../ServerConstant.js";

function Rodents() {
    useEffect(() => {
        loadRodents();
    }, []);

    const [rodentList, setRodentList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadRodents = async () => {
        const response = await fetch(`${AddressInUse}/GET/rodents`);
        const rodentList = await response.json();
        setRodentList(rodentList);
    }

    const addRodents = async() => {
        let rodentName = document.getElementById("rodentNameInp").value;
        const newRodent = {rodentName}
        const response = await fetch(`${AddressInUse}/POST/rodents`, {
            method: 'POST',
            body: JSON.stringify(newRodent),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the record!");
            loadRodents();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const delRodents = async(rodentID) => {
        console.log(`Starting process with ${rodentID}`)
        const response = await fetch(`${AddressInUse}/DELETE/rodents/${rodentID}`, {
            method: 'DELETE'
        });
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            document.getElementById(`${rodentID}`).remove();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }

    const RodentInput = () => {
        return <tr>
                    <td></td>
                    <td><input id="rodentNameInp" placeholder="Rodent Name"/></td>
                    <td><MdAdd onClick={addRodents}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };

    const onAddClick = event => {
        setRodentList(<RodentInput />);
    };

    const removeAddClick = event => {
        setAddField();
    };

    // Row of AptFloor data
    function RodentList({ rodents, filterResults}) {
        return (
            <table>
                <thead>
                <tr>
                    <th>Rodent ID [int]<FilterColumn fieldToSearch="rodentID"/></th>
                    <th>Rodent Name [varchar] <FilterColumn fieldToSearch={"rodentName"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {rodents.map((rodent, idx) => <Rodent rodent={rodent} key={idx} />)}
                </tbody>
            </table>
        );
    }

    function Rodent({ rodent}) {
        return (
            <tr id={rodent.rodentID}>
                <td>{rodent.rodentID}</td>
                <td>{rodent.rodentName}</td>
                <td><MdEdit/></td>
                <td><MdDelete onClick={() => delRodents(rodent.rodentID)}/></td>
            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Rodents</h1>
        <p class = "DatabaseText">Rodent table tracks all information related to rodents in the building. Rodents do not get removed from database <br></br>
        after extermination or leaving the building and the only info tracked is the name</p>
        <RodentList rodents = {rodentList}/>
        <MdAdd onClick={onAddClick}/>      
        </>
    )
}

export default Rodents;