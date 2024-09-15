import React, { useState, useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { TextField, IconButton } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

const SearchBar = ({ onSearch, onError }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Create a memoized version of the debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        try {
          onSearch(query);
        } catch (error) {
          if (onError) {
            onError(error);
          }
        }
      }, 300),
    [onSearch, onError]
  );

  // Use useCallback for handleSearchChange
  const handleSearchChange = useCallback((event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      debouncedSearch(query);
    } else {
      onSearch('');
    }
  }, [debouncedSearch, onSearch]);

  // Use useCallback for handleClearSearch
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    onSearch('');
  }, [onSearch]);

  // Clean up the debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search products..."
      InputProps={{
        endAdornment: searchQuery && (
          <IconButton onClick={handleClearSearch} edge="end">
            <ClearIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchBar;