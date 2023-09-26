export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

export const shippingDateToCurrentYear = (shippingDate) => {
  var originalDate = new Date(shippingDate);

  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var originalDateStr = originalDate.toDateString();
  var updatedDateStr = originalDateStr.replace("2001", currentYear);

  var updatedDate = new Date(updatedDateStr);

  return updatedDate;
};
