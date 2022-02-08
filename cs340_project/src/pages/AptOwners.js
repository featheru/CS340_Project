import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Header from "../components/Header";

function AptOwners() {
    return(
        <><Header></Header>
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
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0</td>
                    <td>Testy</td>
                    <td>Testerson</td>
                    <td>123-456-7890</td>
                    <td><MdEdit /></td>
                    <td><MdDeleteForever /></td>
                </tr>
            </tbody>
        </table></>




    )
}


export default AptOwners;