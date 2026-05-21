import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { server } from "./moks/server";
import HeroesFromAPI from "./lab/Heroes";

describe("HeroesFromAPI component", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('should display "No heroes available" when API returns an empty list', async () => {
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json([], { status: 200 });
      }),
    );

    render(<HeroesFromAPI />);

    expect(await screen.findByText(/No heroes available/i)).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("should render a list of heroes after successful API fetch", async () => {
    let heroes = [
      { id: 1, name: "Tanjiro", strength: 9 },
      { id: 2, name: "Naruto", strength: 15 },
      { id: 3, name: "Goku", strength: 20 },
    ];

    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json(heroes, { status: 200 });
      }),
    );

    render(<HeroesFromAPI />);

    let listItems = await screen.findAllByRole("listitem");
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(listItems).toHaveLength(heroes.length);
    expect(listItems[0]).toHaveTextContent("Tanjiro: power=9 (weak)");
    expect(listItems[1]).toHaveTextContent("Naruto: power=15 (strong)");
    expect(listItems[2]).toHaveTextContent("Goku: power=20 (unbelievable)");
  });

  test.skip("should display an error message when API request fails with status 500", async () => {
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json(null, { status: 500 });
      }),
    );

    render(<HeroesFromAPI />);

    expect(await screen.findByRole("heading")).toHaveTextContent(
      /Failed to fetch heroes/i,
    );
  });
});
