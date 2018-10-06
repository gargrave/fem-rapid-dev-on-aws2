import React, { Component } from 'react';
import './Application.css';

import { Storage } from 'aws-amplify'

class Application extends Component {
  state = {
    files: []
  };

  async componentDidMount() {
    const keys = await Storage.list('')
    const files = await Promise.all(keys.map(async ({ key }) => await Storage.get(key)))
    this.setState({ files })
  }

  handleSubmit = event => {
    event.preventDefault();

    const file = this.fileInput.files[0];
    const { name } = file;

    console.log(file, name);
  };

  render() {
    return (
      <div className="Application">
        <form className="NewItem" onSubmit={this.handleSubmit}>
          <input
            type="file"
            ref={input => this.fileInput = input}
          />
          <input className="full-width" type="submit" />
        </form>
        <section className="Application-images">
          {this.state.files.map((file, i) => {
            return <img src={file} key={i} />
          })}
        </section>
      </div>
    );
  }
}

export default Application;
