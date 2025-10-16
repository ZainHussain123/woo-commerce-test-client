import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FilterDialog from "../../components/filterDialog";

describe("FilterDialog Component", () => {
  const mockOnClose = vi.fn();
  const mockOnApply = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders dialog when open is true", () => {
    render(
      <FilterDialog
        open={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        resetSignal={0}
      />
    );

    expect(
      screen.getByText(/set product filter conditions/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example:/i)).toBeInTheDocument();
  });

  test("does not render when open is false", () => {
    const { queryByText } = render(
      <FilterDialog
        open={false}
        onClose={mockOnClose}
        onApply={mockOnApply}
        resetSignal={0}
      />
    );

    expect(
      queryByText(/set product filter conditions/i)
    ).not.toBeInTheDocument();
  });

  test("shows validation error on invalid condition", async () => {
    render(
      <FilterDialog
        open={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        resetSignal={0}
      />
    );

    const textarea = screen.getByPlaceholderText(/example:/i);
    fireEvent.change(textarea, { target: { value: "invalid condition" } });

    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid condition:/i)).toBeInTheDocument();
    });

    expect(mockOnApply).not.toHaveBeenCalled();
  });

  test("applies valid conditions and calls onApply", async () => {
    render(
      <FilterDialog
        open={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        resetSignal={0}
      />
    );

    const textarea = screen.getByPlaceholderText(/example:/i);
    fireEvent.change(textarea, { target: { value: "price > 5000" } });

    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(mockOnApply).toHaveBeenCalledWith(["price > 5000"]);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("resetSignal clears textarea", async () => {
    const { rerender } = render(
      <FilterDialog
        open={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        resetSignal={0}
      />
    );

    const textarea = screen.getByPlaceholderText(/example:/i);
    fireEvent.change(textarea, { target: { value: "price > 2000" } });
    expect(textarea.value).toBe("price > 2000");

    // simulate resetSignal change
    rerender(
      <FilterDialog
        open={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        resetSignal={1}
      />
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/example:/i).value).toBe("");
    });
  });

  test("calls onClose when Cancel button clicked", () => {
    render(
      <FilterDialog
        open={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
        resetSignal={0}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
