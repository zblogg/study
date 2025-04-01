let container: HTMLDivElement | null = null;
export const Logger = {
  log(message: string) {
    if (!container) {
      container = document.createElement("div");
      container.className = "logger-container";
      document.body.appendChild(container);
    }
    const item = document.createElement("p");
    item.textContent = message;
    container.appendChild(item);
  },
  clear() {
    if (container) {
      container.innerHTML = "";
    }
  },
};
