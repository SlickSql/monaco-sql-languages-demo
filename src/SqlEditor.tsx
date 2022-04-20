import React, {FC, useEffect, useRef} from "react";
// WORKERS DON'T WORK if import like this! import {editor, Uri} from "monaco-editor";
import {editor, Uri} from "monaco-editor/esm/vs/editor/editor.api";

export type MonacoEditorProps = {
    value: string;
    onChange: (value: string) => void;
};

export const SqlEditor: FC<MonacoEditorProps> = ({value, onChange}) => {
    const editorInstance = useRef<editor.IStandaloneCodeEditor | null>(null);
    const domNodeRef = useRef<HTMLDivElement>(null);
    const modelRef = useRef<editor.ITextModel | null>(null);
    useEffect(() => {
        if (!editorInstance.current) {
            modelRef.current = editor.createModel(value, "sql", Uri.parse("script.sql"));
            const codeEditor = editor.create(domNodeRef.current!, {
                minimap: {enabled: false},
                theme: "vs-dark",
                language: "sql",
                model: modelRef.current,
            });
            if (onChange) {
                codeEditor.onDidChangeModelContent(() => onChange(codeEditor.getValue()));
            }
            editorInstance.current = codeEditor;
        }
        return () => {
            if (editorInstance.current) {
                editorInstance.current.dispose();
                editorInstance.current = null;
            }
            if (modelRef.current) {
                modelRef.current.dispose()
            }
        };
    }, [value, onChange]);

    useEffect(() => {
        if (editorInstance.current) {
            editorInstance.current.setValue(value)
        }
    }, [value]);

    return <div ref={domNodeRef} style={{height: 200}}/>;
};
