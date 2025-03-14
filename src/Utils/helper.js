import CryptoJS from "crypto-js";
export const userInitial = (name) => {
  if (!name) {
    return;
  }
  const words = name?.split(" ");
  console.log("word", words);

  let initials = "";
  for (let i = 0; i < Math.min(words?.length, 2); i++) {
    console.log(words[i][0]);

    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const encryptValues = ({ email, password, confirmPassword }) => {
  const encryptedEmail = CryptoJS.AES.encrypt(
    email,
    import.meta.env.VITE_ENCRYPT_KEY
  ).toString();
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    import.meta.env.VITE_ENCRYPT_KEY
  ).toString();
  const encryptedConfirmPassword = confirmPassword
    ? CryptoJS.AES.encrypt(
        confirmPassword,
        import.meta.env.VITE_ENCRYPT_KEY
      ).toString()
    : null;
  const encryptedValues = {
    email: encryptedEmail,
    password: encryptedPassword,
    confirmPassword: confirmPassword && encryptedConfirmPassword,
  };
  // console.log(encryptedValues);

  return encryptedValues;
};
//
// console.log(encryptValue("example@gmail.com"));
// CryptoJS.enc.Utf8;
