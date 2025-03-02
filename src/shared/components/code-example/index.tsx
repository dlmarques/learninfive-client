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

const CodeExample = ({ examples }: { examples: TopicExample[] }) => {
  return (
    <Card.Root
      size="sm"
      style={{ background: "#222222", overflowX: "auto", padding: "0 8px" }}
    >
      <Tabs.Root defaultValue={examples[0].language} variant="plain">
        <Tabs.List>
          {ProgrammingLanguagesTabs.filter((tab) => {
            const exists = examples.some(
              (example) => example.language === tab.lang
            );
            if (exists) return tab;
          }).map((tab) => {
            return (
              <Tabs.Trigger value={tab.lang} style={{ color: "#e6e6e6" }}>
                {tab.icon}
                {tab.lang}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {examples.map((example) => {
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
