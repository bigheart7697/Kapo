import {combineReducers} from 'redux'
import faker from 'faker';
import {reducer as formReducer} from 'redux-form'

const productReducer = () => {
	return [
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()},
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()},
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()},
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()},
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()},
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()},
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()},
		{image: faker.image.image(), title: faker.commerce.product(),
		price: faker.commerce.price(), date: faker.date.month()}
	];
}

const selectedProductReducer = (selectedProduct = null, action) => {
	if (action.type === 'PRODUCT_SELECTED'){
		return action.payload;
	}
	return selectedProduct; 
}

export default combineReducers({
    form: formReducer,
	products: productReducer,
	selectedProduct: selectedProductReducer
})
