# Feira do Rolo

O Desafio consistia em utilizar [Axum framework](https://docs.rs/axum/latest/axum/) para criar uma API para envio e recebimento de dados no formato JSON.

O projeto foi pensado apenas para solicitação utilizando cURL via terminal, sem uma interface gráfica.

## Como executar o projeto

Para rodar o projeto é necessário ter o [Rust](https://www.rust-lang.org/pt-BR) instalado na máquina.

```bash
git clone https://github.com/Nrdias/feira_do_rolo.git
cd feira_do_rolo/back-end
cargo build
cargo run
```

## Teste

O teste para adicionar um item pode ser feito com o seguinte comando:

```bash
curl -X POST http://localhost:3000/adicionar-item -H "Content-Type: application/json" -d '{"name": "Relógio Vintage", "description": "Um relógio antigo de madeira em perfeito estado de funcionamento.", "price": 50.0, "merchant_name": "João Silva"}'
```

já para consultar os itens já adicionados, basta executar:

    curl http://localhost:3000/itens-a-venda

Você poderá conferir no terminal em que foi iniciado a API, as requisições especificando quais itens foram adicionados.

## Teste Automatizado

Criei um script com javascript que pode ser executado no terminal com <b>node</b> para fazer diversas adições através de requests para a API, e no final nos traz a lista dos itens inseridos, para isso é necessário ter o [node.js](https://nodejs.org/en) instalado

Para usar o script, dentro da pasta back-end, execute o seguinte comando:

    node script.js

## Adicional
Embora tenha sido especificado que não precisa ter uma interface para requisições a API, quis praticar o uso de CORS da crate [tower_http](https://docs.rs/tower-http/latest/tower_http/index.html) para fazer requisições de um servidor web para nossa API, e nos mostrar dados gráficos

Para utilizar o front-end, basta executar o seguinte:

```bash
cd front-end
npm i yarn
yarn dev
```

## Tecnologias Usadas

- [Axum framework](https://docs.rs/axum/latest/axum/)
- [Rust](https://www.rust-lang.org/pt-BR)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Dificuldades e Melhorias
 - Por não ter conhecimento de Rust, acredito que o código ficou poluido, tive dificuldade de achar soluções somente com a documentação, e acabei recorrendo a chatGPT e StackOverFlow para criar o CORS e entender melhor a estrutura de dados.
 - CORS estático, tentei configurar para que recebesse requisições de qualquer porta do localhost, no entanto não consegui, por isso o front-end só funciona se for inicializado pelo `yarn dev`, pois a porta que aceita requisições da web é a 5173.
 - Apesar de ter adicionado a validação de preço, não fiz alguma adição significativa, ainda não tenho experiência com banco de dados, então também não pude implementar um sistema de dados persistentes.
