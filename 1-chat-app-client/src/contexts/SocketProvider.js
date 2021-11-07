import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);

    /**
     * clean up function để dọn kết nối socket
     * nếu ko nó vẫn giữ kết nối, dẫn đến duplicate tin nhắn
     */
    return () => newSocket.close();
  }, [id]);

  //TODO tạo hàm send message trong file này để dễ quản lý

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
