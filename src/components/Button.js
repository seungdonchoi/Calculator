import { useContext } from "react";
import { CalcContext } from "../context/Calculation";

const styleName = (value) => {
  const className = {
    '=': 'equals',
    '+': 'opt',
    '-': 'opt',
    'x': 'opt',
    '/': 'opt',
  }
  return className[value];
}

const Button = ({ buttons }) => {
  const { calc, setCalc } = useContext(CalcContext);

  const numberClick = () => {
    const numString = buttons.toString();
    let numberValue;
    if (numString === '0' && calc.num === '0') {
      numberValue = '0';
    } else {
      numberValue = Number(calc.num + numString);
    }
    setCalc({
      ...calc,
      num: numberValue
    })
  }
  const signClick = () => {
    setCalc({
      sign: buttons,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }
  const decimalClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + buttons : calc.num
    })
  }
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const calculation = (a, b, sign) => {
        const result = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          'x': (a, b) => a * b,
          '/': (a, b) => a / b,
        }
        return result[sign](a, b);
      }
      setCalc({
        res: calculation(calc.res, calc.num, calc.sign),
        sign: '',
        num: 0
      })
    }
  }
  const resetClick = () => {
    setCalc({
      sign: '',
      num: 0,
      res: 0
    })
  }
  const percentClick = () => {
    setCalc({
      num: (calc.num / 100),
      res: (calc.res / 100),
      sign: ''
    })
  }
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0
    })
  }
  const handleClick = () => {
    const result = {
      '.': decimalClick,
      'C': resetClick,
      '+': signClick,
      '-': signClick,
      'x': signClick,
      '/': signClick,
      '=': equalsClick,
      '%': percentClick,
      '+-': invertClick
    };
    if (result[buttons]) {
      return result[buttons]();
    } else {
      return numberClick();
    }
  }
  return (
    <button onClick={handleClick} className={`${styleName(buttons)} button`}>{ buttons }</button>
  )
}

export default Button;
