import React from "react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";

// Morse code maps (outside component to avoid recreation)
const MORSE_TO_CHAR = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E", "..-.": "F",
  "--.": "G", "....": "H", "..": "I", ".---": "J", "-.-": "K", ".-..": "L",
  "--": "M", "-.": "N", "---": "O", ".--.": "P", "--.-": "Q", ".-.": "R",
  "...": "S", "-": "T", "..-": "U", "...-": "V", ".--": "W", "-..-": "X",
  "-.--": "Y", "--..": "Z", "-----": "0", ".----": "1", "..---": "2",
  "...--": "3", "....-": "4", ".....": "5", "-....": "6", "--...": "7",
  "---..": "8", "----.": "9",
};

const CHAR_TO_MORSE = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", 0: "-----", 1: ".----", 2: "..---", 3: "...--",
  4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
};

function Main(props) {
  const colorChangedRef = useRef(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);
  const [textColor, setTextColor] = useState("");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const isResetting = useRef(false);

  // Load from localStorage once on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("editorData"));
    if (saved) {
      setText(saved.text || "");
      setTextColor(saved.textColor || "");
      setFontSize(saved.fontSize || 16);
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (isResetting.current) return;
    localStorage.setItem("editorData", JSON.stringify({
      text, textColor, fontSize,
    }));
  }, [text, textColor, fontSize]);

  const defaultColor = props.style.backgroundColor === "#212529" ? "#ffffff" : "#000000";
  const effectiveColor = textColor !== "" ? textColor : defaultColor;

  // Memoize character and word counts
  const { Chars, Words } = useMemo(() => {
    const chars = text.split(/\s+/).filter(c => c.length > 0).join("").length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    return { Chars: chars, Words: words };
  }, [text]);

  // Memoize callbacks
  const toUpperCase = useCallback(() => {
    setText(text.trim().toUpperCase());
  }, [text]);

  const toLowerCase = useCallback(() => {
    setText(text.toLowerCase());
  }, [text]);

  const Clear = useCallback(() => {
    isResetting.current = true;
    setText("");
    setTextColor("");
    setFontSize(16);
    localStorage.removeItem("editorData");
    setTimeout(() => { isResetting.current = false; }, 0);
  }, []);

  const Copy = useCallback(() => {
    navigator.clipboard.writeText(textareaRef.current?.value || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1110);
  }, []);

  const ProperCase = useCallback(() => {
    setText(
      text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    );
  }, [text]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.substring(0, start) + "     " + text.substring(end);
      setText(newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 5;
      }, 0);
    }
  }, [text]);

  // Sync color with theme
  useEffect(() => {
    if (!colorChangedRef.current) {
      setTextColor(defaultColor);
    }
  }, [defaultColor]);

  const isPureMorse = (word) => /^[.\-\s]+$/.test(word);

  const morseCode = useCallback(() => {
    if (isPureMorse(text)) {
      return alert("Text is already in Morse Code!");
    }
    if (text.length === 0) {
      return alert("Nothing to convert");
    }

    const result = text
      .split("   ")
      .map((segment) => {
        if (isPureMorse(segment)) return segment;
        return segment
          .split(" ")
          .map((word) =>
            word
              .toUpperCase()
              .split("")
              .map((char) => CHAR_TO_MORSE[char] || char)
              .join(" ")
          )
          .join("   ");
      })
      .join("   ");

    setText(result);
  }, [text]);

  const textFromMorse = useCallback(() => {
    if (/^[a-zA-Z\s]+$/g.test(text)) {
      return alert("Text is not in Morse Code!");
    }
    if (text.length === 0) {
      return alert("Nothing to convert");
    }

    const result = text
      .split("   ")
      .map((segment) => {
        if (!isPureMorse(segment)) return segment;
        return segment
          .split(" ")
          .map((code) => MORSE_TO_CHAR[code] || "")
          .join("");
      })
      .join(" ");

    setText(result);
  }, [text]);

  return (
    <>
      <div
        className="container my-1"
        style={{
          backgroundColor: props.style.backgroundColor,
          color: props.style.color,
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <h1 style={{ fontFamily: "Times New Roman", fontSize: 45 }}>
          {`${props.Title} - A Text Manipulation Tool`}
        </h1>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1" className="mx-2 mb-1">
            <i>Enter Text Below</i>
          </label>
          <div className="mt-2">
            <div className="position-relative">
              {/* 🔥 Toolbar */}
              <div
                className="position-absolute top-0 start-0 w-100 d-flex justify-content-between align-items-center px-2"
                style={{
                  zIndex: 10,
                  height: "40px",
                  borderBottom:
                    props.style.backgroundColor === "#212529"
                      ? "1px solid #444"
                      : "1px solid #ccc",
                  backgroundColor:
                    props.style.backgroundColor === "#212529"
                      ? "#2b2b2b"
                      : "#ffffff",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                }}
              >
                {/* 🔹 LEFT SIDE (controls) */}
                <div className="d-flex align-items-center gap-2">
                  {/* Font Size */}
                  <div className="d-flex flex-column align-items-center pt-2 ms-1">
                    <input
                      type="number"
                      className="toolbar-input"
                      min={12}
                      max={82}
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      
                    />
                    <small className="toolbar-label">Size</small>
                  </div>

                  {/* Color Picker */}
                  <div className="d-flex flex-column align-items-center pt-2">
                    <input
                      type="color"
                      className="toolbar-color"
                      value={effectiveColor}
                      onChange={(e) => {
                        setTextColor(e.target.value);
                        colorChangedRef.current = true;
                      }}
                      
                    />
                    <small className="toolbar-label">Color</small>
                  </div>
                </div>

                {/* 🔹 RIGHT SIDE (copy icon) */}
                
                <div style={{ position: "relative" }}>
                  <i
                    onClick={Copy}
                    className="bi bi-clipboard"
                    style={{ cursor: "pointer" }}
                  ></i>

                  {copied && <div className="toast-message">Copied!</div>}
                </div>
              </div>
              <textarea
                ref={textareaRef}
                className="form-control"
                style={{
                  paddingTop: "50px", // 🔥 important (more than toolbar height)

                  backgroundColor:
                    props.style.backgroundColor === "#212529"
                      ? "#2b2b2b"
                      : "#ffffff",

                  color: effectiveColor,
                    
                  fontSize: `${fontSize}px`,
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius:"10px"
                }}
                rows="10"
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
          className="btn btn-primary mx-2 mt-3"
        >
          To Upper Case
        </button>
        <button
          onClick={toLowerCase}
          type="button"
          className="btn btn-primary mx-2 mt-3"
        >
          To Lower Case
        </button>
        <button
          onClick={ProperCase}
          type="button"
          className="btn btn-primary mx-2 mt-3"
        >
          Proper Case
        </button>
        <button
          onClick={Copy}
          type="button"
          className="btn btn-primary mx-2 mt-3"
        >
          Copy
        </button>
        <button
          onClick={Clear}
          type="button"
          className="btn btn-primary mx-2 mt-3"
        >
          Clear
        </button>
        <button
          onClick={morseCode}
          type="button"
          className="btn btn-primary mx-2 mt-3"
        >
          To Morse Code
        </button>
        <button
          onClick={textFromMorse}
          type="button"
          className="btn btn-primary mx-2 mt-3"
        >
          Morse to Text
        </button>
      </div>
      <div
        className="container "
        style={{
          backgroundColor: props.style.backgroundColor,
          color: props.style.color,
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <h2 className="preview-heading">Text Summary</h2>
        <p className="mx-2 my-1">{`${Chars} characters and ${Words} Words`}</p>
        <h3 className="preview-heading">Preview</h3>
        <div className="summary ">
          <p
            className="mx-3 mt-2"
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              fontFamily: "monospace",
              color: effectiveColor,
              fontSize: `${fontSize}px`,
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

export default React.memo(Main);
