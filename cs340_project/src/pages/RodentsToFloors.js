import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

function RodentsToFloors() {
    const [rodentToFloorList, setRodentToFloor] = useState([]);
    const RodentToFloorInput = () => {
        return <div>
            <table>
                <tr>
                    <td>
                        <input placeholder="Rodent ID"/>
                    </td>
                    <td>
                        <input placeholder="Floor Number"/>
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
        setRodentToFloorList(rodentToFloorList.concat(<RodentToFloorInput key={rodentToFloorList.length} />));
    };
    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Rodents To Apartment Floors</h1>
        <p class = "DatabaseText">Rodents to Apartment Floors table tracks the possibly multiple floors that rodents are currently on at a given period of time</p>
        <table id="Price History">
            <thead>
                <tr>
                    <th>Rodent ID [int]</th>
                    <th>Floor Number [int]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <SampleRodentsToFloors/>
            </tbody>
        </table>
        {rodentToFloorList}
        <div>
            <MdAdd text = "Add New Rodent to Floor Relationship" onClick={onAddClick}>Add New Rodent to Floor Relationship</MdAdd>
        </div>
        
        </>



    )
}

// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function SampleRodentsToFloors() {
    return(
        <tr>
            <td>93</td>
            <td>55</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>

    )
}



export default RodentsToFloors;