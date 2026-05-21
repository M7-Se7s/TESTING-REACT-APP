import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

let handlers = [
  http.get("https://api.chucknorris.io/jokes/random", () => {
    return HttpResponse.json({ value: "ha ha ha" }, { status: 200 });
  }),
  // http.post("...",()=>)
];

export let server = setupServer(...handlers);
