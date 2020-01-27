import React from 'react';

import './style.scss';

const CustomTable = (props) => {
    return (
        <div className='custom-table__container'>
            <div className='custom-table__table'>
                <div className='custom-table__thead'>
                    {props.headers ? props.headers.map((element, index) => { 
                        return(
                            <div className='custom-table__td' key={-1-index}>{element}</div>
                        );}
                        ) : <div></div>
                    }
                </div>
                {props.rows ? props.rows.map((element, index) => 
                    {
                        return(
                            <div className='custom-table__tr' key={2 * index + 1}>
                                {element.map((e, i) =>
                                    {
                                        return (
                                            <div className='custom-table__td' key={2 * i}>{e}</div>
                                        );
                                    }    
                                )}
                            </div>
                        );
                    }
                    ) : <div></div>
                }
            </div>
        </div>
    );
}

export default CustomTable;