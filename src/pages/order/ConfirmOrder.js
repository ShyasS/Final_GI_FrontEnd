// import axios from 'axios';
// import Cart from 'pages/cart/cartDetails';
// import React, { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
// import { useNavigate, Link } from 'react-router-dom';
// import './ConfirmOrder.css';

// const ConfirmOrder = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems ] = useState([]);
//   const [taxPrice,  setTaxprice] = useState({});
//   const [restaurantBranch, setRestaurantBranch] = useState(null);
//   const [isPickup, setIsPickup] = useState(true);
//   // const [shippingPrice, setShippingPrice] = useState(0);

//   // const { cartId } = useParams();

//   // Get data from session storage
//   const localData = JSON.parse(localStorage.getItem('shippingInfo'));
//   const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
//   // const name = JSON.parse(localStorage.getItem('name'));
//   const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
//   const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
//   const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
//   const selectedDate = JSON.parse(localStorage.getItem('selectedDate'));
//   const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
//   const distanceResponse = JSON.parse(localStorage.getItem('distanceResponse'));
//   const isLoggedIn = JSON.parse(localStorage.getItem('isloggedIn'));
//   // const userData = JSON.parse(localStorage.getItem('user'));

//   const shippingPrice = isPickup
//     ? 0
//     : 10 * Number(taxPrice.deliveryChargePerKm* 0.5);
  

//   // Calculate total price without shipping
//   const cartItemsTotal = JSON.parse(localStorage.getItem('cartItemsTotal'));
//   const totalPriceWithoutShipping = Number(cartItemsTotal);
//   // Calculate tax price
//   // const taxPrice = Number(0.05 * totalPriceWithoutShipping).toFixed(2);



 
//   // const fetch = async() =>{

//   // const response =  await axios.get('/api/admin/settings/get')
//   //  .then( (response)=> {
//   //   setTaxprice(response)
//   //  })
//   //  .catch( (error)=> {
//   //    console.log(error);
//   //  })
//   // }
//   // useEffect(()=>{
//   //   fetch();
//   // },[])
//   const fetchData = async() =>{
//     const response = await axios.get('/api/admin/settings/get')
//     const res = response.data.data[0]
//     setTaxprice(res)
//     console.log(response.data.data[0])
//   }
//   useEffect(()=>{
//     fetchData();
//   },[])
 
//   console.log("TaxPrice",taxPrice)

//   // Calculate total price
//   const totalPrice = Number(
//     Number((taxPrice.shippingPrice)) + Number(totalPriceWithoutShipping) + Number((taxPrice.taxAmount) || 0 )
//   ).toFixed(2);
//   // console.log(parseInt(totalPrice))

  
//   const fetchRestaurantBranch = async () => {
//     try {
//       const response = await axios.get(`/api/restaurant`, {
//         params: {
//           id: restaurantId
//         }
//       });
//       setRestaurantBranch(response.data.restaurant.restaurantBranch);
//       // console.log(response.data.restaurant.restaurantBranch);
//       localStorage.setItem(
//         'restaurantBranch',
//         JSON.stringify(restaurantBranch)
//       );
//     } catch (error) {
//       // console.error('Error fetching restaurant details:', error.message);
//       alert('Error fetching restaurant details');
//     }
//   };
//   useEffect(() => {
//     fetchRestaurantBranch();
//   }, [restaurantId]);
//   // Map shipping information
//   const mapData = () => {
//     return {
//       userName: localData.name,
//       city: billingAddress.city,
//       orderType: localData.orderType,
//       selectedTimeSlot: `${time}`,
//       state: billingAddress.state,
//       streetAddress: billingAddress.streetAddress,
//       postalCode: billingAddress.postalCode,
//       country: billingAddress.country
//     };
//   };

//   // Map data using the function
//   const mappedData = mapData();

//   const handlegoback = () =>{
//     navigate(-1);
//   }

//   const processPayment = () => {
//     const data = {
//       shippingInfo: mappedData, // Shipping information
//       cartItems,
//       orderSummary: {
//         shipping: Number(shippingPrice),
//         tax: Number(taxPrice),
//         total: Number(totalPrice)
//       }
//     };

//     // Save order information to localStorage
//     localStorage.setItem('confirmOrder', JSON.stringify(data));

//     // Redirect to the payment page
//     navigate('/payment');
//   };

