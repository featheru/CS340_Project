import React, {useState} from "react";
import Header from "../components/Header";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";

function AptFloors() {
    const [aptFloorList, setAptFloorList] = useState([]);
    const AptFloorInput = () => {
        return<div>
            <table>
                <tr>
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
            </table>


        </div>
    };
    const onAddClick = event => {
        setAptFloorList(aptFloorList.concat(<AptFloorInput key={aptFloorList.length} />));
    };

    return(
        <><Header/>
        <h1 class = "DatabaseTitle">Apartment Floors</h1>
        <p class = "DatabaseText">AptFloors, or Apartment Floors, database table tracks floor specific information of each
        apartment and is used to link rodents to specific floors</p>
        <table id="AptFloors">
            <thead>
                <tr>
                    <th>Floor Number [int]</th>
                    <th>Fire Exits [int]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            <AptFloor/>
            </tbody>
        </table>
            {aptFloorList}
            <div>
                <MdAdd onClick={onAddClick}>Add New Apt</MdAdd>
            </div>
        </>




    )}


// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function AptFloor() {
    return(
        <tr>
            <td>55</td>
            <td>666</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>

    )
}

    export default AptFloors;