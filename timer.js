// Countdown Timer
const countdown = () => {
  const targetDate = new Date("March 27, 2025 00:00:00").getTime();
  const timer = document.getElementById("timer");

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      timer.innerHTML = "Sale Live!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const interval = setInterval(updateTimer, 1000);
  updateTimer(); // Initial call to avoid delay
};
