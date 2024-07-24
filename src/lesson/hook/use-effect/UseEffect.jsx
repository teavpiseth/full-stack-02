import { useEffect, useState } from "react";
import ReadMore from "./ReadMore";
import { Modal } from "antd";

export default function UseEffect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    console.log("parent mounted");
  }, []);
  return (
    <div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        closeIcon={<>Close</>}
        width={1000}
        onCancel={() => setIsModalOpen(false)}
        // afterClose={() => alert("Modal just closed!")}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      sample sample sample sample sample sample sample sample sample sample
      sample sample sample sample sample sample sample sample sample sample
      sample sample sample sample sample sample sample sample sample sample
      sample sample sample sample sample sample sample sample sample sample
      sample sample sample sample sample sample sample sample sample sample
      sample sample sample sample sample sample sample sample sample sample
      sample sample sample
      <button onClick={() => setIsReadMore(!isReadMore)}>
        {isReadMore ? "close Read More" : "open Read More"}
      </button>
      {isReadMore && <ReadMore />}
    </div>
  );
}
