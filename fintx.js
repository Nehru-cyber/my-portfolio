// Fintx Bot Implementation
class FintxBot {
  constructor() {
    this.messages = [
      "Hi! I'm Fintx, your friendly assistant 👋",
      "Need help exploring the portfolio? 🚀",
      "Feel free to reach out! 💬",
      "Let's chat about projects! 💡"
    ];
    this.init();
  }

  init() {
    // Create bot element
    const bot = document.createElement('div');
    bot.className = 'fintx-bot';
    bot.innerHTML = `
      <i class="fas fa-robot fintx-icon"></i>
      <div class="fintx-message">${this.getRandomMessage()}</div>
    `;

    // Append bot to body
    document.body.appendChild(bot);

    // Add click handler
    bot.addEventListener('click', () => {
      this.updateMessage(bot);
    });

    // Update message periodically
    setInterval(() => {
      this.updateMessage(bot);
    }, 5000);
  }

  getRandomMessage() {
    return this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  updateMessage(bot) {
    const messageEl = bot.querySelector('.fintx-message');
    messageEl.style.opacity = '0';
    
    setTimeout(() => {
      messageEl.textContent = this.getRandomMessage();
      messageEl.style.opacity = '1';
    }, 300);
  }
}

// Initialize bot when document is ready
document.addEventListener('DOMContentLoaded', () => {
  new FintxBot();
});