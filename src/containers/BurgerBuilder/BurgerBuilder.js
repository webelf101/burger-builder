import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	componentDidMount() {
    this.props.onInitIngredients();
	}

	updatePurchaseState (ingredients) {
		const purchasable = Object.values(ingredients).some(quantity => quantity > 0);
    return purchasable;
	}

	purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
		let orderSummary = null;

		if (this.props.ings) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler} />
				</React.Fragment>
			);
			orderSummary =  <OrderSummary
				price={this.props.price}
				ingredients={this.props.ings}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinue={this.purchaseContinueHandler} />;
		}

		return (
			<React.Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));