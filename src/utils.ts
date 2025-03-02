// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

export class Utils {
  /**
   * Starts a new log group with the specified label.
   *
   * @param {string} label - The **label** for the log group.
   * @returns {this} The current instance, enabling method chaining.
   */
  startGroup(label: string): this {
    console.group(label);

    return this;
  }

  /**
   * Ends the current log group.
   *
   * @returns {this} The current instance, enabling method chaining.
   */
  endGroup(): this {
    console.groupEnd();

    return this;
  }
}