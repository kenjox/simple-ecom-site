const getError = (errorsArray, prop) => {
  return errorsArray?.mapped()[prop]?.msg ?? '';
};

export { getError };
