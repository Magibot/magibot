# Discord Bot

Bot para o aplicativo de comunicação **Discord** que realiza funções administrativas no servidor. O Bot foi construido em Node.js utilizando as bibliotecas `discord.js` e `discord.js-commando`. Além disso, o Bot utilizado o banco de dados **MySQL** e a biblioteca `mysql` para seu gerenciamento.

## Dependências de Software

- Node.js
- MySQL

## Instalação do projeto

Apõs clonar o repositório em sua máquina, utilize o gerenciador de pacotes do Node, **NPM**, para instalar todas das dependências do projeto. Para isto, execute o comando na pasta root do repositório:

```
npm install
```

## Configuração do Bot

### Variáveis de Ambiente

Crie um arquivo `.env` e salve na pasta root do repositório. Neste arquivo, deve conter o **token** da aplicação do Discord, o **prefixo** que será utilizado para a criação de comandos e a porta em que o servidor irá se iniciar. Além disso, variáveis de configuração de banco de dados **MySQL** como: **host**, **user**, **password** e **name**. No final, seu arquivo `.env` deve estar parecido com este:

```
TOKEN=<insira-seu-token>
OAUTH=<insira-seu-oauth-link>
PREFIX=!

DB_HOST=<host-do-banco>
DB_USER=<usuario-do-banco>
DB_PASSWORD=<senha-do-banco>
DB_NAME=<nome-da-conexao-do-banco>

PORT=8080

```

### Configuração de comportamentos

No arquivo `config.json` que já se encontra no repositório, você pode configurar:

1. O cargo que um usuário novo no servidor assumirá em seu primeiro acesso na variável `botconfig/initRole`.

2. Na variável `botconfig/mainChannel`, você pode configurar em qual canal será dado as boas-vindas a novos membros do servidor.

3. Na variável `botconfig/memberRemoveColor`, você pode configurar a cor que será enviada a mensagem embed quando um membro sair do servidor.

4. Na variável `botconfig/memberAddColor`, você pode configurar a cor que será enviada a mensagem embed quando um novo membro entrar no servidor pela primeira vez.

5. Na variável `botconfig/mainColor`, configure a cor padrão de todas as outras mensagens do bot.

Segue um exemplo de configuração deste arquivo:
```
{
    "botconfig": {
        "initRole": "Membro",
        "mainChannel": "geral",
        "memberRemoveColor": "0xcc6600",
        "memberAddColor": "0x00cc7a",
        "mainColor": "0x99e6ff"
    }
}
```

## Iniciação do projeto

Inicie o bot com o comando:
```
npm start
```

> Não esqueça de incluir o bot a seu servidor

E o bot estará pronto para uso.

## Comandos

