import React, { Component, PureComponent } from 'react'
import './Application.css'

import { withAuthenticator } from 'aws-amplify-react'
import { Storage } from 'aws-amplify'

import ImageForm from './ImageForm'

Storage.configure({ level: 'private' })

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
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      hasFileReference: false,
    }
    this.fileInputRef = React.createRef()
  }

  async componentDidMount() {
    const files = await Storage.list('')
    this.setState({ files })
  }

  onFileInputChange = event => {
    event.preventDefault()

    const selectedFile = this.fileInputRef.current.files[0]
    this.setState({ hasFileReference: !!selectedFile })
  }

  onFormSubmit = async (event) => {
    event.preventDefault()

    const file = this.fileInputRef.current.files[0]
    const { name } = file
    const newFile = await Storage.put(name, file)
    this.setState(({ files }) => ({ files: files.concat(newFile) }))
  }

  render() {
    const { hasFileReference } = this.state
    return (
      <div className="Application">
        <ImageForm 
          canSubmit={hasFileReference}
          onFormSubmit={this.onFormSubmit}
          onFileInputChange={this.onFileInputChange}
          ref={this.fileInputRef}
        />

        <section className="Application-images">
          {this.state.files.map(({ key }, i) => {
            return <S3Image s3key={key} key={key} />
          })}
        </section>
      </div>
    )
  }
}

export default withAuthenticator(Application)
