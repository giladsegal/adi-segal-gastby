type Fraction = {
  N: number;
  D: number;
};

export const splitToSubgroups = <T extends Array<any>>(
  arr: T,
  size: number
) => {
  return Array(Math.ceil(arr.length / size))
    .fill(undefined)
    .map<T>((_, i) => arr.slice(i * size, i * size + size) as T);
};

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

const memoize = <T extends (arg: any) => any>(fn: T): T => {
  const cache: Record<Parameters<T>[0], ReturnType<T>> = {} as any;

  return (((arg: Parameters<T>[0]) => {
    if (cache[arg]) {
      return cache[arg];
    }

    cache[arg] = fn(arg);
    return cache[arg];
  }) as unknown) as T;
};

export const debounceCount = (
  fn: (calls: number) => void,
  wait: number
): (() => void) => {
  let timeout: any;
  let calls = 0;

  return function () {
    clearTimeout(timeout);
    calls++;

    timeout = setTimeout(() => {
      // @ts-ignore
      fn.call(this, calls);
    }, wait);
  };
};

export const toFraction = memoize(
  (value: number): Fraction => {
    const accuracy = 0.01;
    const sign = Math.sign(value);

    if (sign === -1) {
      value = Math.abs(value);
    }

    // Accuracy is the maximum relative error; convert to absolute maxError
    const maxError = sign === 0 ? accuracy : value * accuracy;

    const n = Math.floor(value);
    value -= n;

    if (value < maxError) {
      return {
        N: sign * n,
        D: 1,
      };
    }

    if (1 - maxError < value) {
      return {
        N: sign * (n + 1),
        D: 1,
      };
    }

    // The lower fraction is 0/1
    let lowerN = 0;
    let lowerD = 1;

    // The upper fraction is 1/1
    let upperN = 1;
    let upperD = 1;

    while (true) {
      // The middle fraction is (lower_n + upper_n) / (lower_d + upper_d)
      const middleN = lowerN + upperN;
      const middleD = lowerD + upperD;

      if (middleD * (value + maxError) < middleN) {
        // real + error < middle : middle is our new upper
        upperN = middleN;
        upperD = middleD;
      } else if (middleN < (value - maxError) * middleD) {
        // middle < real - error : middle is our new lower
        lowerN = middleN;
        lowerD = middleD;
      } else {
        // Middle is our best fraction
        return {
          N: (n * middleD + middleN) * sign,
          D: middleD,
        };
      }
    }
  }
);
