import { Accordion, Alert } from "react-bootstrap";
import { useArticles } from '../hooks/useArticles'
import { useAuth } from "../hooks/useAuth";
import NavBar from "../components/NavBar";

export default function ArticlesPage() {
  const { articlesState, articlesError } = useArticles();
  const { user } = useAuth();

  return (
    <div>
      <NavBar firstName={user.first_name} lastName={user.last_name} />
      <div className="container">
        <h2 className="mt-5">Featured Financial News</h2>
        <h4>
          Never feel out-of-the-loop - Capital Kay Finance has you covered.
        </h4>
        <h6>
          Remain up-to-date with the financial market by exploring these
          trending news articles.
        </h6>

        {articlesError && (
          <div className="mt-3">
            <Alert variant="danger">{articlesError}</Alert>
          </div>
        )}

        {articlesState &&
          articlesState.map((article, idx) => (
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
