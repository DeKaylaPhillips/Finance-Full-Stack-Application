import axios from "axios";
import { Container, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";


export default function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let background =
    "https://www.pngmart.com/files/7/Budget-Transparent-Background.png";

  async function getCurrentUser() {
    const response = await axios.get("/api/dashboard/");
    setFirstName(response.data.data["First Name"]);
    setLastName(response.data.data["Last Name"]);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
    <NavBar firstName={firstName} lastName={lastName} />
      <Container fluid>
        <Image src={background} />
      </Container>
    </>
  );
}
