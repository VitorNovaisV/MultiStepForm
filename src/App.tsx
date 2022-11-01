import { FormEvent, useState } from "react";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import reactLogo from "./assets/react.svg";
import { useMultistepForm } from "./useMultistepForm";
import { UserForm } from "./UserForm";

import "./App.css";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Success");
  }
  return (
    <main className="main">
      <div className="divBox">
        <form onSubmit={onSubmit}>
          <div className="stepCounter">
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div className="btnBox">
            {isFirstStep ? null : isLastStep ? null : (
              <button onClick={back}>Back</button>
            )}
            {isLastStep ? <button onClick={back}>Back</button> : null}
            <button>{isLastStep ? "Finish" : "Next"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
