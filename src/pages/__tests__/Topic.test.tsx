import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Topic from "../Topic";

describe("App", () => {
  test("renders", () => {
    render(<Topic />);
    expect(screen.getByText("Learn React")).toBeDefined();
  });
});
