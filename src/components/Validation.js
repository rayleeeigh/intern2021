const Validation = (user) => {
  // var cnt = 0;
  let errors = {};
  if (!user.email) {
    errors.email = "Email is required.";
  }
  if (!user.password) {
    errors.password = "Password is required";
  } else if (user.password.length < 5) {
    errors.password = "Password must be more that 5 characters";
  }

  // if (user.email !== "" && user.password !== "" && user.password.length > 5) {
  //   errors.success = "Login Successful";
  // }

  return errors;
};

export default Validation;
