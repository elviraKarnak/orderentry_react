import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Checkbox
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const CustomInput = ({
  type = "text",
  disabled,
  label,
  name,
  value,
  options = [],
  multiple = false,
  freeSolo = false,
  onChange,
  imagePreview,
  sx,
  error,
  ...props
}) => {
  switch (type) {
    case "label_h5":
      return (
        <FormControl sx={sx} margin="normal">
          <h5>{label}</h5>
        </FormControl>
      );
    case "label_p":
      return (
        <FormControl sx={sx} margin="normal">
          <h5>{label}</h5>
          <hr />
        </FormControl>
      );
    case "text":
    case "number":
      return (
        <FormControl sx={sx} margin="normal">
          <TextField
            disabled={disabled}
            type={type}
            label={label}
            variant="standard"
            name={name}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error}
            {...props}
          />
        </FormControl>
      );
    case "select":
      return (
        <>
          <FormControl sx={sx} margin="normal">
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              disabled={disabled}
              label={label}
              labelId={`${name}-label`}
              value={value}
              name={name}
              onChange={onChange}
              error={!!error}
              helperText={error}
              {...props}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label || option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </FormControl>
        </>
      );
    case "multiple_select":
      return (
        <>
          <FormControl sx={sx} margin="normal">
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              disabled={disabled}
              label={label}
              labelId={`${name}-label`}
              value={value}
              name={name}
              onChange={onChange}
              multiple={true}
              error={!!error}
              helperText={error}
              {...props}
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label || option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </FormControl>
        </>
      );
    case "autocomplete":
      return (
        <FormControl sx={sx} margin="normal">
          <Autocomplete
            disabled={disabled}
            multiple={true}
            freeSolo={true}
            options={options}
            value={value}
            onChange={onChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                className="product-viw-margin_top"
                variant="outlined"
                label={label}
                placeholder={`Add ${label.toLowerCase()}`}
                margin="normal"
                fullWidth
                error={!!error}
                helperText={error}
              />
            )}
            {...props}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
        </FormControl>
      );
    case "file":
      return (
        <>
          <FormControl sx={sx} margin="normal" className="upload-file">
            <img src={imagePreview} alt="icon" />
            <TextField
              disabled={disabled}
              type={type}
              label={label}
              variant="standard"
              name={name}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error}
              {...props}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </FormControl>
        </>
      );
    case "date":
      return (
        <FormControl sx={sx} margin="normal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={value} onChange={onChange} label={label} />
          </LocalizationProvider>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </FormControl>
      );
    case "dateTime":
      return (
        <FormControl sx={sx} margin="normal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker value={value} onChange={onChange} label={label} />
          </LocalizationProvider>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </FormControl>
      );
    default:
      return null;
  }
};

export default CustomInput;
