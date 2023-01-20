const FormA = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateofbirth] = useState("");
  const [ssn, setSSN] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isInvalid, setInvalid] = useState(false);
  const invalid = useRef();
  const label = useRef();
  const emailInput = useRef();

  // Handle the SSN number input
  const handleSSN = e => {
    const length = e.target.value.length;
    // Ensure the ssn number doesn't exit 10 characters
    if (length > 10) return;
    const value = e.target.value.split("-").join("");
    if (isNaN(value)) return;
    if (length === 3) {
      setSSN(`${e.target.value}-`);
    } else if (length === 6) {
      setSSN(`${e.target.value}-`);
    } else {
      setSSN(e.target.value);
    }
  };

  // Handle phoneNumber input
  const handlePhoneNumber = value => {
    const length = value.length;
    if (length === 0) return setPhoneNumber("");
    if (value.charAt(0) !== "+") return;
    if (length > 15) return;
    const val = value.substr(1);
    if (isNaN(val) && val !== "") return;
    setPhoneNumber(value.trim());
  };
  const submitPersonalInfo = e => {
    e.preventDefault();
    if (!firstname || !lastname || !address || !dateOfBirth || !ssn || !email || !phoneNumber) {
      alert("Please fill all input field");
      return;
    }
    if (!validateEmail(email)) {
      label.current.style.color = "red";
      emailInput.current.style.borderColor = "red";
      emailInput.current.style.outlineColor = "red";
      setInvalid(true);
      return;
    }
    personalInfo = {
      firstname,
      lastname,
      address,
      dateOfBirth,
      ssn,
      email,
      phoneNumber
    };
    changeHeaderStyle(1);
    newFunction(e.target);
  };
  const validateEmail = email => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };
  const handleEmail = e => {
    if (isInvalid) {
      setInvalid(false);
      label.current.style.color = "#2b1202";
      emailInput.current.style.borderColor = "#2b1202";
      emailInput.current.style.outlineColor = "#2b1202";
    }
    setEmail(e.target.value);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    for: "firstname"
  }, "first name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "firstname",
    id: "firstname",
    placeholder: "first name",
    required: true,
    value: firstname,
    maxlength: 20,
    onChange: e => setFirstname(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    for: "lastname"
  }, "last name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "lastname",
    id: "lastname",
    placeholder: "last name",
    required: true,
    value: lastname,
    maxlength: 20,
    onChange: e => setLastname(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    for: "address"
  }, "address"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "address",
    id: "address",
    placeholder: "address",
    required: true,
    value: address,
    maxlength: 60,
    onChange: e => setAddress(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    for: "dateOfBirth"
  }, "date of birth"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dateOfBirth",
    id: "dateOfBirth",
    required: true,
    value: dateOfBirth,
    onChange: e => setDateofbirth(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    for: "ssn"
  }, "social security number"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "ssn",
    id: "ssn",
    placeholder: "xxx-xx-xxx",
    required: true,
    value: ssn,
    onChange: e => handleSSN(e)
  })), /*#__PURE__*/React.createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    for: "email",
    ref: label
  }, "email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    id: "email",
    placeholder: "email",
    required: true,
    value: email,
    maxlength: 50,
    onChange: e => handleEmail(e),
    ref: emailInput
  }), isInvalid && /*#__PURE__*/React.createElement("p", {
    id: "invalid-email",
    ref: invalid
  }, "Invalid email!!!")), /*#__PURE__*/React.createElement("div", {
    class: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    for: "phoneNumber"
  }, "phone number"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "phoneNumber",
    id: "phoneNumber",
    placeholder: "e.g: +2343043049",
    required: true,
    value: phoneNumber,
    onChange: e => handlePhoneNumber(e.target.value)
  })), /*#__PURE__*/React.createElement("button", {
    id: "submit-a",
    type: "submit",
    onClick: e => submitPersonalInfo(e)
  }, "Save & Next"));
};
ReactDOM.render( /*#__PURE__*/React.createElement(FormA, null), document.querySelector("#form-a"));