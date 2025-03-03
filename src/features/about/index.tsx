import { Alert } from "@chakra-ui/react";

const About = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
      <h1 style={{ textAlign: "center" }}>Learn in 5 minutes</h1>
      <Alert.Root>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            <h6>Disclaimer:</h6>
          </Alert.Title>
          <Alert.Description>
            <p style={{ fontSize: "16px" }}>
              LearnInFive is sorry for any delay in loadings, for now, we are
              using some services with free tiers.
            </p>
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
      <div>
        <p>
          Learn in 5 minutes is a simple AI powered project, the purpose is
          generate a new Computer Science/Programming concept everyday and
          provide a simple and catchy explanation.
        </p>
      </div>
      <div>
        <p>
          5 minutes of your day, while you drink a coffee, while you wait for a
          deploy, while you wait for massive packages installation, only 5
          minutes from your day it will be enough to learn something new or
          refresh your memory from forgot concepts.
        </p>
      </div>
    </div>
  );
};

export default About;
