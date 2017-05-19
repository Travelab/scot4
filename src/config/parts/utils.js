export const ifProd = (production, development) => 
	(process.env.NODE_ENV === 'production') ? production : development
