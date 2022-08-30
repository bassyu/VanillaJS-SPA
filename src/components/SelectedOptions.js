export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement('div');
  $target.appendChild($component);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  }

  $component.addEventListener('change', e => {
    if (e.target.tagName === 'INPUT') {
      try {
        const newQuantity = parseInt(e.target.value);
        const newSelectedOptions = [ ...this.state.selectedOptions ];

        if (typeof newQuantity === 'number') {
          const { product } = this.state;
          const optionId = parseInt(e.target.dataset.optionid);
          const option = product.productOptions.find(productOption => productOption.id === optionId);
          const selectedOptionIndex = newSelectedOptions.findIndex(selectedOption => selectedOption.optionId === optionId);

          newSelectedOptions[selectedOptionIndex].quantity = option.stock >= newQuantity ? newQuantity : option.stock;

          this.setState({
            ...this.state,
            selectedOptions: newSelectedOptions
          });
        }
      }
      catch (e) {
        console.log(e);
      }
    }
  })

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;

    return selectedOptions.reduce(
      (acc, option) => acc + ((productPrice + option.optionPrice) * option.quantity),
      0
    );
  }

  this.render = () => {
    const { product, selectedOptions } = this.state;
    if (!product || !selectedOptions) {
      $component.innerHTML = 'Loading...';
      return;
    }
    
    $component.innerHTML = `
      <h3>선택된 상품</h3>
      <ul>
        ${selectedOptions.map(selectedOption => `
          <li>
            ${selectedOption.optionName} ${product.price + selectedOption.optionPrice}원
            <input type="text" data-optionId="${selectedOption.optionId}" value="${selectedOption.quantity}">
          </li>
        `).join('')}
      </ul>
      <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
      <button class="OrderButton">주문하기</button>
    `
  }
}