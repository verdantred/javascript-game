var kekkonen = 56;
var lista = [3, true, undefined, 'j'];
lista.push("kello");
console.log(lista);

while(lista[lista.length -1].length > 0){
  if(lista[lista.length -1] === true){
    console.log("On totta");
  }
  else{
    console.log("Ei ole totta");
  }
  console.log(lista[lista.length -1].shift());
}
