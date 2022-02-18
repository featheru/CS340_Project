import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";

function AptFloors() {
    const [aptFloorList, setAptFloorList] = useState([]);
    const AptFloorInput = () => {
        return<tr>
                    <td>
                        <input placeholder="Floor number"/>
                    </td>
                    <td>
                        <input placeholder="Fire exits"/>
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
        setAptFloorList(aptFloorList.concat(<AptFloorInput key={aptFloorList.length} />));
    };

    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Apartment Floors</h1>
        <p class = "DatabaseText">Apartment Floor table tracks floor specific information of each apartment including fire exits.</p>
        <table id="AptFloors">
            <thead>
                <tr>
                    <th>Floor Number [int]<FilterColumn fieldToSearch="floorNum"/></th>
                    <th>Fire Exits [int]<FilterColumn fieldToSearch={"fireExits"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <SampleAptFloor/>
                {aptFloorList}
                
            </tbody>
        </table>
        <MdAdd onClick={onAddClick}>Add New Apt Floor</MdAdd>
        </>
    )
}

// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function SampleAptFloor() {
    return(
        <tr>
            <td>55</td>
            <td>666</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>
)}


export default AptFloors;