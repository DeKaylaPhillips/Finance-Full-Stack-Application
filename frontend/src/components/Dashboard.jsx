import axios from "axios";
import { Accordion, Container, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

export default function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [articles, setArticles] = useState([]);

  async function getUserAndArticles() {
    const response = await axios.get("/api/dashboard/");
    console.log(
      "AXIOS Call (getAllArticles)",
      response.data.data.Articles.feed
    );
    setFirstName(response.data.data["First Name"]);
    setLastName(response.data.data["Last Name"]);
    const uniqueArticles = Array.from(
      new Set(response.data.data.Articles.feed)
    );
    console.log(uniqueArticles);
    setArticles(uniqueArticles);
  }

  useEffect(() => {
    getUserAndArticles();
  }, []);

  return (
    <div>
      <NavBar firstName={firstName} lastName={lastName} />
      <div className="container">
        <h2 className="mt-5">Featured Financial News</h2>
        <h4>Never feel out-of-the-loop - Capital Kay Finance has you covered.</h4>
        <h6>
          Remain up-to-date with the financial market by exploring these trending news
          articles.
        </h6>
        {articles.map((article, idx) => (
          <Accordion defaultActiveKey={idx == 0} flush>
            <Accordion.Item eventKey={idx}>
              <div>
                <Accordion.Header>{article.title}</Accordion.Header>
                <Accordion.Body>
                  <h4>{article.summary}</h4>
                  <br />
                  Source: <h5>{article.source}</h5>
                  <br />
                  <a href={article.url}>Click To View The Full Article</a>
                </Accordion.Body>
              </div>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
