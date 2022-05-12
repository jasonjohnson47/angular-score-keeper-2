function updateTextContent(
  elem: HTMLElement,
  value: number,
  decimalPlaces: number
) {
  const localeStringOptions = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  };
  elem.textContent =
    Number(value).toLocaleString(undefined, localeStringOptions);
}

export function animateNumber(
  elem: HTMLElement,
  startValue: number,
  endValue: number
) {
  if (elem.textContent === null) {
    return;
  }

  const duration = 1000;

  const numberString = (
    elem.textContent.match(/[0-9]*\.?[0-9]+/g) as RegExpExecArray
  ).join('');
  const isDecimalNumber = numberString.indexOf('.') !== -1 ? true : false;
  const decimalPlaces: number = isDecimalNumber ? numberString.length - 1 - numberString.lastIndexOf('.') : 0;

  const direction = endValue > startValue ? 'up' : 'down';

  const stepTime = 100;
  const valueDiff = Math.abs(startValue - endValue);
  const incrementValue = Math.abs(valueDiff / (duration / stepTime)) || Math.abs(startValue / (duration / stepTime));
  const increment = endValue > startValue ? incrementValue : incrementValue * -1;

  let currentValue = startValue;

  const timer = setInterval(function () {
    if (
      (direction === 'up' && currentValue >= endValue) ||
      (direction === 'down' && currentValue <= endValue)
    ) {
      clearInterval(timer);
      updateTextContent(elem, endValue, decimalPlaces);
    } else {
      const newValue = (currentValue += increment);
      updateTextContent(elem, newValue, decimalPlaces);
    }
  }, stepTime);
}
