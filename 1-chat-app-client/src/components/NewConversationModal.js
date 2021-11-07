import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";

import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  }

  function handelCheckboxChange(contactId) {
    setSelectedContactIds((prevState) => {
      if (prevState.includes(contactId)) {
        prevState = prevState.filter((id) => id !== contactId);
      } else {
        prevState = [...prevState, contactId];
      }
      return prevState;
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                onChange={() => handelCheckboxChange(contact.id)}
                label={contact.name}
              />
            </Form.Group>
          ))}
          <Button className="mt-4 ml-auto" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
