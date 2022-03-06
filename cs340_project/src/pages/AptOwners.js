import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdDelete, MdEdit} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import {AddressInUse} from "../ServerConstant.js";

function AptOwners() {
    useEffect(() => {
        loadAptOwners();
    }, []);

    const [aptOwnerList, setAptOwnersList] = useState([]);
    const [addField, setAddField] = useState([])

    const loadAptOwners = async () => {
        const response = await fetch(`${AddressInUse}/GET/aptOwners`);
        const aptOwnersList = await response.json();
        setAptOwnersList(aptOwnersList);
    }

    const addAptOwners = async() => {
        let firstName = document.getElementById("firstNameInp").value;
        let lastName = document.getElementById("lastNameInp").value;
        let ssn = document.getElementById("ssnInp").value;
        const newAptOwner = {firstName, lastName, ssn}
        //console.log(JSON.stringify(newAptOwner));
        const response = await fetch(`${AddressInUse}/POST/aptOwners`, {
            method: 'POST',
            body: JSON.stringify(newAptOwner),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the record!");
            loadAptOwners();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const delAptOwners = async(ownerID) => {
        console.log(`Starting process with ${ownerID}`)
        const response = await fetch(`${AddressInUse}/DELETE/aptOwners/${ownerID}`, {
            method: 'DELETE'
        });
        console.log(response);
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            //document.getElementById(`${ownerID}`).remove();
            loadAptOwners();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }

    const AptOwnerInput = () => {
        return <tr>
                    <td></td>
                    <td><input id="firstNameInp" placeholder="First Name"/></td>
                    <td><input id="lastNameInp" placeholder="Last Name"/></td>
                    <td><input id="ssnInp" placeholder="SSN"/></td>
                    <td><MdAdd onClick = {addAptOwners}/></td>
                    <td><MdCancel onClick = {removeAddClick}/></td>
                </tr>
    };
    const onAddClick = event => {
        setAddField(<AptOwnerInput/>);
    };

    const removeAddClick = event => {
        setAddField();
    };

    // Row of AptFloor data
    function AptOwnerList({ aptOwners, filterResults}) {
        return (
            <table>
                <thead>
                <tr>
                    <th>Owner ID [int]</th>
                    <th>First Name [varchar]</th>
                    <th>Last Name [varchar]</th>
                    <th>SSN [varchar]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {aptOwners.map((aptOwner, idx) => <AptOwner aptOwner={aptOwner} key={idx} />)}
                </tbody>
            </table>
        );
    }

    function AptOwner({ aptOwner}) {
        return (
            <tr id={aptOwner.ownerID}>
                <td>{aptOwner.ownerID}</td>
                <td>{aptOwner.firstName}</td>
                <td>{aptOwner.lastName}</td>
                <td>{aptOwner.ssn}</td>
                <td><MdEdit/></td>
                <td><MdDelete onClick={() => delAptOwners(aptOwner.ownerID)}/></td>
            </tr>
        );
    }


    return(
        <>
        <Header/>
        <SideBar />
        <h1>Apartment Owners Table</h1>
        <p>Apartment Owners database table tracks current and past apartment owners at Beaver Development by giving each owner a <br></br>
        unique ID, and storing each owners first and last name as well as SSN.</p>
        <AptOwnerList aptOwners={aptOwnerList}/>
        <MdAdd onClick={onAddClick}/>
        </>
    )
}


export default AptOwners;