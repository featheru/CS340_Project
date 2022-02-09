import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";

function Rodents() {
    return(
        <><Header/>
        <SideBar />
        <h1 class = "DatabaseTitle">Rodents</h1>
        <p class = "DatabaseText">Rodent entity tracks all information related to rodents in the building. Rodents do
        not get removed from database after extermination or leaving the building</p>
        <table id="Price History">
            <thead>
                <tr>
                    <th>Rodent ID [int]</th>
                    <th>Rodent Name [varchar]</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>93</td>
                    <td>PizzaRat</td>
                    <td><EditButton/></td>
                    <td><DeleteButton/></td>
                </tr>
            </tbody>
        </table></>



    )}



    export default Rodents;