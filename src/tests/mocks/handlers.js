import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  // Mock: GET /products
  http.get(`${API_URL}/products`, () => {
    return HttpResponse.json({
      products: [
        { id: 1, title: "iPhone 14", price: "1200.00", category: "smartphones" },
        { id: 2, title: "MacBook Pro", price: "2500.00", category: "laptops" },
      ],
    });
  }),

  // Mock: POST /segments/evaluate
  http.post(`${API_URL}/segments/evaluate`, async ({ request }) => {
    const body = await request.json();

    if (body.conditions?.includes("price > 2000")) {
      return HttpResponse.json({
        products: [{ id: 2, title: "MacBook Pro", price: "2500.00" }],
      });
    }

    return HttpResponse.json({
      products: [
        { id: 1, title: "iPhone 14", price: "1200.00" },
        { id: 2, title: "MacBook Pro", price: "2500.00" },
      ],
    });
  }),
];
