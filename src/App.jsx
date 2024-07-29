// Import necessary dependencies
import { useState } from "react"; // useState is a React hook for managing state
import "./App.css"; // Import custom CSS for styling
import axios from "axios"; // axios is used for making HTTP requests
import ReactMarkdown from "react-markdown"; // ReactMarkdown is used for rendering Markdown content

function App() {
  // Declare state variables
  const [name, setName] = useState(""); // State for storing the user's name
  const [age, setAge] = useState(""); // State for storing the user's age
  const [sex, setSex] = useState(""); // State for storing the user's sex
  const [bpm, setBpm] = useState(""); // State for storing the user's input BPM
  const [answer, setAnswer] = useState(""); // State for storing the generated answer
  const [generatingAnswer, setGeneratingAnswer] = useState(false); // State for indicating if the answer is being generated

  // Asynchronous function to predict health
  async function predictHealth(e) {
    setGeneratingAnswer(true); // Set generatingAnswer to true to indicate loading state
    e.preventDefault(); // Prevent default form submission behavior
    setAnswer("Loading your answer... \n It might take up to 10 seconds"); // Set initial loading message

    try {
      // Make an API request using axios
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDtP6S5UpWlXA34PFEUjIOWzkDH7QPBdm8", // API endpoint
        method: "post", // HTTP method
        data: {
          contents: [{ parts: [{ text: `My name is ${name}, I am ${age} years old, my sex is ${sex}, and my BPM is ${bpm}. Tell me if my BPM is normal or abnormal as per my age. and if its abnormal suggest recoveries in 3-4 lines` }] }], // Payload containing the user's details
        },
      });

      // Extract and set the generated answer from the response
      setAnswer(
        response.data.candidates[0].content.parts[0].text
      );
    } catch (error) {
      console.log(error); // Log any error to the console
      setAnswer("Sorry - Something went wrong. Please try again!"); // Set error message
    }

    setGeneratingAnswer(false); // Set generatingAnswer to false to end loading state
  }

  return (
    <div className="app-container bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-3 flex flex-col justify-center items-center">
      {/* Container for the form */}
      <form
        onSubmit={predictHealth}
        className="form-container w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg shadow-lg bg-white py-6 px-4 transition-all duration-500 transform hover:scale-105"
      >
        {/* Link to GitHub profile */}
        <a
          href="https://github.com/sandeepsaha522"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className="text-4xl font-bold text-blue-500 mb-4 animate-bounce">
            Health Predictor
          </h1>
        </a>
        {/* Input for user name */}
        <input
          required
          type="text"
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state on change
          placeholder="Enter your name"
        />
        {/* Input for user age */}
        <input
          required
          type="number"
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)} // Update age state on change
          placeholder="Enter your age"
        />
        {/* Input for user sex */}
        <input
          required
          type="text"
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
          value={sex}
          onChange={(e) => setSex(e.target.value)} // Update sex state on change
          placeholder="Enter your sex"
        />
        {/* Input for user BPM */}
        <input
          required
          type="number"
          className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
          value={bpm}
          onChange={(e) => setBpm(e.target.value)} // Update bpm state on change
          placeholder="Enter your BPM"
        />
        {/* Submit button */}
        <button
          type="submit"
          className={`bg-blue-500 text-white p-3 mt-4 rounded-md hover:bg-blue-600 transition-all duration-300 ${
            generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={generatingAnswer} // Disable button when generating answer
        >
          Predict
        </button>
      </form>
      {/* Container for displaying the answer */}
      <div className="answer-container w-full md:w-2/3 lg:w-1/2 xl:w-1/3 text-center rounded-lg bg-white my-4 shadow-lg transition-all duration-500 transform hover:scale-105">
        <ReactMarkdown className="p-4">{answer}</ReactMarkdown> {/* Render the answer using ReactMarkdown */}
      </div>
    </div>
  );
}

export default App; // Export the App component as the default export
