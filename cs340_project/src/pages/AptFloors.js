import React from "react";
import Header from "../components/Header";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

function AptFloors() {
    return(
        <><Header/>
        <h1 class = "DatabaseTitle">Apartment Floors</h1>
        <p class = "DatabaseText">AptFloors, or Apartment Floors, database table tracks floor specific information of each
        apartment and is used to link rodents to specific floors</p>
        <table id="AptFloors">
            <thead>
                <tr>
                    <th>Floor Number [int]</th>
                    <th>Fire Exits [int]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>55</td>
                    <td>666</td>
                    <td><EditButton/></td>
                    <td><DeleteButton/></td>
                </tr>
            </tbody>
        </table></>



    )}



    export default AptFloors;