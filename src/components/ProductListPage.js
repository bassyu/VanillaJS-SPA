import { dummyRequest } from "../lib/api.js";
import ProductList from "./ProductList.js";

export default function ProductListPage({ $target }) {
  const $page = document.createElement('div');
  $page.className = 'ProductListPage';
  $target.appendChild($page);

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  }

  const fetchProducts = async () => {
    const products = await dummyRequest('/products');
    this.setState(products);
  }

  fetchProducts();

  this.render = () => {
    $page.innerHTML = '<h1>상품 목록</h1>';

    new ProductList({
      $target: $page,
      initialState: this.state
    }).render();
  }
}