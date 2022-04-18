import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function SearchInput() {
  const { textFilter, setTextFilter } = useContext(MyContext);
  const handleChange = (event) => {
    let auxTextFilter = textFilter;
    auxTextFilter = event.target.value; // Atualiza o filtro de texto
    setTextFilter(auxTextFilter);
  };
  return (
    <div>
      <input data-testid="name-filter" type="text" onChange={ handleChange } />
    </div>
  );
}
