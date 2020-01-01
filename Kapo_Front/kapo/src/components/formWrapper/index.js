import React from "react";

import './style.scss'

export default props => {
  return (
    <div className="form-wrapper__container">
      <div className="form-wrapper__form">{props.children}</div>
    </div>
  );
};
