// import React, { useState } from "react";
// import "./main.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// const Main = () => {
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");

//   const handleAsk = async () => {
//     const data = { questions: question };

//     try {
//       const response = await fetch("http://3.110.217.220:8080/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const responseData = await response.json();
//       setResponse(responseData.response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="head-sec">
//           <h2>Ask the Legal Advisor</h2>
//         </div>
       
//           <div className="response">
//             <p>{question}</p>
//             <p>{response}</p>
//           </div>
      
//         <div className="question-sec">
//           <textarea
//             type="text"
//             id="question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter Question Here"
//             required
//           ></textarea>
//           <div className="main-btn" onClick={handleAsk}>
//             {/* <FontAwesomeIcon  icon={faStop} />  */}
//             <FontAwesomeIcon icon={faArrowUp} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Main;




// import React, { useState } from "react";
// import "./main.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// const Main = () => {
//   const [question, setQuestion] = useState("");
//   const [response, setResponse] = useState("");

//   const handleAsk = async () => {
//     const data = { questions: question };

//     try {
//       const response = await fetch("http://3.110.217.220:8080/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const responseData = await response.json();
//       setResponse(responseData.response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="head-sec">
//           <h2>Ask the Legal Advisor</h2>
//         </div>
       
//           <div className="response">
//             <p>{question}</p>
//             {response.split('\n').map((line, index) => (
//               <p key={index}>{line}</p>
//             ))}
//           </div>
      
//         <div className="question-sec">
//           <textarea
//             type="text"
//             id="question"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Enter Question Here"
//             required
//           ></textarea>
//           <div className="main-btn" onClick={handleAsk}>
//             <FontAwesomeIcon icon={faArrowUp} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Main;



import React, { useState } from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSpinner  } from "@fortawesome/free-solid-svg-icons"


const Main = () => {
  const [question, setQuestion] = useState("");
  const [responseList, setResponseList] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleAsk = async () => {
    const data = { questions: question };
     setLoading(true);  
    
    try {
      const response = await fetch("http://3.110.108.211:8080/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setResponseList((prevList) => [
        ...prevList,
        { question, response: responseData.response },
      ]);
      setQuestion("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
     
    }
  };

  return (
    <>
      <div className="container">
        <div className="head-sec">
          <h2>Legal Advisor</h2>
        </div>

        <div className="response">
          {responseList.map((item, index) => (
            <div key={index} className="response-item">
              <p>Q{index + 1}: {item.question}</p>
              {item.response.split('\n').map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="question-sec">
          <textarea
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter Question Here"
            required
          ></textarea>
          <div className="main-btn" onClick={handleAsk}>
            <FontAwesomeIcon icon={loading ? faSpinner : faArrowUp} spin={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
