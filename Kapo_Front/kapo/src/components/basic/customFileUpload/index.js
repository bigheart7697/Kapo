import React from "react";

import './style.scss'

export default class CustomFileUpload  extends React.Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.ref = React.createRef();
  }

  onChange(event) {
    console.log(event.name)
    const { input: { onChange } } = this.props
    console.log(event.target.files[0])
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => onChange(reader.result);
    reader.readAsDataURL(file);
  }

  render(){
    const { input : { value } } = this.props
    return(
      <div className="custom-file-upload__container">
        <div className="custom-file-upload__inner-container">
          <label className="custom-file-upload__label">{this.props.label}</label>
          <div className="custom-file-upload__image-container">
            <div className="custom-file-upload__add" onClick={() => this.ref.current.click()}>عکس</div>
            <input
              className="custom-file-upload__input"
              type='file'
              accept='.jpg, .png, .jpeg'
              onChange={this.onChange}
              ref = {this.ref}
            />
          </div>
        </div>
      </div>
    )
  }
}