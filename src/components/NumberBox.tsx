import { useState } from "react";
import styled from "@emotion/styled";

const StyledNumberBox = styled.select<{
    num:number;
}>`
width:48px;
height: 48px;
border: #48AEFF solid 1px;
font-size: 14px;
color: #48AEFF;

appearance:none; // select내의 아래방향 화살표 제거
padding-left: ${({num}) => num >= 10 ? 16 : 20}px;
`;



const NumberBox = () => {
    const [num, setNum] = useState(1);

    return <StyledNumberBox 
        num={num} 
        value={num} 
        onChange={(event) => {
            setNum(parseInt(event.currentTarget.value));
        }}>
        {
            Array(45).fill(0).map((value, idx) =>
            <option>
                {idx + 1}
            </option>
            )
        }
    </StyledNumberBox>
};

export default NumberBox;