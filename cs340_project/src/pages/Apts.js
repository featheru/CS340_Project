import React from "react";
import Header from "../components/Header";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
function Apts() {
    return(
        <><Header/>
        <h1 class = "DatabaseTitle">Apartments</h1>
        <p class = "DatabaseText">Apts, or Apartments, database table tracks floor specific information of each
        apartment and is used to link rodents to specific floors</p>
        <table id="Apts">
            <thead>
                <tr>
                    <th>Apartment Number [int]</th>
                    <th>Square Footage (ft^2) [int]</th>
                    <th>Floor Number</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>55</td>
                    <td>666</td>
                    <td>2</td>
                    <td><EditButton/></td>
                    <td><DeleteButton/></td>
                </tr>
            </tbody>
        </table></>




    )}
    export default Apts;