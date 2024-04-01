import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(true);
  const [allowSpecialCharacter, setAllowSpecialCharacter] = useState(true);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVUXYZabcdefghijklmnopqrstuvwxyz";
    if (allowNumber) str += "0123456789";
    if (allowSpecialCharacter) str += "`~!@#$%^&*()_-+={[]}*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    console.log("New password generated: ", pass);
  }, [length, allowNumber, allowSpecialCharacter, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
    console.log("Copied the password");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowNumber, allowSpecialCharacter, passwordGenerator]);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center text-white my-3">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2 mb-3">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={allowNumber}
                id="numberInput"
                onChange={() => {
                  setAllowNumber((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
              <input
                type="checkbox"
                defaultChecked={allowSpecialCharacter}
                id="characterInput"
                onChange={() => {
                  setAllowSpecialCharacter((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
