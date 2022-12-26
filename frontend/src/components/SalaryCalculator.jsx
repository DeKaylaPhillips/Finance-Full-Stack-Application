import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";

export default function SalaryCalculator() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    async function getCurrentUser() {
        const response = await axios.get("/api/salaryCalculator/");
        setFirstName(response.data.data["First Name"]);
        setLastName(response.data.data["Last Name"]);
        console.log(response);
      }
    
      useEffect(() => {
        getCurrentUser();
      }, []);

    return (
        <div>
        <NavBar firstName={firstName} lastName={lastName} />
        <h1>Salary Calculator Page</h1>
        </div>
    )
}