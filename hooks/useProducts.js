import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../services/products";

export function useProducts(initialFilters = null) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["products", initialFilters],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, 
    retry: 2,
    keepPreviousData: true,
  });

  const products = data?.products ?? [];

  const applyFilters = async (filters) => {
    await queryClient.fetchQuery({
      queryKey: ["products", { conditions: filters.join(" ") }],
      queryFn: getProducts,
    });
  };

  const resetFilters = async () => {
    await queryClient.fetchQuery({
      queryKey: ["products", null],
      queryFn: getProducts,
    });
  };

  const hasFilters = !!initialFilters?.conditions;

  return {
    data: products,
    isLoading: isLoading || isFetching,
    isError,
    error,
    refetch,
    isFetching,
    applyFilters,
    resetFilters,
    hasFilters,
  };
}
