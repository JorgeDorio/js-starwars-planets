import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function SortBy() {
  const { planets, setPlanets, sort,
    setSort, updateList, setUpdateList } = useContext(MyContext);
  const handleChange = (event) => {
    const auxState = { ...sort };
    auxState.type = event.target.id;
    setSort(auxState);
  };
  const handleSelect = (event) => {
    const auxState = { ...sort };
    auxState.column = event.target.value;
    setSort(auxState);
  };
  const handleSort = () => {
    //   Referencia : https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
    const auxState = planets.sort((a, b) => {
      if (sort.type === 'asc') {
        return a[sort.column] - b[sort.column];
      }
      return b[sort.column] - a[sort.column];
    });
    setPlanets(auxState);
    setUpdateList(!updateList);
  };

  return (
    <div>
      <select onChange={ handleSelect } data-testid="column-sort">
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <label htmlFor="asc">
        Ascendente
        <input
          onChange={ handleChange }
          value="ASC"
          type="radio"
          name="sort"
          id="asc"
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="dec">
        Decrescente
        <input
          onChange={ handleChange }
          type="radio"
          name="sort"
          id="dec"
          data-testid="column-sort-input-desc"
          value="DESC"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Ordenar
      </button>
    </div>
  );
}
