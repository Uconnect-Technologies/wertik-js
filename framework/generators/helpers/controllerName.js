export default function (name) {
  name = name.toLowerCase();
  let firstCharacter = name[0].toUpperCase();
  let rest = name.slice(1);
  return firstCharacter + rest;
}