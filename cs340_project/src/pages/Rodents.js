import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Header from "../components/Header";

function Rodents() {
    return(
        <><Header></Header>
        <h1 class = "DatabaseTitle">Rodents</h1>
        <p class = "DatabaseText">Rodent entity tracks all information related to rodents in the building. Rodents do
        not get removed from database after extermination or leaving the building</p>
        <table id="Price History">
            <thead>
                <tr>
                    <th>Rodent ID [int]</th>
                    <th>Rodent Name [varchar]</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>93</td>
                    <td>PizzaRat</td>
                    <td><MdEdit /></td>
                    <td><MdDeleteForever /></td>
                </tr>
            </tbody>
        </table></>



    )};



    export default Rodents;