export const errorChecking = errors => {
  return !Object.values(errors).every(value => { return !value });
}

export const formChecking = form => {
  return Object.values(form).some(value => { return !value });
}

export const checkDisabled = (errors, form, loading) => {
  return errorChecking(errors) || formChecking(form) || loading;
}
