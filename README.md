# Projeto Sistema de Ponto e Geração de Relatórios

![sqlutions logo](https://github.com/user-attachments/assets/4884e8b3-b59a-45ba-ad13-13faa8d4d9b3)

### Bem-vindo ao repositório do nosso projeto _**Sistema de Ponto e Geração de Relatórios**_, desenvolvido pela equipe _**SQLutions**_ do curso Banco de Dados 3º Semestre da Fatec de São José dos Campos.

---

<div align="center">

[Sobre](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#-sobre-o-projeto) | [Backlogs e User Stories](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#-backlogs--user-stories) | [Documentação](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#%EF%B8%8F-documenta%C3%A7%C3%A3o) | [Tecnologias](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#%EF%B8%8F-tecnologias) | [Equipe](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#-equipe)

</div>

## 📑 Sobre o projeto

Navios são muito custosos em vários aspectos, sejam pelas suas dimensões, complexidades, entre outros fatores, e por estarem expostos ao ambiente marítimo, é necessário serem feitas manutenções periódicas, e essa situação geralmente resulta na contratação de uma empresa terceirizada para que a mesma seja encarregada da manutenção desses navios.

O cliente, nesse caso, a empresa Altave, surge com o seguinte problema: o proprietário daquele navio pode sofrer prejuízos milionários em virtude de atrasos na entrega do navio. Portanto, é interessante que ele tenha um meio de monitoramento dos funcionários da empresa terceirizada, a fim de garantir que os mesmos estão cumprindo com suas obrigações.

O produto solicitado pela Altave é um sistema de pontos que registra as movimentações dos funcionários, com dashboards de gráficos e geração de relatórios. O sistema deve ser capaz de registrar a entrada e saída dos funcionários, bem como a quantidade de horas trabalhadas, e gerar gráficos e relatórios com essas informações.

📌 Status do Projeto: Sprint 1

### 🏁 Entregas de Sprints

| Sprint  | Previsão    | Status       | Histórico |
|---------|-------------|--------------|-----------|
| 01      | 30/03/2025  | Etapa atual  | em breve  |
| 02      | 27/04/2025	 | Etapa futura | em breve  |
| 03      | 25/05/2025	 | Etapa futura | em breve  |

### 🎬 Apresentação Final

🔄 Em breve

[→ Voltar ao topo](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#projeto-sistema-de-ponto-e-gera%C3%A7%C3%A3o-de-relat%C3%B3rios)

## 🎯 Backlogs & User Stories

### Backlog do Produto

#### ✅ Requisitos Funcionais

| Código | Descrição                                                                         | Prioridade | Fator | Sprint |
|:------:|-----------------------------------------------------------------------------------|:----------:|:-----:|:------:|
| RF-1   | Desenvolver uma interface de cadastro de empresas e profissionais, incluindo foto |  🔴 Alta   |   1   |   1    |
| RF-2   | Dashboard com lista de registros                                                  |  🔴 Alta   |   2   |   1    |
| RF-3   | Permitir a geração e edição de registros de movimentação                          |  🔴 Alta   |   3   |   1    |
| RF-4   | Desenvolver filtragem por data, empresa e profissional                            |  🔴 Alta   |   4   |   2    |
| RF-5   | Dashboard com gráficos                                                            |  🔴 Alta   |   5   |   2    |
| RF-6   | Permitir a extração de relatórios                                                 |  🔴 Alta   |   6   |   3    |
| RF-7   | Login de identificação do usuário                                                 |  🟡 Média  |   7   |   3    |
| RF-8   | API para consumo dos dados                                                        |  🟢 Baixa  |   8   |   2    |


#### ✔️ Requisitos Não Funcionais

| Código | Descrição                   |
|:------:|-----------------------------|
| RNF-1  | Front Minimalista           |
| RNF-2  | Guia de instalação          |
| RNF-3  | Documentação API            |
| RNF-4  | Modelagem do Banco de Dados |


### Backlog das Sprints

#### Sprint 1

| Épico |  ID  |  Sprint  | Ator    | Ação                                          | Motivo                                                     |
|:-----:|:----:|:--------:|---------|-----------------------------------------------|------------------------------------------------------------|
|   1   | US-1 | Sprint 1 | Usuário | Altera o horário de entrada de um funcionário | Para corrigir eventuais falhas no registro automático      |
|   3   | US-3 | Sprint 1 | Usuário | Visualiza foto do funcionário                 | Para identificá-lo mais facilmente                         |
|   1   | US-4 | Sprint 1 | Usuário | Descreve o turno do funcionário               | Para centralizar informações e ter parâmetros nas análises |


#### Sprint 2

| Épico |  ID  |  Sprint  | Ator    | Ação                                                                         | Motivo                                                                                            |
|:-----:|:----:|:--------:|---------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
|   4   | US-5 | Sprint 2 | Usuário | Determina filtros no momento de visualizar registros de movimentação         | Para visualizar apenas informações pertinentes ao cargo, funcionário ou janela de tempo definidos |
|   4   | US-6 | Sprint 2 | Usuário | Visualiza registros de movimentação, contendo direção, horário e funcionário | Para obter informações acerca de entradas ou saídas                                               |
|   5   | US-7 | Sprint 2 | Usuário | Visualiza gráficos baseados nos relatórios                                   | Para ter acesso a diversas análises dos dados gerados                                             |


#### Sprint 3

| Épico |  ID  |  Sprint  | Ator    | Ação                        | Motivo                                                 |
|:-----:|:----:|:--------:|---------|-----------------------------|--------------------------------------------------------|
|   2   | US-2 | Sprint 3 | Usuário | Exporta relatórios em .xlsx | Para ter acesso aos dados em um formato mais universal |


### User Stories

| Épico | ID   | Sprint   | Ator    | Ação                                                                         | Motivo                                                                                            |
|:-----:|:----:|:--------:|---------|------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
|   1   | US-1 | Sprint 1 | Usuário | Altera o horário de entrada de um funcionário                                | Para corrigir eventuais falhas no registro automático                                             |
|   2   | US-2 | Sprint 3 | Usuário | Exporta relatórios em .xlsx                                                  | Para ter acesso aos dados em um formato mais universal                                            |
|   3   | US-3 | Sprint 1 | Usuário | Visualiza foto do funcionário                                                | Para identificá-lo mais facilmente                                                                |
|   1   | US-4 | Sprint 1 | Usuário | Descreve o turno do funcionário                                              | Para centralizar informações e ter parâmetros nas análises                                        |
|   4   | US-5 | Sprint 2 | Usuário | Determina filtros no momento de visualizar registros de movimentação         | Para visualizar apenas informações pertinentes ao cargo, funcionário ou janela de tempo definidos |
|   4   | US-6 | Sprint 2 | Usuário | Visualiza registros de movimentação, contendo direção, horário e funcionário | Para obter informações acerca de entradas ou saídas                                               |
|   5   | US-7 | Sprint 2 | Usuário | Visualiza gráficos baseados nos relatórios                                   | Para ter acesso a diversas análises dos dados gerados                                             |


[→ Voltar ao topo](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#projeto-sistema-de-ponto-e-gera%C3%A7%C3%A3o-de-relat%C3%B3rios)

## 🖥️ Documentação

Como planejamento foi feito wireframe para validação do fluxo com o cliente, assim como fluxograma e a modelagem de banco de dados que estão acessíveis [na documentação]()

> 🔗 **Links gerais**<br>
>
> - Documentação do projeto: [API - Sistema de Pontos](https://sqlutions.notion.site/API-Sistema-de-pontos-1a7af2284900804dbcf3c383680968a7
    )

[→ Voltar ao topo](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#projeto-sistema-de-ponto-e-gera%C3%A7%C3%A3o-de-relat%C3%B3rios)

## 🛠️ Tecnologias

As seguintes ferramentas, linguagens, bibliotecas e tecnologias foram usadas na construção do projeto:

[![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/) [![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)](https://www.java.com/) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario) [![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/) [![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://slack.com/) [![Google Docs](https://img.shields.io/badge/Google_Docs-4285F4?style=for-the-badge&logo=google-docs&logoColor=white)](https://docs.google.com/) [![Figma](https://img.shields.io/badge/Figma-0ACF83?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/)

[→ Voltar ao topo](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#projeto-sistema-de-ponto-e-gera%C3%A7%C3%A3o-de-relat%C3%B3rios)

## 👥 Equipe

|  | Função        | Nome | Redes |
|--|---------------|------|-------|
| ![davi](https://github.com/user-attachments/assets/08f611cd-614b-41b8-a7a7-cab3065e9aeb) | Product Owner | Davi Soares Fernandes dos Santos | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dsf21/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DaviSFS21) |
| ![tiago](https://github.com/user-attachments/assets/2715b681-6533-41bd-a176-4ec9130a1a90) | Scrum Master  | Tiago Torres dos Reis | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiago-torres-dos-reis/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TiagoTReis) |
| ![augusto](https://github.com/user-attachments/assets/642849b4-3329-4e61-8d77-9a4b84f258de) | Desenvolvedor | Augusto de Moraes Piatto | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/augusto-piatto/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/augustopiatto) |
| ![bryan](https://github.com/user-attachments/assets/ee31c3b5-3ba6-4019-8c95-ba03cfa94d4c) | Desenvolvedor | Bryan Matheus | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bryan-matheus-5aa0a3302/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BryanARMatheus) |
| ![caina](https://github.com/user-attachments/assets/a6f52b8c-11c7-4f20-9647-004cd04c60bc) | Desenvolvedor | Cainã Nascimento Melo | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cain%C3%A3-melo/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/CainaNascimentoMelo) |
| ![enzo](https://github.com/user-attachments/assets/3211d516-d4a0-48fc-af1d-e1cbef5d1a1e) | Desenvolvedor | Enzo Lemos Franco | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enzo-lemos-franco-002651293/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/EnzoLFranco) |
| ![gloria](https://github.com/user-attachments/assets/2de16de0-fd28-4700-b5b5-a00702dfce10) | Desenvolvedora | Glória Brito | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gloriafbrito/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GloBrito) |
| ![joao](https://github.com/user-attachments/assets/984a1b7c-e4fa-4b78-84f1-0391f0f08de5) | Desenvolvedor | João Tuschtler Paulista | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joaopaulista/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/joaopaulista) |
| ![lucas](https://github.com/user-attachments/assets/2a1afdae-7de8-4449-9fea-28fac568e960) | Desenvolvedor | Lucas Souza | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-souza-a67a52165/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JayWeinberg123) |

[→ Voltar ao topo](https://github.com/SQLutions-FATEC/API-3-Semestre/blob/main/README.md#projeto-sistema-de-ponto-e-gera%C3%A7%C3%A3o-de-relat%C3%B3rios)
