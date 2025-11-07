import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useCategories } from '../hooks/useCategories.js';

const CategoriesContext = createContext({ categories: [], loading: false, error: null });

export function CategoriesProvider({ children }) {
  const value = useCategories();

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCategoriesContext() {
  return useContext(CategoriesContext);
}
