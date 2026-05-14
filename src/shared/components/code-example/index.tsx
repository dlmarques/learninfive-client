import { Card, Tabs } from "@chakra-ui/react";
import { FaJava, FaJs, FaPython, FaPhp } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { SiCplusplus, SiTypescript } from "react-icons/si";
import { CodeBlock } from "react-code-block";
import { Languages, type TopicExample } from "@/types/Topic";

const ProgrammingLanguagesTabs = [
  { lang: "JavaScript", icon: <FaJs /> },
  { lang: "Python", icon: <FaPython /> },
  { lang: "Java", icon: <FaJava /> },
  { lang: "C#", icon: <TbBrandCSharp /> },
  { lang: "C++", icon: <SiCplusplus /> },
  { lang: "TypeScript", icon: <SiTypescript /> },
  { lang: "PHP", icon: <FaPhp /> },
];

const LanguageAliases: Array<{
  canonical: TopicExample["language"];
  aliases: string[];
}> = [
  { canonical: "TypeScript", aliases: ["typescript"] },
  {
    canonical: "JavaScript",
    aliases: ["javascript", "node.js", "nodejs", "node"],
  },
  { canonical: "Python", aliases: ["python"] },
  { canonical: "C#", aliases: ["c#", "csharp", ".net", "dotnet"] },
  { canonical: "C++", aliases: ["c++", "cplusplus", "cpp"] },
  { canonical: "PHP", aliases: ["php"] },
  { canonical: "Java", aliases: ["java"] },
];

const normalizeLanguage = (
  language: string
): TopicExample["language"] | undefined => {
  const lower = language.toLowerCase();
  for (const { canonical, aliases } of LanguageAliases) {
    if (aliases.some((alias) => lower.includes(alias))) return canonical;
  }
  return undefined;
};

const CodeExample = ({ examples }: { examples: TopicExample[] }) => {
  const normalizedExamples = examples
    .map((example) => {
      const language = normalizeLanguage(example.language);
      return language ? { ...example, language } : null;
    })
    .filter((example): example is TopicExample => example !== null);

  if (normalizedExamples.length === 0) return null;

  return (
    <Card.Root
      size="sm"
      style={{ background: "#222222", overflowX: "auto", padding: "0 8px" }}
    >
      <Tabs.Root defaultValue={normalizedExamples[0].language} variant="plain">
        <Tabs.List>
          {ProgrammingLanguagesTabs.filter((tab) => {
            const exists = normalizedExamples.some(
              (example) => example.language === tab.lang
            );
            if (exists) return tab;
          }).map((tab) => {
            return (
              <Tabs.Trigger
                key={tab.lang}
                value={tab.lang}
                style={{ color: "#e6e6e6" }}
              >
                {tab.icon}
                {tab.lang}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {normalizedExamples.map((example) => {
          return (
            <Tabs.Content value={example.language}>
              <CodeBlock
                code={`${example.code}`}
                language={Languages[example.language]}
              >
                <CodeBlock.Code style={{ padding: "16px" }}>
                  <CodeBlock.LineContent>
                    <CodeBlock.Token />
                  </CodeBlock.LineContent>
                </CodeBlock.Code>
              </CodeBlock>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </Card.Root>
  );
};

export default CodeExample;
