import React from "react";
import { ListGroup } from "react-bootstrap";

import { useConversations } from "../contexts/ConversationsProvider";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          <div className="border-bottom py-1">
            {conversation.recipients.map((r) => r.name).join(", ")}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
