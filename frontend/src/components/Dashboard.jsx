import axios from "axios"
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")


  async function getCurrentUser() {
    const response = await axios.get("/api/dashboard/");
    setFirstName(response.data.data['First Name']);
    setLastName(response.data.data['Last Name']);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <h1>
      Wecome {firstName} {lastName}! This is your personal dashboard.
    </h1>
  );
}
