import React from 'react';
import Table from './components/Table';
import './App.css';
import MyProvider from './context/MyContext';
import SearchInput from './components/SearchInput';
import NumericImputs from './components/NumericImputs';
import FilteredNumbers from './components/FilteredNumbers';
import SortBy from './components/SortBy';

function App() {
  return (
    <MyProvider>
      <div>
        <SearchInput />
        <NumericImputs />
        <SortBy />
        <FilteredNumbers />
        <Table />
      </div>
    </MyProvider>
  );
}

export default App;
