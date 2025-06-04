export const validateEmail = email => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

export const removeWhitespace = text => {
  const regex = /\s/g; //문자열 전체에서 공백을 찾는다.
  return text.replace(regex, '');
};