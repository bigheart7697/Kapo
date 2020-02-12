import React from "react";

import './style.scss'

export default props => {
  return (
    <div className={`form-wrapper__container ${props.dashboard ? 'form-wrapper__container--dashboard' : ''}`}>
      <div className="form-wrapper__form">{props.children}</div>
    </div>
  );
};
