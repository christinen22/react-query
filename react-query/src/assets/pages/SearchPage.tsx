import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import HN_ListItem from "../components/HN_ListItem";
import { useSearchParams } from "react-router-dom";
import { searchByDate as HN_searchByDate } from "../../services/HackerAPI";

const SearchPage = () => {
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // get "query=" from URL Search Params
  const query = searchParams.get("query") ?? "";

  const { data, isLoading, isError } = useQuery(
    ["search", query, page],
    () => HN_searchByDate(query, page),
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }

    //reset page state
    setPage(0);

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
          <Button
            variant="primary"
            type="submit"
            disabled={!searchInput.trim().length}
          >
            Search
          </Button>
        </Form.Group>
      </Form>

      {isError && <Alert variant="warning">{isError}</Alert>}

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
          <Pagination
            page={data.page + 1}
            totalPages={data.nbPages}
            hasPreviousPage={page > 0}
            hasNextPage={page + 1 < data.nbPages}
            onPreviousPage={() => {
              setPage((prevValue) => prevValue - 1);
            }}
            onNextPage={() => {
              setPage((prevValue) => prevValue + 1);
            }}
          />
        </div>
      )}
    </>
  );
};

export default SearchPage;
