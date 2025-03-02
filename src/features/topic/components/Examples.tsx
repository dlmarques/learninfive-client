import type { TopicExample } from "@/types/Topic";
import CodeExample from "../../../shared/components/code-example";

const Examples = ({ examples }: { examples: TopicExample[] }) => {
  return (
    <div>
      <h3>Code examples</h3>
      <CodeExample examples={examples} />
    </div>
  );
};

export default Examples;
