import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
        </li>
      )
    })
  return (
    <React.Fragment>
      <h3>Your Complete Burger Order:</h3>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Looks good?</p>
      <Button btnType="Danger" clicked={props.purchaseCancled}>Go Back</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>Submit Order</Button>
    </React.Fragment>
  )
};

export default orderSummary;