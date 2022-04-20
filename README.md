# Monaco editor extended with DTStack's [monaco-sql-languages](https://github.com/DTStack/monaco-sql-languages) 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)... and ejected immediately in order to add `MonacoWebpackPlugin`

with the following configuration:

```javascript
new MonacoWebpackPlugin({
    languages: [],
    customLanguages: [
        {
            label: 'sql',
            entry: 'monaco-sql-languages/out/esm/monaco.contribution',
            worker: {
                id: 'monaco-sql-languages/sqlWorker',
                entry: 'monaco-sql-languages/out/esm/sql/sql.worker',
            },
        }
    ],
})
```

__Additional note:__

Had to add `GENERATE_SOURCEMAP=false` to start command to disable incorrect source map references warnings coming from `monaco-sql-languages`  


Run the demo 

```bash
yarn
yarn start
```

