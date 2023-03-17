export const setItemInLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getItemInLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const pancardValidation = (pan) => {
  console.log(pan);
  let regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;

  if (regex.test(pan)) {
    return true;
  }

  return false;
};

export const aadharValidation = (aadhar) => {
  let regex =
    /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

  if (regex.test(aadhar)) {
    return true;
  }

  return false;
};

export const contactValidation = (contact) => {
  let regex = /^([0-9]{10}$)/;

  if (regex.test(contact)) {
    return true;
  }

  return false;
};

export const passwordValidation = (text) => {
  if (text.length < 7) {
    return false;
  } else {
    return true;
  }
};
