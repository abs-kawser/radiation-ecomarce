import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { CartState } from '../Context/Context';
import './Cart.css'
import Rating from './../Rating/Rating';
import { AiFillDelete } from 'react-icons/ai';
const Cart = () => {
  const {
    state: { cart },
    dispatch
  } = CartState()
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  console.log(dispatch);
  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map(productItem => (
            <ListGroup.Item key={productItem.id}>
              <Row>
                <Col md={2}>
                  <Image src={productItem.image} alt={productItem.name} fluid rounded />
                </Col>
                <Col md={2} >
                  <span>{productItem.name}</span>
                </Col >
                <Col md={2}>
                  <span>${productItem.price}</span>
                </Col>
                <Col md={2}>
                  <Rating>{productItem.ratings}</Rating>
                </Col>
                <Col md={2}>
                  {/* INCREASE quantity */}
                  <Form.Control
                    as="select"
                    value={productItem.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: productItem.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(productItem.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: productItem,

                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>

                </Col>
              </Row>
            </ListGroup.Item>
          ))}


        </ListGroup>

      </div>
      <div className="filters summary">
        <span className="title">
          Subtotal ({cart.length}) items
        </span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>

      </div>
    </div>
  );
};

export default Cart;