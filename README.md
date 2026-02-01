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
# NexlookMobile (Expo + React Native)

Projeto simples criado para testar no emulador Android via Expo.

Pré-requisitos
- Node.js
- Android Studio com um emulador configurado
- (Opcional) Expo CLI: `npm install -g expo-cli` — também funciona com `npx`

Instalação

```bash
npm install
```

Rodando no emulador Android

1. Abra o Android Studio e inicie um emulador (AVD Manager).
2. Inicie o servidor Metro do Expo:

```bash
npx expo start
```

3. Com o servidor aberto, pressione `a` no terminal para abrir no emulador Android, ou execute:

```bash
npx expo run:android
```

Comandos úteis
- `npm run android` — abre o Expo no emulador (mesmo que `npx expo start --android`).
