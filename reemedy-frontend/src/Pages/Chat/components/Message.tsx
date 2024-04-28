type MessageProps = {
  timeStamp: string;
  content: string;
  role: string;
};

function Message({ timeStamp, content, role }: MessageProps) {
  const date = new Date(timeStamp);
  date.setHours(date.getHours() - 7);
  return (
    <div
      className={
        "flex pt-0 pb-[45px] px-5 flex" +
        (role === "user" ? " flex-row-reverse" : "")
      }
    >
      <div className="shrink-0 relative mt-auto -mb-5">
        {role === "user" ? (
          <></>
        ) : (
          <img
            className="h-10 w-10 object-cover rounded-[50%]"
            src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=1857&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        )}
        <div
          className={
            "absolute text-xs font-semibold text-gray-500 whitespace-nowrap left-[calc(100%_+_12px)] bottom-0" +
            (role === "user" ? " left-auto right-[calc(100%_+_12px)]" : "")
          }
        >
          Sent{" "}
          {date.getUTCDate() === new Date().getUTCDate()
            ? date.toLocaleTimeString()
            : date.toLocaleDateString()}
        </div>
      </div>
      <div
        className={
          "max-w-[70%] flex flex-col items-start ml-3" +
          (role === "user" ? " !items-end ml-0 mr-3" : "")
        }
      >
        <div
          className={
            "text-black bg-amber-200 leading-normal text-sm mt-2.5 p-[15px] rounded-[20px_20px_20px_0] font-semibold " +
            (role === "user"
              ? " !bg-green-600 text-white !rounded-[20px_20px_0_20px]"
              : "")
          }
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export default Message;
