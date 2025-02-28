// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

import {Logger} from "../src";
import {describe, test, vi, expect} from "vitest";

describe('Logger', () => {
  test('Logging with a message', () => {
    const logger = new Logger();
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addMessage('Hello World').out('log');

    expect(consoleSpy).toHaveBeenCalledWith('Hello World');
    consoleSpy.mockRestore();
  });

  test('Logging with a status', () => {
    const logger = new Logger();
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addStatus('info', 'primary').addMessage('Hello World').out('log');

    expect(consoleSpy).toHaveBeenCalledWith('%c INFO ', 'background: #3498db; color: #ffffff', 'Hello World');
    consoleSpy.mockRestore();
  });

  test('Logging with a error stacktrace and a status', () => {
    const logger = new Logger();
    const consoleSpy = vi.spyOn(console, 'log');
    const error = new Error('Test Error');

    logger.addStackTrace(error).out('log');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Test Error'));
    consoleSpy.mockRestore();
  });
});