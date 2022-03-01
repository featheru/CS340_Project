import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import App from "../App";

function AptFloors() {
    const [aptFloorList, setAptFloorList] = useState([]);

    const loadAptFloors = async () => {
        const response = await fetch('/aptFloors');
        const aptFloorList = await response.json();
        setAptFloorList(aptFloorList);
    }

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
        <AptFloorList aptFloors={aptFloorList}/>
        <MdAdd onClick={onAddClick}>Add New Apt Floor</MdAdd>
        </>
    )
}

// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function AptFloorList({ aptFloors}) {
    return (
        <table id="aptFloors">
            <thead>
            <tr>
                <th>floorNum</th>
                <th>fireExits</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {aptFloors.map((aptFloor, i) => <AptFloor aptFloor={aptFloor} key={i} />)}
            </tbody>
        </table>
    );
}

function AptFloor({ aptFloor}) {
    return (
        <tr>
            <td>{aptFloor.floorNum}</td>
            <td>{aptFloor.fireExits}</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>
    );
}


export default AptFloors;