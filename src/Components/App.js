import React, { Component } from 'react';
import Output from './Output';
import axios from 'axios';
import Text from './Controls/Text';
import Select from './Controls/Select';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: true,
      text: ''
    }
  }



  /*
  componentDidMount() {
    console.log('react is running...')
  }*/

  componentWillMount() {
    this.getText();
  }

  getText() {



    axios.get('http://hipsterjesus.com/api?paras=' + this.state.paras + '&html=' + this.state.html)
      .then((response) => {
        this.setState({ text: response.data.text }, function () {
          //console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeParas(number) {
    this.setState({paras: number}, this.getText)
  }

  changeOption(option) {
    this.setState({html: option}, this.getText)
  }

  render() {
    return (
      <div className="container">
        <h1>DummyText Generator</h1>
        <Output value={this.state.text} />
        <h3>Real Time Options</h3>
        <form>
          <div>
            <label>Paragraphs: </label>
            <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
          </div>

          <div>
            <label>Include HTML: </label>
            <Select value={this.state.html} onChange={this.changeOption.bind(this)}/>
          </div>
        </form>
      </div>
    );
  }
}

export default App;