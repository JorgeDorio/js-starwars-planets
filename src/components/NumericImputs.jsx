import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../context/MyContext';

export default function NumericImputs() {
  const {
    numericalFilter,
    setNumericalFilter,
    planets,
    setPlanets,
    options,
    setOptions,
    planetsBackup,
    updateList,
    setUpdateList,
    sort,
  } = useContext(MyContext);
  const [currentFilter, setCurrentFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const handleChange = (event) => {
    const auxState = { ...currentFilter };
    auxState[event.target.name] = event.target.value;
    setCurrentFilter(auxState);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const func = () => {
    const auxState = [...numericalFilter];
    auxState.push(currentFilter);
    let auxFilter = [...planets];
    auxState.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        auxFilter = auxFilter.filter(
          (planet) => Number(planet[filter.column]) > Number(filter.value),
        );
      } else if (filter.comparison === 'menor que') {
        auxFilter = auxFilter.filter(
          (planet) => Number(planet[filter.column]) < Number(filter.value),
        );
      } else if (filter.comparison === 'igual a') {
        auxFilter = auxFilter.filter(
          (planet) => Number(planet[filter.column]) === Number(filter.value),
        );
      }
      setPlanets(auxFilter);
      if (numericalFilter.length > 0) {
        setOptions(options.filter((option) => option !== filter.column)); // Remove o filtro que foi adicionado das opções
        setCurrentFilter({
          column: options[1],
          comparison: 'maior que',
          value: 0,
        });
      } else {
        setPlanets(planetsBackup);
        setOptions([
          'population',
          'orbital_period',
          'diameter',
          'rotation_period',
          'surface_water',
        ]);
      }
    });
  };
  useEffect(() => {
    func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateList, sort]);
  const pushFilter = () => {
    const auxState = [...numericalFilter];
    auxState.push(currentFilter); // Adiciona o filtro atual ao array de filtros
    setNumericalFilter(auxState);
    setUpdateList(!updateList);
  };

  return (
    <div>
      <select
        value={ currentFilter.column }
        onChange={ handleChange }
        name="column"
        data-testid="column-filter"
      >
        {options.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
      <select
        value={ currentFilter.comparison }
        onChange={ handleChange }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        value={ currentFilter.value }
        name="value"
        onChange={ handleChange }
        type="number"
        data-testid="value-filter"
      />
      <button onClick={ pushFilter } data-testid="button-filter" type="button">
        Filter
      </button>
    </div>
  );
}
