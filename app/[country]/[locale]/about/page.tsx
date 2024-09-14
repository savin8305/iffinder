"use client"
import React, { useState } from "react";
import isValidISOCode from "../hooks/isValidIso";

const ISOCodeChecker = () => {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleCheck = () => {
    const result = isValidISOCode(input);
    setIsValid(result);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ISO Country Code Validator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded-lg focus:outline-none"
        placeholder="Enter ISO code (e.g., US, USA)"
      />
      <button
        onClick={handleCheck}
        className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
      >
        Check
      </button>
      {isValid !== null && (
        <div className={`mt-4 text-lg ${isValid ? "text-green-500" : "text-red-500"}`}>
          {isValid ? "Valid ISO country code" : "Invalid ISO country code"}
        </div>
      )}
    </div>
  );
};

export default ISOCodeChecker;
