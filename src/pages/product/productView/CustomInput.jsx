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
      );
    case 'select':
      return (
        <FormControl fullWidth margin="normal">
          <InputLabel>{label}</InputLabel>
          <Select
            disabled={disabled}
            labelId={`${name}-label`}
            value={value}
            name={name}
            onChange={onChange}
            multiple={multiple}
            {...props}
          >
            {options.map (option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name || option.name}
              </MenuItem>
            ))}
          </Select>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </FormControl>
      );
    case 'autocomplete':
      return (
        <Autocomplete
          disabled={disabled}
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          value={value}
          onChange={onChange}
          renderTags={(value, getTagProps) =>
            value.map ((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps ({index})}
              />
            ))}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label={label}
              placeholder={`Add ${label.toLowerCase ()}`}
              margin="normal"
              fullWidth
              error={!!error}
              helperText={error}
            />
          )}
          {...props}
        />
      );
    case 'file':
      return (
        <FormControl fullWidth margin="normal">
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
          {error && <p style={{color: 'red'}}>{error}</p>}
        </FormControl>
      );
    default:
      return null;
  }
};

export default CustomInput;
