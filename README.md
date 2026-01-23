# NexlookAPP

Repositório monorepo para o projeto Nexlook.

Estrutura principal:
- `nexlookAPP/` — aplicação web (Vite + React + TypeScript)
- `nexlook-mobile/` — aplicação mobile (React Native / estrutura de projeto mobile)

Pré-requisitos
- Node.js (LTS recomendado)
- npm ou yarn
- Para mobile: Android Studio / Xcode (conforme necessidade da plataforma)

Instalação e execução (exemplos)

Web (nexlookAPP):

1. Abra um terminal na raiz do projeto
2. Instale dependências:

   cd nexlookAPP
   npm install

3. Rode a aplicação (verifique o `package.json` em `nexlookAPP` para scripts):

   npm run dev

Mobile (nexlook-mobile):

1. Abra um terminal na raiz do projeto
2. Instale dependências e preparações (há um script PowerShell para Windows):

   cd nexlook-mobile
   # No Windows (PowerShell):
   powershell -ExecutionPolicy Bypass -File install-deps.ps1
   npm install

3. Rode a aplicação conforme o setup do projeto (verifique `package.json` em `nexlook-mobile`):

   npm run start
   # ou
   npm run android
   npm run ios

Contribuição
- Abra issues para bugs ou features.
- Envie PRs na branch `main` ou siga o fluxo definido pelo projeto.

Licença
- Adicione informações de licença aqui (se aplicável).

Notas
- Este README é um ponto de partida; verifique `nexlookAPP/package.json` e `nexlook-mobile/package.json` para scripts e instruções específicas.
