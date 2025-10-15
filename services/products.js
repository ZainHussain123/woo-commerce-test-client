const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getProducts({ queryKey }) {
  const [, filters] = queryKey;

  try {
    if (filters?.conditions) {
      const response = await fetch(`${API_URL}/segments/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch filtered products (${response.status})`);
      }

      return await response.json();
    }

    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
