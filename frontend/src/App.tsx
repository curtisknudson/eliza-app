import { useState } from "react";
import { ElizaConnectAdapter } from "./adapters/elizaConnectAdapter";
import { ElizaMediator } from "./mediators/elizaMediator";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessage] = useState<
    { fromMe: boolean; message: string }[]
  >([]);
  const adapter = new ElizaConnectAdapter();
  const mediator = new ElizaMediator(adapter);

  return (
    <div className="container">
      <ol>
        {messages.map((msg, index) => (
          <li key={index}>
            {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
          </li>
        ))}
      </ol>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setInputValue("");
          setMessage((prev) => [
            ...prev,
            {
              fromMe: true,
              message: inputValue,
            },
          ]);
          const response = await mediator.talkToEliza(inputValue);
          setMessage((prev) => [
            ...prev,
            {
              fromMe: false,
              message: response.sentence,
            },
          ]);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
