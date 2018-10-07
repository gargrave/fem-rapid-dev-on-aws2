import React from 'react'

const ImageForm = React.forwardRef(({
  canSubmit = false,
  onFormSubmit,
  onFileInputChange
}, ref) => (
  <form className="NewItem" onSubmit={onFormSubmit}>
    <input
      onChange={onFileInputChange}
      ref={ref}
      type="file"
    />
    <input className="full-width" disabled={!canSubmit} type="submit" />
  </form>
))

export default ImageForm