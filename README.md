
# Gerenciador de Tarefas com Lembretes por Email

Este projeto é um aplicativo de gerenciamento de tarefas que permite aos usuários adicionar, visualizar e remover tarefas de forma permanente. Próximo ao compromisso, o usuário receberá um e-mail de lembrete para garantir que nenhuma tarefa importante seja esquecida.

## Tecnologias Utilizadas

- **Frontend**: Vue.js, Vuetify
- **Backend**: Node.js (Express.js)
- **Banco de Dados**: MongoDB
- **Outros**: TypeScript, Axios, Nodemailer

## Funcionalidades

- **Adicionar Tarefas**: Permite a criação de novas tarefas com informações como autor, título, data de criação e conteúdo.
- **Listar Tarefas**: Exibe uma tabela com todas as tarefas cadastradas.
- **Remover Tarefas**: Opção para excluir tarefas existentes.
- **Lembretes por Email**: Envia um lembrete por e-mail próximo ao compromisso.

## Instalação e Configuração

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instalar Dependências**
   ```bash
   npm install
   ```

3. **Configuração do Ambiente**
   - Renomeie `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como credenciais do banco de dados e do serviço de e-mail.

4. **Executar o Projeto**
   ```bash
   npm run dev
   ```

5. **Acessar o Projeto**
   - O projeto estará acessível em `http://localhost:3000` por padrão.

## Estrutura do Projeto

```
.
├── README.md
├── package.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   └── App.vue
└── .gitignore
```

## Contribuição

Contribuições são bem-vindas! Para maiores detalhes, por favor abra uma issue para discutirmos as mudanças que você gostaria de fazer.

## Licença

Este projeto está licenciado leo autor Rafael Santos.

