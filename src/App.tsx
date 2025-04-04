import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchComponent from '../src/components/SearchComponent/SearchComponent';
import  ContactData  from './types/ContactData';

function App() {
  return (
    <div>
    <SearchComponent contacts={ContactData} />
  </div>
    
  );
}

export default App;
