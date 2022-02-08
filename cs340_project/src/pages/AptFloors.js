import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Header from "../components/Header";

function AptFloors() {
    return(
        <><Header></Header>
        <h1 class = "DatabaseTitle">Apartment Floors</h1>
        <p class = "DatabaseText">AptFloors, or Apartment Floors, database table tracks floor specific information of each
        apartment and is used to link rodents to specific floors</p>
        <table id="AptFloors">
            <thead>
                <tr>
                    <th>Floor Number [int]</th>
                    <th>Fire Exits [int]</th>
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



    export default AptFloors;