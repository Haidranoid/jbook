import * as esbuild from 'esbuild-wasm'
import React, {FC, useState, useEffect, useRef} from "react";
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";

const App: FC = () => {
    const ref = useRef<any>(null)
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        startService();
    }, []);

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    }

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(),fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        });
        //console.log(result)

        setCode(result.outputFiles[0].text);
    }

    return <div>
        <textarea cols={30} rows={10} onChange={onChange} value={input}/>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
};

export default App;
