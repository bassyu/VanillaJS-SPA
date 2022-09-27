const API_END_POINT = 'https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (url, option={}) => {
  try {
    const fullUrl = `${API_END_POINT}${url}`;
    const response = await fetch(fullUrl, option);

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('API 통신 실패');
  }
  catch (e) {
    alert(e.message);
  }
}

export const dummyRequest = async (url, option={}) => {
  await new Promise((r) => setTimeout(r, 100));

  if (url === '/products'){
    const response = await fetch('../../data/product-list.json');
    const json = await response.json();
    return json
  }
  else if (url.indexOf('/products/') === 0) {
    const [ , , id ] = url.split('/');
    const response = await fetch('../../data/products.json');
    const json = await response.json();
    const [ product ] = json.filter(i => i.id === parseInt(id));
    return product;
  }
}