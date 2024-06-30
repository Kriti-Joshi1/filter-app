import React from 'react';
import './App.css';
import moviesData from '../movies.json';
import { Card } from './components/Card';

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">

        <Card movies={moviesData} />


      </div>
    </div>
  );
};



export default App;

