import {
  BinaryValue,
  Direction,
  Edge,
  Gpio,
  Options,
  ValueCallback,
} from 'onoff';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Usage:
 * ```javascript
 * const GpioFactory = require('./GpioFactory');
 * const Gpio = GpioFactory.create();
 * const button = new Gpio(4, 'out');
 * ```
 */
export class MockGPIO implements Gpio {
  /* eslint-disable no-dupe-class-members */

  _gpio: number;
  _direction: Direction;
  _edge: Edge | undefined;
  _options: Options | undefined;

  // Mock values
  _value: BinaryValue = 0;

  constructor(
    gpio: number,
    direction: Direction,
    edge?: Edge,
    options?: Options,
  ) {
    this._gpio = gpio;
    this._direction = direction;
    this._edge = edge;
    this._options = options || {};
  }

  read(callback: ValueCallback): void;
  read(): Promise<BinaryValue>;
  read(callback?: ValueCallback): Promise<BinaryValue> | void {
    return new Promise((resolve) => {
      if (callback !== undefined) {
        callback(null, this._value);
      }
      return resolve(this._value);
    });
  }

  readSync(): BinaryValue {
    return this._value;
  }

  write(
    value: BinaryValue,
    callback: (err: Error | null | undefined) => void,
  ): void;
  write(value: BinaryValue): Promise<void>;
  write(
    value: BinaryValue,
    callback?: (err: Error | null | undefined) => void,
  ): Promise<void> {
    return new Promise((resolve) => {
      this._value = value;
      if (callback !== undefined) {
        callback(null);
      }
      return resolve();
    });
  }

  writeSync(value: BinaryValue): void {
    console.debug(`GpioMock - Pin: ${this._gpio}, Value: ${value}`);
    this._value = value;
  }

  watch(callback: ValueCallback): void {
    throw new Error('Method not implemented.');
  }
  unwatch(callback?: ValueCallback): void {
    throw new Error('Method not implemented.');
  }
  unwatchAll(): void {
    throw new Error('Method not implemented.');
  }

  direction(): Direction {
    throw new Error('Method not implemented.');
  }
  setDirection(direction: Direction): void {
    throw new Error('Method not implemented.');
  }

  edge(): Edge {
    throw new Error('Method not implemented.');
  }
  setEdge(edge: Edge): void {
    throw new Error('Method not implemented.');
  }

  activeLow(): boolean {
    throw new Error('Method not implemented.');
  }
  setActiveLow(invert: boolean): void {
    throw new Error('Method not implemented.');
  }

  unexport(): void {
    // No need to do anything (no fs resources to release in mock mode)
  }
}

export function create(): Gpio | any {
    if (Gpio.accessible) {
      return Gpio;
    } else {
    console.warn('Using mock Gpio: GPIO inaccessible');
    return MockGPIO;
  }
}

export function writeSyncMultiplePins(
  value: BinaryValue,
  ...pins: Gpio[]
): void {
  for (const pin of pins) {
    pin.writeSync(value);
  }
}
