/**
 * 加减乘法四则运算
 * 加：add
 * 减：sub
 * 乘：mult
 * 除：divide
 */


/**
 * 浮点数加法计算
 * @example add(0.1, 0.2); => 0.3
 * @example add(0.1, 455); => 455.1
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} 结果
 */
function add(a, b) {
    const aFloatLen = getFloatLen(a);
    const bFloatLen = getFloatLen(b);
    const floatLen = Math.max(aFloatLen, bFloatLen);
    const intTotal = pow(a, floatLen) + pow(b, floatLen);

    return intTotal / Math.pow(10, floatLen);
}

/**
 * 浮点数减法计算
 * @example sub(0.3, 0.1); => 0.2
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} 结果
 */
function sub(a, b) {
    return add(a, -b);
}

/**
 * 浮点数乘法计算
 * @example mult(0.1, 0.2); => 0.02
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} 结果
 */
function mult(a, b) {
    const aFloatLen = getFloatLen(a);
    const bFloatLen = getFloatLen(b);
    const floatLen = Math.max(aFloatLen, bFloatLen);
    const intTotal = pow(a, floatLen) * pow(b, floatLen);

    return intTotal / Math.pow(10, floatLen * 2);
}

/**
 * 浮点数除法计算
 * @example divide(0.02, 0.1); => 0.2
 * @param {Number} a 被除数
 * @param {Number} b 除数
 * @returns {Number} 结果
 */
function divide(a, b) {
    const aFloatLen = getFloatLen(a);
    const bFloatLen = getFloatLen(b);
    const floatLen = Math.max(aFloatLen, bFloatLen);

    return pow(a, floatLen) / pow(b, floatLen);
}

/**
 * 浮点数按次幂转成整数
 * 虽然有Math.pow方法，但小数参数计算终究是有误差，比如 0.28*100 *= 28.000..4
 * 所以这里先将小数移除小数点变成整数进行计算
 * @example pow(2.56, 2) => 256
 * @param {Number} floatNum
 * @param {Numer} n
 * @returns {Number}
 */
function pow(floatNum, n) {
    const strFloat = String(floatNum);
    const floatLen = getFloatLen(floatNum);
    const nonPoint = strFloat.replace('.', '');

    return nonPoint * Math.pow(10, n - floatLen);
}

/**
 * 获取浮点数小位数长度
 * @example getFloatLen(2.56); => 2
 * @example getFloatLen(2); => 0
 * @param {Number} floatNum
 * @returns {Number}
 */
function getFloatLen(floatNum) {
    try {
        return String(floatNum)?.split('.')[1]?.length || 0;
    } catch (error) {
        return 0;
    }
}

export default {
    add,
    sub,
    mult,
    divide,
    getFloatLen,
    pow,
}