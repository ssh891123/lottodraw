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

function getRank(
  resultNum: [number, number, number, number, number, number, number], 
  num: [number, number, number, number, number, number]) 
{
  const isBouns = num.includes(resultNum[6]);
  //splice(a, b). a: 제거할 Index, b: 제거할 개수. a===0 이면 제거되지 않음
  resultNum.splice(6, 1);

  let matchedNum = 0;

  for(const value of num) {
    if(resultNum.includes(value))
      matchedNum++;
  }

  switch(matchedNum) {
    case 6:
      return '1등 입니다';
    case 5:
      return isBouns ? '2등입니다!': '3등 입니다!';
    case 4:
      return '4등 입니다.';
    case 3:
      return '5등 입니다.';
  }
  return '낙첨 되었습니다.'
}

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
          
          <div style={{ height: 40 }}></div>
          <Title>
            {
              // getRank 내부에 splice를 통해 array의 item을 제거함
              // 원본이 수정되므로 값을 넘겨줄때 복사해서 넘겨줌
              getRank([...num], [...randNum])
            }
          </Title>
        </>
      }
    </div>
  );
}

export default App;
