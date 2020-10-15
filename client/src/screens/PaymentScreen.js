import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
        </Form.Group>

        <Col>
          <Form.Check
            id='PayPal'
            type='radio'
            label='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
