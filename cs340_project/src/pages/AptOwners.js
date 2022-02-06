import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Header from "../components/Header";

function AptOwners() {
    return(
        <><Header></Header>
        <table id="AptOwners">
            <thead>
                <tr>
                    <th>ownerID</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>ssn</th>
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
                    <td><MdEdit /></td>
                    <td><MdDeleteForever /></td>
                </tr>
            </tbody>
        </table></>




    )
}


export default AptOwners;