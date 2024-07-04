import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const CustomInput = ({
  type = 'text',
  disabled,
  label,
  name,
  value,
  options = [],
  multiple = false,
  freeSolo = false,
  onChange,
  error,
  ...props
}) => {
  switch (type) {
    case 'text':
    case 'number':
      return (
        <FormControl sx={{ m: 1, minWidth: 150 }} margin="normal">
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
    case 'select':
      return (
        <>
          <FormControl sx={{ m: 1, minWidth: 150 }} margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
              disabled={disabled}
              labelId={`${name}-label`}
              value={value}
              name={name}
              onChange={onChange}
              error={!!error}
              helperText={error}
              {...props}
            >
              {options.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name || option.name}
                </MenuItem>
              ))}
            </Select>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </FormControl>
        </>
      );
    case 'multiple_select':
      return (
        <>
          <FormControl sx={{ m: 1, minWidth: 150 }} margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
              disabled={disabled}
              labelId={`${name}-label`}
              value={value}
              name={name}
              onChange={onChange}
              multiple={true}
              error={!!error}
              helperText={error}
              {...props}
            >
              {options.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name || option.name}
                </MenuItem>
              ))}
            </Select>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </FormControl>
        </>
      );
    case 'autocomplete':
      return (
        <FormControl sx={{ m: 1, minWidth: 400 }} margin="normal">
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
              ))}
            renderInput={params => (
              <TextField
                {...params}
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

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </FormControl>
      );
    case 'file':
      return (
        <>
          <FormControl sx={{ m: 1, minWidth: 150 }} margin="normal">
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </FormControl>
        </>
      );
    case 'date':
      return (
        <FormControl sx={{ m: 1, minWidth: 150 }} margin="normal">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={value}
              onChange={onChange}
              label={label}
            />
          </LocalizationProvider>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </FormControl>);
    default:
      return null;
  }
};

export default CustomInput;
