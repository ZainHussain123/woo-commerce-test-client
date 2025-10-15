import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterDialog({ open, onClose, onApply, resetSignal }) {
  const [conditions, setConditions] = useState("");
  const [error, setError] = useState("");

  const allowedOperators = ["=", "!=", ">", "<", ">=", "<="];

  useEffect(() => {
    if (resetSignal > 0) {
      setConditions("");
      setError("");
    }
  }, [resetSignal]);

  const validateConditions = (text) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return "Please enter at least one condition before applying.";
    }

    for (const line of lines) {
      const match = line.match(/^([a-zA-Z_]+)\s*(=|!=|>|<|>=|<=)\s*(.+)$/);
      if (!match) {
        return `Invalid condition: "${line}". Expected format: field operator value (e.g., price > 1000)`;
      }
      const [, , operator, value] = match;
      if (!allowedOperators.includes(operator)) {
        return `Invalid operator "${operator}". Allowed operators: ${allowedOperators.join(", ")}`;
      }
      if (!value.trim()) return `Missing value in condition: "${line}"`;
    }
    return "";
  };

  const handleApply = () => {
    const validationError = validateConditions(conditions);
    if (validationError) {
      setError(validationError);
      return;
    }

    const parsed = conditions
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    setError("");
    onApply(parsed);
    onClose();
  };

  const handleChange = (e) => {
    setConditions(e.target.value);
    setError("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1e1e2f",
          color: "#fff",
          borderRadius: "12px",
          p: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 0,
          fontWeight: "bold",
        }}
      >
        <Typography variant="h6" sx={{ color: "#c7d2fe" }}>
          🔍 Set Product Filter Conditions
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography
          variant="body2"
          sx={{ mb: 1, color: "#9ca3af", fontStyle: "italic" }}
        >
          Enter one condition per line using operators (=, !=, &gt;, &lt;, &gt;=,
          &lt;=)
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              backgroundColor: "#7f1d1d",
              color: "#fee2e2",
            }}
          >
            {error}
          </Alert>
        )}

        <TextField
          multiline
          rows={6}
          fullWidth
          value={conditions}
          onChange={handleChange}
          placeholder={`Example:\nprice > 5000\ncategory = smartphones\nstock_status = instock\nbrand != samsung\nrating >= 4.0`}
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#111827",
              color: "#fff",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#374151",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6366f1",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#818cf8",
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            color: "#9ca3af",
            "&:hover": { color: "#fff" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleApply}
          disabled={!!error}
          sx={{
            textTransform: "none",
            backgroundColor: "#4f46e5",
            color: "#fff",
            px: 3,
            py: 1,
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#6366f1" },
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
