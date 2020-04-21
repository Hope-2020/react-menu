export default class RestoService {
  _apiBaseUrl = 'http://localhost:3000';

  getResource = async (url) => {
    const response = await fetch(`${this._apiBaseUrl}${url}`);

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    return await response.json();
  }

  getMenuItems = async () => {
    return await this.getResource('/menu/');
  }

  getOrderNumber = async () => {
    const response = await this.getResource('/orders/');
    const orderNumber = response.length + 1;
    
    return orderNumber;
  }

  setOrder = async (order) => {
    const orderNumber = await this.getOrderNumber();
    const newOrder = {
      id: orderNumber,
      order
    };
    const bodyForRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newOrder)
    };
    const response = await fetch(`${this._apiBaseUrl}/orders`, bodyForRequest);

    if (!response.ok){
      throw new Error('Server error'); 
    }
  }
}