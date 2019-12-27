import React from 'react'
import ProductList from '../product-list';
import ProductDetails from '../product-details';
import faker from 'faker';

const mainpage = () => {
    return(
        <div>
            <ProductDetails 
                product={{
                    name:'غذا',
                    image:faker.image.food(), 
                    details:'بسیار خوشمزه و سالم است',
                    price:'200,000',
                    second_hand: 'دست دوم',
                    type: 'غذا',
                    availability: 'موجود',
                    year_produced: '1398',
                    selling_type: 'نقدی',
                    user: {
                        name: 'محمد محمدی',
                        address: 'تهران - تهران پارس',
                        type: 'شخصی'
                    }
                }}
            />
		</div>
    )
}

export default mainpage