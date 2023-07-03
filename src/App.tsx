import React, { useState } from 'react';
import styled from "@emotion/styled";
import Title from './components/Title';
import NumberBox from './components/NumberBox';
import Button from './components/Button';

const NumberBoxContainer = styled.div`
  display:flex;
  gap:16px;
  margin-top: 24px;
`;

function App() {
  // Length가 7로 고정된 Array 
  const [num, setNum] = useState<
    [number, number, number, number, number, number, number]>([1,2,3,4,5,6,7]);

  const [randNum, setRandNum] = useState<
    [number, number, number, number, number, number] | null>(null);
  return (
    <div className="App">
      <Title>
        로또 추천 번호
      </Title>

      <NumberBoxContainer>
        {
          Array(8).fill(1).map((_, idx) =>{
            if(idx === 6) //6번 째는 +가 만들어지도록 
              return <NumberBox/>;

            // 로또 번호는 6개까지만 입력. idx를 변경하면 NumberBox에 넘겨줌
            if(idx === 7) 
              idx = 6;

            return <NumberBox num={num[idx]} setNum={(value) => {
              
              // 중복 숫자는 입력되지 않도록 하기 위함
              if(num.includes(value))
                return;

              setNum(prev => {
                prev[idx] = value
                return [...prev];
              })
            }} />
          })
        }
      </NumberBoxContainer>

      <div style={{ height: 120 }}></div>
      <Button onClick={() => {
        const li: number[] = [];
        while(li.length < 6) {
          //1 ~ 45까지 랜덤으로 가져오기. +1을 해야지 1부터 가져오
          const v = Math.floor((Math.random() * 45) + 1)

          if(li.includes(v)) continue;

          li.push(v);
        }
        setRandNum(li as [number, number, number, number, number, number]);
      }}>랜던 번호 추천</Button>

      {
        randNum &&
        <>
        <div style={{ height: 24 }}></div>
          <Title>정답 번호</Title>

          <NumberBoxContainer>
            {
              Array(6).fill(1).map((_, idx) => <NumberBox num={randNum[idx]} />)
            }
          </NumberBoxContainer>
          
          <Title>정답 번호</Title>
        </>
      }
    </div>
  );
}

export default App;
