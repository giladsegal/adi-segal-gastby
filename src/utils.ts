type Fraction = {
    N: number
    D: number
}

export const splitToSubgroups = <T extends Array<any>>(
    arr: T,
    size: number
) => {
    return [...Array(Math.ceil(arr.length / size))].map<T>(
        (_, i) => arr.slice(i * size, i * size + size) as T
    )
}

export const toFraction = (value: number, accuracy: number): Fraction => {
    const sign = Math.sign(value)

    if (sign == -1) {
        value = Math.abs(value)
    }

    // Accuracy is the maximum relative error; convert to absolute maxError
    const maxError = sign == 0 ? accuracy : value * accuracy

    const n = Math.floor(value)
    value -= n

    if (value < maxError) {
        return {
            N: sign * n,
            D: 1,
        }
    }

    if (1 - maxError < value) {
        return {
            N: sign * (n + 1),
            D: 1,
        }
    }

    // The lower fraction is 0/1
    let lower_n = 0
    let lower_d = 1

    // The upper fraction is 1/1
    let upper_n = 1
    let upper_d = 1

    while (true) {
        // The middle fraction is (lower_n + upper_n) / (lower_d + upper_d)
        const middle_n = lower_n + upper_n
        const middle_d = lower_d + upper_d

        if (middle_d * (value + maxError) < middle_n) {
            // real + error < middle : middle is our new upper
            upper_n = middle_n
            upper_d = middle_d
        } else if (middle_n < (value - maxError) * middle_d) {
            // middle < real - error : middle is our new lower
            lower_n = middle_n
            lower_d = middle_d
        } else {
            // Middle is our best fraction
            return {
                N: (n * middle_d + middle_n) * sign,
                D: middle_d,
            }
        }
    }
}
