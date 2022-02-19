import React from 'react';
import { Container, FormControl, Navbar, Dropdown, Badge, Nav ,Button} from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CartState } from '../Context/Context';
const Header = () => {
       const {
       state:{cart},
       dispatch,
       productDispatch,
        } = CartState()
    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                 <Link to="/">Shopping Cart</Link>
                </Navbar.Brand>

                <Navbar.Text className="search">
                <FormControl style={{ width: 500 }}
                        placeholder="Search a productItemuct"
                        className="m-auto"
                        onChange={(e) => {
                          productDispatch({
                            type: "FILTER_BY_SEARCH",
                            payload: e.target.value,
                          });
                        }}
                    />
                </Navbar.Text>

                    <Nav>  
                    <Dropdown alignRight>

                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color="white" fontSize="25px"/>
                              <Badge> {cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ minWidth: 370 }}>
                          
                          {
                              cart.length>0?(
                                <>
                                {cart.map((productItem) => (
                                  <span className="cartitem" key={productItem.id}>
                                    <img
                                      src={productItem.image}
                                      className="cartItemImg"
                                      alt={productItem.name}
                                    />
                                    <div className="cartItemDetail">
                                      <span>{productItem.name}</span>
                                      <span>$ {productItem.price.split(".")[0]}</span>
                                    </div>
                                    <AiFillDelete
                                      fontSize="20px"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        dispatch({
                                          type: "REMOVE_FROM_CART",
                                          payload: productItem,
                                        })
                                      }
                                    />
                                  </span>
                                ))}
                                <Link to="/cart">
                                  <Button style={{ width: "95%", margin: "0 10px" }}>
                                    Go To Cart
                                  </Button>
                                </Link>
                              </>
                              ):(<span style={{ padding: 20 }}>Cart is Empty!</span>)
                          }
                            
                        </Dropdown.Menu>

                    </Dropdown>
                    </Nav>

                
            </Container>

        </Navbar>
    );
};

export default Header;