import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        It Works!
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
