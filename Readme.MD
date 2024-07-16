# Template Sistema de Login em React + PHP

## Descrição Geral
Este projeto consiste em um sistema de autenticação completo com backend em PHP e frontend em React.

O backend está implementado em PHP, utilizando a estrutura MVC e orientação a objetos. Ele gerencia a autenticação de usuários, salva novos usuários em um banco de dados SQL, envia um email com um código de confirmação de conta e, após o login, envia um cookie token para o navegador salvar a sessão.

O frontend, por sua vez, consome esse backend e oferece uma interface de usuário com cinco páginas principais: Home, Sign In, Sign Up, Forgot Password e Dashboard. O frontend é desenvolvido em React, utilizando React Router DOM para gerenciamento de rotas.

## Visualize o Projeto ao Vivo:

Clique no link visualizar - 
[https://freedevtools.free.nf](https://freedevtools.free.nf/)

## Screenshots

![Home Screenshot](https://animecharacters.sirv.com/screenshots/Captura%20de%20tela%202024-07-05%20022256.png)
![SignIn Screenshot](https://animecharacters.sirv.com/screenshots/Captura%20de%20tela%202024-07-05%20022710.png)
![SignUp Screenshot](https://animecharacters.sirv.com/screenshots/Captura%20de%20tela%202024-07-05%20022619.png)


# Estrutura de Pastas
A estrutura de pastas do projeto é organizada da seguinte forma:

**/backend:** Pasta que contém o código do servidor escrito em PHP. 

**/frontend:** Pasta que contém o frontend em React.

## Backend
A pasta backend contém a implementação do servidor em PHP, organizado em uma estrutura MVC e orientado a objetos. As principais funcionalidades incluem:

- **Autenticação de Usuários:** Rotas para login e cadastro de usuários.
- **Banco de Dados:** Salvando novos usuários em um banco de dados SQL.
- **Confirmação de Conta:** Envio de email com código de confirmação de conta.
- **Sessão:** Envio de cookie token para o navegador após o login para manter a sessão ativa.

## Frontend
A pasta frontend contém o frontend desenvolvido em React, organizado da seguinte forma:

- **Home:** Página inicial do site.
- **Sign In:** Página de login para usuários.
- **Sign Up:** Página de cadastro de novos usuários.
- **Forgot Password:** Página para recuperação de senha.
- **Dashboard:** Página privada que somente usuários autenticados tem acesso.

## Tecnologias Utilizadas

### Backend
- **PHP 8:** Linguagem de programação utilizada para construir o backend.
- **MySQL:** Banco de dados utilizado para armazenar informações de usuários.

### Frontend
- **React:** Biblioteca JavaScript utilizada para construir a interface do usuário.
- **React Router DOM:** Biblioteca para gerenciamento de rotas no frontend.
- **Tailwind CSS:** Framework CSS utilizado para estilização do frontend.
- **Vitest:** Framework de testes utilizado para testar componentes do React.

## Como Contribuir
Sinta-se à vontade para contribuir para este projeto. Caso encontre algum problema ou tenha sugestões de melhorias, por favor, abra uma issue no repositório.

### Executando Localmente
Se precisar executar o projeto localmente, siga os passos abaixo:

Para o backend em PHP, Eu utilizo o PHP 8.XX e o MySQL instalados na minha máquina. Porém você pode baixar algum dos softwares como Xamp, Wamp ou Lamp, que irá funcionar também.

### Clone este repositório:

```bash
git clone https://github.com/WillianDDaniel/template-login-react-php.git
```
### Navegue até o diretório do projeto (FRONT-END):

```bash
cd Frontend
```
### Rode o projeto, executando o comando:

```bash
npm run dev
```
------------------------------------------------------------
### Navegue até o diretório do projeto (BACK-END):

```bash
cd Backend
```
### Rode o projeto, executando o comando:

```bash
PHP -S localhost:3000
```
Abra o navegador e acesse http://localhost:4173 para visualizar o site.

# Licença
Este projeto está licenciado sob a Licença MIT