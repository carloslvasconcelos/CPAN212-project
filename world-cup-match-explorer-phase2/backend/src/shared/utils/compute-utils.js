export const randomNumberOfNDigits = (n) => {
  return Math.floor(Math.random() * Math.pow(10, n))
    .toString()
    .padStart(n, "0");
};
