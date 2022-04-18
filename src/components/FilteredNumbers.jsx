import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function FilteredNumbers() {
  const {
    numericalFilter,
    setNumericalFilter,
    options,
    setOptions,
    updateList,
    setUpdateList,
    setPlanets,
    planetsBackup,
  } = useContext(MyContext);
  const handleClick = (event) => {
    let auxState = [...numericalFilter];
    const opt = [...options];
    opt.push(event.target.name); // O nome do filtro que foi removido e adicionado a option, que será renderizado no select
    setOptions(opt);
    auxState = auxState.filter((filter) => filter.column !== event.target.name); // Retorna os filtros que são diferentes ao que for removido
    setNumericalFilter(auxState);
    setPlanets(planetsBackup);

    setUpdateList(!updateList);
  };
  const clearFilters = () => {
    setNumericalFilter([]);
    setPlanets(planetsBackup);
  };
  return (
    <div>
      {numericalFilter.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          {`${filter.column} ${filter.comparison} ${filter.value} `}
          <button type="button" onClick={ handleClick } name={ filter.column }>
            X
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ clearFilters }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}
