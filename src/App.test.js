import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

// The default CRA test asserted on a "learn react" link that this app has never
// rendered. These are real smoke tests instead: the shell must mount, and the
// lazily-loaded home route must resolve without throwing.

describe("App", () => {
  it("renders the site navigation", async () => {
    render(<App />);

    // The header and footer both expose a nav landmark, so assert on the set
    // rather than a single node.
    await waitFor(() => {
      expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
    });
  });

  it("exposes a skip link to the main content", async () => {
    render(<App />);

    const skipLink = await screen.findByRole("link", { name: /skip to content/i });
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("resolves the lazily-loaded home route", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("main")).toBeInTheDocument();
    });
  });
});
