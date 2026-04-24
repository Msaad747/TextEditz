import React from "react";
import { useState } from "react";

export default function Main(props) {
  const [text, setText] = useState("");
  // count characters by splitting the text into an array of characters, filtering out spaces, and getting the length of the resulting array
  let Chars = text
    .split(/\s+/)
    .map((chac) => {
      if (chac === " ") {
        return null;
      }
      return chac;
    })
    .join("").length;
  // count words by splitting the text by spaces and filtering out empty strings
  let Words = text.split(/\s+/).filter((word) => {
    return word.length > 0;
  }).length;
  // function to convert text to upper case and update the state with the new text
  const toUpperCase = () => {
    let newtext = text.trim().toUpperCase();
    setText(newtext);
  };
  // function to convert text to lower case and update the state with the new text
  const toLowerCase = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
  };
  // function to clear the text area by setting the state to an empty string
  const Clear = () => {
    setText("");
  };
  // function to copy the text from the textarea to the clipboard using the Clipboard API
  const Copy = () => {
    let txt = document.getElementById("exampleFormControlTextarea1").value;
    navigator.clipboard.writeText(txt);
  };
  // function to convert the first letter of each word to uppercase and the rest to lowercase, then update the state with the new text
  const ProperCase = () => {
    setText(
      text
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" "),
    );
  };
  // function to handle tab key press and insert 5 spaces instead of moving focus
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 5 spaces at cursor position
      const newText = text.substring(0, start) + "     " + text.substring(end);
      setText(newText);

      // Move cursor to after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 5;
      }, 0);
    }
  };
  // function to convert text to morse code by mapping each character to its corresponding morse code representation and joining the resulting array with spaces
  const morseCode = () => {
    if (!/^[a-zA-Z0-9\s]+$/.test(text)) {
      alert(
        "Please enter valid text consisting of letters, numbers, and spaces only.",
      );
      return;
    }
    const morseMap = {
      A: ".-",
      B: "-...",
      C: "-.-.",
      D: "-..",
      E: ".",
      F: "..-.",
      G: "--.",
      H: "....",
      I: "..",
      J: ".---",
      K: "-.-",
      L: ".-..",
      M: "--",
      N: "-.",
      O: "---",
      P: ".--.",
      Q: "--.-",
      R: ".-.",
      S: "...",
      T: "-",
      U: "..-",
      V: "...-",
      W: ".--",
      X: "-..-",
      Y: "-.--",
      Z: "--..",
      0: "-----",
      1: ".----",
      2: "..---",
      3: "...--",
      4: "....-",
      5: ".....",
      6: "-....",
      7: "--...",
      8: "---..",
      9: "----.",
    };
    const morseText = text
      .toUpperCase()
      .split("")
      .map((char) => morseMap[char] || char)
      .join(" ");
    setText(morseText);
  };
  // function to convert morse code to text by splitting the input into words and mapping each morse code sequence to its corresponding character using the morseMap, then joining the resulting array with spaces
  const textFromMorse = () => {
    if (!/^[.\-\s]+$/.test(text)) {
      alert(
        "Please enter valid Morse code consisting of dots, dashes, and spaces only.",
      );
      return;
    }
    const morseMap = {
      ".-": "A",
      "-...": "B",
      "-.-.": "C",
      "-..": "D",
      ".": "E",
      "..-.": "F",
      "--.": "G",
      "....": "H",
      "..": "I",
      ".---": "J",
      "-.-": "K",
      ".-..": "L",
      "--": "M",
      "-.": "N",
      "---": "O",
      ".--.": "P",
      "--.-": "Q",
      ".-.": "R",
      "...": "S",
      "-": "T",
      "..-": "U",
      "...-": "V",
      ".--": "W",
      "-..-": "X",
      "-.--": "Y",
      "--..": "Z",
      "-----": "0",
      ".----": "1",
      "..---": "2",
      "...--": "3",
      "....-": "4",
      ".....": "5",
      "-....": "6",
      "--...": "7",
      "---..": "8",
      "----.": "9",
    };
    const newtext = text
      .trim()
      .split("   ")
      .map((words) =>
        words
          .split(" ")
          .map((char) => morseMap[char] || char)
          .join(""),
      )
      .join(" ");
    setText(newtext);
  };
  return (
    <>
      <div
        className={`container my-3 ${props.style.backgroundColor === "light" ? "bg-light" : "bg-dark"} ${props.style.color === "light" ? "text-light" : "text-dark"}`}
      >
        <h1 style={{ fontFamily: "Times New Roman", fontSize: 50 }}>
          {`${props.Title} - A Text Manipulation Tool`}
        </h1>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1" className="mx-2 mb-2">
            <i>Enter Text Below</i>
          </label>
          <textarea
            className={`form-control ${props.style.backgroundColor === "light" ? "bg-light" : "bg-rgb(43, 86, 126)"} text-dark`}
            id="exampleFormControlTextarea1"
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <button
          onClick={toUpperCase}
          type="button"
          className="btn btn-primary mx-2 my-3"
        >
          To Upper Case
        </button>
        <button
          onClick={toLowerCase}
          type="button"
          className="btn btn-primary mx-2 my-3"
        >
          To Lower Case
        </button>
        <button
          onClick={ProperCase}
          type="button"
          className="btn btn-primary mx-2 my-3"
        >
          Proper Case
        </button>
        <button
          onClick={Copy}
          type="button"
          className="btn btn-primary mx-2 my-3"
        >
          Copy
        </button>
        <button
          onClick={Clear}
          type="button"
          className="btn btn-primary mx-2 my-3"
        >
          Clear
        </button>
        <button
          onClick={morseCode}
          type="button"
          className="btn btn-primary mx-2 my-3"
        >
          To Morse Code
        </button>
        <button
          onClick={textFromMorse}
          type="button"
          className="btn btn-primary mx-2 my-3"
        >
          Morse to Text
        </button>
      </div>
      <div
        className={`container my-3 ${props.style.backgroundColor === "light" ? "bg-light" : "bg-dark"} ${props.style.color === "light" ? "text-light" : "text-dark"}`}
      >
        <h2 style={{ fontFamily: "Times New Roman", fontSize: 50 }}>
          {" "}
          Text Summary
        </h2>
        <p className="mx-2 my-2">{`${Chars} characters and ${Words} Words`}</p>
        <h3
          className=" my-3 mx-1"
          style={{ fontFamily: "Times New Roman", fontSize: 50 }}
        >
          Preview
        </h3>
        <div className="constainer ">
          <p
            className="mx-3 mt-4"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              fontFamily: "monospace",
            }}
          >
            {text.length > 0 || text.startsWith("")
              ? text
              : "Your preview will appear here..."}
          </p>
        </div>
      </div>
    </>
  );
}
