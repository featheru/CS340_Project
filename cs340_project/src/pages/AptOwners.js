import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";



function AptOwners() {
    const [aptOwnerList, setAptOwnerList] = useState([]);
    const [addField, setAddField] = useState([])

    const AptOwnerInput = () => {
        return <tr>
                    <td></td>
                    <td><input placeholder="First Name"/></td>
                    <td><input placeholder="Last Name"/></td>
                    <td><input placeholder="SSN"/></td>
                    <td><MdAdd onClick = "AptOwnerAdd"/></td>
                    <td><MdCancel/></td>
                </tr>
    };

    async function AptOwnerListLoad() {
        console.log("We are sending a response.");
        const response = await fetch('http://localhost:6363/api');
        const aptOwnerList = await response.json();
        setAptOwnerList(aptOwnerList);
        console.log(aptOwnerList);
        console.log("We got a response.");
        return;
    }

    function AptOwnerListDisplay() {
        AptOwnerListLoad();
        return (
                        <tr>
                            <td>{aptOwnerList.ownerID}</td>
                            <td>{aptOwnerList.firstName}</td>
                            <td>{aptOwnerList.lastName}</td>
                            <td>{aptOwnerList.ssn}</td>
                            <td/>
                            <td/>
                        </tr>
                    );

                    
    }

    /*
    (aptOwnerList.map((row, idx) => <AptOwnerRow 
                        row={row}
                        onDelete = {onDelete}
                        onEdit = {onEdit}
                        key={idx} />))


    (
            <tr>
                <td>test</td>
                <td>testing</td>
                <td>test</td>
                <td>test</td>
                <td/>
                <td/>
            </tr>
        )
    */
    
    function AptOwnerRow({row}) {
        return (
            <tr>
                <td>{row.ownerID}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.ssn}</td>
                <td/>
                <td/>
            </tr>
        );
    }
    

    const AptOwnerAdd = async () => {
        //provide alert of some sort
        //Load updated list
    }

    const dispAddField = () => {
        setAddField(<AptOwnerInput/>);
    };
    return(
        <>
        <Header/>
        <SideBar/>
        <h1>Apartment Owners Table</h1>
        <p>Apartment Owners database table tracks current and past apartment owners at Beaver Development by giving each owner a <br></br>
        unique ID, and storing each owners first and last name as well as SSN.</p>
        <table>
            <thead>
                <tr>
                    <th>Owner ID [int]<FilterColumn fieldToSearch="ownerID"/></th>
                    <th>First Name [varchar]<FilterColumn fieldToSearch={"firstName"}/></th>
                    <th>Last Name [varchar]<FilterColumn fieldToSearch={"lastName"}/></th>
                    <th>SSN [varchar]<FilterColumn fieldToSearch={"ssn"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <AptOwnerListDisplay jsonRows = {aptOwnerList}/>
                {addField}
            </tbody>
        </table>
        <div>
            <MdAdd onClick={dispAddField}/>
        </div>
        </>
    )
}





export default AptOwners;