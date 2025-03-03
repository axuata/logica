// Copyright (c) 2025 Axuata.
// This code is licensed under the MIT License.
// https://opensource.org/licenses/MIT

import {Utils} from "../src";
import {describe, test, vi, expect} from "vitest";

describe('Utils', () => {
  const utils = new Utils();

  test('Logging with labeled group', () => {
    const consoleSpy = vi.spyOn(console, 'group');

    utils.startGroup('testLabel');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('testLabel'));

    consoleSpy.mockRestore();
  });

  test('Logging with labeled collapsed group', () => {
    const consoleSpy = vi.spyOn(console, 'groupCollapsed');

    utils.startGroupCollapsed('testLabelCollapsed');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('testLabelCollapsed'));

    consoleSpy.mockRestore();
  });

  test('Logging with labeled group end', () => {
    const consoleSpy = vi.spyOn(console, 'groupEnd');

    utils.endGroup();

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});