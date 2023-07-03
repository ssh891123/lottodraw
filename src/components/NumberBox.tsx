import { useState } from "react";
import styled from "@emotion/styled";

const StyledNumberBox = styled.select<{
    num:number;
}>`
width:48px;
height: 48px;
border: #48AEFF solid 1px;
color: #48AEFF;
font-size: 14px;


appearance:none; // select내의 아래방향 화살표 제거
padding-left: ${({num}) => num >= 10 ? 16 : 20}px;

&:disabled {
    opacity: 1;
}
`;



const NumberBox = (
    {num, setNum} : {
        num?: number;
        setNum?: (num: number) => void;
    }
) => {
    // const [num, setNum] = useState(1);

    return <StyledNumberBox 
        num={num ?? 0} 
        value={num ?? "+"} 
        // onClick={(event) => {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }}
        disabled={!setNum}
        onChange={(event) => {
            if(setNum) setNum(parseInt(event.currentTarget.value));
        }}>
        {
            !num ? 
            <option>+</option> 
            :
            Array(45).fill(0).map((value, idx) =>
            <option>
                {idx + 1}
            </option>
            )
        }
    </StyledNumberBox>
};

export default NumberBox;