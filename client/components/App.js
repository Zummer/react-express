import React, {Component} from 'react';
import NavigationBar from './NavigationBar';

const App = ({children}) => {
  return (
    <div>
      <div className="container">
        <NavigationBar />
        {children}
      </div>
    </div>
  );
}

export default App;
