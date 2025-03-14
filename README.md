# Como rodar o projeto

## Linux

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

# Estrutura do projeto

O projeto segue uma estrutura de pastas **agrupadas por tipo**, onde os arquivos são organizados com base em sua função ou recurso no sistema. Essa abordagem facilita a manutenção e a localização de arquivos relacionados a uma mesma camada ou funcionalidade.

Aqui está uma visão geral da estrutura:

```
src/
├── assets/ # Arquivos estáticos (imagens, fonts, etc.)
├── components/ # Componentes reutilizáveis
├── mock/ # Dados fictícios para API
├── pages/ # Páginas (rotas do projeto)
├── router/ # Configuração das rotas (Vue Router)
├── services/ # Serviços (API calls, lógica de negócio)
├── stores/ # Gerenciamento de estado (Pinia)
├── styles/ # Estilos globais ou específicos
├── utils/ # Utilitários (funções helper, constants, etc.)
└── main.js # Ponto de entrada da aplicação
```

## Benefícios

- **Organização clara**: Facilita a localização de arquivos relacionados a uma mesma camada ou funcionalidade.
- **Manutenção simplificada**: Alterações em uma camada específica (como componentes ou stores) não afetam outras partes do projeto.
- **Escalabilidade**: A estrutura é fácil de expandir à medida que o projeto cresce.
