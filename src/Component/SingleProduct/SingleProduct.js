import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartState } from '../Context/Context';
import Rating from './../Rating/Rating';

const SingleProduct = ({ productItem }) => {
    
    const {
        state:{cart},
        dispatch
           }=CartState()


    return (
        <div className="products">
            {/* {productItem.name} */}
            <Card>
                <Card.Img varant="top" src={productItem.image} alt={productItem.name} />
                <Card.Body>
                    <Card.Title>{productItem.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span>${productItem.price.split(".")[0]}</span>

                        {productItem.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 days delivery</div>
                        )} 
                      
                        <Rating rating={productItem.ratings} />
                    </Card.Subtitle>

                    {
                     cart.some(p=>p.id===productItem.id)?(
                         
                        <Button onClick={() => {dispatch({
                            type: 'REMOVE_FROM_CART',
                            payload: productItem,
                          });
                             }}
                        
                        variant="danger">
                           Remove from card
 
                       </Button>
                     ):(
                        <Button onClick={() => {dispatch({
                          type: 'Add_TO_CART',
                          payload: productItem,
                        });
                           }}

                         disabled={!productItem.inStock}>
                        {
                         !productItem.inStock? "Out of stock" : "Add to card"
                        }
 
                       </Button>
                     )   
                    }
                      

                   
                </Card.Body>
            </Card>
        </div>
    );
};

export default SingleProduct;


  {/* {productItem.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 days delivery</div>
                        )} */}