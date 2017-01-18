import React, {Component} from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

const App = ({children}) => {
  return (
    <div>
      <div className="container">
        <NavigationBar />
        <FlashMessagesList />
        {children}
      </div>
    </div>
  );
}

export default App;
