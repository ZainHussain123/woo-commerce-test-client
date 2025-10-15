import React, { useState } from "react";
import { Typography, Button, CircularProgress, Stack } from "@mui/material";
import FilterDialog from "../components/filterDialog";
import ProductCard from "../components/productCard";
import SettingsIcon from "@mui/icons-material/Settings";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useProducts } from "../hooks/useProducts";

export default function ProductsView() {
  const [filterDialog, setFilterDialog] = useState(false);
  const [filters, setFilters] = useState(null);
  const [resetCount, setResetCount] = useState(0);

  const {
    data: products,
    isLoading,
    isError,
    error,
    applyFilters,
    resetFilters,
    isFetching,
  } = useProducts(filters);

  const handleApplyConditions = async (parsed) => {
    const newFilters = { conditions: parsed.join(" ") };
    setFilters(newFilters);
    await applyFilters(parsed);
  };

  const handleReset = async () => {
    setFilters(null);
     setResetCount((c) => c + 1);
    await resetFilters();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 px-6 sm:px-10 lg:px-20 py-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <div className="text-center sm:text-left">
          <Typography
            variant="h4"
            className="font-extrabold tracking-wide mb-3 text-4xl sm:text-5xl text-indigo-400"
          >
           Our Featured Products
          </Typography>
        </div>

        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => setFilterDialog(true)}
            startIcon={<SettingsIcon />}
            sx={{
              textTransform: "none",
              backgroundColor: "#4f46e5",
              color: "#fff",
              borderRadius: "10px",
              px: 3,
              py: 1,
              fontWeight: 500,
              "&:hover": { backgroundColor: "#6366f1" },
            }}
          >
            Evaluate
          </Button>

          {filters && (
            <Button
              onClick={handleReset}
              startIcon={<RestartAltIcon />}
              sx={{
                textTransform: "none",
                backgroundColor: "#374151",
                color: "#e5e7eb",
                borderRadius: "10px",
                px: 3,
                py: 1,
                fontWeight: 500,
                "&:hover": { backgroundColor: "#4b5563" },
              }}
            >
              Reset
            </Button>
          )}
        </Stack>
      </div>

      {(isLoading || isFetching) && (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 mt-10">
          Failed to load products 😞 {error?.message}
        </div>
      )}

      {!isLoading && !isError && (
        <div
          className="grid justify-center gap-[20px]"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FilterDialog
        open={filterDialog}
        onClose={() => setFilterDialog(false)}
        onApply={handleApplyConditions}
         resetSignal={resetCount} 
      />
    </div>
  );
}
