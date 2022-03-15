import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import {MdAdd, MdCancel, MdDelete, MdEdit} from "react-icons/md";
import FilterColumn from "../components/FilterColumn";
import {AddressInUse} from "../ServerConstant.js";

function PriceHistory() {
    useEffect(() => {
        loadPriceHistory();
    }, []);

    const [phList, setPHList] = useState([]);
    const [addField, setAddField] = useState([]);
    const [ownerOptionList, setOwnerOptionList] = useState([]);
    const [aptOptionList, setAptOptionList] = useState([]);

    const loadPriceHistory = async () => {
        const response = await fetch(`${AddressInUse}/GET/priceHistory`);
        const phList = await response.json();
        console.log(phList);
        phList.forEach(formatDisplay);
        setPHList(phList);
        ownerOptions();
        aptOptions();
    }

    function formatDisplay(item) {
        console.log(item.sellerID);
        item.sellerName = item.sellerID !== null ? item.sellerFirstName + " " + item.sellerLastName : "";
        item.buyerName = item.buyerID !== null ? item.buyerFirstName + " " + item.buyerLastName : "";        
        item.price = "$" + item.price;
        let indexVal = item.dateSale.indexOf("T");
        item.dateSale = item.dateSale.slice(0,indexVal); 
    }

    const aptOptions = async () => {
        const response = await fetch(`${AddressInUse}/GET/apts`);
        const aptOptionList = await response.json();
        setAptOptionList(aptOptionList);
    }

    const ownerOptions = async () => {
        const response = await fetch(`${AddressInUse}/GET/aptOwners`);
        const ownerOptionList = await response.json();
        ownerOptionList.forEach((item) => item.ownerName = item.firstName + " " + item.lastName);
        setOwnerOptionList(ownerOptionList);
    }

    const filterResults = async (id) => {
        if(id == null){
            id = '';
        }
        const response = await fetch(`${AddressInUse}/GET/priceHistory/${id}`)
        const phList = await response.json();
        setPHList(phList);
    }

    function numFormat(event) {
        var tag = document.getElementById(event.target.id);
        let val = tag.value.replace(/\D/g, '');
        if (val.length > 0 && val[0] == "0"){
            val = '';
        }
        tag.value = val;
    }

    const addPH = async() => {
        let sellerID = document.getElementById("sellerIDInp").value;
        let buyerID = document.getElementById("buyerIDInp").value;
        let aptNum = document.getElementById("aptNumInp").value;
        let dateSale = document.getElementById("dateSaleInp").value;
        let price = document.getElementById("priceInp").value;
        console.log(sellerID);
        if (dateSale.length < 1){
            alert("Please Input Date of Sale");
            return; 
        } else if (price.length < 1){
            alert("Please Input Price");
            return;
        }
        const newPH = {sellerID, buyerID, aptNum, dateSale, price}
        console.log(JSON.stringify(newPH));
        const response = await fetch(`${AddressInUse}/POST/priceHistory`, {
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
            if (response.status === 410) {
                alert(`Failed to add record due to Duplicate Entry in DB, Server code = ${response.status}`)
            } else {
                alert(`Failed to add record due to DB Error Code: ${response.status}, Server code = ${response.status}`);
            }
        }
    }

    const delPH = async(invoiceNum) => {
        console.log(`Starting process with ${invoiceNum}`)
        const response = await fetch(`${AddressInUse}/DELETE/priceHistory/${invoiceNum}`, {
            method: 'DELETE'
        });
        if(response.status >= 200 && response.status < 400){
            alert("Successfully deleted the record!");
            //document.getElementById(`${invoiceNum}`).remove();
            loadPriceHistory();
        } else {
            alert(`Failed to delete record, status code = ${response.status}`);
        }
    }

    const PHInput = () => {
        return <tr>
                    <td></td>
                    <td>
                        <select id = "sellerIDInp">
                            <option id = "None" key="None" value= "NULL"></option>
                            {ownerOptionList.map((item,idx) => <OwnerMap item={item} idx = {idx}/>)}
                        </select>
                    </td>
                    <td>
                        <select id = "buyerIDInp">
                            <option id = "None" key="None" value= "NULL"></option>
                            {ownerOptionList.map((item,idx) => <OwnerMap item={item} idx = {idx}/>)}
                        </select>
                    </td>
                    <td>
                        <select id = "aptNumInp">
                            {aptOptionList.map((item,idx) => <AptMap item={item} idx = {idx}/>)}
                        </select>
                    </td>
                    <td><input id="dateSaleInp" type = "date" placeholder="Date of Sale e.g. 10/12/2022"/></td>
                    <td><input id="priceInp" placeholder="Price($) e.g. 660,660" onKeyUp={(id) => numFormat(id)}/></td>
                    <td><MdAdd onClick={addPH}/></td>
                    <td><MdCancel onClick={removeAddClick}/></td>
                </tr>
    };
    const onAddClick = event => {
        setAddField(<PHInput/>);
    };

    const removeAddClick = event => {
        setAddField();
    };

    function AptMap ({item}) {
        return (
            <option id = {item.aptNum} key={item.aptNum} value={item.aptNum}>{item.aptNum}</option>
        );
    }

    function OwnerMap ({item}) {
        return (
            <option id = {item.ownerID} key={item.ownerID} value={item.ownerID}>{item.ownerName}</option>
        );
    }

    // Row of AptFloor data
    function PhList({ PHmap, filterResults}) {
        return (
            <table>
                <thead>
                <tr>
                    <th>Invoice #<FilterColumn fieldToSearch="invoiceNum" filter = {filterResults}/></th>
                    <th>Seller Name<FilterColumn fieldToSearch={"sellerID"}/></th>
                    <th>Buyer Name<FilterColumn fieldToSearch={"buyerID"}/></th>
                    <th>Apartment #<FilterColumn fieldToSearch={"aptNum"}/></th>
                    <th>Date of Sale<FilterColumn fieldToSearch={"dateSale"}/></th>
                    <th>Price($)<FilterColumn fieldToSearch={"price"}/></th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {addField}
                {PHmap.map((ph, idx) => <PH ph={ph} key={idx} />)}
                </tbody>
            </table>
        );
    }
    function PH({ph}) {
        return (
            <tr id={ph.invoiceNum}>
                <td>{ph.invoiceNum}</td>
                <td>{ph.sellerName}</td>
                <td>{ph.buyerName}</td>
                <td>{ph.aptNum}</td>
                <td>{ph.dateSale}</td>
                <td>{ph.price}</td>
                <td><MdEdit/></td>
                <td><MdDelete onClick={() => delPH(ph.invoiceNum)}/></td>
            </tr>
        );
    }

    return(
        <>
        <Header/>
        <SideBar/>
        <h1>Price History Table</h1>
        <p>Tracks purchase history of apartments in building by storing buyer, seller, date of Sale, and price</p>
        <MdAdd onClick={onAddClick}></MdAdd>
        <PhList PHmap={phList} filterResults={filterResults}/>
        </>
        
    )
}

export default PriceHistory;