const regExpDictionary = {
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: /^[0-9a-zA-Z]{6,}$/,
  name: /^[a-zA-Z `']{3,}$/,
  phone: /^\d{10}$/
};

export default regExpDictionary;