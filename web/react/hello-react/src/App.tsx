import React from "react";

const Store = {
  _handlers: [],
  _flag: '',
  subscribe: function(handler) {
    this._handlers.push(handler);
  },
  set: function(value) {
    this._flag = value;
    this._handlers.forEach(handler => handler(value))
  },
  get: function() {
    return this._flag;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: Store.get() };
    Store.subscribe(value => this.setState({ value }));
    this._setState = Store.set.bind(Store)
  }
  render() {
    return (
      <div>
        <Switcher
          value={ this.state.value }
          onChange={ this._setState } />
           <Switcher
          value={ this.state.value }
          onChange={ this._setState } />
      </div>
    );
  }
};

function Switcher({ value, onChange }) {
  return (
    <button onClick={ e => onChange(!value) }>
      { value ? 'lights on' : 'lights off' }
    </button>
  );
};

<Switcher
  value={ Store.get() }
  onChange={ Store.set.bind(Store) } />

export default App
