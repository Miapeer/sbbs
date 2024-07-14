'use strict';

function getExponentialScaleFactor(maxValue, logBase, step) {
    // Exponential scaling between 0 and maxValue
    var numerator = Math.pow(logBase, 1 + step);
    var denominator = Math.pow(logBase, 1 + maxValue);
    return numerator / denominator;
}
