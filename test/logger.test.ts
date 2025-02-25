// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

import {Logger} from "../src";
import {describe, test, vi, expect} from "vitest";

describe('Logger', () => {
  test('ステータス付きのログ', () => {
    const logger = new Logger();
    const consoleSpy = vi.spyOn(console, 'log');

    logger.addMessage('Hello World', 'after').addStatus('info', 'primary', 'before').out('log');

    expect(consoleSpy).toHaveBeenCalledWith("%c INFO ", "background: #3498db; color: #ffffff", "Hello World");
    consoleSpy.mockRestore();
  });
});