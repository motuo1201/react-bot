import React, {Component} from 'react';
import Input from './containers/Input';
import OutputLabel from './containers/OutputLabel';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Input />
        <OutputLabel />
      </div>
    );
  }
}

export default App;
