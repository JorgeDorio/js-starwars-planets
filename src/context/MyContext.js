import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

export const MyContext = createContext();

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [sort, setSort] = useState({ column: 'population', type: 'asc' });
  const [updateList, setUpdateList] = useState(true);
  const [planetsBackup, setPlanetsBackup] = useState([]);
  const [numericalFilter, setNumericalFilter] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const getPlanets = async () => {
    const data = await fetchApi();
    const nome = data.results;
    if (data) {
      const auxState = nome.sort((a, b) => a.name < b.name);
      // const auxState = data.results;
      setPlanets(auxState);
      setPlanetsBackup(auxState);
    }
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const contextValue = {
    planets,
    setPlanets,
    getPlanets,
    textFilter,
    setTextFilter,
    numericalFilter,
    setNumericalFilter,
    options,
    setOptions,
    planetsBackup,
    updateList,
    setUpdateList,
    sort,
    setSort,
  };

  return (
    <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default MyProvider;
