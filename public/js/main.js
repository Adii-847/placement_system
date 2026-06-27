document.addEventListener('DOMContentLoaded', () => {
  
  // Chat logic
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatSuggestions = document.querySelectorAll('.chat-suggestion');

  if (chatMessages && chatInput && chatSend) {
    const scrollToBottom = () => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const addMessage = (text, role) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg ${role} fade-in`;
      
      const avatar = document.createElement('div');
      if (role === 'ai') {
        avatar.className = 'ai-avatar';
        avatar.innerHTML = '<span style="font-size: 14px;">🤖</span>';
      } else {
        avatar.className = 'avatar sm';
        avatar.innerText = 'AS'; // Hardcoded for student
      }

      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble';
      bubble.style.whiteSpace = 'pre-wrap';
      
      // Basic markdown bold parsing
      bubble.innerHTML = text.split('**').map((part, j) => j % 2 === 0 ? part : `<strong>${part}</strong>`).join('');

      msgDiv.appendChild(avatar);
      msgDiv.appendChild(bubble);
      chatMessages.appendChild(msgDiv);
      scrollToBottom();
    };

    const sendMsg = (text) => {
      if (!text.trim()) return;
      addMessage(text, 'user');
      chatInput.value = '';

      // Simulate loading
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'chat-msg ai fade-in';
      loadingDiv.id = 'chat-loading';
      loadingDiv.innerHTML = `
        <div class="ai-avatar"><span style="font-size: 14px;">🤖</span></div>
        <div class="chat-bubble" style="display: flex; gap: 6px; align-items: center;">
          <div style="width: 7px; height: 7px; border-radius: 50%; background: var(--indigo); animation: pulse 1.2s 0s ease-in-out infinite;"></div>
          <div style="width: 7px; height: 7px; border-radius: 50%; background: var(--indigo); animation: pulse 1.2s 0.2s ease-in-out infinite;"></div>
          <div style="width: 7px; height: 7px; border-radius: 50%; background: var(--indigo); animation: pulse 1.2s 0.4s ease-in-out infinite;"></div>
        </div>
      `;
      chatMessages.appendChild(loadingDiv);
      scrollToBottom();

      setTimeout(() => {
        const loading = document.getElementById('chat-loading');
        if (loading) loading.remove();
        
        const lowerText = text.toLowerCase();
        let reply = window.AI_RESPONSES?.default || 'I can help you with that.';
        if (lowerText.includes('resume')) reply = window.AI_RESPONSES?.resume || reply;
        if (lowerText.includes('google')) reply = window.AI_RESPONSES?.google || reply;
        
        addMessage(reply, 'ai');
      }, 1400);
    };

    chatSend.addEventListener('click', () => sendMsg(chatInput.value));
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMsg(chatInput.value);
    });

    chatSuggestions.forEach(btn => {
      btn.addEventListener('click', () => sendMsg(btn.innerText));
    });

    scrollToBottom();
  }

});
