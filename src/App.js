import CartPage from './components/CartPage.js';
import ProductDetailPage from './components/ProductDetailPage.js';
import ProductListPage from './components/ProductListPage.js';
import { init } from './lib/router.js';

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;

    $target.innerHTML = '';

    if (pathname === '/') {
      new ProductListPage({ $target }).render();
    }
    else if (pathname.indexOf('/products/') === 0) {
      const [, , productId] = pathname.split('/');
      new ProductDetailPage({ $target, productId }).render();
    }
    else if (pathname === '/cart') {
      new CartPage({ $target }).render();
    }
  }

  init(this.route);

  this.route();

  window.addEventListener('popstate', this.route);
}