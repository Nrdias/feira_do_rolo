const items = [
    {
        name: "Camiseta",
        description: "Camiseta branca de algodão",
        price: 50,
        merchant_name: "Loja 1"
    },
    {
        name: "Calça",
        description: "Calça jeans",
        price: 150,
        merchant_name: "Loja 2"
    },
    {
        name: "Tênis",
        description: "Tênis de corrida",
        price: 300,
        merchant_name: "Loja 3"
    },
    {
        name: "Produto Errado",
        description: "Não deve ser adicionado pois o preço é negativo",
        price : -10,
        merchant_name: "Vendedor Falso"
    },
    {
        name: "Celular",
        description: "iPhone",
        price : 1000,
        merchant_name: "Loja 4"
    }
]

async function testar(){
    for (const i in items) {
        await fetch("http://localhost:3000/adicionar-item",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items[i])
        }).then(response => {
            if(response.status == 200){
                console.log(`${response.statusText}: Item adicionado`)
            }else{
                console.log(`${response.statusText}: Item não adicionado`)
            }
        })
    }

    fetch("http://localhost:3000/itens-a-venda",{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Itens a Venda")
        for (const i in data) {
            console.log(`produto: ${data[i].name} | descrição: ${data[i].description} | preço: ${data[i].price} | vendedor: ${data[i].merchant_name}`)       
            }
        })
}


testar()
