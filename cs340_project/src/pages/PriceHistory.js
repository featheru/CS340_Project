import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";

function PriceHistory() {
    const [phList, setPHList] = useState([]);
    const PHInput = () => {
        return <div>
            <table>
                <tr>
                    <td>
                        <input placeholder="Seller ID"/>
                    </td>
                    <td>
                        <input placeholder="Buyer ID"/>
                    </td>
                    <td>
                        <input placeholder="Apartment Number"/>
                    </td>
                    <td>
                        <input placeholder="Date of Sale"/>
                    </td>
                    <td>
                        <input placeholder="Price($)"/>
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
        setPHList(phList.concat(<PHInput key={phList.length} />));
    };
    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Price History</h1>
        <p class = "DatabaseText">Price History table tracks information related to a purchase of an apartment by the buying owner from the seller owner.  Information tracked include <br></br>
        price, date of Sale, and apartment number</p>
        <table id="PriceHistory">
            <thead>
                <tr>
                    <th>Invoice Number [varchar]</th>
                    <th>Seller ID [int]</th>
                    <th>Buyer ID [int]</th>
                    <th>Apartment Number [int]</th>
                    <th>Date of Sale(Yyyy-Mm-Dd) [dateTime]</th>
                    <th>Price($) [int]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <SamplePH/>
            </tbody>
        </table>
        {phList}
        <div>
            <MdAdd text = "Add New Apartment Purchase" onClick={onAddClick}>Add New Apartment Purchase</MdAdd>
        </div>
        
        </>
        
    )
}

// TODO: replace dummy data with DB inputs.
// Row of AptFloor data
function SamplePH() {
    return(
        <tr>
            <td>055</td>
            <td>666</td>
            <td>999</td>
            <td>55</td>
            <td>2021-12-15</td>
            <td>1,000,000</td>
            <td><EditButton/></td>
            <td><DeleteButton/></td>
        </tr>

    )
}



export default PriceHistory;