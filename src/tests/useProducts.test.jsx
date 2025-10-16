import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProducts } from "../../hooks/useProducts";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test("fetches all products initially", async () => {
  const { result } = renderHook(() => useProducts(), { wrapper: createWrapper() });

  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data.length).toBe(2);
  expect(result.current.data[0].title).toBe("iPhone 14");
});

test("fetches filtered products when filters applied", async () => {
  const { result } = renderHook(() => useProducts({ conditions: "price > 2000" }), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.data.length).toBe(1);
  expect(result.current.data[0].title).toBe("MacBook Pro");
});
