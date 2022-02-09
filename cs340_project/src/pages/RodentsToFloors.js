import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

function RodentsToFloors() {
    return(
        <><Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Rodents To Apartment Floors</h1>
        <p class = "DatabaseText">Rodents to Apartment Floors Tables links rodents to a given floor.  A rodent can be on multiple floors 
        at a given time and a floor can have multiple rodents.</p>
        <table id="Price History">
            <thead>
                <tr>
                    <th>Rodent ID [int]</th>
                    <th>Floor Number [int]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>93</td>
                    <td>55</td>
                    <td><EditButton/></td>
                    <td><DeleteButton/></td>
                </tr>
            </tbody>
        </table></>



    )}



    export default RodentsToFloors;