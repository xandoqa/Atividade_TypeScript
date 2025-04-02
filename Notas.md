Integrantes do grupo:
Ester Yasmin Santos Silva
André Luiz Borges Aguiar
Artur Braz Lopes
Caio Murilo Silva de Oliveira
Alexandre Rodrigues Costa

Sistema de Gerenciamento de Inventário é uma aplicação desenvolvida em TypeScript para gerenciar categorias e produtos de forma prática via terminal. Ele utiliza modularização, boas práticas de programação orientada a objetos e persistência em memória, garantindo um código limpo, escalável e eficiente. Entre suas funcionalidades estão a criação, listagem, atualização e exclusão de categorias, desde que não possuam produtos associados. Também permite adicionar e listar produtos com informações como nome, descrição, preço, quantidade, categoria vinculada e datas de criação/atualização. A interface interativa no terminal facilita a navegação. As estruturas de dados incluem as interfaces Categoria e Produto, definidas abaixo:


TypeScript

Tipagem Estrita
No projeto, todas as variáveis e funções possuem tipagem explícita, garantindo maior segurança e clareza no código.

Exemplo:
interface Categoria {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: Date;
}


Modularização

Organização e Separação de Responsabilidades
O código foi estruturado em módulos separados, cada um com responsabilidades bem definidas, como entidades (Categoria.ts, Produto.ts), serviços (Inventario.ts) e utilitários (exibirMenu.ts).

Exemplo:
import { Categoria } from "../entities/Categoria";


Persistência em Memória

Estruturas de Dados Temporárias
As informações são mantidas durante a execução devido ao uso das variáveis categorias e produtos que armazenam os dados em memória enquanto o programa está em execução.

Aqui, o array categorias é uma variável que guarda todas as categorias enquanto o programa estiver rodando. Quando uma nova categoria é adicionada, ela é inserida neste array:
private categorias: Categoria[] = [];

adicionarCategoria(nome: string, descricao: string): void {
  const categoria: Categoria = {
    id: uuidv4(),
    nome,
    descricao,
    dataCriacao: new Date()
  };
  this.categorias.push(categoria);
}


Funções e Classes
Funções devem ser declaradas com tipos bem definidos para os parâmetros e retorno. Exemplo: Uma função de soma pode receber dois números e retornar a soma deles.

Classes podem ser utilizadas para modelar estruturas com propriedades e métodos. É importante usar modificadores de acesso como público, privado e protegido para controlar o acesso às propriedades de uma classe.

Generics e Enums
Generics permitem criar estruturas que funcionam com diferentes tipos. Exemplo: Uma função genérica pode receber qualquer tipo de parâmetro e retorná-lo.

Enums são úteis para definir conjuntos de valores pré-determinados, como os status "Ativo" e "Inativo".

Modularização
Organize o código seguindo boas práticas de programação orientada a objetos, criando classes separadas para diferentes responsabilidades.


Persistência em Memória
Use estruturas de dados como arrays para armazenar informações temporariamente durante a execução do programa.

tsconfig.json
O arquivo de configuração pode ser ajustado para definir o target como ES6, usar o módulo CommonJS e configurar um diretório de saída chamado "dist" e um diretório raiz chamado "src".


TypeScript
Utilize tipagem adequada para todas as estruturas e funções.

Tipos básicos: number, string, boolean, null, undefined, void, any.

Exemplo:

ts
type Produto = { id: string; nome: string; preco: number; };
interface ICategoria {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: Date;
}
Funções e Classes

Funções devem ser declaradas com tipos para parâmetros e retornos.

Exemplo de função:

ts
function soma(a: number, b: number): number {
  return a + b;
}
Classes organizam estruturas e métodos com modificadores de acesso: public, private e protected.

Exemplo de classe:

ts
class Categoria {
  private id: string;
  constructor(id: string) {
    this.id = id;
  }
}
Generics e Enums

Generics permitem criar estruturas reutilizáveis.

Exemplo:

ts
function retorna<T>(valor: T): T {
  return valor;
}
Enums definem conjuntos de valores.

Exemplo:

ts
enum Status {
  Ativo,
  Inativo
}
Modularização

Organize o código seguindo boas práticas de programação orientada a objetos.

Crie classes separadas, como Produto, Categoria e Inventario.

Exemplo:

ts
class Inventario {
  private categorias: Categoria[] = [];
  private produtos: Produto[] = [];

  adicionarCategoria(nome: string, descricao: string): void {
    const categoria = new Categoria(nome, descricao);
    this.categorias.push(categoria);
  }
}
Persistência em Memória

Armazene dados temporariamente usando arrays de objetos.

Exemplo:

ts
const categorias: Categoria[] = [];
const produtos: Produto[] = [];
tsconfig.json

Configuração recomendada:

json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
