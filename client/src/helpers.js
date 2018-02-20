export const resetErrors = obj => {
  const objCopy = obj;
  for (const key in objCopy) {
    objCopy[key] = '';
  }
  return objCopy;
};

export const appendErrors = (errors, obj) => {
  const errorsCopy = errors;
  const objCopy = obj;

  // looping through array and adding error to object
  errorsCopy.forEach(current => {
    const key = current.path[0];
    const value = current.message;
    objCopy[key] = value;
  });

  return objCopy;
};
