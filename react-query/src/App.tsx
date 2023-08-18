import "./assets/scss/App.scss";
import { Container } from "react-bootstrap";
import Navigation from "./assets/pages/partials/Navigation";
import HomePage from "./assets/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./assets/pages/PageNotFound";
import RandomCatPage from "./assets/pages/RandomCatPage";
import SearchPage from "./assets/pages/SearchPage";

const App = () => {
  return (
    <div id="App">
      <Navigation />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/random-cat" element={<RandomCatPage />} />
          <Route path="/hacker" element={<SearchPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
