export const toPercent = (str: string|number) => {
  let floatVal = typeof str === 'string' ? parseFloat(str) : str;
  
  if (isNaN(floatVal)) {
    floatVal = 0;
  }

  return `${floatVal.toFixed(2)}%`;
};

export const toCurrency = (str: string|number) => {
  let floatVal = typeof str === 'string' ? parseFloat(str) : str;

  if (isNaN(floatVal)) {
    floatVal = 0;
  }

  return `${floatVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
};
