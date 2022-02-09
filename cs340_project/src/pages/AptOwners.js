import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

function AptOwners() {
    return(
        <><Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Apartment Owners</h1>
        <p class = "DatabaseText">AptOwners, or Apartment Owners, database table tracks current and past apartment owners in a
        building by giving each owner a unique ID while storing the owner's first, last name, and SSN.</p>
        <table id="AptOwners">
            <thead>
                <tr>
                    <th>Owner ID [int]</th>
                    <th>First Name [varchar]</th>
                    <th>Last Name [varchar]</th>
                    <th>SSN [varchar]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0</td>
                    <td>Testy</td>
                    <td>Testerson</td>
                    <td>123-456-7890</td>
                    <td><EditButton/></td>
                    <td><DeleteButton/></td>
                </tr>
            </tbody>
        </table></>




    )
}


export default AptOwners;