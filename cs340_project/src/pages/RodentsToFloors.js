import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import * as db from "../ServerConstant";

function RodentsToFloors() {
    useEffect(() => {
        loadRodentsToFloors();
    }, []);

    const [rodentToFloorList, setRodentToFloorList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadRodentsToFloors = async () => {
        const response = await fetch(db.AddressInUse + '/GET/rodentsToFloors');
        const rodentToFloorList = await response.json();
        setPHList(rodentToFloorList);
    }

    const addRTF = async() => {
        let rodentID = document.getElementById("rodentIDInp").value;
        let floorNum = document.getElementById("floorNumInp").value;
        const newRTF = {rodentID, floorNum}
        //console.log(JSON.stringify(newAptOwner));
        const response = await fetch(db.AddressInUse + '/POST/rodentsToFloors', {
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

    const RodentToFloorInput = () => {
        return <tr>
                    <td><input id="rodentIDInp" placeholder="Rodent ID"/></td>
                    <td><input id="floorNumInp" placeholder="Floor Number"/></td>
                    <td><MdAdd onClick={addRTF}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };
    
    const onAddClick = event => {
        setRodentToFloorList(<RodentToFloorInput/>);
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
                <tr>
                    <td>{rtf.rodentID}</td>
                    <td>{rtf.floorNum}</td>
                    <td><EditButton/></td>
                    <td><DeleteButton/></td>
                </tr>
            );
        }
    
        return(
            <>
            <Header/>
            <SideBar />
            <h1>Rodents To Apartment Floors</h1>
            <p>Rodents to Apartment Floors table tracks the possibly multiple floors that rodents are currently on at a given period of time</p>
            <RTFList rtfList={rodentToFloorList} filterResults={filterResults}/>
            <MdAdd onClick={onAddClick}></MdAdd>
            </>
            
        )
}

export default RodentsToFloors;