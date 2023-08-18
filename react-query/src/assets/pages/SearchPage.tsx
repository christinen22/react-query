import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "../components/Loading";
import HN_ListItem from "../components/HN_ListItem";
import { useSearchParams } from "react-router-dom";
import { searchByDate as HN_searchByDate } from "../../services/HackerAPI";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // get "query=" from URL Search Params
  const query = searchParams.get("query") ?? "";

  const { data, isLoading, isError } = useQuery(
    ["search", query],
    () => HN_searchByDate(query),
    {
      enabled: !!query,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // haxx0r
    if (!searchInput.trim().length) {
      return;
    }

    // set input value as query in searchParams
    setSearchParams({ query: searchInput });
  };

  return (
    <>
      <h1>🔎</h1>

      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter your search query"
            required
            type="text"
            value={searchInput}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            type="submit"
            disabled={!searchInput.trim().length}
          >
            Search
          </Button>
        </div>
      </Form>

      {isError && <Alert variant="warning">{isError}</Alert>}

      {isLoading && <Loading />}

      {data && (
        <div id="search-result">
          <p>
            Showing {new Intl.NumberFormat().format(data.nbHits)} search results
            for "{query}"...
          </p>

          <ListGroup className="mb-3">
            {data.hits.map((hit) => (
              <HN_ListItem key={hit.objectID} item={hit} />
            ))}
          </ListGroup>
        </div>
      )}
    </>
  );
};

export default SearchPage;
