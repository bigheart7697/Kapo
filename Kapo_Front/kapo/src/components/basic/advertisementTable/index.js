import React from 'react'

import './style.scss'

class AdvertisementTable extends React.Component {
    state = {active: 0}

    componentDidMount() {
        this.props.setMethod(this.change_active);
    }

    change_active = (active) => {
        this.setState({active})
    }

    render() {
        return(
            <div className='advertisement-list__table'>
                <div className='advertisement-list__row advertisement-list__header'>
                    {this.props.header ? this.props.header.map((element, index) => 
                        <div className='advertisement-list__table-cell' key={index}>{element}</div>
                    ) : null}
                </div>
                {this.props.advertisements ? this.props.advertisements.map((element, index) =>
                    <div className={`advertisement-list__row` + (this.state.active===index ? ` advertisement-list__row--active` : ``)} key={index} onClick={() => this.props.callMethod ? this.props.callMethod(element, index) : null}>
                        <div className='advertisement-list__table-cell'>{index + 1}</div>
                        <div className='advertisement-list__table-cell'>{element.product ? element.product.name : '-'}</div>
                        <div className='advertisement-list__table-cell'>{(this.props.type === 'banner' || this.props.type === 'campaign') ? element.place : element.search_phrases}</div>
                        <div className='advertisement-list__table-cell'>{element.remaining_count}</div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default AdvertisementTable;