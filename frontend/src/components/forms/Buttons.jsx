import React from "react";
import { Button } from "react-bootstrap";

export const DarkButton = ({ label }) => (
  <Button type="submit" variant="dark" className="mt-3">
    {label}
  </Button>
);
