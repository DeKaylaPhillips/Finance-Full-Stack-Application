import React from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { useEffect } from "react";

export default function SalaryFinder() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [salaryInfo, setSalaryInfo] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  async function getCurrentUser() {
    const response = await axios.get("/api/salaryFinder/");
    setFirstName(response.data.data["First Name"]);
    setLastName(response.data.data["Last Name"]);
    console.log(response);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  //   how to send search results to a 3rd party API ??*

  async function sendSearchResults(event) {
    event.preventDefault();
    const response = await axios.post("/api/salaryFinder/", {
      "Job Query": jobQuery,
      "Location Query": locationQuery,
    });
    setSalaryInfo(response.data.data["Salary Info"]);
    setSearchClicked(true);
  }

  return (
    <div>
      <NavBar firstName={firstName} lastName={lastName} />
      <div className="container">
        <h1 className="mt-5">National Salary Searcher</h1>
        <h3>Capital Kay Finance wants to help you recognize your worth.</h3>
        <h5>
          Use our salary search engine to receive transparent salary estimates
          based on job title and location.
        </h5>
        <br />
        <br />
        <Form onSubmit={sendSearchResults}>
          <Form.Group className="mb-3" controlId="formSearch">
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              placeholder='i.e. "Software Engineer"'
              onChange={(e) => setJobQuery(e.target.value)}
            />
            <Form.Text className="text-muted">
              Receive salary estimates based on the job entered above.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder='i.e. "Houston, Texas"'
              onChange={(e) => setLocationQuery(e.target.value)}
            />
            <Form.Text className="text-muted">
              Salary estimates may vary by location and site publisher.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        <br />
        <br />
        <div>
          {jobQuery != "" && locationQuery != "" && searchClicked ? (
            <div>
              <h5>
                Results based on your search for '{jobQuery}' jobs in '
                {locationQuery}':
              </h5>
              <br />
              <br />
              {salaryInfo.map((job) => (
                <div key={job.id}>
                  <ListGroup as="ul">
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{job.job_title}</div>
                        Minimum Salary: {job.min_salary}
                        <br />
                        Median Salary: {job.median_salary}
                        <br />
                        Maximum Salary: {job.max_salary}
                        <br />
                      </div>
                      <Badge bg="dark" pill>
                        Source: {job.publisher}
                      </Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
