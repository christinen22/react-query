import { getCatBreed } from "../../services/api"; // Assuming you have this function
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useState } from "react";

const RandomCatPage = () => {
  const [breed, setBreed] = useState<string | null>(null);

  const getBreedQueryKey = () => {
    if (breed) {
      return ["breed", breed];
    } else {
      return ["random-cat"];
    }
  };

  const breedQuery = useQuery(
    getBreedQueryKey(),
    () => getCatBreed(breed || ""),
    { enabled: !!breed }
  );

  const handleBreedClick = (breed: string) => {
    setBreed(breed);
    breedQuery.refetch();
  };

  return (
    <>
      <h1>I ❤️ Random Cats</h1>
      <Container className="options">
        <Button
          variant="primary"
          onClick={() => handleBreedClick("beng")}
          disabled={breedQuery.isFetching}
        >
          I ❤️ Bengals
        </Button>

        <Button
          variant="primary"
          onClick={() => handleBreedClick("ragd")}
          disabled={breedQuery.isFetching}
        >
          I ❤️ Ragdolls
        </Button>

        <Button
          variant="primary"
          onClick={() => handleBreedClick("norw")}
          disabled={breedQuery.isFetching}
        >
          I ❤️ NoFo
        </Button>

        <Button
          variant="primary"
          onClick={() => setBreed(null)}
          disabled={breedQuery.isFetching}
        >
          I ❤️ all cats
        </Button>
      </Container>

      {breedQuery.isError && <Alert variant="warning">Error</Alert>}

      <div>
        {breedQuery.isFetching ? (
          <Loading />
        ) : (
          <Image src={breedQuery.data?.url} className="cat-img" />
        )}
      </div>

      <Button
        variant="primary"
        disabled={breedQuery.isFetching}
        onClick={() => breedQuery.refetch()}
      >
        NEXT 😺
      </Button>
    </>
  );
};

export default RandomCatPage;
