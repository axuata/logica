// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

type LogLevel = 'log' | 'debug' | 'info' | 'warn' | 'error';
type Theme = 'primary' | 'secondary';

export class Logger {
  private message: string[] = [];

  /**
   * Adds a message to the log.
   *
   * @param {string} message - The **message** to be added to the log.
   * @returns {this} The current instance, enabling method chaining.
   */
  addMessage(message: string): this {
    this.message.push(message);

    return this;
  }

  /**
   * Adds a status label to the log with a specific theme.
   *
   * @param {LogLevel} level - The **log level**.
   * @param {Theme} theme - The **theme** of the label.
   * @returns {this} The current instance, enabling method chaining.
   */
  addStatus(level: LogLevel, theme: Theme): this {
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

    this.message.push(result, style);

    return this;
  }

  /**
   * Adds the stack trace of an error to the log.
   *
   * @param {Error} error - The **error** object containing the stack trace.
   * @returns {this} The current instance, enabling method chaining.
   */
  addStackTrace(error: Error): this {
    this.message.push(error.stack ?? "[(Logica Error) No stack trace available]");

    return this;
  }

  /**
   * Adds a timestamp to the log with the specified format.
   *
   * @param {string} format - The **format** string for the timestamp.
   */
  addTimestamp(format: string): this {
    const date = new Date();

    const result: string = format
        .replaceAll('[Y]', date.getFullYear().toString())
        .replaceAll('[uY]', date.getUTCFullYear().toString())
        .replaceAll('[M]', (date.getMonth() + 1).toString())
        .replaceAll('[uM]', (date.getUTCMonth() + 1).toString())
        .replaceAll('[MM]', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replaceAll('[uMM]', (date.getUTCMonth() + 1).toString().padStart(2, '0'))
        .replaceAll('[MMM]', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()])
        .replaceAll('[MMMM]', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()])
        .replaceAll('[uMMM]', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getUTCMonth()])
        .replaceAll('[uMMMM]', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getUTCMonth()])
        .replaceAll('[D]', date.getDate().toString())
        .replaceAll('[uD]', date.getUTCDate().toString())
        .replaceAll('[DD]', date.getDate().toString().padStart(2, '0'))
        .replaceAll('[uDD]', date.getUTCDate().toString().padStart(2, '0'))
        .replaceAll('[DDD]', (date.getDate()).toString() + ['st', 'nd', 'rd', 'th'][(date.getDate() % 10 > 3 || [11, 12, 13].indexOf(date.getDate()) !== -1) ? 3 : (date.getDate() % 10) - 1])
        .replaceAll('[uDDD]', (date.getUTCDate()).toString() + ['st', 'nd', 'rd', 'th'][(date.getUTCDate() % 10 > 3 || [11, 12, 13].indexOf(date.getUTCDate()) !== -1) ? 3 : (date.getUTCDate() % 10) - 1])
        .replaceAll('[h]', date.getHours().toString())
        .replaceAll('[uh]', date.getUTCHours().toString())
        .replaceAll('[hh]', date.getHours().toString().padStart(2, '0'))
        .replaceAll('[uhh]', date.getUTCHours().toString().padStart(2, '0'))
        .replaceAll('[m]', date.getMinutes().toString())
        .replaceAll('[um]', date.getUTCMinutes().toString())
        .replaceAll('[mm]', date.getMinutes().toString().padStart(2, '0'))
        .replaceAll('[umm]', date.getUTCMinutes().toString().padStart(2, '0'))
        .replaceAll('[s]', date.getSeconds().toString())
        .replaceAll('[us]', date.getUTCSeconds().toString())
        .replaceAll('[ss]', date.getSeconds().toString().padStart(2, '0'))
        .replaceAll('[uss]', date.getUTCSeconds().toString().padStart(2, '0'))
        .replaceAll('[l]', date.getMilliseconds().toString())
        .replaceAll('[ul]', date.getUTCMilliseconds().toString())
        .replaceAll('[ll]', date.getMilliseconds().toString().padStart(3, '0'))
        .replaceAll('[ull]', date.getUTCMilliseconds().toString().padStart(3, '0'))
        .replaceAll('[w]', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()])
        .replaceAll('[uw]', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getUTCDay()])
        .replaceAll('[ww]', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()])
        .replaceAll('[uww]', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getUTCDay()])
        .replaceAll('[timezoneOffsetHours]', `${-(date.getTimezoneOffset() / 60) >= 0 ? '+' : ''}${-(date.getTimezoneOffset() / 60)}`)
        .replaceAll('[timezoneOffsetMinutes]', `${-(date.getTimezoneOffset()) >= 0 ? '+' : ''}${-(date.getTimezoneOffset())}`)
        .replaceAll('[iso8601]', date.toISOString());

    this.message.push(result);

    return this;
  }

  /**
   * Adds an affix to the log message.
   *
   * @param {string} affix - The **affix** to add to the log message.
   * @returns {this} The current instance, enabling method chaining.
   */
  addAffix(affix: string): this {
    this.message.push(affix);

    return this;
  }

  /**
   * Adds an environment label to the log message.
   *
   * @param {'development' | 'production'} env - The **environment** label to add to the log message.
   * @returns {this} The current instance, enabling method chaining.
   */
  addEnvironment(env: 'development' | 'production'): this {
    this.message.push(`[${env.toUpperCase()}]`);

    return this;
  }

  /**
   * Adds a progress bar to the log.
   *
   * @param {number} percent - The **current progress** as a **percentage** (0-100).
   * @returns {this} The current instance, enabling method chaining.
   */
  addProgressBar(percent: number): this {
    const roundedPercent: number = Math.round(percent / 5) * 5;
    const barYesPerLength: number = roundedPercent / 5;
    const barNoPerLength: number = 20 - barYesPerLength;
    let result: string = '[';

    for (let i: number = 0; i < barYesPerLength; i++) {
      result += '#';
    }

    for (let i: number = 0; i < barNoPerLength; i++) {
      result += ' ';
    }

    const percentString: string = `${percent}%`

    result += `| ${percentString.padEnd(5)}]`;

    this.message.push(result);

    return this;
  }

  /**
   * Adds indentation to the log message.
   *
   * @param {number} depth - The **number of indentation levels** to apply (each level adds 2 spaces).
   * @returns {this} The current instance, enabling method chaining.
   */
  addIndentation(depth: number): this {
    let result: string = '';

    for (let i: number = 0; i < depth; i++) {
      result += '  ';
    }

    this.message.push(result);

    return this;
  }

  /**
   * Adds a divider to the log message.
   *
   * @returns {this} The current instance, enabling method chaining.
   */
  addDivider(): this {
    this.message.push('|');

    return this;
  }

  /**
   * @deprecated This function has been moved to the `Utils` class. Please use `startGroup` from the `Utils` class instead. This function will be removed in the next major version.
   */
  startGroup(label: string): this {
    console.group(label);

    return this;
  }

  /**
   * @deprecated This function has been moved to the `Utils` class. Please use `startGroup` from the `Utils` class instead. This function will be removed in the next major version.
   */
  endGroup(): this {
    console.groupEnd();

    return this;
  }

  /**
   * Outputs the logged messages to the console.
   *
   * @param {LogLevel} level - The **log level**.
   */
  out(level: LogLevel): void {
    (console[level] ?? console.log)(...this.message);

    this.message = [];
  }
}