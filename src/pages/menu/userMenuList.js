import React, { useState, useEffect } from 'react';
import { Button, Col, Badge } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './userMenuList.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MenuList = ({ menus, searchTerm, handleSearchChange, handleShow }) => {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const initialQuantities = storedCartItems.reduce((acc, item) => {
      acc[item._id] = Number(item.quantity);
      return acc;
    }, {});
    setQuantities(initialQuantities);
    setCartItems(storedCartItems);
  }, []);

  const updatelocalStorage = (updatedCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleAdd = (menuItem) => {
    if (menuItem.isAvailable === false) return;

    const updatedQuantities = {
      ...quantities,
      [menuItem._id]: (quantities[menuItem._id] || 0) + 1
    };
    setQuantities(updatedQuantities);

    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === menuItem._id) {
        return { ...cartItem, quantity: (cartItem.quantity || 0) + 1 };
      }
      return cartItem;
    });
    updatelocalStorage(updatedCartItems);
  };

  const handleMinus = (item) => {
    if (item.isAvailable === false) return;

    const updatedQuantities = {
      ...quantities,
      [item._id]: Math.max((quantities[item._id] || 0) - 1, 0)
    };

    setQuantities(updatedQuantities);

    let updatedCartItems;

    if (updatedQuantities[item._id] === 0) {
      updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
    } else {
      updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: Math.max((cartItem.quantity || 0) - 1, 0)
          };
        }
        return cartItem;
      });
    }

    updatelocalStorage(updatedCartItems);
  };

  const handleAddToCartClick = (menuItem) => {
    const updatedQuantities = {
      ...quantities,
      [menuItem._id]: 1
    };
    setQuantities(updatedQuantities);

    const updatedCartItems = [...cartItems, { ...menuItem, quantity: 1 }];
    updatelocalStorage(updatedCartItems);
  };

  const handleDelete = (menuItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== menuItem._id
    );

    updatelocalStorage(updatedCartItems);

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[menuItem._id];
      return updatedQuantities;
    });
  };
  return (
    <div>
      <Col
        lg={{ span: 4, offset: 4 }}
        md={{ span: 8, offset: 2 }}
        sm={{ span: 12, offset: 2 }}
        xs={12}
      >

        <div>

          <br />
          <input
            type="text"
            style={{
              borderColor:'red',  
              borderRadius: '50px',
              marginTop: '50px',
              backgroundColor: 'white',
              color: 'black'
            }}
            className={`form-control `}
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </Col>

      {menus.length === 0 ? (
        <div style={{ margin: '2%', textAlign: 'center' }}>
          <p>No menus found.</p>
        </div>
      ) : (
        <Container>
          <Row id="RowFourthComp" xs={12} sm={2} lg={3} xl={4} md={2} className="mt-5">
            {menus.map((menuItem) => (
              <div key={menuItem._id} className="row">
                <div className='MenuCard'>
                  <Card style={{ width: '18rem' }} id="CardBackIMg1112">
                    <Card.Img
                      variant="top"
                      src={
                        menuItem.images.length > 0
                          ? menuItem.images[0].image
                          : 'https://via.placeholder.com/75x50'
                      }
                      alt={menuItem.name}
                      style={{ height: '200px', width: '285px' }}
                    />
                    <Card.Body>
                      <Card.Title
                        className="text-center"
                        style={{ fontSize: '23px' }}
                        id="CardText"
                      >
                        <h5>{menuItem.name}</h5>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-center" id="CardText">
                        ${menuItem.price}
                      </Card.Subtitle>
                      <Card.Text className="text-center" id="CardText">
                        <p id="CardText" style={{ fontSize: '17px' }}>
                          {menuItem.mealTypeCategory}
                        </p>
                      </Card.Text>
                      <Card.Text className="text-center" id="CardText">
                        <p id="CardText" style={{ fontSize: '17px' }}>
                          {menuItem.description}
                        </p>
                      </Card.Text>
                      {quantities[menuItem._id] ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            // variant="danger"
                            style={{ borderColor:'red',backgroundColor:'transparent', color:'black' }}
                            onClick={() => handleMinus(menuItem)}
                            className="me-2"
                          >
                            -
                          </Button>
                          <span
                            style={{ fontSize: '20px', fontWeight: 'bold' }}
                          >
                            {quantities[menuItem._id]}
                          </span>
                          <Button
                            style={{  borderColor:'red',backgroundColor:'transparent', color:'black' }}
                            // variant="success"
                            onClick={() => handleAdd(menuItem)}
                            className="ms-2"
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="primary"
                          id="cart_btn"
                          disabled={!menuItem.isAvailable}
                          onClick={() => handleAddToCartClick(menuItem)}
                          className="btn d-inline mb-2 ms-auto"
                          style={{
                            borderColor:'red',
                            backgroundColor:'#fdefef', 
                            color:'black',
                            fontWeight: '600',
                            width: '240px'
                          }}
                        >
                          {!menuItem.isAvailable ? (
                            <h6 >Sold Out</h6>
                          ) : (
                            <h6 style={{ fontFamily: 'serif' }}>Add to Cart</h6>
                          )}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
            <>
              <Button
                as={Link}
                to="/cart"
                className='px-3  w-100 d-flex align-items-center justify-content-center'
                style={{
                  border: 'none',
                  backgroundColor: 'green',
                  height:'50px',
                  color: 'white',
                  borderRadius: '10px',
                  marginTop: '40px',
                  position: 'sticky',
                  bottom:'0px',
                  zIndex:2

                }}
              >
                {/* <i className="fa-solid fa-cart-shopping fa-xl " /> */}
                <div className='float-center ms-3'>
                {
                  cartItems && cartItems.length > 1 ? (<span style={{ textTransform: 'lowercase' }}>{cartItems.length}{' '}items added</span>) : (<div style={{ textTransform: 'lowercase' }}>{cartItems.length}{' '}item added</div>)
                }
                </div>
                {' '}
                <span className='mx-auto'>View cart</span>
              </Button>
            </>
          </Row>
        </Container>
      )}
    </div>
  );
};
export default MenuList;
