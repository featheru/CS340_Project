import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";

function Rodents() {
    const [rodentList, setRodentList] = useState([]);
    const RodentInput = () => {
        return <tr>
                    <td></td>
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
                    <th>Rodent ID [int]<FilterColumn fieldToSearch="rodentID"/></th>
                    <th>Rodent Name [varchar] <FilterColumn fieldToSearch={"rodentName"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <SampleRodents/>
                {rodentList}
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