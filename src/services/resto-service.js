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

  getItemById = async (id) => {
    const result = await this.getMenuItems();

    const item = result.find(elem => elem.id === Number(id));

    return item;
  }
}