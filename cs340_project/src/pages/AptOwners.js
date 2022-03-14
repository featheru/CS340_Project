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
        console.log(aptOwnersList);
        aptOwnersList.forEach((item) => item.ssn = ComposeSSN(item.ssn));
        setAptOwnersList(aptOwnersList);
    }

    const ComposeSSN = (ssn) => {
        return "xxx-xx-" + ssn.slice(5,9);
    } 

    const DeComposeSSN = (ssn) => {
        return ssn.slice(0,3) + ssn.slice(4,6) + ssn.slice(7,11);
    }

    const addAptOwners = async() => {
        let firstName = document.getElementById("firstNameInp").value;
        let lastName = document.getElementById("lastNameInp").value;
        let ssn = DeComposeSSN(document.getElementById("ssnInp").value);

        //validate input
        if (firstName.length < 1) {
            alert("Invalid First Name");
            return;
        } else if (lastName.length < 1) {
            alert("Invalid Last Name");
            return;
        } else if (ssn.length !== 0 || ssn.length !== 9) {
            alert("Insufficient length of ssn");
            return;
        }

        if (ssn.length === 0){
            ssn = '';
        }

        const newAptOwner = {firstName, lastName, ssn}
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
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            loadAptOwners();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }
    const filterResults = async (id) => {
        if(id == null){
            id = '';
        }
        const response = await fetch(`${AddressInUse}/GET/aptOwners/${id}`)
        const aptOwnerList = await response.json();
        setAptOwnersList(aptOwnerList);
    }

    const SSNInputFormat = event => {
        var tag = document.getElementById("ssnInp");
        let val = tag.value.replace(/\D/g, '');
        val = val.replace(/^(\d{3})/, '$1-');
        val = val.replace(/-(\d{2})/, '-$1-');
        val = val.replace(/(\d)-(\d{4}).*/, '$1-$2');
        tag.value = val;
    };

    const FirstNameFormat = event => {
        var tag = document.getElementById("firstNameInp");
        let val = tag.value.replace(/[^a-zA-Z]/g, '');
        tag.value = val;
    };

    const LastNameFormat = event => {
        var tag = document.getElementById("lastNameInp");
        let val = tag.value.replace(/[^a-zA-Z]/g, '');
        tag.value = val;
    };
                        

    const AptOwnerInput = () => {
        return <tr>
                    <td></td>
                    <td><input id="firstNameInp" placeholder="First Name e.g. Dan" onKeyUp={FirstNameFormat}/></td>
                    <td><input id="lastNameInp" placeholder="Last Name e.g. Smith" onKeyUp={LastNameFormat}/></td>
                    <td><input id="ssnInp" placeholder="SSN e.g. 111-22-3333" onKeyUp={SSNInputFormat}/></td>
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
                    <th>Owner ID # <FilterColumn fieldToSearch={'ownerId'} filter={filterResults}/></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Social Security #</th>
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
        <p>Tracks current and past apartment owners at Beaver Development by first name, last name, and SSN</p>
        <AptOwnerList aptOwners={aptOwnerList} filterResults={filterResults}/>
        <MdAdd onClick={onAddClick}/>
        </>
    )
}


export default AptOwners;