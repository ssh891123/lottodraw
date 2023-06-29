import React from 'react';
import Title from './components/Title';
import NumberBox from './components/NumberBox';

function App() {
  return (
    <div className="App">
      <Title>
        정답번호
      </Title>
      <NumberBox/>
      <NumberBox/>
      <NumberBox/>
    </div>
  );
}

export default App;
