import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonWrapper from './components/ButtonWrapper';
import Button from './components/Button';
import CalcProvider from './context/Calculation';
const buttonValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
]

function App() {
  return (
    <CalcProvider>
      <Wrapper>
        <Screen />
        <ButtonWrapper>
          {buttonValues.flat().map((button, idx) => (
            <Button buttons={button} key={idx} />
          ))}
        </ButtonWrapper>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
