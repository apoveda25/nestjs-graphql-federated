export const codeDigitsGenerate = (lenght: number) => {
  let code = '';

  for (let i = 0; i < lenght; i++) {
    code += `${Math.floor(Math.random() * 10)}`;
  }

  return code;
};
