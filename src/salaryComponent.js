import { Button, Container } from "@material-ui/core";
import React from "react";
import './App.css';

export const SalaryComponent = ({ salary, getSalary }) => {
  return (
    <Container>
      <p>
        If we would like to submit a qualifying offer to any of our upcoming
        free agents it would be in the amount of
        <span> ${salary}</span>.
      </p>
      <Button color="secondary" onClick={() => getSalary()}>ReCalculate</Button>
    </Container>
  );
};
