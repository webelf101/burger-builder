import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger</NavigationItem>
    {props.isAuthenticated  && <NavigationItem link="/orders">Orders</NavigationItem>}
    {!props.isAuthenticated
      ? <NavigationItem link="/auth">Log in / Sign up</NavigationItem>
      : <NavigationItem link="/logout">Log out</NavigationItem>
    }
  </ul>
);

export default navigationItems;