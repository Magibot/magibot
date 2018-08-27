# discordbot

Bot do Discord criado que realiza funções administrativas no servidor. O Bot foi construido em NodeJS junto com as bibliotecas "discord.js" e "discord.js-commando". O Bot também utiliza MySQL como banco de dados e sua biblioteca para Node "mysql".

Para configuração e utilização do bot. Deve-se:
- Criar um arquivo config.js localizado na pasta config que exporta (module.exports) um objeto com o seguintes campos:
    - token: com o token do bot criado no seguinte site https://discordapp.com/developers/applications/
    - database: um objeto as informações de host, usuário, senha e nome do banco que o Bot deverá se conectar.
    - port: com o código da porta que o bot irá rodar (default port=3030).
    - no final o codigo ficará parecido com o seguinte:
    
    ```js
    module.exports = {
        token: "insira-o-token-do-seu-bot",
        database: {
            host: "localhost",
            user: "root",
            password: "root",
            database: "discordbot"
        }
    }
    ```
