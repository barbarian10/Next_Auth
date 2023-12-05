// SubmitLogic.tsx
import React from "react";

interface SubmitLogicProps {
   disabled:boolean,
   text: string
  }

const SubmitLogic = ({disabled, text}: SubmitLogicProps) => (
    
    <button
      type="submit"
      className="bg-[#27ae60] text-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
       focus:border-gray-600 hover:scale-105 duration-300"
      disabled={disabled}
      style={{ backgroundColor: disabled ? '#b3b3b3' : '#27ae60' }}
    >
      {text}
    </button>
    
  );
  
  export default SubmitLogic;