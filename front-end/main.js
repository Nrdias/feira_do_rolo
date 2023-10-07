const app = document.getElementById("app")
const addItem_button = document.getElementById('addItem_button')
const listItem_button = document.getElementById('listItem_button')
const list = document.getElementById('item-list')

addItem_button.addEventListener('click', function(){

  const name = document.getElementById("name")
  const description = document.getElementById("description")
  const value = document.getElementById("value")
  const seller = document.getElementById("seller")

  const fValue = value.value = parseFloat(value.value)

  const item = {
    name: name.value,
    description: description.value,
    price: fValue,
    merchant_name: seller.value
  }

  addItem(item);
})

listItem_button.addEventListener('click', listItems)

async function addItem(item){
  const response = await fetch('http://localhost:3000/adicionar-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)})
  if(response.status == 200){
    alert("item adicionado")
  }
  else{
    alert("item não adicionado")
  }
  listItems()
}

  async function listItems(){
  await fetch('http://localhost:3000/itens-a-venda',{
    method: "GET"
  })
  .then(response => response.json())
  .then(data => {
    list.innerText = "";
    for(let i in data){
      const p = document.createElement('p')
      p.innerText = `produto: ${data[i].name} | descrição: ${data[i].description} | preço: ${data[i].price} | vendedor: ${data[i].merchant_name}`
      list.appendChild(p);
    }
  })
  }
