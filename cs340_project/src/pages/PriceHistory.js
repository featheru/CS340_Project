import React, {useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import * as db from "../ServerConstant";

function PriceHistory() {
    useEffect(() => {
        loadPriceHistory();
    }, []);

    const [phList, setPHList] = useState([]);
    const [addField, setAddField] = useState([]);

    const loadPriceHistory = async () => {
        const response = await fetch(db.AddressInUse + '/GET/priceHistory');
        const phList = await response.json();
        setPHList(phList);
    }

    const addPH = async() => {
        let sellerID = document.getElementById("sellerIDInp").value;
        let buyerID = document.getElementById("buyerIDInp").value;
        let aptNum = document.getElementById("aptNumInp").value;
        let dateSale = document.getElementById("dateSaleInp").value;
        let price = document.getElementById("priceInp").value;
        const newPH = {sellerID, buyerID, aptNum, dateSale, price}
        //console.log(JSON.stringify(newAptOwner));
        const response = await fetch(db.AddressInUse + '/POST/priceHistory', {
            method: 'POST',
            body: JSON.stringify(newPH),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added the record!");
            loadPriceHistory();
            removeAddClick();
        } else {
            alert(`Failed to add record, status code = ${response.status}`);
        }
    }

    const PHInput = () => {
        return <tr>
                    <td></td>
                    <td><input id="sellerIDInp" placeholder="Seller ID"/></td>
                    <td><input id="buyerIDInp" placeholder="Buyer ID"/></td>
                    <td><input id="aptNumInp" placeholder="Apartment Number"/></td>
                    <td><input id="dateSaleInp" placeholder="Date of Sale"/></td>
                    <td><input id="priceInp" placeholder="Price($)"/></td>
                    <td><MdAdd onClick={addPH}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };
    const onAddClick = event => {
        setPHList(<PHInput/>);
    };

    const removeAddClick = event => {
        setAddField();
    };

    // Row of AptFloor data
    function PhList({ pH, filterResults}) {
        return (
            <table>
                <thead>
                <tr>
                    <th>Invoice Number [varchar]<FilterColumn fieldToSearch="invoiceNum"/></th>
                    <th>Seller ID [int]<FilterColumn fieldToSearch={"sellerID"}/></th>
                    <th>Buyer ID [int]<FilterColumn fieldToSearch={"buyerID"}/></th>
                    <th>Apartment Number [int]<FilterColumn fieldToSearch={"aptNum"}/></th>
                    <th>Date of Sale [dateTime]<FilterColumn fieldToSearch={"dateSale"}/></th>
                    <th>Price($) [int]<FilterColumn fieldToSearch={"price"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {pH.map((ph, idx) => <PH ph={ph} key={idx} />)}
                </tbody>
            </table>
        );
    }
    function PH({ph}) {
        return (
            <tr>
                <td>{ph.invoiceNum}</td>
                <td>{ph.sellerID}</td>
                <td>{ph.buyerID}</td>
                <td>{ph.aptNum}</td>
                <td>{ph.dateSale}</td>
                <td><EditButton/></td>
                <td><DeleteButton/></td>
            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Price History</h1>
        <p class = "DatabaseText">Price History table tracks information related to a purchase of an apartment by the buying owner from the seller owner.  Information tracked include <br></br>
        price, date of Sale, and apartment number</p>
        <PhList pH={phList} filterResults={filterResults}/>
        <MdAdd text = "Add New Apartment Purchase" onClick={onAddClick}>Add New Apartment Purchase</MdAdd>
        
        
        </>
        
    )
}

export default PriceHistory;