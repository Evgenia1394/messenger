export class EventBus {
  private readonly listeners: Record<string, Array<(oldProps?: any, newProps?: any) => void>> = {};

  on(event: string, callback: (oldProps?: any, newProps?: any,) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (oldProps?: any, newProps?: any,) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      // throw new Error(`Нет события: ${event}`);
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
