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

Aplicativo mobile de guarda-roupa inteligente com IA, portado de React para React Native.

## Recursos

- ✅ Autenticação (Login/Registro)
- ✅ Adicionar peças de roupa com foto
- ✅ Visualizar guarda-roupa
- ✅ Gerar looks com IA baseado em ocasião
- ✅ Sugestões personalizadas
- ✅ Navegação entre telas
- ✅ Persistência local com AsyncStorage

## Pré-requisitos

- Node.js (v14+)
- Android Studio com emulador configurado (ou dispositivo físico)
- Expo CLI (opcional): `npm install -g expo-cli`

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure a URL do backend:
   - Edite o arquivo `src/config.js` e substitua `SEU_BACKEND_URL_AQUI` pela URL do seu backend.
   - Exemplo: `export const API_URL = 'https://api.nexlook.com';`
   - Para desenvolvimento local: `export const API_URL = 'http://192.168.1.100:5000';`

## Rodando no emulador Android

1. Abra o Android Studio e inicie um emulador (AVD Manager)

2. Inicie o servidor Expo:
```bash
npx expo start
```

3. Pressione `a` no terminal para abrir no emulador Android

Ou use o comando direto:
```bash
npm run android
```

## Estrutura do Projeto

```
NexlookMobile/
├── App.js                      # Entry point
├── src/
│   ├── config.js              # Configuração da API
│   ├── context/
│   │   └── UserContext.js     # Contexto de autenticação
│   ├── navigation/
│   │   └── AppNavigator.js    # Navegação (React Navigation)
│   ├── screens/
│   │   ├── HomeScreen.js      # Tela inicial
│   │   ├── LoginScreen.js     # Login
│   │   ├── RegisterScreen.js  # Cadastro
│   │   ├── WardrobeScreen.js  # Guarda-roupa
│   │   ├── AddPieceScreen.js  # Adicionar peça
│   │   ├── ContextScreen.js   # Informar ocasião
│   │   └── ResultScreen.js    # Resultado do look
│   └── components/
│       └── Toast.js           # Notificações
└── package.json
```

## Dependências Principais

- `@react-navigation/native` - Navegação
- `@react-navigation/native-stack` - Stack navigator
- `expo-image-picker` - Seleção de imagens
- `@react-native-async-storage/async-storage` - Armazenamento local
- `react-native-safe-area-context` - Áreas seguras
- `react-native-screens` - Otimização de telas

## Endpoints da API (Backend)

O app espera os seguintes endpoints:

- `POST /api/Auth/login` - Login
- `POST /api/Auth/registrar` - Registro
- `GET /api/UploadImagem/Imagens` - Listar peças
- `POST /api/UploadImagem/UploadImagem` - Upload de peça
- `DELETE /api/UploadImagem/ExcluirLook/{id}` - Deletar peça
- `POST /api/IAIService/GerarDescricaoImagemcomFoto` - Gerar look com IA

## Comandos Úteis

```bash
# Instalar dependências
npm install

# Iniciar Expo
npm start

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios

# Limpar cache
npx expo start -c
```

## Próximos Passos

- [ ] Adicionar filtros por categoria
- [ ] Implementar favoritos
- [ ] Histórico de looks
- [ ] Compartilhamento de looks
- [ ] Sincronização em nuvem
- [ ] Modo offline completo

## Troubleshooting

### Erro "Cannot find native module"
Execute: `npm install` e reinicie o Metro com `npx expo start -c`

### Problema de conexão com backend
Verifique se a URL em `src/config.js` está correta e acessível do emulador.
Para localhost, use o IP da máquina (não `localhost` ou `127.0.0.1`).

### Build nativo necessário
Se estiver usando módulos nativos personalizados, execute:
```bash
npx expo run:android
```

