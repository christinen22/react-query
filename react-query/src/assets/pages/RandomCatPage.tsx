import { getCatBreed, getRandomCat } from "../../services/CatApi";
import { useQuery } from "@tanstack/react-query";
import { Breed } from "../../types";
//import Loading from "../components/Loading";
//import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Alert, ButtonGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useState } from "react";

const breeds: Breed[] = [
  { id: "", name: "Any" },
  { id: "ragd", name: "Ragdoll" },
  { id: "sibe", name: "Siberian" },
  { id: "beng", name: "Bengal" },
  { id: "pers", name: "Persian" },
  { id: "norw", name: "Norwegian Forest" },
];

const RandomCatPage = () => {
  const [breed, setBreed] = useState("");

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["random-cat", breed],
    queryFn: () => getCatBreed(breed),
  });

  if (error) {
    return <Alert variant="error">No kittycat</Alert>;
  }

  return (
    <>
      <h1>I ❤️ Random Cats</h1>
      <Container>
        <div className="text-center">
          <div className="mb-3">
            <Button
              disabled={isFetching}
              onClick={() => refetch()}
              variant="primary"
            >
              I ❤️ Cats
            </Button>

            <ButtonGroup className="ms-2">
              {breeds.map((breed) => (
                <Button
                  key={breed.id}
                  //disabled={isFetching || breed === breed.id}
                  onClick={() => setBreed(breed.id)}
                  variant="primary"
                >
                  {breed.name}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          {data && <Image className="cat-img" src={data.url} fluid />}
        </div>
        <Button
          variant="primary"
          className="new-btn"
          disabled={isFetching}
          onClick={() => refetch()}
        >
          New kitty ➡️
        </Button>
      </Container>
    </>
  );
};

export default RandomCatPage;
