import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

export default function ViewImageDialog({ open, image, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#0f172a",
          color: "#fff",
          borderRadius: "12px",
          p: 1,
        },
      }}
    >
      <DialogContent className="relative flex justify-center items-center p-0">
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#fff",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
        <motion.img
          src={image}
          alt="Product View"
          className="w-full max-h-[80vh] object-contain rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </DialogContent>
    </Dialog>
  );
}
