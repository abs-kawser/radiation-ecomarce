import React from 'react';
import { CartState } from '../Context/Context';
import Filter from '../Filert/Filter';


import SingleProduct from '../SingleProduct/SingleProduct';
import "./Home.css"
const Home = () => {
  //destructure one lvl farther

  const { state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState()



  console.log(`home `, products);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((productItem) => productItem.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((productItem) => productItem.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (productItem) => productItem.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((productItem) =>
        productItem.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };



  return (
    <div className="home">
      <Filter />

      <div className="productContaine">
        {
          transformProducts().map((productItem) => {
            return <SingleProduct
              productItem={productItem}
              key={productItem.id} />

          })
        }


      </div>
    </div>
  );
};

export default Home;