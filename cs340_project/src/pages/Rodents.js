import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";

function Rodents() {
    const [rodentList, setRodentList] = useState([]);
    const RodentInput = () => {
        return <div>
            <table>
                <tr>
                    <td>
                        <input placeholder="Rodent Name"/>
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
        setRodentList(rodentList.concat(<RodentInput key={rodentList.length} />));
    };
    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Rodents</h1>
        <p class = "DatabaseText">Rodent table tracks all information related to rodents in the building. Rodents do not get removed from database <br></br>
        after extermination or leaving the building and the only info tracked is the name</p>
        <table id="Price History">
            <thead>
                <tr>
                    <th>Rodent ID [int]</th>
                    <th>Rodent Name [varchar]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <SampleRodents/>
            </tbody>
        </table>
        {rodentList}
        <div>
            <MdAdd onClick={onAddClick}></MdAdd>
        </div>        
        </>
    )
}

// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function SampleRodents() {
    return(
        <tr>
            <td>93</td>
            <td>PizzaRat</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>

    )
}

export default Rodents;