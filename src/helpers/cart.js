export const inCart = (items, itemId) => items.some(elem => elem.id === itemId);

export const getNewCart = (cart, item, type) => {
  if (type === 'add') {
    const inCart = cart.some(elem => elem.id === item.id);

    return inCart ? cart.map(
      elem => elem.id === item.id ? {...item, quantity: ++item.quantity} : elem
    ) : [...cart, {...item, quantity: 1}];
  }

  if (type === 'del') {
    return cart.filter(elem => elem.id !== item.id);
  }

  if (type === 'decr') {
    return cart.map(
      elem => elem.id === item.id ? {...item, quantity: --item.quantity} : elem
    );
  }
};
