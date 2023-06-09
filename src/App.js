import { useState } from "react"
import { evaluate } from "mathjs"

import { WrittingBox } from "./components/WrittingBox"
import { Result } from "./components/Result"
import { Button } from "./components/Button"

import './style.css';


export default function App() {

    const [writtingSlot, setWrittingSlot] = useState("")
    const [resultMemory, setResultMemory] = useState("0")
    const [resultDisplay, setResultDisplay] = useState("0")
    const [memoryRegister, setMemoryRegister] = useState("0")
    const [justEvaluated, setJustEvaluated] = useState(false)

    function write(character) {
//        if (writtingSlot==0 && character==0) return
//        if (writtingSlot==0 && (type==="number" || type==="constant")) {
//            setWrittingSlot(`${character}`);
//                return
//        } else {
//            setWrittingSlot(`${writtingSlot}${character}`);
//        }
        setWrittingSlot(`${writtingSlot}${character}`);
        setJustEvaluated(false);
    }

    function operateOnAns(character) {
        if (justEvaluated) {
            setWrittingSlot(`Ans${character}`);
            setJustEvaluated(false);
        } else {
            write(character);
        }
    }

    function deleteLast() {
        if (writtingSlot.length === 0) return
        setWrittingSlot(writtingSlot.slice(0, -1));
    }

    function clearWrittingSlot() {
        setWrittingSlot("")
    }

    function evaluateInput() {
        let expresion = writtingSlot
        expresion = expresion
                        .replaceAll("Ans", `(${resultMemory})`)
                        .replaceAll("M", `(${memoryRegister})`)
                        .replaceAll("X", `*`)
                        .replaceAll("PI", `pi`);
        let resultAux
        try{
            resultAux = `${evaluate(expresion)}`
            setResultDisplay(resultAux);
            setResultMemory(resultAux);
            setJustEvaluated(true);
        } catch (error) {
            setResultDisplay("Error");
        }
    }

    function memoryClear() {
        setMemoryRegister("0");
        console.log("memoryRegister = ",memoryRegister);
    }

    function memorySave() {
        setMemoryRegister(resultMemory);
        console.log("memoryRegister = ",memoryRegister);
    }

    function memoryAdd(memoryRegister) {
        setMemoryRegister(memoryRegister+resultMemory);
        console.log("memoryRegister = ",memoryRegister);
    }

    function memorySubstract(memoryRegister) {
        setMemoryRegister(memoryRegister-resultMemory);
        console.log("memoryRegister = ",memoryRegister);
    }

    function memoryWrite() {
        setWrittingSlot(`${writtingSlot}M`);
    }


{/* 
    BOTONES QUE NO USO
        <ButtonOperator operator="!" writtingSlot="n!" callback={write} />
        <Button display="sqrt" write="sqrt(" color="gray" callback={write} />
*/}

  return (
    <table>
        <thead>
            <WrittingBox display={writtingSlot} />
            <Result display={resultDisplay} />
        </thead>

        <tbody>
            <tr>
                <Button display="MC" color="black" callback={memoryClear} />
                <Button display="MS" color="black" callback={memorySave} />
                <Button display="M" color="black" callback={memoryWrite} />

                <Button display="DEL" color="red" callback={deleteLast} />
                <Button display="AC"  color="red" callback={clearWrittingSlot} />
            </tr>

            <tr>
                <Button display="sin" write="sin(" color="gray" callback={write} />
                <Button display="cos" write="cos(" color="gray" callback={write} />
                <Button display="tan" write="tan(" color="gray" callback={write} />
                <Button display="º" write="deg" color="gray" callback={write} />
                <Button display="π" write="PI" color="gray" callback={write} />
            </tr>

            <tr>
                <Button display="!" color="gray" callback={write} />
                <Button display="√" write="sqrt(" color="gray" callback={write} />
                <Button display="log" write="log(" color="gray" callback={write} />
                <Button display="ln" write="ln(" color="gray" callback={write} />
                <Button display="e" color="gray" callback={write} />
            </tr>

            <tr>
                <Button display="7" color="blue" callback={write} />
                <Button display="8" color="blue" callback={write} />
                <Button display="9" color="blue" callback={write} />

                <Button display="(" color="green" callback={write} />
                <Button display=")" color="green" callback={write} />
            </tr>

            <tr>
                <Button display="5" color="blue" callback={write} />
                <Button display="6" color="blue" callback={write} />
                <Button display="4" color="blue" callback={write} />

                <Button display="X" color="green" callback={operateOnAns} />
                <Button display="/" color="green" callback={operateOnAns} />
            </tr>

            <tr>
                <Button display="1" color="blue" callback={write} />
                <Button display="2" color="blue" callback={write} />
                <Button display="3" color="blue" callback={write} />

                <Button display="+" color="green" callback={operateOnAns} />
                <Button display="-" color="green" callback={operateOnAns} />
            </tr>

            <tr>
                <Button display="0" color="blue" callback={write} />
                <Button display="." color="blue" callback={write} />
                <Button display="Ans" color="blue" callback={write} />

                <Button display="^" color="green" callback={operateOnAns} />
                <Button display="=" color="green" callback={evaluateInput} />
            </tr>
        </tbody>
    </table>
  );
}