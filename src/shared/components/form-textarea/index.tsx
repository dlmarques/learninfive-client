import { Textarea } from "@chakra-ui/react";

interface FormTextAreaProps {
  name: string;
  id: string;
  label: string;
  placeholder: string;
  onChange: any;
  required?: boolean;
  value?: string;
}

const FormTextArea = ({ ...textAreaConfig }: FormTextAreaProps) => {
  return (
    <div style={{ width: "80%", margin: "auto", marginBottom: "16px" }}>
      <label htmlFor={textAreaConfig.id}>
        <h4>{textAreaConfig.label}</h4>
      </label>
      <Textarea
        required={textAreaConfig.required}
        name={textAreaConfig.name}
        id={textAreaConfig.id}
        placeholder={textAreaConfig.placeholder}
        onChange={textAreaConfig.onChange}
        value={textAreaConfig.value}
      />
    </div>
  );
};

export default FormTextArea;
