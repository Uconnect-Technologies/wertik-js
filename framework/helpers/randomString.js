export default function () {
  an = an&&an.toLowerCase();
  var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
  for(;i++<len;){
    var r = Math.random()*(max-min)+min <<0;
    str += String.fromCharCode(r+=r>9?r<36?55:61:48);
  }
  return str;
}