import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import {AptOwnerDummyData} from "../data/AptOwnerDummyData.js"

function AptOwners() {
    const [aptOwnerList, setAptOwnersList] = useState([]);

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
    const [firstName, setFirstName] = useState(null);

    const onEdit = ({id, currentFirstName}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setFirstName(currentFirstName);
    }

    const loadAptOwners = async () => {
        setAptOwnersList(AptOwnerDummyData);
    };

    useEffect(() => {
        loadAptOwners();
    }, []);

    const AptOwnerInput = () => {
        return <div>
            <table>
                <tr>
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
            </table>
        </div>
    };
    const onAddClick = event => {
        setAptOwnersList(aptOwnerList.concat(<AptOwnerInput key={aptOwnerList.length} />));
    };

    function AptOwnerList({aptOwners}){
        return(
            <tbody>{aptOwners.map((aptOwner, i) => <AptOwner aptOwner={aptOwner} key={i} />)}</tbody>

        )
    }


    function AptOwner({aptOwner}) {
        return(
            <tr>
                <td>{aptOwner.ownerID}</td>
                <td>{
                    inEditMode.status && inEditMode.rowKey === aptOwner.id ? (
                        <input value={firstName}
                               onChange={(event) => setFirstName(event.target.value)}
                        />
                    ) : (
                        aptOwner.firstName
                    )
                }</td>
                <td>{aptOwner.lastName}</td>
                <td>{aptOwner.ssn}</td>
                <td><button onClick={() => onEdit({id: aptOwner.id, currentUnitPrice: aptOwner.firstName})}/></td>
                <td><DeleteButton/></td>
            </tr>
        )
    }
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
                    <th>Owner ID [int]</th>
                    <th>First Name [varchar]</th>
                    <th>Last Name [varchar]</th>
                    <th>SSN [varchar]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <AptOwnerList aptOwners={aptOwnerList}/>
        </table>

        <div>
            <MdAdd text = "Add New Apartment Owner" onClick={onAddClick}>Add New Apt Owner</MdAdd>
        </div>
        </>
    )
}

export default AptOwners;