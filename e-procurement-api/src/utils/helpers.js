import bcrypt from "bcryptjs";

export const generateResponse = (status, message, data = null) => {
  return {
    status,
    message,
    data,
  };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const paginate = (array, page, size) => {
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const results = {};

  if (endIndex < array.length) {
    results.next = {
      page: page + 1,
      size: size,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      size: size,
    };
  }

  results.results = array.slice(startIndex, endIndex);
  return results;
};
