# Front

## Como rodar o projeto

### Linux

1. Baixe o node e o npm `sudo apt update`
   `sudo apt install nodejs npm`
2. (Opcional) Baixe o NVM `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
3. Rode o comando `nvm use` para utilizar a versão do node do projeto e, consequentemente, do npm, localizada no arquivo `.nvmrc`
4. Navegue até a pasta `front` do projeto
5. Rode o comando `npm install`
6. (Opcional) Lint / Formatter
   6.1. Se estiver usando VsCode, instale o plugin do `Prettier` e `Eslint`
   6.2. Use o atalho `Ctrl + Shift + P`, digite `settings` e procure o do vscode
   6.2.1. Adicione no arquivo:
   ```
      {
         "editor.codeActionsOnSave": {
            "source.fixAll.eslint": "explicit"
         },
         "editor.formatOnSave": true,
         "eslint.validate": ["javascript", "vue"],
         "prettier.requireConfig": true
      }
   ```
7. Após instalada as dependências, crie um arquivo `.env` na pasta `front` e copie o `.env.example` para o dentro do arquivo recém criado
8. Rode o comando `npm run dev` para subir o projeto localmente na porta `5173`

## Estrutura de pastas

## O que falta fazer

1. Colocar o mock (mirage)
2. Definir uma biblioteca UI (botão, campo de texto, select, multiple select, date picker, table)
