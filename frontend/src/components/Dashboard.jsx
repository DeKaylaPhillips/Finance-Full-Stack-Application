import axios from "axios"
import { useEffect } from 'react'

export default function Dashboard({ user }) {
  async function getCurrentUser() {
    const response = await axios.get("/api/dashboard/");
    console.log(response);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <h1>
      Wecome! This is your personal dashboard.
    </h1>
  );
}
