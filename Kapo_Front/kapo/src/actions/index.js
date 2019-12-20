export const selectProduct = product => {
	return {
		type: 'PRODUCT_SELECTED',
		payload: product
	};
};