//   // Fetch cart items from session storage
//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     setCartItems(storedCartItems);
//     setIsPickup(mappedData.orderType === 'Pickup');
//   }, []);

//   return (
//     <div className="ConfirmOrderMainImg bg-white">
//       <div className="py-5">
//         <Card
//           className="row d-flex justify-content-between col-12 col-md-10 col-sm-12 col-xs-12 col-lg-8 mx-auto"
//           id="CardBackIMg156"
//         >
//           <div className=" order-confirm " style={{ textAlign: 'left' }}>
//             <h4 className="mb-3 my-2" id="CardText">
//               Delivery Info
//             </h4>
//             <div className="container text-center">
//               <div className="row">
//                 <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
//                   <Card className="p-2 " id="CardText">
//                     <p id="CardText">
//                       <b>Name:</b> {localData.name} {localData.lastName}
//                       {/* Replace with actual name data */}
//                     </p>
//                     {isLoggedIn && (
//                       <>
//                         <p id="CardText">
//                           <b>Email:</b> {localData.email}
//                         </p>
//                         <p id="CardText">
//                           <b>Phone:</b> {localData.mobileNumber}
//                         </p>
//                       </>
//                     )}
//                     {!isLoggedIn && (
//                       <>
//                         <p id="CardText">
//                           <b>Email / Phone:</b> {emailOrMobile}
//                         </p>
//                         {/* <p className="mb-4" id="CardText">
//                     <b>Billing Address:</b> {mappedData.streetAddress},{' '}
//                     {mappedData.city}, {mappedData.state},{' '}
//                     {mappedData.postalCode}, {mappedData.country}
//                   </p> */}
//                         <hr />
//                       </>
//                     )}
//                     {mappedData.orderType === 'Pickup' ? (
//                       <div id="CardText">
//                         <p id="CardText">
//                           <b>Type:</b> Pickup
//                         </p>
//                         <p id="CardText">
//                           <b>Order date:</b> {selectedDate}
//                         </p>
//                         <p id="CardText">
//                           <b>Pickup Time:</b> {mappedData.selectedTimeSlot}
//                         </p>
//                         <p id="CardText">
//                           <b>Restaurant:</b> {restaurantBranch}
//                         </p>
//                         <Card className="mt-3 p-2" id="CardText">
//                           <p className="mb-4" id="CardText">
//                             <b id="CardText">Billing Address:</b>{' '}
//                             {mappedData.streetAddress}, {mappedData.city},{' '}
//                             {mappedData.state}, {mappedData.postalCode},{' '}
//                             {mappedData.country}
//                           </p>
//                         </Card>
//                       </div>
//                     ) : (
//                       <div>
//                         <p id="CardText">
//                           <b>Type:</b> Delivery
//                         </p>
//                         <p id="CardText">
//                           <b>Restaurant:</b> {restaurantBranch}
//                         </p>
//                         <p id="CardText">
//                           <b>Delivery Time:</b>{' '}
//                           {mappedData.selectedTimeSlot || Date.now()}
//                         </p>
//                         <Card className="mt-3 p-2" id="CardText">
//                           <p className="mb-4" id="CardText">
//                             <b id="CardText">Billing Address:</b>{' '}
//                             {mappedData.streetAddress}, {mappedData.city},{' '}
//                             {mappedData.state}, {mappedData.postalCode},{' '}
//                             {mappedData.country}
//                           </p>
//                         </Card>
//                         <Card className="mt-3 p-2" id="CardText">
//                           <p className="mb-4" id="CardText">
//                             <b id="CardText">Delivery Address:</b>{' '}
//                             {deliveryAddress.streetAddress},{' '}
//                             {deliveryAddress.city}, {deliveryAddress.state},{' '}
//                             {deliveryAddress.postalCode},{' '}
//                             {deliveryAddress.country}
//                           </p>
//                         </Card>
//                       </div>
//                     )}
//                   </Card>
//                 </div>
//                 {/* <Card className="p-2 " style={{ borderRadius: '10px' }}> */}
//                 <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
//                   <div className="row">
//                     <div className="col-lg-12 col-sm-12 col-xs-12 col-md-6 col-lg-6">
//                       <Cart />
//                     </div>{' '}
//                     {/* </Card> */}
//                     <div className="col-lg-12 col-sm-12 col-md-6 col-lg-6">
//                       <Card
//                         className=" p-2  h-100 "
//                         style={{
//                           color: 'black',
//                           backgroundColor: 'transparent',
//                           fontWeight: '500'
//                         }}
//                         id="order_summary"
//                       >
//                         {
//                            Array.isArray(taxPrice) && taxPrice?.map((price)=>{
//                             return (
//                               <>
//                                  <p id="CardText">
//                           Tax:{' '}
//                           <span className="order-summary-values" id="CardText">
//                             ${price.taxAmount}
//                           </span>
//                         </p>
//                         <p id="CardText">
//                           Delivery:{' '}
//                           <span className="order-summary-values">
//                             ${price.minDeliveryCharge}
//                           </span>
//                         </p>

