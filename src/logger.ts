// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

type LogLevel = 'log' | 'debug' | 'info' | 'warn' | 'error';
type Theme = 'primary' | 'secondary';
type Position = 'before' | 'after';

export class Logger {
  private message: string[] = [];

  /**
   * Adds a message to the log with a specific position.
   *
   * @param {string} message - The message to be added to the log.
   * @param {Position} position - The position where the message should be added.
   * @return {this} The current instance of the Logger class.
   */
  addMessage(message: string, position: Position): this {
    if (position === 'before') {
      this.message.unshift(message);
    } else {
      this.message.push(message);
    }

    return this;
  }

  /**
   * Adds a status label to the log with a specific style.
   *
   * @param {LogLevel} level - The log level (log, debug, info, warn, error).
   * @param {Theme} theme - The theme of the label ('primary' or 'secondary').
   * @param {Position} position - The position of the label ('before' or 'after' the message).
   */
  addStatus(level: LogLevel, theme: Theme, position: Position): this {
    const colors: Record<LogLevel, string[]> = {
      log: ['#7f8c8d', '#ffffff'],
      debug: ['#f39c12', '#ffffff'],
      info: ['#3498db', '#ffffff'],
      warn: ['#f39c12', '#ffffff'],
      error: ['#c0392b', '#ffffff'],
    }

    const backgroundColor: string = colors[level][0];
    const textColor: string = colors[level][1];

    const style: string = theme === 'primary'
        ? `background: ${backgroundColor}; color: ${textColor}`
        : `color: ${backgroundColor}`;

    const result: string = `%c ${level.toUpperCase()} `;

    if (position === 'before') {
      this.message.unshift(result, style);
    } else {
      this.message.push(result, style);
    }

    return this;
  }

  /**
   * Outputs the logged messages to the console.
   *
   * @param {LogLevel} level - The log level (currently unused, but can be expanded for filtering).
   */
  out(level: LogLevel): void {
    switch (level) {
      case 'log':
        console.log(...this.message);
        break;
      case 'debug':
        console.debug(...this.message);
        break;
      case 'info':
        console.info(...this.message);
        break;
      case 'warn':
        console.warn(...this.message);
        break;
      case 'error':
        console.error(...this.message);
        break;
      default:
        console.log(...this.message);
        break;
    }

    this.message = [];
  }
}