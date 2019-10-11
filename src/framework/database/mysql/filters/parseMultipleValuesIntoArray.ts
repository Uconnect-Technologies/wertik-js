export default function(value, type) {
  let split = value.split(type);
  let a = split.map(c => {
    return c.split("=")[1];
  });
  return a;
}
