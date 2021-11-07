const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text, sender, time }) => {
    recipients.forEach((recipient) => {
      /**
       * khi gửi cho reci nào thì danh sách recipients gửi kèm cần loại người đó ra
       * và thêm vào reci của sender
       * ví dụ: trang -> {phuc, uyen}
       *        phuc sẽ nhận đc {trang, uyên}
       */
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);

      socket.broadcast.to(recipient).emit("receive-messate", {
        recipients: newRecipients,
        sender,
        text,
        time,
      });
    });
  });
});
