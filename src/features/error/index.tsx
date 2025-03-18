import { VscBracketError } from "react-icons/vsc";
import { ErrorMap } from "./types/Error";

const Error = () => {
  const getErrorMessage = () => {
    const id = localStorage.getItem("error") as keyof typeof ErrorMap;
    return id ? ErrorMap[id] : ErrorMap.unexpected;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <VscBracketError size="30px" />
      <h4>{getErrorMessage()}</h4>
    </div>
  );
};

export default Error;
