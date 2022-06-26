function isPrime(v) {
    if (v <= 3) {
        return v > 1;
    }
    if (v in isPrimeCache) return isPrimeCache[v];
    if (v % 2 == 0 || v % 3 == 0) {
        isPrimeCache[v] = false;
        return isPrimeCache[v];
    }
    var vSqrt = Math.sqrt(v);
    for (let i = 5; i <= vSqrt; i += 6) {
        if (v % i == 0 || v % (i + 2) == 0) {
            isPrimeCache[v] = false;
            return isPrimeCache[v];
        }
    }
    isPrimeCache[v] = true;
    return isPrimeCache[v];
}

function factorizeFunction() {
    let factorizeCache = {};
    return function (v) {
        if (v in factorizeCache) return factorizeCache[v];
        if (!isPrime(v)) {
            let i = Math.floor(Math.sqrt(v));
            while (v % i != 0) {
                i--;
            }
            factorizeCache[v] = [
                ...factorize(i),
                ...factorize(v / i)
            ];
            return factorizeCache[v];
        }
        factorizeCache[v] = [v];
        return factorizeCache[v];
    }
}

let isPrimeCache = {};

const factorize = factorizeFunction();

for (let n = 2; n < 20; n++) {
    console.log(factorize(n));
}

