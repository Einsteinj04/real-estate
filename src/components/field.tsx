"use client";

import React, { useState } from "react";
import { Select, MenuItem, FormControl, TextField, InputAdornment, IconButton } from "@mui/material";
import { KeyboardArrowDownOutlined, Search } from "@mui/icons-material";

// CustomizedTextField Component
interface CustomizedTextFieldProps {
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const CustomizedTextField: React.FC<CustomizedTextFieldProps> = ({ className, placeholder, icon }) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className={`w-full ${className}`}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "rgb(71 85 105) !important" }} >
              {icon || <Search />} {/* Ensure text-slate-600 */}
            </InputAdornment>
          ),
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            borderRadius: "6px",
            border: "1px solid rgb(71 85 105)", // Tailwind's slate-600
            "&:hover fieldset": { borderColor: "rgb(71 85 105) !important" }, // Hover Effect
            "&.Mui-focused fieldset": { borderColor: "rgb(71 85 105) !important" }, // Focus Effect
          },
          "& .MuiInputBase-input": {
            padding: "10px",
            color: value ? "rgb(203 213 225) !important" : "rgb(71 85 105) !important", // Text changes to slate-300 when user types
          },
          "& .MuiInputBase-input::placeholder": {
            color: "rgb(148 163 184) !important", // Placeholder remains slate-600
          },
        }}
      />
    </div>
  );
};

// CustomizedSelect Component
interface CustomizedSelectProps {
  className?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  icon?: React.ReactNode;
}

export const CustomizedSelect: React.FC<CustomizedSelectProps> = ({ className, placeholder, options, icon }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`w-full ${className}`}>
      <FormControl fullWidth>
        <div className="flex items-center border border-slate-600 rounded-md hover:border-slate-600 focus-within:border-slate-600">
          {/* Dropdown Button */}
          <IconButton 
            onClick={() => setOpen(true)} 
            className="p-2"
            sx={{ color: "rgb(71 85 105) !important" }} // Ensure text-slate-600
          >
            {icon || <KeyboardArrowDownOutlined />}
          </IconButton>

          {/* Select Field */}
          <Select
            displayEmpty
            value={selectedValue}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="rounded-md flex-1"
            sx={{
              backgroundColor: "transparent",
              color: selectedValue ? "rgb(203 213 225) !important" : "rgb(71 85 105) !important", // Selected text in slate-300
              border: "none",
              height: "40px",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Remove default MUI outline
              "& .MuiSelect-select": { padding: "10px" },
              "&:hover": { borderColor: "rgb(71 85 105) !important" }, // Hover Effect
              "&.Mui-focused": { borderColor: "rgb(71 85 105) !important" }, // Focus Effect
            }}
          >
            <MenuItem disabled value="">
              {placeholder || "Select an option"}
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>
    </div>
  );
};
