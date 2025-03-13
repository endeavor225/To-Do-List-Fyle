export const validateLoginForm = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Veuillez renseigner ce champ.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalide";
  }

  if (!values.password) {
    errors.password = "Veuillez renseigner ce champ.";
  } else if (values.password.length < 8) {
    errors.password = "Doit contenir 8 caractères ou plus";
  } else if (values.password.length > 20) {
    errors.password = "Doit contenir 20 caractères ou moins";
  }
  return errors;
};

export const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Veuillez renseigner ce champ.";
  } else if (values.name.length < 3) {
    errors.name = "Doit contenir 3 caractères ou plus";
  } else if (values.name.length > 25) {
    errors.name = "Doit contenir 15 caractères ou moins";
  }

  if (!values.email) {
    errors.email = "Veuillez renseigner ce champ.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalide";
  }

  if (!values.password) {
    errors.password = "Veuillez renseigner ce champ.";
  } else if (values.password.length < 8) {
    errors.password = "Doit contenir 8 caractères ou plus";
  } else if (values.password.length > 20) {
    errors.password = "Doit contenir 20 caractères ou moins";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Veuillez renseigner ce champ.";
  } else if (values.password.length < 8) {
    errors.password = "Doit contenir 8 caractères ou plus";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Le mot de passe ne correspond pas";
  } else if (values.confirmPassword.length > 20) {
    errors.confirmPassword = "Doit contenir 20 caractères ou moins";
  }
  return errors;
};
