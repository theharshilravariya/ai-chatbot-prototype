// Run this only on chat.html (where #send-btn exists)
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

if (sendBtn && userInput && chatBox) {
  function addMessage(text, sender) {
    const p = document.createElement("p");
    p.className = sender === "user" ? "msg-user" : "msg-bot";
    p.textContent = text;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  // Show thinking indicator
  addMessage("Thinking...", "bot");

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    
    // Remove "Thinking..." message
    chatBox.lastChild.remove();
    
    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("Error: No reply from server.", "bot");
    }
  } catch (err) {
    console.error(err);
    chatBox.lastChild.remove();
    addMessage("Error: Could not reach server.", "bot");
  }
}

  sendBtn.addEventListener("click", handleSend);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
}
