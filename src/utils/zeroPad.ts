const zeroPad = (index: number, digits: number): string => {
  const num = Math.abs(index).toString();
  const zeroPadded = `${num.length < digits ? '0'.repeat(digits - num.length) : ''}${num}`;
  if (index < 0) {
    return `(${zeroPadded})`;
  }
  return zeroPadded;
};

export default zeroPad;
