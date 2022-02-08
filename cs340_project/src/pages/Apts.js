import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Header from "../components/Header";

function Apts() {
    return(
        <><Header></Header>
        <h1 class = "DatabaseTitle">Apartments</h1>
        <p class = "DatabaseText">Apts, or Apartments, database table tracks floor specific information of each
        apartment and is used to link rodents to specific floors</p>
        <table id="Apts">
            <thead>
                <tr>
                    <th>Apartment Number [int]</th>
                    <th>Square Footage (ft^2) [int]</th>
                    <th>Floor Number</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>55</td>
                    <td>666</td>
                    <td><MdEdit /></td>
                    <td><MdDeleteForever /></td>
                </tr>
            </tbody>
        </table></>
            



    )};



    export default Apts;