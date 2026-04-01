import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: '',
      txtPrice: '',
      cmbCategory: '',
      fileImage: null,
      imagePreview: null,
      categories: []
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item) {
      const p = this.props.item;

      this.setState({
        txtID: p._id,
        txtName: p.name,
        txtPrice: p.price,

        cmbCategory:
          typeof p.categories_id?.[0] === 'object'
            ? p.categories_id[0]._id
            : p.categories_id?.[0] || '',

        fileImage: null,

        imagePreview: p.images?.[0]
          ? `/uploads/${p.images[0]}`   // ✅ FIX
          : null
      });
    }
  }

  // =========================
  // GET CATEGORY LIST
  // =========================
  apiGetCategories() {
    axios
      .get('/api/admin/categories', {
        headers: {
          Authorization: `Bearer ${this.context.token}`
        }
      })
      .then(res => {
        this.setState({ categories: res.data.categories || [] });
      })
      .catch(err => console.error(err));
  }

  // =========================
  // ADD PRODUCT
  // =========================
  btnAddNewClick = () => {
    const formData = new FormData();

    formData.append('name', this.state.txtName);
    formData.append('price', this.state.txtPrice);
    formData.append('categories_id', this.state.cmbCategory);

    if (this.state.fileImage) {
      formData.append('image', this.state.fileImage);
    }

    axios
      .post('/api/admin/products', formData, {
        headers: {
          Authorization: `Bearer ${this.context.token}`
        }
      })
      .then(() => {
        alert('Add success');
        this.props.reload();
        this.resetForm();
      })
      .catch(err => {
        console.error(err);
        alert('Add failed');
      });
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  btnUpdateClick = () => {
    const formData = new FormData();

    formData.append('name', this.state.txtName);
    formData.append('price', this.state.txtPrice);
    formData.append('categories_id', this.state.cmbCategory);

    if (this.state.fileImage) {
      formData.append('image', this.state.fileImage);
    }

    axios
      .put(`/api/admin/products/${this.state.txtID}`, formData, {
        headers: {
          Authorization: `Bearer ${this.context.token}`
        }
      })
      .then(() => {
        alert('Update success');
        this.props.reload();
      })
      .catch(() => alert('Update failed'));
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  btnDeleteClick = () => {
    if (!window.confirm('Delete this product?')) return;

    axios
      .delete(`/api/admin/products/${this.state.txtID}`, {
        headers: {
          Authorization: `Bearer ${this.context.token}`
        }
      })
      .then(() => {
        alert('Delete success');
        this.props.reload();
        this.resetForm();
      })
      .catch(() => alert('Delete failed'));
  };

  // =========================
  // RESET FORM
  // =========================
  resetForm() {
    this.setState({
      txtID: '',
      txtName: '',
      txtPrice: '',
      cmbCategory: '',
      fileImage: null,
      imagePreview: null
    });
  }

  // =========================
  // RENDER
  // =========================
  render() {
    return (
      <div style={{ minWidth: '320px' }}>
        <h2>PRODUCT DETAIL</h2>

        <p>ID</p>
        <input value={this.state.txtID} readOnly />

        <p>Name</p>
        <input
          value={this.state.txtName}
          onChange={e => this.setState({ txtName: e.target.value })}
        />

        <p>Price</p>
        <input
          value={this.state.txtPrice}
          onChange={e => this.setState({ txtPrice: e.target.value })}
        />

        <p>Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files[0];
            if (file) {
              this.setState({
                fileImage: file,
                imagePreview: URL.createObjectURL(file)
              });
            }
          }}
        />

        {this.state.imagePreview && (
          <img
            src={this.state.imagePreview}
            width="150"
            alt="preview"
            style={{ marginTop: '10px', display: 'block' }}
          />
        )}

        <p>Category</p>
        <select
          value={this.state.cmbCategory}
          onChange={e => this.setState({ cmbCategory: e.target.value })}
        >
          <option value="">-- Select Category --</option>

          {this.state.categories.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <br /><br />

        <button onClick={this.btnAddNewClick}>ADD NEW</button>
        <button onClick={this.btnUpdateClick}>UPDATE</button>
        <button onClick={this.btnDeleteClick}>DELETE</button>
      </div>
    );
  }
}

export default ProductDetail;