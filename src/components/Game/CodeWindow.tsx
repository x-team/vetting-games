// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike.min";
import "prismjs/components/prism-javascript.min";
import "prismjs/themes/prism-tomorrow.min.css";

import Window from "@components/Navigation/Window";
import { GameLoaderData } from "@pages/Game";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Editor from "react-simple-code-editor";
import { Item } from "react-stately";

interface SourceCode {
  ext: string;
  src: string;
  name: string;
  content: string;
}

const fetchMissionCode = async (
  type: string,
  level: number,
  fileName: string
) => {
  const res = await fetch(`/${type}-${level}/${fileName}`);
  return res.text();
};

const fetchSourceCodes = async (
  type: string,
  level: number,
  sourceFiles: string[]
): Promise<SourceCode[]> => {
  const files = await Promise.all(
    sourceFiles.map((file) => fetchMissionCode(type, level, file))
  );

  return sourceFiles.map((file, index) => {
    const [name, ext] = sourceFiles[index].split(".");
    return {
      ext: ext || "js",
      src: file,
      name: name || "index",
      content: files[index],
    };
  });
};

const useSourceCode = () => {
  const { data: gameData } = useLoaderData() as GameLoaderData;
  const [sourceCode, setSourceCode] = useState<SourceCode[]>([]);

  const type = gameData?.game?.mission?.type;
  const level = gameData?.game?.mission?.level;
  const sourceFiles = gameData?.game?.mission?.sourceCode;

  useEffect(() => {
    if (!type || !level || !sourceFiles) return;

    fetchSourceCodes(
      type,
      level,
      sourceFiles.map((file) => file.src)
    ).then((files) => setSourceCode(files));
  }, [type, level, sourceFiles]);

  return sourceCode;
};

const CodeWindow = () => {
  const sourceCode = useSourceCode();

  const codeTabs = useMemo(() => {
    return sourceCode.map(({ name, ext, content, src }) => ({
      id: name,
      title: src,
      content: (
        <Editor
          value={content || ""}
          padding={10}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onValueChange={() => {}}
          className="overflow-auto p-4 font-code text-sm"
          textareaClassName="outline-none"
          highlight={(code) => highlight(code, languages[ext], ext)}
          readOnly
        />
      ),
    }));
  }, [sourceCode]);

  if (!sourceCode.length) return null;

  return (
    <Window id="code" items={codeTabs}>
      {(item) => <Item title={item.title}>{item.content}</Item>}
    </Window>
  );
};

export default CodeWindow;
