import { useContext } from "react";
import { CalcContext } from "../context/Calculation";

const styleName = (value) => {
  const className = {
    '=': 'equals',
    '+': 'opt',
    '-': 'opt',
    'x': 'opt',
    '/': 'opt',
    'EXP': 'opt'
  }
  return className[value];
}

const Button = ({ buttons }) => {
  const { calc, setCalc } = useContext(CalcContext);

  const numberClick = () => {
    const numString = buttons.toString();
    let currentNumber = calc.num.toString() === '0' ? numString : calc.num + numString;
    setCalc({
      ...calc,
      num: currentNumber,
    })
  }
  const exponentClick = () => (
    setCalc({
      ...calc,
      num: calc.num + '**',
    })
  )
  const signClick = () => {
    let currentSign = buttons === 'x' ? '*' : buttons
    setCalc({
      ...calc,
      num: calc.num + currentSign,
    })
  }
  const decimalClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + buttons : calc.num
    })
  }
  const equalsClick = () => {
    if (calc.num) {
      let result;
      try {
        result = eval(calc.num);
      } catch (error) {
        result = 'Error'
      }
      finally {
        console.log(result);
        if (result) {
          setCalc({
            num: result,
          })
        }
      }
    }
  }
  const resetClick = () => {
    setCalc({
      num: 0,
      res: 0
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
      'EXP': exponentClick,
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
