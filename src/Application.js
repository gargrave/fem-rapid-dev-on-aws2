import React, { Component, PureComponent } from 'react'
import './Application.css'

import { Storage } from 'aws-amplify'

class S3Image extends PureComponent {
  state = { src: null }

  async componentDidMount() {
    const { s3key } = this.props
    const src = await Storage.get(s3key)
    this.setState({ src })
  }

  render() {
    const { src } = this.state
    if (!src) {
      return null
    }

    return (
      <article>
        <img src={src} />
      </article>
    )
  }
}

class Application extends Component {
  state = {
    files: []
  }

  async componentDidMount() {
    // const keys = await Storage.list('')
    // const files = await Promise.all(keys.map(async ({ key }) => await Storage.get(key)))
    const files = await Storage.list('')
    this.setState({ files })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const file = this.fileInput.files[0]
    const { name } = file
    const newFile = await Storage.put(name, file)
    this.setState(({ files }) => ({ files: files.concat(newFile) }))
  }

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
          {this.state.files.map(({ key }, i) => {
            return <S3Image s3key={key} key={key} />
          })}
        </section>
      </div>
    )
  }
}

export default Application
