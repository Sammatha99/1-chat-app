import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";

import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

import Conversations from "./Conversations";
import Contacts from "./Contacts";

const CONVERSTATIONS_KEY = "conversation";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSTATIONS_KEY);

  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container onSelect={setActiveKey} activeKey={activeKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link
              style={{ cursor: "pointer" }}
              eventKey={CONVERSTATIONS_KEY}
            >
              Conversations
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ cursor: "pointer" }} eventKey={CONTACTS_KEY}>
              Contacts
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSTATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small  ">
          your id: <span className="text-muted  ">{id}</span>
        </div>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
          className="rounded-0"
        >
          New {activeKey === CONVERSTATIONS_KEY ? "conversation" : "contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {activeKey === CONVERSTATIONS_KEY ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
