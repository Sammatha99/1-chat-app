import React, { useState, useRef, useEffect } from "react";

import { Form, InputGroup, Button } from "react-bootstrap";

import { useConversations } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const inputRef = useRef();

  const { sendMessage, selectedConversation } = useConversations();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div
        className="overflow-auto p-2"
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column-reverse",
        }}
      >
        {selectedConversation.messages
          .sort((a, b) => b.time - a.time)
          .map((message, index) => {
            return (
              <div
                key={index}
                className={`d-flex flex-column my-1 ${
                  message.fromMe && "align-items-end"
                }`}
              >
                <div
                  className={`px-3 py-1 rounded ${
                    message.fromMe
                      ? "align-items-end bg-primary text-white"
                      : "mr-auto"
                  }`}
                  style={
                    message.fromMe
                      ? { maxWidth: "70%" }
                      : { backgroundColor: "#d8d8d8", maxWidth: "70%" }
                  }
                >
                  {message.text}
                </div>
                <div className=" text-muted" style={{ fontSize: "10px" }}>
                  {new Date(message.time).toLocaleString()}
                </div>
                <div className="text-muted small">
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              ref={inputRef}
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">SEND</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