//                               </>
//                             )
//                           })
//                         }

//                         {/* <hr /> */}
//                         <p id="CardText">
//                           Total:{' '}
//                           <span className="order-summary-values" id="CardText">
//                             ${totalPrice}
//                           </span>
//                         </p>
//                         {/* <hr /> */}
//                       </Card>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button
//                     type="submit"
//                     id="checkout_btn"
//                     className="btn back my-4"
//                     style={{ backgroundColor: '#ffa500' }}
//                     onClick={processPayment}
//                   >
//                     Proceed to Payment
//                   </button>
//                   <button
//               id="checkout_btn"
//               className="btn back my-4 ms-3 "
//               onClick={handlegoback}
//             >
//               BACK TO CART
//             </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ConfirmOrder;




import axios from 'axios';
import Cart from 'pages/cart/cartDetails';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ConfirmOrder.css';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [taxPrice, setTaxprice] = useState({});
  const [restaurantBranch, setRestaurantBranch] = useState(null);
  const [isPickup, setIsPickup] = useState(true);

  // Get data from session storage
  const localData = JSON.parse(localStorage.getItem('shippingInfo'));
  const emailOrMobile = JSON.parse(localStorage.getItem('emailOrMobile'));
  const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
  const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
  const restaurantId = JSON.parse(localStorage.getItem('restaurantId'));
  const selectedDate = JSON.parse(localStorage.getItem('selectedDate'));
  const time = JSON.parse(localStorage.getItem('selectedTimeSlot'));
  const distanceResponse = JSON.parse(localStorage.getItem('distanceResponse'));
  const isLoggedIn = JSON.parse(localStorage.getItem('isloggedIn'));

  const shippingPrice = isPickup ? 0 : 10 * Number(taxPrice.deliveryChargePerKm * 0.5);
  console.log(shippingPrice)

  // Calculate total price without shipping
  const cartItemsTotal = JSON.parse(localStorage.getItem('cartItemsTotal'));
  const totalPriceWithoutShipping = Number(cartItemsTotal);

  const fetchData = async () => {
    axios.get('/api/admin/settings/get')
    .then( (response)=> {
      setTaxprice(response.data.data[0])
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log('Tax-Price', taxPrice);

  // Calculate total price
  const totalPrice = Number(
    shippingPrice + totalPriceWithoutShipping + Number(taxPrice.taxAmount || 0)
  ).toFixed(2);

  const fetchRestaurantBranch = async () => {
    try {
      const response = await axios.get(`/api/restaurant`, {
        params: { id: restaurantId }
      });
      setRestaurantBranch(response.data.restaurant.restaurantBranch);
      localStorage.setItem('restaurantBranch', JSON.stringify(response.data.restaurant.restaurantBranch));
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      alert('Error fetching restaurant details');
    }
  };

  useEffect(() => {
    fetchRestaurantBranch();
  }, [restaurantId]);

  const mapData = () => ({
    userName: localData.name,
    city: billingAddress.city,
    orderType: localData.orderType,
    selectedTimeSlot: `${time}`,
    state: billingAddress.state,
    streetAddress: billingAddress.streetAddress,
    postalCode: billingAddress.postalCode,
    country: billingAddress.country
  });

  const mappedData = mapData();

  const handleGoBack = () => {
    navigate(-1);
  };

  const processPayment = () => {
    const data = {
      shippingInfo: mappedData, // Shipping information
      cartItems,
      orderSummary: {
        shipping: Number(shippingPrice),
        tax: Number(taxPrice.taxAmount || 0),
        total: Number(totalPrice)
      }
    };

    // Save order information to localStorage
    localStorage.setItem('confirmOrder', JSON.stringify(data));

    // Redirect to the payment page
    navigate('/payment');
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    setIsPickup(mappedData.orderType === 'Pickup');
  }, []);

  return (
    <div className="ConfirmOrderMainImg bg-white">
      <div className="py-5">
        <Card
          className="row d-flex justify-content-between col-12 col-md-10 col-sm-12 col-xs-12 col-lg-8 mx-auto"
          id="CardBackIMg156"
        >
          <div className=" order-confirm " style={{ textAlign: 'left' }}>
            <h4 className="mb-3 my-2" id="CardText">
              Delivery Info
            </h4>
            <div className="container text-center">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                  <Card className="p-2 " id="CardText">
                    <p id="CardText">
                      <b>Name:</b> {localData.name} {localData.lastName}
                    </p>
                    {isLoggedIn && (
                      <>
                        <p id="CardText">
                          <b>Email:</b> {localData.email}
                        </p>
                        <p id="CardText">
                          <b>Phone:</b> {localData.mobileNumber}
                        </p>
                      </>
                    )}
                    {!isLoggedIn && (
                      <>
                        <p id="CardText">
                          <b>Email / Phone:</b> {emailOrMobile}
                        </p>
                        <hr />
                      </>
                    )}
                    {mappedData.orderType === 'Pickup' ? (
                      <div id="CardText">
                        <p id="CardText">
                          <b>Type:</b> Pickup
                        </p>
                        <p id="CardText">
                          <b>Order date:</b> {selectedDate}
                        </p>
                        <p id="CardText">
                          <b>Pickup Time:</b> {mappedData.selectedTimeSlot}
                        </p>
                        <p id="CardText">
                          <b>Restaurant:</b> {restaurantBranch}
                        </p>
                        <Card className="mt-3 p-2" id="CardText">
                          <p className="mb-4" id="CardText">
                            <b id="CardText">Billing Address:</b> {mappedData.streetAddress}, {mappedData.city}, {mappedData.state}, {mappedData.postalCode}, {mappedData.country}
                          </p>
                        </Card>
                      </div>
                    ) : (
                      <div>
                        <p id="CardText">
                          <b>Type:</b> Delivery
                        </p>
                        <p id="CardText">
                          <b>Restaurant:</b> {restaurantBranch}
                        </p>
                        <p id="CardText">
                          <b>Delivery Time:</b> {mappedData.selectedTimeSlot || Date.now()}
                        </p>
                        <Card className="mt-3 p-2" id="CardText">
                          <p className="mb-4" id="CardText">
                            <b id="CardText">Billing Address:</b> {mappedData.streetAddress}, {mappedData.city}, {mappedData.state}, {mappedData.postalCode}, {mappedData.country}
                          </p>
                        </Card>
                        <Card className="mt-3 p-2" id="CardText">
                          <p className="mb-4" id="CardText">
                            <b id="CardText">Delivery Address:</b> {deliveryAddress.streetAddress}, {deliveryAddress.city}, {deliveryAddress.state}, {deliveryAddress.postalCode}, {deliveryAddress.country}
                          </p>
                        </Card>
                      </div>
                    )}
                  </Card>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-xs-12 col-md-6 col-lg-6">
                      <Cart />
                    </div>
                    <div className="col-lg-12 col-sm-12 col-md-6 col-lg-6">
                      <Card
                        className=" p-2  h-100 "
                        style={{ color: 'black', backgroundColor: 'transparent', fontWeight: '500' }}
                        id="order_summary"
                      >
                        <p id="CardText">
                          Tax:{' '}
                          <span className="order-summary-values" id="CardText">
                            ${taxPrice.taxAmount || 0}
                          </span>
                        </p>
                        <p id="CardText">
                          Delivery:{' '}
                          <span className="order-summary-values">
                            ${taxPrice.minDeliveryCharge || 0}
                          </span>
                        </p>
                        <p id="CardText">
                          Total:{' '}
                          <span className="order-summary-values" id="CardText">
                            ${totalPrice}
                          </span>
                        </p>
                      </Card>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    id="checkout_btn"
                    className="btn back my-4"
                    style={{ backgroundColor: '#ffa500' }}
                    onClick={processPayment}
                  >
                    Proceed to Payment
                  </button>
                  <button
                    id="checkout_btn"
                    className="btn back my-4 ms-3 "
                    onClick={handleGoBack}
                  >
                    BACK TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmOrder;
