import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Header from "../components/Header";

function RodentsToFloors() {
    return(
        <><Header></Header>
        <h1 class = "DatabaseTitle">Rodents To Apartment Floors</h1>
        <p class = "DatabaseText">Rodents to Apartment Floors Tables links rodents to a given floor.  A rodent can be on multiple floors 
        at a given time and a floor can have multiple rodents.</p>
        <table id="Price History">
            <thead>
                <tr>
                    <th>Rodent ID [int]</th>
                    <th>Floor Number [int]</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>93</td>
                    <td>55</td>
                    <td><MdEdit /></td>
                    <td><MdDeleteForever /></td>
                </tr>
            </tbody>
        </table></>



    )};



    export default RodentsToFloors;