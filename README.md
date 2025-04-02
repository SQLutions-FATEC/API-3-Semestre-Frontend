# Tecnologias usadas

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://github.com/vuejs/vue)
[![Vue Router](https://img.shields.io/badge/Vue_Router-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://github.com/vuejs/router)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://github.com/vitejs/vite)
[![Ant Design Vue](https://img.shields.io/badge/Ant_Design_Vue-0170FE?style=for-the-badge&logo=ant-design&logoColor=white)](https://github.com/vueComponent/ant-design-vue)
[![MirageJS](https://img.shields.io/badge/MirageJS-FF6D70?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/miragejs/miragejs)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://github.com/axios/axios)
[![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black)](https://github.com/vuejs/pinia)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://github.com/sass/sass)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://github.com/eslint/eslint)

# Como rodar o projeto

## Linux

1. Baixe o node e o npm `sudo apt update`
   `sudo apt install nodejs npm`
2. (Opcional) Baixe o NVM `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
3. Rode o comando `nvm use` para utilizar a versão do node do projeto e, consequentemente, do npm, localizada no arquivo `.nvmrc`

## Windows

1. Baixe o node v23 pelo site `https://nodejs.org/en/download` e instale

## Passos seguintes (para ambos Linux e Windows)

1. Rode o comando `npm install`
2. (Opcional) Lint / Formatter
   2.1. Se estiver usando VsCode, instale o plugin do `Prettier` e `Eslint`
   2.2. Use o atalho `Ctrl + Shift + P`, digite `settings` e procure o do vscode
   2.2.1. Adicione no arquivo:
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
3. Após instalada as dependências, crie um arquivo `.env` na pasta raiz e copie o `.env.example` para o dentro do arquivo recém criado
4. Para executar o frontend
   4.1. (Com backend) Rode o comando `npm run dev` para subir o projeto localmente na porta `5173`, com a porta `8080` falando com backend
   4.2. (Sem backend) Rode o comando `npm run mock`para subir o projeto localmente na porta `5173` com dados fictícios

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

## Benefícios da estruturação

- **Organização clara**: Facilita a localização de arquivos relacionados a uma mesma camada ou funcionalidade.
- **Manutenção simplificada**: Alterações em uma camada específica (como componentes ou stores) não afetam outras partes do projeto.
- **Escalabilidade**: A estrutura é fácil de expandir à medida que o projeto cresce.

## Acordos do projeto

- Código em inglês
- Todos endpoints precisam ter um mock correspondente

# Padrão de commits/branch

Seguiremos o Conventional Commits, com algumas alterações. Para facilitar o dia-a-dia do desenvolvimento, o VsCode possui uma extensão chamada `Conventional Commits`, que auxilia este processo.

## Commits

- < tipo > (< ID da tarefa no Jira >): < breve descrição em inglês >
  Exemplo: feat (47): updates the readme with commits pattern

## Branch

- SCRUM-< ID da tarefa no Jira >/< breve descrição em inglês >
  Exemplo: SCRUM-47/update-readme
