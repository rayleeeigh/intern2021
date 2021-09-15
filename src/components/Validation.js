const Validation = (user) => {
  var cnt = 0;
  if (!user.email || !user.password) {
    cnt = 1;
  }
  return cnt;
};

export default Validation;
