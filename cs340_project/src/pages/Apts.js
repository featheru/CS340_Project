import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import * as db from "../ServerConstant";

function Apts() {
    useEffect(() => {
        loadApts();
    }, []);

    const [aptList, setAptList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadApts = async () => {
        const response = await fetch(db.AddressInUse + '/GET/apts');
        const aptList = await response.json();
        setAptList(aptList);
    }

    const addApts = async() => {
        let aptNum = document.getElementById("aptNumInp").value;
        let sqFeet = document.getElementById("sqFeetInp").value;
        let floorNum = document.getElementById("floorNumInp").value;
        const newApt = {aptNum, sqFeet, floorNum}
        //console.log(JSON.stringify(newAptOwner));
        const response = await fetch(db.AddressInUse + '/POST/apts', {
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
                    <th>Apartment Number [int]<FilterColumn fieldToSearch="aptNum"/></th>
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
            <tr>
                <td>{apt.aptNum}</td>
                <td>{apt.sqFeet}</td>
                <td>{apt.floorNum}</td>
                <td><EditButton/></td>
                <td><DeleteButton/></td>
            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Apartments</h1>
        <p class = "DatabaseText">Apartments database table tracks specific information regarding an apartment including the floor number, and apartment number.</p>
        <AptList apts={aptList}  filterResults={filterResults}/>
        <MdAdd onClick={onAddClick}/>        
        </>
    )
}

export default Apts;