import React, {useCallback, useState} from 'react';
import {GenericSQL} from 'dt-sql-parser';
import {Token} from "antlr4";
import {SqlEditor} from "./SqlEditor";

const parser = new GenericSQL();

function App() {
    const [parseResult, setParseResult] = useState<{ errors: string, tokens: Token[] } | undefined>();
    const onChange = useCallback((sql: string) => {
        const errors = parser.validate(sql);
        const tokens = parser.getAllTokens(sql)
        setParseResult({errors: JSON.stringify(errors, null, 2), tokens: tokens})
    }, [])
    return (
        <div className={"container mx-auto p-2"}>
            <div className={"grid grid-cols-2 gap-4"}>
                <div>
                    <h3 className={"font-semibold mb-1"}>Code</h3>
                    <SqlEditor value={"SELEC d.a1 FROM table t"} onChange={onChange}/>
                    <div>
                        <h3 className={"font-semibold mb-1"}>Errors</h3>
                        <div className={"text-xs overflow-hidden"}>
                            <pre className={"whitespace-pre-wrap"}>{parseResult?.errors}</pre>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className={"font-semibold mb-1"}>Tokens</h3>
                    <div className={"my-2"}>Count: {parseResult?.tokens.length}</div>
                    <div>
                        {
                            parseResult?.tokens.map((t,i) => <div key={i}
                                className={"p-1 bg-gray-100 odd:bg-gray-200 flex gap-2"}>{t.type} {t.text}</div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;
