import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import About from "../index";

const renderWithProviders = (component: React.ReactNode) => {
    return render(
        <ChakraProvider value={defaultSystem}>
            {component}
        </ChakraProvider>
    );
};

describe("About Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders without crashing", () => {
        renderWithProviders(<About />);
        expect(screen.getByText("Learn in 5 minutes")).toBeInTheDocument();
    });

    it("displays the main title", () => {
        renderWithProviders(<About />);
        const title = screen.getByRole("heading", { name: /learn in 5 minutes/i });
        expect(title).toBeInTheDocument();
    });

    it("shows the disclaimer alert", () => {
        renderWithProviders(<About />);
        expect(screen.getByText("Disclaimer:")).toBeInTheDocument();
        expect(
            screen.getByText(/LearnInFive is sorry for any delay in loadings/i)
        ).toBeInTheDocument();
    });

    it("displays the project description", () => {
        renderWithProviders(<About />);
        expect(
            screen.getByText(/Learn in 5 minutes is a simple AI powered project/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/5 minutes of your day, while you drink a coffee/i)
        ).toBeInTheDocument();
    });
});
