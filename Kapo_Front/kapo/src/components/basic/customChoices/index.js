import React from 'react';

import './style.scss';

class CustomChoices extends React.Component {
    state = {active: '1'}

    componentDidMount() {
        this.props.setMethod(this.change_active_state);
     }

    change_active_state = (active) => {
        this.setState({active})
    }

    render() {
        return (
            <div className='custom-choices__choices-container'>
                <div className={`custom-choices__choice custom-choices__choice1` + (this.state.active==='1' ? ' custom-choices__choice--active' : ``)} onClick={() => this.props.callChild ? this.props.callChild('1') : null}>جست‌وجوی اسپانسر شده</div>
                <div className={`custom-choices__choice custom-choices__choice2` + (this.state.active==='2' ? ' custom-choices__choice--active' : ``)} onClick={() => this.props.callChild ? this.props.callChild('2') : null}>بنر تبلیغاتی</div>
                <div className={`custom-choices__choice custom-choices__choice3` + (this.state.active==='3' ? ' custom-choices__choice--active' : ``)} onClick={() => this.props.callChild ? this.props.callChild('3') : null}>کمپین تبلیغاتی</div>
            </div>
        );
    }
}

export default CustomChoices;