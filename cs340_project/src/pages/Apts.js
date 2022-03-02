import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
function Apts() {
    const [aptList, setAptList] = useState([]);
    const AptInput = () => {
        return <tr>
                    <td>
                        <input placeholder="Apartment Number"/>
                    </td>
                    <td>
                        <input placeholder="Floor Number"/>
                    </td>
                    <td>
                        <input placeholder="Square Footage"/>
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
        setAptList(aptList.concat(<AptInput key={aptList.length} />));
    };
    return(
        <>
        <Header/>
        <SideBar />
        <h1>Apartments</h1>
        <p>Apartments database table tracks specific information regarding an apartment including the floor number, and apartment number.</p>
        <table id="Apts">
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
                <SampleApts/>
                {aptList}
            </tbody>
        </table>
        <div>
            <MdAdd onClick={onAddClick}/>
        </div>
        
        
        </>
    )
}


// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function SampleApts() {
    return(
        <tr>
            <td>55</td>
            <td>666</td>
            <td>2</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>

    )
}


export default Apts;