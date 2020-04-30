import React, { Component } from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { itemsFetchData } from "../actions/itemActions";
import { addToCart } from "../actions/itemActions";

class Home extends Component {
  componentDidMount() {
    this.props.fetchData(
      "https://jsonplaceholder.typicode.com/photos?albumId=1"
    );
  }

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  renderRows() {
    let rowContents = [];
    let acc = [];

    //const contents = items.reduce((acc, p, i) => {
    this.props.itemData.items.forEach((p, i) => {
      rowContents.push(
        <div key={i} className="col col-md-3 text-center">
          <img src={p.thumbnailUrl} />
          <p>£{p.price}</p>
          <p>{p.title}</p>
          <button
            className="btn btn-success"
            onClick={() => {
              this.handleClick(p.id);
            }}
          >
            +
          </button>
          <span>&nbsp;{p.quantity}&nbsp;</span>
          <button className="btn btn-danger">-</button>
        </div>
      );
      if (i % 4 === 3) {
        acc.push(
          <div key={i} className="row mt-3 mb-3">
            {rowContents}
          </div>
        );
        rowContents = [];
      }
    });
    return acc;
  }

  render() {
    const { isLoading, items, hasErrored } = this.props.itemData;
    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (isLoading) {
      return <p>Loading…</p>;
    }

    return <div className="container">{this.renderRows()}</div>;
  }
}
//     contents.push(<div className="row">{rowContents}</div>);
//     return <div className="container">{contents}</div>;
//   }
// }

const mapStateToProps = (state) => {
  return {
    itemData: state.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
