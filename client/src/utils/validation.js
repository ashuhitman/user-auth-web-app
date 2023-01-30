const validation = (formdata, auth_type = "reg") => {
  let errors = {};
  let isValid = true;
  const regex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;

  const { email, password, rePassword, firstName, lastName, gender, country } =
    formdata;

  if (!email) {
    errors.email = "Email is required!";
    isValid = false;
  } else if (!regex.test(email)) {
    errors.email = "This is not a valid email format!";
    isValid = false;
  }
  if (!password) {
    errors.password = "Password is required!";
    isValid = false;
  } else if (password.length <= 4) {
    errors.password = "Password must be more than 4 characters";
    isValid = false;
  }

  // return login action
  if (auth_type === "login") {
    return [isValid, errors];
  }
  if (!rePassword) {
    errors.rePassword = "Re entry of Password is required!";
    isValid = false;
  } else if (password.length > 4 && password !== rePassword) {
    errors.rePassword = "Password are not matching";
    isValid = false;
  }
  if (!firstName) {
    errors.firstName = "First Name is required!";
    isValid = false;
  } else if (firstName.length < 3) {
    errors.firstName = "First Name must be more than 2 characters";
    isValid = false;
  }
  if (!lastName) {
    errors.lastName = "Last Name is required!";
    isValid = false;
  } else if (lastName.length < 3) {
    errors.lastName = "Last Name must be more than 2 characters";
    isValid = false;
  }
  if (!gender) {
    errors.gender = "Choose a gender!";
    isValid = false;
  }
  if (!country || country === "0") {
    errors.country = "Country is required!";
    isValid = false;
  }

  return [isValid, errors];
};

export default validation;
