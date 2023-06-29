import React, { useState } from 'react';
import styled from "@emotion/styled";
import Title from './components/Title';
import NumberBox from './components/NumberBox';

const NumberBoxContainer = styled.div`
  display:flex;
  gap:16px;
  margin-top: 24px;
`;

function App() {
  // Length가 7로 고정된 Array 
  const [num, setNum] = useState<
    [number, number, number, number, number, number, number]>([1,2,3,4,5,6,7]);
  return (
    <div className="App">
      <Title>
        로또 추천 번호
      </Title>

      <NumberBoxContainer>
        {
          Array(8).fill(1).map((value, idx) =>{
            if(idx === 6)
              return <NumberBox/>;

            if(idx === 7)
              idx = 6;

            return <NumberBox num={num[idx]} setNum={(value) => {
              setNum(prev => {
                prev[idx] = value
                return [...prev];
              })
            }} />
          })
        }


        {/* <NumberBox num={num[1]} setNum={setNum} />
        <NumberBox num={num[2]} setNum={setNum} />
        <NumberBox num={num[3]} setNum={setNum} />
        <NumberBox num={num[4]} setNum={setNum} />
        <NumberBox num={num[5]} setNum={setNum} />
        <NumberBox/>
        <NumberBox num={num[6]} setNum={setNum} /> */}
      </NumberBoxContainer>
    </div>
  );
}

export default App;
