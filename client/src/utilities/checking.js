const EMAILREGEX = /([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+/i;

export const checkEmail = (value, errorsObject) => {
  errorsObject.email = EMAILREGEX.test(value) ? false : 'Email must be in correct format.';
  return { errors: errorsObject };
}

export const errorChecking = errors => {
  return !Object.values(errors).every(value => { return !value });
}

export const formChecking = form => {
  return Object.values(form).some(value => { return !value });
}

export const checkDisabled = (errors, form, loading) => {
  return errorChecking(errors) || formChecking(form) || loading;
}
