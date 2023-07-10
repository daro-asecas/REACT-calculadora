import { useState } from "react"
import { evaluate } from "mathjs"
import Popup from 'reactjs-popup';

import { WrittingBox } from "./components/WrittingBox"
import { Result } from "./components/Result"
import { Button } from "./components/Button"

import './style.css';


export default function App() {

    const [charactersArray, setCharactersArray] = useState([])
    const [writtingSlot, setWrittingSlot] = useState("")
    const [resultMemory, setResultMemory] = useState("0")
    const [resultDisplay, setResultDisplay] = useState("0")
    const [memoryRegister, setMemoryRegister] = useState("0")
    const [justEvaluated, setJustEvaluated] = useState(false)

    function write(character) {
        setWrittingSlot(`${writtingSlot}${character}`);
        setCharactersArray([...charactersArray,character.length])

        console.log(character)
        console.log(character.length)
        console.log(charactersArray)

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

        const lengtToDelete = charactersArray.pop()
        setWrittingSlot(writtingSlot.slice(0, -lengtToDelete));
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

    function memoryWrite() {
        setWrittingSlot(`${writtingSlot}M`);
    }

  return (
    <>

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
                    <Button display="4" color="blue" callback={write} />
                    <Button display="5" color="blue" callback={write} />
                    <Button display="6" color="blue" callback={write} />

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

                <tr>
                    <td colSpan={"100%"} id="popup-button" className="button">
                        <Popup trigger= {<button> Información del Proyecto </button>} modal nested>
                            {close => (
                                    <div id="popup-content" className='modal'>
                                        <div className='content'>
                                            <p>Esta es mi implementación de calculadora cientifica con REACT.</p>
                                            <p>Mi idea fue agregar la funcionalidad de una calculadora real, manteniendo al máximo la estética simple del proyecto original.</p>
                                            <p>Lo unico que agregué fue una linea para mostrar el resultado diferente a la linea de escritura de funciones.</p>
                                        </div>
                                        <div id="popup-close-button" className="button">
                                            <button onClick={() => close()}>Cerrar</button>
                                        </div>
                                    </div>
                                )}
                        </Popup>
                    </td>
                </tr>

            </tbody>
        </table>

    </>
  );
}