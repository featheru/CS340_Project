import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import * as db from "../ServerConstant";

function Rodents() {
    useEffect(() => {
        loadRodents();
    }, []);

    const [rodentList, setRodentList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadRodents = async () => {
        const response = await fetch(db.AddressInUse + '/GET/rodents');
        const rodentList = await response.json();
        setRodentList(rodentList);
    }

    const addRodents = async() => {
        let rodentName = document.getElementById("rodentNameInp").value;
        const newRodent = {rodentName}
        const response = await fetch(db.AddressInUse + '/POST/rodents', {
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
            <tr>
                <td>{rodent.rodentID}</td>
                <td>{rodent.rodentName}</td>
                <td><EditButton/></td>
                <td><DeleteButton/></td>
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
        <RodentList rodents = {rodentList} filterResults={filterResults}/>
        <MdAdd onClick={onAddClick}/>      
        </>
    )
}

export default Rodents;