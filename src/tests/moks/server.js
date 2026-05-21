import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

let handlers = [
  http.get("http://localhost:3000/heroes", () => {
    return HttpResponse.json(
      [
        { id: 1, name: "Tanjiro", strength: 9 },
        { id: 2, name: "Naruto", strength: 15 },
        { id: 3, name: "Goku", strength: 20 },
      ],
      { status: 200 },
    );
  }),
];

export let server = setupServer(...handlers);
