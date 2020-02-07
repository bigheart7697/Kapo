import React from "react";

import './style.scss'

export default class CustomFileUpload  extends React.Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    console.log(e.target.files)
    onChange(e.target.files[0])
  }

  render(){
    const { input : { value } } = this.props
    return(
      <div className="custom-file-upload__container">
        <div className="custom-file-upload__inner-container">
          <label className="custom-file-upload__label">{this.props.label}</label>
          <input
            className="custom-file-upload__input"
            type='file'
            accept='.jpg, .png, .jpeg'
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}