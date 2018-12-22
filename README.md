# Discord Bot

Bot para o aplicativo de comunicação **Discord** que realiza funções administrativas no servidor. O Bot foi construido em Node.js utilizando as bibliotecas `discord.js` e `discord.js-commando`. Além disso, o Bot utilizado o banco de dados **MongoDB** e a biblioteca `mongojs` para seu gerenciamento. 

## Instale o Bot no seu servidor do Discord

Com link abaixo, instale o bot em seu servidor. Se ele estiver online, ele estará pronto para utilização.
```
https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=483016023440621618
```

Ou [clique aqui](https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=483016023440621618).

> É recomendável utilizar o MLab para a criação das collections e dos documents do Mongo.

## Dependências de Software

- Node.js

## Instalação do projeto

Apõs clonar o repositório em sua máquina, utilize o gerenciador de pacotes do Node, **NPM**, para instalar todas das dependências do projeto. Para isto, execute o comando na pasta root do repositório:
```
npm install
```

## Configuração das Collections do MongoDB no Mlab

## Configuração do Bot

### Variáveis de Ambiente

Crie um arquivo `.env` e salve na pasta root do repositório. Neste arquivo, deve conter o **token** da aplicação do Discord, o **prefixo** que será utilizado para a criação de comandos e a porta em que o servidor irá se iniciar. Além disso, a configuração de banco de dados **MongoDB** na variável: `MONGODB`. No final, seu arquivo `.env` deve estar parecido com este:
```
TOKEN=<insira-seu-token>
OAUTH=<insira-seu-oauth-link>
PREFIX=!

MONGODB=<insira-sua-MongoDB0-URI>

SET_FUN_ACTIVITIES=true
CHANGE_ACTIVITY_TIME=600000

PORT=3000
```

> A variável **SET_FUN_ACTIVITIES** faz com que o bot troque sua atividade de tempos em tempos de acordo com a variável **CHANGE_ACTIVITY_TIME** em milisegundos.

### Configuração de comportamentos

No arquivo `config.json` que já se encontra no repositório, você pode configurar:

1. O cargo que um usuário novo no servidor assumirá em seu primeiro acesso na variável `botconfig/initRole`.

2. Na variável `botconfig/mainChannel`, você pode configurar em qual canal será dado as boas-vindas a novos membros do servidor.

3. Na variável `botconfig/memberRemoveColor`, você pode configurar a cor que será enviada a mensagem embed quando um membro sair do servidor.

4. Na variável `botconfig/memberAddColor`, você pode configurar a cor que será enviada a mensagem embed quando um novo membro entrar no servidor pela primeira vez.

5. Na variável `botconfig/mainColor`, configure a cor padrão de todas as outras mensagens do bot.

Segue um exemplo de configuração deste arquivo:
```json
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

Iniciando o bot no modo de desenvolvimento:
```
npm run dev
```

> Não esqueça de incluir o bot a seu servidor

E o bot estará pronto para uso.

## Comandos

