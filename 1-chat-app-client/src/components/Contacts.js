import React from "react";

import { ListGroup } from "react-bootstrap";

import { useContacts } from "../contexts/ContactsProvider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>
          <div className="border-bottom py-1">{contact.name}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
