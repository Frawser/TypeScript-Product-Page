import React from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <h1>Welcome to Our Phone Store</h1>
        <p>Discover the latest and greatest phones.</p>
      </div>
    </Container>
  );
};

export default Home;
