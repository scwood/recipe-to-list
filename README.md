```
├── src
│   ├── client
│   │   ├── components
│   │   │   └── HelloWorld.jsx
│   │   ├── index.html
│   │   └── index.jsx
│   └── server
│       └── index.js
├── README.md
├── package.json
├── webpack.config.babel.js
├── .babelrc
├── .eslint
└── .gitignore
```

npm scripts:

- Run dev server: `npm start`
  - By default, frontend is served at `localhost:8080`, and backend is served at `localhost:3000`
- Lint: `npm run lint`
- Build for production: `npm run build`

Todo:

- Add unit test framework
- Use webpack-dev-server to proxy the api requests
