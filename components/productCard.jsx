import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import ViewImageDialog from "./viewImageDialog";

const fallbackImage = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'>
  <rect width='400' height='300' fill='%231e1e2f'/>
  <g transform='translate(130,80)' fill='none' stroke='%23ffffff' stroke-width='3'>
    <rect width='140' height='140' rx='10' ry='10' fill='none' stroke='%236366f1'/>
    <path d='M30 60 Q70 10 110 60' stroke='%23ffffff' stroke-width='3' fill='none'/>
    <circle cx='50' cy='90' r='5' fill='%23ffffff'/>
    <circle cx='90' cy='90' r='5' fill='%23ffffff'/>
  </g>
</svg>`;

export default function ProductCard({ product }) {
  const [openImage, setOpenImage] = useState(false);

  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);

  const isInStock = product.stock_status === "instock";

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Card
          sx={{
            backgroundColor: "#1e1e2f",
            color: "#fff",
            border: "1px solid #2a2a3c",
            borderRadius: "1rem",
            height: 420,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 0 10px rgba(99, 102, 241, 0.2)",
            transition: "box-shadow 0.3s ease, transform 0.3s ease",
            "&:hover": {
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)",
              transform: "translateY(-3px)",
            },
          }}
        >
          <div className="relative overflow-hidden">
            <CardMedia
              component="img"
              height="180"
              image={product.image || fallbackImage}
              alt={product.title}
              className="object-cover w-full h-[180px] hover:scale-105 transition-transform duration-500 mt-5"
              onError={(e) => (e.target.src = fallbackImage)}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Button
                size="small"
                onClick={handleOpenImage}
                sx={{
                  textTransform: "none",
                  backgroundColor: "rgba(99,102,241,0.85)",
                  color: "#fff",
                  fontSize: "0.7rem",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.5,
                  "&:hover": { backgroundColor: "rgba(99,102,241,1)" },
                }}
              >
                View Image
              </Button>
            </div>
            <div className="absolute top-3 right-3">
              <Chip
                label={isInStock ? "In Stock" : "Out of Stock"}
                sx={{
                  backgroundColor: isInStock ? "#16a34a" : "#dc2626",
                  color: "#fff",
                  fontSize: "0.7rem",
                  borderRadius: "9999px",
                }}
              />
            </div>
          </div>

          <CardContent className="flex-1 flex flex-col justify-between p-4">
            <Tooltip title={product.title} arrow placement="top">
              <Typography
                variant="h6"
                className="font-semibold mb-2 text-gray-100 tracking-wide truncate cursor-pointer"
              >
                {product.title}
              </Typography>
            </Tooltip>

            <Typography variant="body1" className="text-indigo-400 mb-2">
              {isNaN(parseFloat(product.price))
                ? "Price not available"
                : `$${parseFloat(product.price).toFixed(2)}`}
            </Typography>

            {product.category && (
              <Typography variant="caption" className="text-gray-400 mb-2">
                 {product.category}
              </Typography>
            )}

            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {product.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: "#2a2a3c",
                      color: "#cbd5e1",
                      fontSize: "0.7rem",
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <ViewImageDialog
        open={openImage}
        image={product.image || fallbackImage}
        onClose={handleCloseImage}
      />
    </>
  );
}
