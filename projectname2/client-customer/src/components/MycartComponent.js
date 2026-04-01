import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import { withRouter } from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext;

  render() {
    const cart = this.context.mycart || [];

    const rows = cart.map((item, index) => {
      const p = item.product;

      const img =
        p.images && p.images.length > 0
          ? "/uploads/" + p.images[0]   // ✅ FIX
          : "";

      const category =
        p.categories_id && p.categories_id.length > 0
          ? p.categories_id[0].name
          : "";

      return (
        <tr key={p._id} style={styles.row}>
          <td>{index + 1}</td>
          <td>{p.name}</td>
          <td>{category}</td>

          <td>
            {img && <img src={img} style={styles.img} alt="" />}
          </td>

          <td>{p.price.toLocaleString()}₫</td>
          <td>{item.quantity}</td>
          <td style={styles.amount}>
            {(p.price * item.quantity).toLocaleString()}₫
          </td>

          <td>
            <button
              style={styles.removeBtn}
              onClick={() => this.lnkRemoveClick(p._id)}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div style={styles.container}>
        <h2 style={styles.title}>🛒 My Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Giỏ hàng trống 😢</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.header}>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        )}

        <div style={styles.footer}>
          <h3>
            Total: {CartUtil.getTotal(cart).toLocaleString()}₫
          </h3>

          <button
            style={styles.checkoutBtn}
            onClick={() => this.lnkCheckoutClick()}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }

  // ================= REMOVE =================
  lnkRemoveClick(id) {
    const mycart = [...this.context.mycart];
    const index = mycart.findIndex(x => x.product._id === id);

    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }

  // ================= CHECKOUT =================
  lnkCheckoutClick() {
    if (window.confirm("Xác nhận đặt hàng?")) {

      const total = CartUtil.getTotal(this.context.mycart);

      const items = this.context.mycart.map(item => ({
        product: item.product?._id,
        quantity: item.quantity
      }));

      if (this.context.customer) {
        this.apiCheckout(total, items);
      } else {
        this.props.router.navigate('/login')
      }
    }
  }

  // ================= API CHECKOUT =================
  apiCheckout(total, items) {

    const body = {
      total: total,
      items: items
    };

    const config = {
      headers: {
        Authorization: `Bearer ${this.context.token}`
      }
    };

    axios.post('/api/customer/checkout', body, config) // ✅ FIX
      .then(res => {

        if (res.data.success) {
          alert("🎉 Đặt hàng thành công!");
          this.context.setMycart([]);
          this.props.router.navigate('/myorders')
        } else {
          alert("❌ " + (res.data.message || "Checkout failed"));
        }

      })
      .catch(err => {

        const msg =
          err.response?.data?.message ||
          err.message ||
          "Server error";

        alert("❌ " + msg);
      });
  }
}

const styles = {
  container: {
    width: "90%",
    margin: "30px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },
  title: { textAlign: "center", marginBottom: "20px" },
  table: { width: "100%", borderCollapse: "collapse" },
  header: {
    background: "linear-gradient(45deg, #4CAF50, #2e7d32)",
    color: "white"
  },
  row: {
    textAlign: "center",
    borderBottom: "1px solid #eee"
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
  },
  removeBtn: {
    background: "#ff4d4d",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  checkoutBtn: {
    background: "#4CAF50",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  footer: {
    marginTop: "20px",
    textAlign: "right"
  }
};

export default withRouter(Mycart);