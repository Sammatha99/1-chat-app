import React, { useContext, useState } from "react";

import useLocalStorage from "../hook/UseLocalStorage";

import { useContacts } from "./ContactsProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const { contacts } = useContacts();
  const [conversations, setConversations] = useLocalStorage(
    "Conversations",
    []
  );
  const [selectConversationIndex, setSelectConversationIndex] = useState(0);

  function createConversation(recipients) {
    setConversations((prevState) => {
      return [...prevState, { recipients, messages: [] }];
    });
  }

  // format lại để lấy đc tên-id của thành viên trong converation
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((reciepient) => {
      const contact = contacts.find((contact) => contact.id === reciepient);

      const name = (contact && contact.name) ?? recipients;
      return { id: reciepient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => contact.id === message.sender);

      const name = (contact && contact.name) ?? message.sender;

      return { ...message, senderName: name, fromMe: id === message.sender };
    });

    const selected = index === selectConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  /**
   * được gọi từ server khi nhận message, và cả khi gọi server gửi message
   */
  function addMessageToConversation({ recipients, text, sender }) {
    /**
     * Kiểm tra có conversation chưa
     * (kiểm tra thông qua recipients có match với danh sách hiện có không)
     * nếu có thì làm bình thường, chỉnh sửa .message []
     * nếu không thì add conversation mới vào
     */
    setConversations((prev) => {
      // biến kiểm tra tồn tại
      let madeChange = false;
      const newMessage = { sender, text, time: Date.now() };
      const newConversations = prev.map((conversation) => {
        console.log(conversation.recipients);
        console.log(recipients);
        if (isArrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [
          ...prev,
          {
            recipients,
            messages: [newMessage],
          },
        ];
      }
    });
  }

  /** gửi message đi */
  function sendMessage(recipients, text) {
    addMessageToConversation({ recipients, text, sender: id });
  }

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectConversationIndex],
    createConversation,
    selectConversationIndex: setSelectConversationIndex,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function isArrayEquality(a1, a2) {
  if (a1.length !== a2.length) return false;
  a1.sort();
  a2.sort();

  return a1.every((element, index) => element === a2[index]);
}
