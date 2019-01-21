/*
  Author: Ilyas

*/
export default function (errorJoi) {
  let errors = [];
  errorJoi.forEach(element => {
    let key = element.context.key;
    let message = element.message;
    errors.push(`${key}: ${message}`);
  });
  return errors;
}