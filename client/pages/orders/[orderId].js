import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import useRequest from "../../hooks/use-request";
import Router from "next/router";

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51S8gD6RpJhPkacR2EbrgQ0TYJaVg8UtRsownk5OMO1udBOYVJlNaaqO1AbfW3Vgu2ZMqzTq4giUyxjGHIuOlfcz400ik4HSIoY');

const CheckoutForm = ({ order, currentUser, doRequest }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;
    
    setLoading(true);
    
    const cardElement = elements.getElement(CardElement);
    
    const { error, token } = await stripe.createToken(cardElement);
    
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    
    doRequest({ token: token.id });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
          },
        }}
      />
      <button 
        type="submit" 
        disabled={!stripe || loading}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#5469d4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'default' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? 'Processing...' : `Pay $${order.ticket.price}`}
      </button>
    </form>
  );
};

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders')
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }

    return (
        <div>
            <h2>Complete Your Order</h2>
            <p>Time left to pay: {timeLeft} seconds</p>
            <p>Ticket Price: ${order.ticket.price}</p>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm 
                    order={order} 
                    currentUser={currentUser} 
                    doRequest={doRequest} 
                />
            </Elements>
            
            {errors && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {errors}
                </div>
            )}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    return { order: data };
};

export default OrderShow;