export default class RestoService {
  _baseUrl = 'https://react-menu-app-e4c8b.firebaseio.com';

  getResource = async (url) => {
    const response = await fetch(`${this._baseUrl}${url}`);

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    return await response.json();
  }

  getMenuItems = async () => {
    return await this.getResource('/menu.json');
  }

  getOrderNumber = async () => {
    const response = await this.getResource('/orders.json');

    const orderNumber = Object.values(response).length + 1;

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
    
    const response = await fetch(`${this._baseUrl}/orders.json`, bodyForRequest);

    if (!response.ok){
      throw new Error('Server error'); 
    }
  }
}