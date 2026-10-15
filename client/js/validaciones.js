export function passwordsCoinciden(password, confirm) {
  return password === confirm;
}

export const validationFormatPass = (password)=>{
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8}$/;
    return regex.test(password);
};