let nameInput = document.getElementById("nameInput");
let priceInput = document.getElementById("priceInput");
let descInput = document.getElementById("descInput");
let products = [];
function input() {
  let data = {
    name: nameInput.value,
    price: priceInput.value,
    description: descInput.value,
  };
  crud("addProduct", "POST", data);
  clear();
}
function display() {
  let srt = ``;
  for (let i = 0; i < products.length; i++) {
    srt += `     
    <tr >
  <td>${products[i].name}</td>
  <td> ${products[i].price}</td>
  <td> ${products[i].description}</td>
  <td><button onclick="deleteProd(${products[i].id})" class=" mt-1 btnIcon me-2 bg-transparent"><i class="fa-solid  delete fa-trash-can"></i></button>
  <button onclick='edit(${i} ,${products[i].id})' class=" mt-1  btnIcon bg-transparent"><i class="fa-solid update fa-pen-to-square"></i></button>
  </td>
</tr>`;
  }
  document.getElementById("tableRow").innerHTML = srt;
}
async function getProduct() {
  let res = await fetch(`http://localhost:5000/getProduct`);
  let result = await res.json();
  products = result.product;
  display();
}
getProduct();
async function crud(endPoint, method, data) {
  let res = await fetch(`http://localhost:5000/${endPoint}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  let result = await res.json();
  if (result.message == "success") {
    getProduct();
  }
  console.log(result);
}
function deleteProd(id) {
  crud("deletePro", "DELETE", { id });
  getProduct();
}
let idUp;
function edit(index, id) {
  idUp = id;
  nameInput.value = products[index].name;
  priceInput.value = products[index].price;
  descInput.value = products[index].description;
  document.getElementById("editInput").style.display = "block";
  document.getElementById("add").style.display = "none";
}
function update() {
  let data = {
    name: nameInput.value,
    price: priceInput.value,
    description: descInput.value,
    id: idUp,
  };
  crud("update", "PUT", data);
  document.getElementById("editInput").style.display = "none";
  document.getElementById("add").style.display = "block";
  clear();
}
function clear() {
  nameInput.value = "";
  priceInput.value = "";
  descInput.value = "";
}
 










 