'use client';

import { useState, useMemo, useEffect } from 'react';

interface UseSearchProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  initialValue?: string;
  onSearchChange?: () => void;
}

export function useSearch<T>({ 
  data, 
  searchFields, 
  initialValue = '',
  onSearchChange
}: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      })
    );
  }, [data, searchFields, searchTerm]);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange();
    }
  }, [searchTerm, onSearchChange]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    resultsCount: filteredData.length
  };
}