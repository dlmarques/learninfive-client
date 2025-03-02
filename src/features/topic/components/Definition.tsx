const Definition = ({
  defintion,
  concept,
}: {
  defintion: string;
  concept: string;
}) => {
  return (
    <div>
      <h3>What is {concept}?</h3>
      <p>{defintion}</p>
    </div>
  );
};

export default Definition;
