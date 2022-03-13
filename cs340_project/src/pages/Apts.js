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
    const [floorOptionList, setFloorOptionList] = useState([]);

    const loadApts = async () => {
        const response = await fetch(`${AddressInUse}/GET/apts`);
        const aptList = await response.json();
        setAptList(aptList);
        floorOptions();
    }

    const floorOptions = async () => {
        const response = await fetch(`${AddressInUse}/GET/aptFloors`);
        const floorOptionList = await response.json();
        setFloorOptionList(floorOptionList);
    }

    const addApts = async() => {
        let aptNum = document.getElementById("aptNumInp").value;
        let sqFeet = document.getElementById("sqFeetInp").value;
        let floorNum = document.getElementById("floorNumInp").value;

        if (aptNum.length === 0){
            alert("Please Insert Apartment Number");
            return;
        }

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

    function numFormat(event) {
        var tag = document.getElementById(event.target.id);
        let val = tag.value.replace(/\D/g, '');
        if (val.length > 0 && val[0] == "0"){
            val = '';
        }
        tag.value = val;
    }

    const AptInput = () => {
        return <tr>
                    <td><input id="aptNumInp" placeholder="Apt Num e.g. 11, 22" onKeyUp={(id) => numFormat(id)}/></td>
                    <td><input id="sqFeetInp" placeholder="Sq Feet e.g. 666, 999" onKeyUp={(id) => numFormat(id)}/></td>
                    <td>
                        <select id = "floorNumInp">
                            {floorOptionList.map((item,idx) => <FloorMap item={item} idx = {idx}/>)}
                        </select>
                    </td>
                    <td><MdAdd onClick={addApts}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };

    function FloorMap ({item}) {
        return (
            <option id = {item.floorNum} key={item.floorNum} value={item.floorNum}>{item.floorNum}</option>
        );
    }

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
                    <th>Apartment #<FilterColumn fieldToSearch="aptNum"/></th>
                    <th>Square Footage (ft^2)<FilterColumn fieldToSearch={"sqFeet"}/></th>
                    <th>Floor #<FilterColumn fieldToSearch={"floorNum"}/></th>
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
        <MdAdd onClick={onAddClick}/> 
        <AptList apts={aptList}/>   
        </>
    )
}

export default Apts;