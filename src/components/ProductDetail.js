export default function ProductDetail({ $target, initialState }) {
  const $productDetail = document.createElement('div');
  $productDetail.className = 'ProductDetail';
  $target.appendChild($productDetail);

  this.state = initialState;
  
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  }
  
  $productDetail.addEventListener('change', e => {
    if (e.target.tagName === 'SELECT') {
      console.log('change', e.target.value);

      const selectedOptionId = parseInt(e.target.value);
      const { product, selectedOptions } = this.state;
      const option = product.productOptions.find(option => option.id == selectedOptionId);
      const selectedOption = selectedOptions.find(selectedOption => selectedOption.optionId === selectedOptionId);

      if (option && !selectedOption) {
        const newSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1
          }
        ];
        this.setState({
          ...this.state,
          selectedOptions: newSelectedOptions
        });
      }
    }
  })

  this.render = () => {
    console.log('ProductDetail');
    const { product } = this.state;

    $productDetail.innerHTML = `
      <img src="${product.imageUrl}">
      <div class="ProductDetail__info">
        <h2>${product.name}</h2>
        <div class="ProductDetail__price">${product.price}원~</div>
        <select>
          <option>선택하세요.</option>
          ${product.productOptions.map(option => `
              <option value="${option.id}" ${option.stock === 0 ? 'disabled' : ''}>
                ${option.stock === 0 ? '(품절) ' : ''}${product.name} ${option.name} ${option.price > 0 ? `(+${option.price}원)` : ''}
              </option>
            `).join('')}
        </select>
        <div class="ProductDetail__selectedOptions"></div>
      </div>
    `;
  }
}