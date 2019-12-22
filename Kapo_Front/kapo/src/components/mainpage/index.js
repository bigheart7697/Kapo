import React from 'react'
import ProductList from '../product-list';
import ProductDetails from '../product-details';
import faker from 'faker';

const mainpage = () => {
    return(
        <div>
			<ProductDetails image={faker.image.image()}/>
		</div>
    )
}

export default mainpage