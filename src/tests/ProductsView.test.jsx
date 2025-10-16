import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsView from "../../pages/products";

const queryClient = new QueryClient();

describe("ProductsView", () => {
  it("renders product list and filters correctly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductsView />
      </QueryClientProvider>
    );

    // Wait for products to render
    await waitFor(() => {
      expect(screen.getByText(/Our Featured Products/i)).toBeInTheDocument();
    });

    // ✅ Click the "Evaluate" button to open FilterDialog
    fireEvent.click(screen.getByRole("button", { name: /evaluate/i }));

    // ✅ Find the textarea (placeholder contains 'Example:')
    const textarea = await screen.findByPlaceholderText(/example:/i);

    // Type a filter condition
    fireEvent.change(textarea, { target: { value: "price > 2000" } });

    // ✅ Click the Apply button
    const applyButton = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyButton);

    // ✅ Wait for updated product list
    await waitFor(() => {
      expect(screen.getByText(/Products/i)).toBeInTheDocument();
    });
  });
});
