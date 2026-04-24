import React from "react";
import { useState } from "react";
import { useRef } from "react";

export default function Main(props) {
  const[copied,setCopied]=useState(false);
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

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
    let txt = textareaRef.current.value;
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1110);
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
  const isPureMorse = (word) => /^[.\-\s]+$/.test(word);

  const morseCode = () => {
    if (isPureMorse(text)) {
      return alert("Text is already in Morse Code!");
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

    const result = text
      .split("   ") // 👈 keep Morse word separation intact
      .map((segment) => {
        // if entire segment is already Morse → leave unchanged
        if (isPureMorse(segment)) return segment;

        // otherwise convert text → Morse
        return segment
          .split(" ")
          .map((word) =>
            word
              .toUpperCase()
              .split("")
              .map((char) => morseMap[char] || char)
              .join(" "),
          )
          .join("   ");
      })
      .join("   ");

    setText(result);
  };
  // function to convert morse code to text by splitting the input into words and mapping each morse code sequence to its corresponding character using the morseMap, then joining the resulting array with spaces
  const textFromMorse = () => {
    if (/^[a-zA-Z\s]+$/g.test(text)) {
      return alert("Text is not in Morse Code!");
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

    const result = text
      .split("   ") // 👈 split words (3 spaces)
      .map((segment) => {
        // if NOT morse → keep as it is
        if (!isPureMorse(segment)) return segment;

        // convert morse → text
        return segment
          .split(" ")
          .map((code) => morseMap[code] || "")
          .join("");
      })
      .join(" "); // 👈 normal words join with single space

    setText(result);
  };
  return (
    <>
      <div
        className="container my-3"
        style={{
          backgroundColor: props.style.backgroundColor,
          color: props.style.color,
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <h1 style={{ fontFamily: "Times New Roman", fontSize: 50 }}>
          {`${props.Title} - A Text Manipulation Tool`}
        </h1>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1" className="mx-2 mb-2">
            <i>Enter Text Below</i>
          </label>
          <div className="mt-3">
            <div className="position-relative ">
              <i
                onClick={Copy}
                className="bi bi-clipboard position-absolute top-0 end-0 m-2"
                style={{ cursor: "pointer", zIndex: 10 }}
              >
                {copied && <div className="toast-message">Copied!</div>}
              </i>
              <textarea
                ref={textareaRef}
                className="form-control pe-5 pt-4"
                style={{
                  backgroundColor:
                    props.style.backgroundColor === "#212529"
                      ? "#2b2b2b"
                      : "#ffffff",
                  color: props.style.color,
                }}
                id="exampleFormControlTextarea1"
                rows="8"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
            </div>
          </div>
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
        className="container my-3"
        style={{
          backgroundColor: props.style.backgroundColor,
          color: props.style.color,
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <h2 className="preview-heading">Text Summary</h2>
        <p className="mx-2 my-2">{`${Chars} characters and ${Words} Words`}</p>
        <h3
          className="preview-heading"
          // style={{ fontFamily: "Times New Roman", fontSize: 50 }}
        >
          Preview
        </h3>
        <div className="summary ">
          <p
            className="mx-3 mt-4"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              fontFamily: "monospace",
              color: props.style.color,
            }}
          >
            {text.length > 0 && text.trim() !== ""
              ? text
              : "Your preview will appear here..."}
          </p>
        </div>
      </div>
    </>
  );
}
