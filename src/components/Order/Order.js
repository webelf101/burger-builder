import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const style = { textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px' }

  const ingredientOutput = ingredients.map(ig => {
    return <span style={style} key={ig.name}>{ig.name} ({ig.amount})</span>
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
      <p>Customer: <strong>{props.customer}</strong></p>
    </div>
  )
}

export default order;