export const formatPrice = (amount) => {
  if (!amount) return "";
  return `₹${Number(amount).toFixed(2)}`;
};