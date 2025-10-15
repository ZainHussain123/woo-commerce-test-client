# 🛍️ Product Evaluation Dashboard

A modern **React (Vite)** web application that allows users to view, evaluate, and filter products using dynamic conditions.  
It supports both **default product listing** and **custom product evaluation** via condition-based filtering — all built with **React Query**, **Tailwind CSS**, and **Material UI (MUI)**.

---

## 🚀 Features

✅ **Product Listing:**  
Fetches and displays all available products from the API.  

✅ **Smart Evaluation / Filtering:**  
Users can enter multiple conditions like:
price > 5000
category = smartphones
brand != samsung


✅ **Validated Filters:**  
Only supports valid operators (`=, !=, >, <, >=, <=`) and ensures each condition is complete before applying.  

✅ **Reset Functionality:**  
Allows users to reset filters — restoring the original unfiltered product list.  

✅ **Beautiful UI:**  
Built with Material UI components and Tailwind CSS for a sleek dark/light themed interface.

✅ **Efficient Data Fetching:**  
Uses React Query for smart caching, refetching, and request management.

---

## 🧠 Tech Stack

| Category | Technologies |
|-----------|---------------|
| Framework | [React 18](https://react.dev) + [Vite](https://vitejs.dev) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + [Material UI](https://mui.com) |
| Data Fetching | [React Query (TanStack)](https://tanstack.com/query/latest) |
| API | Custom backend with endpoints: `/products` and `/segments/evaluate` |
| Icons | [MUI Icons](https://mui.com/material-ui/material-icons/) |

---

Install dependencies
npm install

create env
cp .env.example .env

run the app 
npm run dev

app runs on
http://localhost:5173