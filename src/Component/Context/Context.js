import React, { createContext, useContext, useReducer } from 'react';
import faker from "faker";
import { cartReducer } from './Reducer';
import { productReducer } from './Reducer';
 const Cart = createContext()
 
const Context = ({children}) => {
  
faker.seed(99);
    //Data comes from dataBase help of faker 
      const products = [...Array(20)].map(()=> ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.random.image(),
        inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1, 2, 3, 4, 5]), 

      })) 

//console.log(products);

      const [state,dispatch]=useReducer(cartReducer,{
            products: products,
            cart:[]

      }) 

      //2 useRducer
      const  [productState, productDispatch] = useReducer(productReducer,{
        byStock:false,
        byFastDelivery:false,
        byRating:0,
        searchQuery:'',

      })   

    return (
        <Cart.Provider value={{state,dispatch,productState, productDispatch}}>
             {children}
        </Cart.Provider>
    );

};

export default Context;

export const CartState =()=>{
  return useContext(Cart)
}