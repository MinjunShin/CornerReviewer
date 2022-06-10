import React, { useState } from "react";
import InfoInput from "../components/InfoInput";
import "./SignUp.css";

function SignUp() {
  const loc = "signup";
  const [isSignupModalClicked, setisSignupModalClicked] = useState(false);
  const handleModal = () => {
    setisSignupModalClicked((isSignupModalClicked) => !isSignupModalClicked);
  };

  return (
    <div className="signup-page">
      <InfoInput
        loc={loc}
        handleModal={handleModal}
        withdrawalModal={false}
        signupModal={isSignupModalClicked}
      />
    </div>
  );
}

export default SignUp;
