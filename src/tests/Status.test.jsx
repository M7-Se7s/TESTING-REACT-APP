import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import Status from "./lab/Status";

describe("Status component", () => {
  test('should render "🔴 Offline" and the toggle button on initial render', () => {
    render(<Status />);

    expect(screen.getByText(/Offline/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /toggle status/i }),
    ).toBeInTheDocument();
  });

  test('should switch to "🟢 Online" when button is clicked once', async () => {
    let user = userEvent.setup();
    render(<Status />);

    await user.click(screen.getByRole("button", { name: /toggle status/i }));

    expect(screen.getByText(/Online/i)).toBeInTheDocument();
  });

  test('should switch back to "🔴 Offline" when button is clicked twice', async () => {
    let user = userEvent.setup();
    render(<Status />);

    let toggleButton = screen.getByRole("button", { name: /toggle status/i });
    await user.click(toggleButton);
    await user.click(toggleButton);

    expect(screen.getByText(/Offline/i)).toBeInTheDocument();
  });
});
