// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

import {Logger} from "../src";
import {describe, test, vi, expect} from "vitest";

describe('Logger', () => {
  const logger = new Logger();

  test('Logging with a message', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addMessage('Hello World').out('log');

    expect(consoleSpy).toHaveBeenCalledWith('Hello World');

    consoleSpy.mockRestore();
  });

  test('Logging with a status', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addStatus('info', 'primary').addMessage('Hello World').out('log');

    expect(consoleSpy).toHaveBeenCalledWith('%c INFO ', 'background: #3498db; color: #ffffff', 'Hello World');

    consoleSpy.mockRestore();
  });

  test('Logging with a error stacktrace and a status', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const error = new Error('Test Error');

    logger.addStackTrace(error).out('log');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Test Error'));

    consoleSpy.mockRestore();
  });

  test('Logging with a status with an formatted timestamp', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const format: string = '[Y]-[MM]-[DD] [hh]:[mm]:[ss] (UTC[timezoneOffsetHours])';

    logger.addTimestamp(format).out('log');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('2025'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('(UTC'));

    consoleSpy.mockRestore();
  });

  test('Logging with an affix', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addAffix('⚡').out('log');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching('⚡'));

    consoleSpy.mockRestore();
  });

  test('Logging with an environment', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addEnvironment('development').out('log');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching('[DEVELOPMENT]'));

    consoleSpy.mockRestore();
  });

  test('Logging with a progress bar', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const testArray: number[] = [1, 5, 7, 10, 50, 51, 52, 53, 54, 55, 56, 80, 89, 90, 100];

    testArray.forEach((number) => {
      logger.addProgressBar(number).out('log');
    });

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[####################| 100% ]'));

    consoleSpy.mockRestore();
  });

  test('Logging with indents', () => {
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addIndentation(3).out('log');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching('      '));

    consoleSpy.mockRestore();
  });
});