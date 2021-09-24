const Validation = (user) => {
  // var cnt = 0;
  let errors = {};
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!user.email) {
    errors.email = "Email is required.";
  } else if (!re.test(user.email)) {
    errors.email = "Wrong Email Format";
  }
  if (!user.password) {
    errors.password = "Password is required";
  } else if (user.password.length < 5) {
    errors.password = "Password must be more that 5 characters";
  }

  return errors;
};

export default Validation;
