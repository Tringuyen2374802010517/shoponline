import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  componentDidMount() {
    if (this.context.customer && this.context.token) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  render() {
    if (!this.context.token) {
      return <Navigate replace to="/login" />;
    }

    const selectedOrder = this.state.order || this.state.orders[0];

    const orders = this.state.orders.map((item) => {

      const customer = this.context.customer || {};

      return (
        <tr
          key={item._id}
          style={styles.row}
          onClick={() => this.trItemClick(item)}
        >
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{customer.name || 'N/A'}</td>
          <td>{customer.phone || ''}</td>
          <td>{item.total?.toLocaleString()}₫</td>

          <td style={{
            color: item.status === 'APPROVED' ? 'green' : 'orange',
            fontWeight: 'bold'
          }}>
            {item.status}
          </td>
        </tr>
      );
    });

    let items = null;

    if (selectedOrder) {
      items = selectedOrder.items.map((item, index) => {

        const p = item.product || {};

        const img =
          p.images && p.images.length > 0
            ? "/uploads/" + p.images[0]   // ✅ FIX
            : "";

        return (
          <tr key={index} style={styles.row}>
            <td>{index + 1}</td>
            <td>{p._id}</td>
            <td>{p.name}</td>

            <td>
              {img && <img src={img} style={styles.img} alt="" />}
            </td>

            <td>{p.price?.toLocaleString()}₫</td>
            <td>{item.quantity}</td>
            <td style={styles.amount}>
              {(p.price * item.quantity)?.toLocaleString()}₫
            </td>
          </tr>
        );
      });
    }

    return (
      <div style={styles.container}>

        <h2 style={styles.title}>ORDER LIST</h2>

        <table style={styles.table}>
          <thead>
            <tr style={styles.header}>
              <th>ID</th>
              <th>Creation date</th>
              <th>Cust.name</th>
              <th>Cust.phone</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{orders}</tbody>
        </table>

        {selectedOrder && (
          <div style={{ marginTop: "30px" }}>

            <h2 style={styles.title}>ORDER DETAIL</h2>

            <table style={styles.table}>
              <thead>
                <tr style={styles.header}>
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>{items}</tbody>
            </table>

          </div>
        )}

      </div>
    );
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  apiGetOrdersByCustID(cid) {
    const token = this.context.token?.trim();

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    // ✅ FIX
    axios.get('/api/customer/orders/customer/' + cid, config)
      .then(res => {
        this.setState({
          orders: res.data,
          order: res.data[0]
        });
      })
      .catch(err => {
        console.error("ORDERS ERROR:", err);
      });
  }
}

/* ===== STYLE ===== */
const styles = {
  container: {
    width: "90%",
    margin: "30px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  header: {
    background: "linear-gradient(45deg, #4CAF50, #2e7d32)",
    color: "white"
  },
  row: {
    textAlign: "center",
    borderBottom: "1px solid #eee",
    cursor: "pointer"
  },
  img: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    objectFit: "cover"
  },
  amount: {
    fontWeight: "bold",
    color: "#e53935"
  }
};

export default Myorders;