/*
  Author: Ilyas

*/
export default function (errorJoi: any) {
  let errors: any = [];
  errorJoi.forEach((element: any) => {
    let key = element.context.key;
    let message = element.message;
    errors.push(`${key}: ${message}`);
  });
  return errors;
}