import { useContext, useEffect, useRef, useState } from "react";
import { db, doChatMessage } from "../../scripts/firebase";
import { onValue, ref } from "firebase/database";
import { userContext } from "../../scripts/contexts";
import Message from "./components/Message";
import RemedyItem from "../SavedRemedies/components/RemedyItem";
import { Remedy } from "../../scripts/types";

type MessagesContainer = {
  message: {
    role: string;
    content: string;
  };
  timeStamp: string;
};
const regex = /{[a-zA-Z0-9]+}/gm;

function Chat() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessagesContainer[]>([]);
  const [remedies, setRemedies] = useState<Map<string, Remedy>>(
    new Map<string, Remedy>(),
  );
  const { user } = useContext(userContext);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log("On profile page");
    if (user !== null) {
      onValue(ref(db, `remedies/`), (snapshot) => {
        console.log("inside remedies");
        const data = snapshot.val();
        const allRemedies = new Map<string, Remedy>();
        for (const entry in data) {
          allRemedies.set(entry, data[entry]);
        }
        console.log(data);
        setRemedies(allRemedies);
      });
      console.log(user.uid);
      onValue(ref(db, `users/${user.uid}/chatHistory`), (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          setMessages(Object.values(data));
        }
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className=" overflow-auto flex flex-col-reverse h-[100%]">
        <div className=" mb-40 mt-auto">
          {messages.length !== 0 ? (
            messages.map((message, index) => {
              let m;
              const matches : string[] = [];
              let content = message.message.content;
              while ((m = regex.exec(message.message.content)) !== null) {
                  // This is necessary to avoid infinite loops with zero-width matches
                  if (m.index === regex.lastIndex) {
                      regex.lastIndex++;
                  }
                  
                  // The result can be accessed through the `m`-variable.
                  m.forEach((match) => {
                      // console.log(`Found match, group ${groupIndex}: ${match}`);
                      content= content.replace(match,"")
                      matches.push(match.slice(1,-1))
                  });
              }
              console.log(matches)

              return (
                <>
                <Message
                  key={"message" + index}
                  timeStamp={message.timeStamp}
                  content={content}
                  role={message.message.role}
                />
                {matches.map((remedyId)=>{
                  return (
                    <div className="w-[65%] ml-16">
                      <RemedyItem remedyData={remedies.get(remedyId)}/>
                    </div>
                  )
                })}
                </>
              );
            })
          ) : (
            <h2 className="p-3">
              Send a message to begin talking with your personalized Assistant!
            </h2>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="fixed bottom-[10%] w-screen">
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 w-[90%] mx-auto">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="chat"
            rows={1}
            className="block mr-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
          <button
            onClick={() => {
              setMessage("");
              setMessages((messages) => {
                return [
                  ...messages,
                  {
                    message: {
                      role: "user",
                      content: message,
                    },
                    timeStamp: new Date().toISOString(),
                  },
                ];
              });
              doChatMessage({ message: message });
            }}
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
