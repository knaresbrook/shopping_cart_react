import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addQuantityToCart,
  delQuantityFromCart,
  cartDeleteItem,
} from "../actions/itemActions";

export class Cart extends Component {
  constructor(props) {
    super(props);
  }

  addHandleClick = (id) => {
    this.props.addToQty(id);
  };

  delHandleClick = (id) => {
    this.props.delToQty(id);
  };

  cartDelHandleClick = (id) => {
    this.props.cartDelItem(id);
  };

  renderRows() {
    return this.props.items.addedItems.map((item, i) => {
      return (
        <tr key={i}>
          <td>
            <img width="30px" height="30px" src={item.thumbnailUrl} />
          </td>
          <td>{item.title}</td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => {
                this.addHandleClick(item.id);
              }}
            >
              +
            </button>
            &nbsp;{item.quantity}&nbsp;
            <button
              className="btn btn-danger"
              onClick={() => {
                this.delHandleClick(item.id);
              }}
            >
              -
            </button>
          </td>
          <td>£{item.price}</td>
          <td>£{(Number(item.quantity) * Number(item.price)).toFixed(2)}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.cartDelHandleClick(item.id);
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  render(props) {
    return (
      <div>
        <h1 id="title">Shopping Cart Summary</h1>
        <table
          style={{ width: 900 }}
          id="card"
          className="table table-hover table-bordered table-dark"
        >
          <tbody>
            {this.renderRows()}
            <tr>
              <td style={{ color: "#eeeee", textAlign: "right" }} colSpan="5">
                Subtotal:&nbsp;£{this.props.items.total}
              </td>
            </tr>
            <tr>
              <td style={{ color: "#eeeee", textAlign: "right" }} colSpan="5">
                Vat 20%:&nbsp;£
                {(Number(this.props.items.total) * 0.2).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style={{ color: "#eeeee", textAlign: "right" }} colSpan="5">
                Total:&nbsp;£
                {(
                  Number(this.props.items.total) * 0.2 +
                  Number(this.props.items.total)
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToQty: (id) => {
      dispatch(addQuantityToCart(id));
    },
    delToQty: (id) => {
      dispatch(delQuantityFromCart(id));
    },
    cartDelItem: (id) => {
      dispatch(cartDeleteItem(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
