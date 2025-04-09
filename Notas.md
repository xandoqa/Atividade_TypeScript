## Integrantes do Projeto
### Alexandre Rodrigues Costa UC23101095
### André Luiz Borges Aguiar UC23200389
### Artur Braz Lopes UC23102367
### Caio Henrique Ribeiro Holanda UC23200021
### Caio Murilo Silva de Oliveira UC23100307
### Ester Yasmin Santos Silva UC23102494

## Favor instalar as dependências ao rodar o projeto

É preciso ter node.js para poder rodar o projeto!

Pequena possibilidade de mexer nas restrições do arquivo do Projeto 1 (hortifruti-inventario) para poder rodar no terminal do VS Code...

Sistema de Gerenciamento de Inventário é uma aplicação desenvolvida em TypeScript para gerenciar categorias e produtos de forma prática via terminal. Ele utiliza modularização, boas práticas de programação orientada a objetos e persistência em memória, garantindo um código limpo, escalável e eficiente. Entre suas funcionalidades estão a criação, listagem, atualização e exclusão de categorias, desde que não possuam produtos associados. Também permite adicionar e listar produtos com informações como nome, descrição, preço, quantidade, categoria vinculada e datas de criação/atualização. A interface interativa no terminal facilita a navegação.


Configuração recomendada do arquivo json:

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
  "include": ["src", "seed.ts"]
}
