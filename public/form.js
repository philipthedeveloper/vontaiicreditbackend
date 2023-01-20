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
  const handleSSN = (e) => {
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
  const handlePhoneNumber = (value) => {
    const length = value.length;
    if (length === 0) return setPhoneNumber("");
    if (value.charAt(0) !== "+") return;
    if (length > 15) return;
    const val = value.substr(1);
    if (isNaN(val) && val !== "") return;
    setPhoneNumber(value.trim());
  };
  const submitPersonalInfo = (e) => {
    e.preventDefault();

    if (
      !firstname ||
      !lastname ||
      !address ||
      !dateOfBirth ||
      !ssn ||
      !email ||
      !phoneNumber
    ) {
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
      phoneNumber,
    };
    changeHeaderStyle(1);
    newFunction(e.target);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleEmail = (e) => {
    if (isInvalid) {
      setInvalid(false);
      label.current.style.color = "#2b1202";
      emailInput.current.style.borderColor = "#2b1202";
      emailInput.current.style.outlineColor = "#2b1202";
    }
    setEmail(e.target.value);
  };

  return (
    <>
      <div class="form-group">
        <label for="firstname">first name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="first name"
          required
          value={firstname}
          maxlength={20}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="lastname">last name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="last name"
          required
          value={lastname}
          maxlength={20}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="address">address</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="address"
          required
          value={address}
          maxlength={60}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="dateOfBirth">date of birth</label>
        <input
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          required
          value={dateOfBirth}
          onChange={(e) => setDateofbirth(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label for="ssn">social security number</label>
        <input
          type="text"
          name="ssn"
          id="ssn"
          placeholder="xxx-xx-xxx"
          required
          value={ssn}
          onChange={(e) => handleSSN(e)}
        />
      </div>
      <div class="form-group">
        <label for="email" ref={label}>
          email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          required
          value={email}
          maxlength={50}
          onChange={(e) => handleEmail(e)}
          ref={emailInput}
        />
        {isInvalid && (
          <p id="invalid-email" ref={invalid}>
            Invalid email!!!
          </p>
        )}
      </div>
      <div class="form-group">
        <label for="phoneNumber">phone number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="e.g: +2343043049"
          required
          value={phoneNumber}
          onChange={(e) => handlePhoneNumber(e.target.value)}
        />
      </div>
      <button
        id="submit-a"
        type="submit"
        onClick={(e) => submitPersonalInfo(e)}
      >
        Save & Next
      </button>
    </>
  );
};

ReactDOM.render(<FormA />, document.querySelector("#form-a"));
