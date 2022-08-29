export default function ProductList({ $target, initialState }) {
  const $productList = document.createElement('ul');
  $target.appendChild($productList);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  }

  this.render = () => {
    if (!this.state){
      console.log('no state');
      return;
    }
    $productList.innerHTML = 'list'
    $productList.innerHTML = `
      ${this.state.map(product =>
        `
          <li class="Product">
            <img src="${product.imageUrl}">
            <div class="Product__info">
              <div>${product.name}</div>
              <div>${product.price}~</div>
            </div>
          </li>
        `
        ).join('')}`;
  }
}