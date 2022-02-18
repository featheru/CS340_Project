import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";

function AptOwners() {
    const [aptOwnerList, setAptOwnersList] = useState([]);
    const AptOwnerInput = () => {
        return <tr>
                    <td></td>
                    <td>
                        <input placeholder="First Name"/>
                    </td>
                    <td>
                        <input placeholder="Last Name"/>
                    </td>
                    <td>
                        <input placeholder="SSN"/>
                    </td>
                    <td>
                        <MdAdd/>
                    </td>
                    <td>
                        <MdCancel/>
                    </td>
                </tr>
    };
    const onAddClick = event => {
        setAptOwnersList(aptOwnerList.concat(<AptOwnerInput key={aptOwnerList.length} />));
    };
    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Apartment Owners Table</h1>
        <p class = "DatabaseText">Apartment Owners database table tracks current and past apartment owners at Beaver Development by giving each owner a <br></br>
        unique ID, and storing each owners first and last name as well as SSN.</p>
        <table id="AptOwners">
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
                <SampleAptOwner/>
                {aptOwnerList}
            </tbody>
        </table>
        <div>
            <MdAdd text = "Add New Apartment Owner" onClick={onAddClick}>Add New Apt Owner</MdAdd>
        </div>
        </>
    )
}

// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function SampleAptOwner() {
    return(
        <tr>
            <td>0</td>
            <td>Testy</td>
            <td>Testerson</td>
            <td>123-456-7890</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>
        

    )
}


export default AptOwners;