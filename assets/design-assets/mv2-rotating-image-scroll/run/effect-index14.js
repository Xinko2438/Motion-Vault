(() => {
  // source/js/three.core.min.js
  /**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   */
  var REVISION = "186";
  var CullFaceNone = 0;
  var CullFaceBack = 1;
  var CullFaceFront = 2;
  var PCFShadowMap = 1;
  var PCFSoftShadowMap = 2;
  var VSMShadowMap = 3;
  var FrontSide = 0;
  var BackSide = 1;
  var DoubleSide = 2;
  var NoBlending = 0;
  var NormalBlending = 1;
  var AdditiveBlending = 2;
  var SubtractiveBlending = 3;
  var MultiplyBlending = 4;
  var CustomBlending = 5;
  var AddEquation = 100;
  var SubtractEquation = 101;
  var ReverseSubtractEquation = 102;
  var MinEquation = 103;
  var MaxEquation = 104;
  var ZeroFactor = 200;
  var OneFactor = 201;
  var SrcColorFactor = 202;
  var OneMinusSrcColorFactor = 203;
  var SrcAlphaFactor = 204;
  var OneMinusSrcAlphaFactor = 205;
  var DstAlphaFactor = 206;
  var OneMinusDstAlphaFactor = 207;
  var DstColorFactor = 208;
  var OneMinusDstColorFactor = 209;
  var SrcAlphaSaturateFactor = 210;
  var ConstantColorFactor = 211;
  var OneMinusConstantColorFactor = 212;
  var ConstantAlphaFactor = 213;
  var OneMinusConstantAlphaFactor = 214;
  var NeverDepth = 0;
  var AlwaysDepth = 1;
  var LessDepth = 2;
  var LessEqualDepth = 3;
  var EqualDepth = 4;
  var GreaterEqualDepth = 5;
  var GreaterDepth = 6;
  var NotEqualDepth = 7;
  var MultiplyOperation = 0;
  var MixOperation = 1;
  var AddOperation = 2;
  var NoToneMapping = 0;
  var LinearToneMapping = 1;
  var ReinhardToneMapping = 2;
  var CineonToneMapping = 3;
  var ACESFilmicToneMapping = 4;
  var CustomToneMapping = 5;
  var AgXToneMapping = 6;
  var NeutralToneMapping = 7;
  var CubeReflectionMapping = 301;
  var CubeRefractionMapping = 302;
  var EquirectangularReflectionMapping = 303;
  var EquirectangularRefractionMapping = 304;
  var CubeUVReflectionMapping = 306;
  var RepeatWrapping = 1e3;
  var ClampToEdgeWrapping = 1001;
  var MirroredRepeatWrapping = 1002;
  var NearestFilter = 1003;
  var NearestMipmapNearestFilter = 1004;
  var NearestMipmapLinearFilter = 1005;
  var LinearFilter = 1006;
  var LinearMipmapNearestFilter = 1007;
  var LinearMipmapLinearFilter = 1008;
  var UnsignedByteType = 1009;
  var ByteType = 1010;
  var ShortType = 1011;
  var UnsignedShortType = 1012;
  var IntType = 1013;
  var UnsignedIntType = 1014;
  var FloatType = 1015;
  var HalfFloatType = 1016;
  var UnsignedShort4444Type = 1017;
  var UnsignedShort5551Type = 1018;
  var UnsignedInt248Type = 1020;
  var UnsignedInt5999Type = 35902;
  var UnsignedInt101111Type = 35899;
  var AlphaFormat = 1021;
  var RGBFormat = 1022;
  var RGBAFormat = 1023;
  var DepthFormat = 1026;
  var DepthStencilFormat = 1027;
  var RedFormat = 1028;
  var RedIntegerFormat = 1029;
  var RGFormat = 1030;
  var RGIntegerFormat = 1031;
  var RGBAIntegerFormat = 1033;
  var RGB_S3TC_DXT1_Format = 33776;
  var RGBA_S3TC_DXT1_Format = 33777;
  var RGBA_S3TC_DXT3_Format = 33778;
  var RGBA_S3TC_DXT5_Format = 33779;
  var RGB_PVRTC_4BPPV1_Format = 35840;
  var RGB_PVRTC_2BPPV1_Format = 35841;
  var RGBA_PVRTC_4BPPV1_Format = 35842;
  var RGBA_PVRTC_2BPPV1_Format = 35843;
  var RGB_ETC1_Format = 36196;
  var RGB_ETC2_Format = 37492;
  var RGBA_ETC2_EAC_Format = 37496;
  var R11_EAC_Format = 37488;
  var SIGNED_R11_EAC_Format = 37489;
  var RG11_EAC_Format = 37490;
  var SIGNED_RG11_EAC_Format = 37491;
  var RGBA_ASTC_4x4_Format = 37808;
  var RGBA_ASTC_5x4_Format = 37809;
  var RGBA_ASTC_5x5_Format = 37810;
  var RGBA_ASTC_6x5_Format = 37811;
  var RGBA_ASTC_6x6_Format = 37812;
  var RGBA_ASTC_8x5_Format = 37813;
  var RGBA_ASTC_8x6_Format = 37814;
  var RGBA_ASTC_8x8_Format = 37815;
  var RGBA_ASTC_10x5_Format = 37816;
  var RGBA_ASTC_10x6_Format = 37817;
  var RGBA_ASTC_10x8_Format = 37818;
  var RGBA_ASTC_10x10_Format = 37819;
  var RGBA_ASTC_12x10_Format = 37820;
  var RGBA_ASTC_12x12_Format = 37821;
  var RGBA_BPTC_Format = 36492;
  var RGB_BPTC_SIGNED_Format = 36494;
  var RGB_BPTC_UNSIGNED_Format = 36495;
  var RED_RGTC1_Format = 36283;
  var SIGNED_RED_RGTC1_Format = 36284;
  var RED_GREEN_RGTC2_Format = 36285;
  var SIGNED_RED_GREEN_RGTC2_Format = 36286;
  var TangentSpaceNormalMap = 0;
  var ObjectSpaceNormalMap = 1;
  var NoColorSpace = "";
  var SRGBColorSpace = "srgb";
  var LinearSRGBColorSpace = "srgb-linear";
  var LinearTransfer = "linear";
  var SRGBTransfer = "srgb";
  var NeverCompare = 512;
  var LessCompare = 513;
  var EqualCompare = 514;
  var LessEqualCompare = 515;
  var GreaterCompare = 516;
  var NotEqualCompare = 517;
  var GreaterEqualCompare = 518;
  var AlwaysCompare = 519;
  var GLSL3 = "300 es";
  var WebGLCoordinateSystem = 2e3;
  function arrayNeedsUint32(t) {
    for (let e = t.length - 1; e >= 0; --e) if (t[e] >= 65535) return true;
    return false;
  }
  function isTypedArray(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
  }
  function createElementNS(t) {
    return document.createElementNS("http://www.w3.org/1999/xhtml", t);
  }
  function createCanvasElement() {
    const t = createElementNS("canvas");
    return t.style.display = "block", t;
  }
  var _cache = {};
  var _setConsoleFunction = null;
  function log(...t) {
    const e = "THREE." + t.shift();
    _setConsoleFunction ? _setConsoleFunction("log", e, ...t) : console.log(e, ...t);
  }
  function enhanceLogMessage(t) {
    const e = t[0];
    if ("string" == typeof e && e.startsWith("TSL:")) {
      const e2 = t[1];
      e2 && e2.isStackTrace ? t[0] += " " + e2.getLocation() : t[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
    }
    return t;
  }
  function warn(...t) {
    const e = "THREE." + (t = enhanceLogMessage(t)).shift();
    if (_setConsoleFunction) _setConsoleFunction("warn", e, ...t);
    else {
      const i = t[0];
      i && i.isStackTrace ? console.warn(i.getError(e)) : console.warn(e, ...t);
    }
  }
  function error(...t) {
    const e = "THREE." + (t = enhanceLogMessage(t)).shift();
    if (_setConsoleFunction) _setConsoleFunction("error", e, ...t);
    else {
      const i = t[0];
      i && i.isStackTrace ? console.error(i.getError(e)) : console.error(e, ...t);
    }
  }
  function warnOnce(...t) {
    const e = t.join(" ");
    e in _cache || (_cache[e] = true, warn(...t));
  }
  function probeAsync(t, e, i) {
    return new Promise(function(r, s) {
      setTimeout(function n() {
        switch (t.clientWaitSync(e, t.SYNC_FLUSH_COMMANDS_BIT, 0)) {
          case t.WAIT_FAILED:
            s();
            break;
          case t.TIMEOUT_EXPIRED:
            setTimeout(n, i);
            break;
          default:
            r();
        }
      }, i);
    });
  }
  var ReversedDepthFuncs = { [NeverDepth]: 1, [LessDepth]: 6, [EqualDepth]: 7, [LessEqualDepth]: 5, [AlwaysDepth]: 0, [GreaterDepth]: 2, [NotEqualDepth]: 4, [GreaterEqualDepth]: 3 };
  var EventDispatcher = class {
    addEventListener(t, e) {
      void 0 === this._listeners && (this._listeners = {});
      const i = this._listeners;
      void 0 === i[t] && (i[t] = []), -1 === i[t].indexOf(e) && i[t].push(e);
    }
    hasEventListener(t, e) {
      const i = this._listeners;
      return void 0 !== i && (void 0 !== i[t] && -1 !== i[t].indexOf(e));
    }
    removeEventListener(t, e) {
      const i = this._listeners;
      if (void 0 === i) return;
      const r = i[t];
      if (void 0 !== r) {
        const t2 = r.indexOf(e);
        -1 !== t2 && r.splice(t2, 1);
      }
    }
    dispatchEvent(t) {
      const e = this._listeners;
      if (void 0 === e) return;
      const i = e[t.type];
      if (void 0 !== i) {
        t.target = this;
        const e2 = i.slice(0);
        for (let i2 = 0, r = e2.length; i2 < r; i2++) e2[i2].call(this, t);
        t.target = null;
      }
    }
  };
  var _lut = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
  var DEG2RAD = Math.PI / 180;
  var RAD2DEG = 180 / Math.PI;
  function generateUUID() {
    const t = 4294967295 * Math.random() | 0, e = 4294967295 * Math.random() | 0, i = 4294967295 * Math.random() | 0, r = 4294967295 * Math.random() | 0;
    return (_lut[255 & t] + _lut[t >> 8 & 255] + _lut[t >> 16 & 255] + _lut[t >> 24 & 255] + "-" + _lut[255 & e] + _lut[e >> 8 & 255] + "-" + _lut[e >> 16 & 15 | 64] + _lut[e >> 24 & 255] + "-" + _lut[63 & i | 128] + _lut[i >> 8 & 255] + "-" + _lut[i >> 16 & 255] + _lut[i >> 24 & 255] + _lut[255 & r] + _lut[r >> 8 & 255] + _lut[r >> 16 & 255] + _lut[r >> 24 & 255]).toLowerCase();
  }
  function clamp(t, e, i) {
    return Math.max(e, Math.min(i, t));
  }
  function euclideanModulo(t, e) {
    return (t % e + e) % e;
  }
  function lerp(t, e, i) {
    return (1 - i) * t + i * e;
  }
  function denormalize(t, e) {
    switch (e.constructor) {
      case Float32Array:
        return t;
      case Uint32Array:
        return t / 4294967295;
      case Uint16Array:
        return t / 65535;
      case Uint8Array:
      case Uint8ClampedArray:
        return t / 255;
      case Int32Array:
        return Math.max(t / 2147483647, -1);
      case Int16Array:
        return Math.max(t / 32767, -1);
      case Int8Array:
        return Math.max(t / 127, -1);
      default:
        throw new Error("THREE.MathUtils: Invalid component type.");
    }
  }
  function normalize(t, e) {
    switch (e.constructor) {
      case Float32Array:
        return t;
      case Uint32Array:
        return Math.round(4294967295 * t);
      case Uint16Array:
        return Math.round(65535 * t);
      case Uint8Array:
      case Uint8ClampedArray:
        return Math.round(255 * t);
      case Int32Array:
        return Math.round(2147483647 * t);
      case Int16Array:
        return Math.round(32767 * t);
      case Int8Array:
        return Math.round(127 * t);
      default:
        throw new Error("THREE.MathUtils: Invalid component type.");
    }
  }
  var _Vector2 = class _Vector2 {
    constructor(t = 0, e = 0) {
      this.x = t, this.y = e;
    }
    get width() {
      return this.x;
    }
    set width(t) {
      this.x = t;
    }
    get height() {
      return this.y;
    }
    set height(t) {
      this.y = t;
    }
    set(t, e) {
      return this.x = t, this.y = e, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        default:
          throw new Error("THREE.Vector2: index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        default:
          throw new Error("THREE.Vector2: index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this;
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    applyMatrix3(t) {
      const e = this.x, i = this.y, r = t.elements;
      return this.x = r[0] * e + r[3] * i + r[6], this.y = r[1] * e + r[4] * i + r[7], this;
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
    }
    clamp(t, e) {
      return this.x = clamp(this.x, t.x, e.x), this.y = clamp(this.y, t.y, e.y), this;
    }
    clampScalar(t, e) {
      return this.x = clamp(this.x, t, e), this.y = clamp(this.y, t, e), this;
    }
    clampLength(t, e) {
      const i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(clamp(i, t, e));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    angle() {
      return Math.atan2(-this.y, -this.x) + Math.PI;
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const i = this.dot(t) / e;
      return Math.acos(clamp(i, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x, i = this.y - t.y;
      return e * e + i * i;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
    }
    lerpVectors(t, e, i) {
      return this.x = t.x + (e.x - t.x) * i, this.y = t.y + (e.y - t.y) * i, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this;
    }
    rotateAround(t, e) {
      const i = Math.cos(e), r = Math.sin(e), s = this.x - t.x, n = this.y - t.y;
      return this.x = s * i - n * r + t.x, this.y = s * r + n * i + t.y, this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y;
    }
  };
  _Vector2.prototype.isVector2 = true;
  var Vector2 = _Vector2;
  var Quaternion = class {
    constructor(t = 0, e = 0, i = 0, r = 1) {
      this.isQuaternion = true, this._x = t, this._y = e, this._z = i, this._w = r;
    }
    static slerpFlat(t, e, i, r, s, n, a) {
      let o = i[r + 0], h = i[r + 1], l = i[r + 2], c = i[r + 3], u = s[n + 0], p = s[n + 1], d = s[n + 2], m = s[n + 3];
      if (c !== m || o !== u || h !== p || l !== d) {
        let t2 = o * u + h * p + l * d + c * m;
        t2 < 0 && (u = -u, p = -p, d = -d, m = -m, t2 = -t2);
        let e2 = 1 - a;
        if (t2 < 0.9995) {
          const i2 = Math.acos(t2), r2 = Math.sin(i2);
          e2 = Math.sin(e2 * i2) / r2, o = o * e2 + u * (a = Math.sin(a * i2) / r2), h = h * e2 + p * a, l = l * e2 + d * a, c = c * e2 + m * a;
        } else {
          o = o * e2 + u * a, h = h * e2 + p * a, l = l * e2 + d * a, c = c * e2 + m * a;
          const t3 = 1 / Math.sqrt(o * o + h * h + l * l + c * c);
          o *= t3, h *= t3, l *= t3, c *= t3;
        }
      }
      t[e] = o, t[e + 1] = h, t[e + 2] = l, t[e + 3] = c;
    }
    static multiplyQuaternionsFlat(t, e, i, r, s, n) {
      const a = i[r], o = i[r + 1], h = i[r + 2], l = i[r + 3], c = s[n], u = s[n + 1], p = s[n + 2], d = s[n + 3];
      return t[e] = a * d + l * c + o * p - h * u, t[e + 1] = o * d + l * u + h * c - a * p, t[e + 2] = h * d + l * p + a * u - o * c, t[e + 3] = l * d - a * c - o * u - h * p, t;
    }
    get x() {
      return this._x;
    }
    set x(t) {
      this._x = t, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      this._y = t, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      this._z = t, this._onChangeCallback();
    }
    get w() {
      return this._w;
    }
    set w(t) {
      this._w = t, this._onChangeCallback();
    }
    set(t, e, i, r) {
      return this._x = t, this._y = e, this._z = i, this._w = r, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
    copy(t) {
      return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
    }
    setFromEuler(t, e = true) {
      const i = t._x, r = t._y, s = t._z, n = t._order, a = Math.cos, o = Math.sin, h = a(i / 2), l = a(r / 2), c = a(s / 2), u = o(i / 2), p = o(r / 2), d = o(s / 2);
      switch (n) {
        case "XYZ":
          this._x = u * l * c + h * p * d, this._y = h * p * c - u * l * d, this._z = h * l * d + u * p * c, this._w = h * l * c - u * p * d;
          break;
        case "YXZ":
          this._x = u * l * c + h * p * d, this._y = h * p * c - u * l * d, this._z = h * l * d - u * p * c, this._w = h * l * c + u * p * d;
          break;
        case "ZXY":
          this._x = u * l * c - h * p * d, this._y = h * p * c + u * l * d, this._z = h * l * d + u * p * c, this._w = h * l * c - u * p * d;
          break;
        case "ZYX":
          this._x = u * l * c - h * p * d, this._y = h * p * c + u * l * d, this._z = h * l * d - u * p * c, this._w = h * l * c + u * p * d;
          break;
        case "YZX":
          this._x = u * l * c + h * p * d, this._y = h * p * c + u * l * d, this._z = h * l * d - u * p * c, this._w = h * l * c - u * p * d;
          break;
        case "XZY":
          this._x = u * l * c - h * p * d, this._y = h * p * c - u * l * d, this._z = h * l * d + u * p * c, this._w = h * l * c + u * p * d;
          break;
        default:
          warn("Quaternion: .setFromEuler() encountered an unknown order: " + n);
      }
      return true === e && this._onChangeCallback(), this;
    }
    setFromAxisAngle(t, e) {
      const i = e / 2, r = Math.sin(i);
      return this._x = t.x * r, this._y = t.y * r, this._z = t.z * r, this._w = Math.cos(i), this._onChangeCallback(), this;
    }
    setFromRotationMatrix(t) {
      const e = t.elements, i = e[0], r = e[4], s = e[8], n = e[1], a = e[5], o = e[9], h = e[2], l = e[6], c = e[10], u = i + a + c;
      if (u > 0) {
        const t2 = 0.5 / Math.sqrt(u + 1);
        this._w = 0.25 / t2, this._x = (l - o) * t2, this._y = (s - h) * t2, this._z = (n - r) * t2;
      } else if (i > a && i > c) {
        const t2 = 2 * Math.sqrt(1 + i - a - c);
        this._w = (l - o) / t2, this._x = 0.25 * t2, this._y = (r + n) / t2, this._z = (s + h) / t2;
      } else if (a > c) {
        const t2 = 2 * Math.sqrt(1 + a - i - c);
        this._w = (s - h) / t2, this._x = (r + n) / t2, this._y = 0.25 * t2, this._z = (o + l) / t2;
      } else {
        const t2 = 2 * Math.sqrt(1 + c - i - a);
        this._w = (n - r) / t2, this._x = (s + h) / t2, this._y = (o + l) / t2, this._z = 0.25 * t2;
      }
      return this._onChangeCallback(), this;
    }
    setFromUnitVectors(t, e) {
      let i = t.dot(e) + 1;
      return i < 1e-8 ? (i = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = i)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = i), this.normalize();
    }
    angleTo(t) {
      return 2 * Math.acos(Math.abs(clamp(this.dot(t), -1, 1)));
    }
    rotateTowards(t, e) {
      const i = this.angleTo(t);
      if (0 === i) return this;
      const r = Math.min(1, e / i);
      return this.slerp(t, r), this;
    }
    identity() {
      return this.set(0, 0, 0, 1);
    }
    invert() {
      return this.conjugate();
    }
    conjugate() {
      return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
    }
    dot(t) {
      return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
    }
    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    normalize() {
      let t = this.length();
      return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
    }
    multiply(t) {
      return this.multiplyQuaternions(this, t);
    }
    premultiply(t) {
      return this.multiplyQuaternions(t, this);
    }
    multiplyQuaternions(t, e) {
      const i = t._x, r = t._y, s = t._z, n = t._w, a = e._x, o = e._y, h = e._z, l = e._w;
      return this._x = i * l + n * a + r * h - s * o, this._y = r * l + n * o + s * a - i * h, this._z = s * l + n * h + i * o - r * a, this._w = n * l - i * a - r * o - s * h, this._onChangeCallback(), this;
    }
    slerp(t, e) {
      let i = t._x, r = t._y, s = t._z, n = t._w, a = this.dot(t);
      a < 0 && (i = -i, r = -r, s = -s, n = -n, a = -a);
      let o = 1 - e;
      if (a < 0.9995) {
        const t2 = Math.acos(a), h = Math.sin(t2);
        o = Math.sin(o * t2) / h, e = Math.sin(e * t2) / h, this._x = this._x * o + i * e, this._y = this._y * o + r * e, this._z = this._z * o + s * e, this._w = this._w * o + n * e, this._onChangeCallback();
      } else this._x = this._x * o + i * e, this._y = this._y * o + r * e, this._z = this._z * o + s * e, this._w = this._w * o + n * e, this.normalize();
      return this;
    }
    slerpQuaternions(t, e, i) {
      return this.copy(t).slerp(e, i);
    }
    random() {
      const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), i = Math.random(), r = Math.sqrt(1 - i), s = Math.sqrt(i);
      return this.set(r * Math.sin(t), r * Math.cos(t), s * Math.sin(e), s * Math.cos(e));
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
    }
    fromArray(t, e = 0) {
      return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
    }
    fromBufferAttribute(t, e) {
      return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
    }
    toJSON() {
      return this.toArray();
    }
    _onChange(t) {
      return this._onChangeCallback = t, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._w;
    }
  };
  var _Vector3 = class _Vector3 {
    constructor(t = 0, e = 0, i = 0) {
      this.x = t, this.y = e, this.z = i;
    }
    set(t, e, i) {
      return void 0 === i && (i = this.z), this.x = t, this.y = e, this.z = i, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setZ(t) {
      return this.z = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        default:
          throw new Error("THREE.Vector3: index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        default:
          throw new Error("THREE.Vector3: index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this;
    }
    multiplyVectors(t, e) {
      return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
    }
    applyEuler(t) {
      return this.applyQuaternion(_quaternion$5.setFromEuler(t));
    }
    applyAxisAngle(t, e) {
      return this.applyQuaternion(_quaternion$5.setFromAxisAngle(t, e));
    }
    applyMatrix3(t) {
      const e = this.x, i = this.y, r = this.z, s = t.elements;
      return this.x = s[0] * e + s[3] * i + s[6] * r, this.y = s[1] * e + s[4] * i + s[7] * r, this.z = s[2] * e + s[5] * i + s[8] * r, this;
    }
    applyNormalMatrix(t) {
      return this.applyMatrix3(t).normalize();
    }
    applyMatrix4(t) {
      const e = this.x, i = this.y, r = this.z, s = t.elements, n = 1 / (s[3] * e + s[7] * i + s[11] * r + s[15]);
      return this.x = (s[0] * e + s[4] * i + s[8] * r + s[12]) * n, this.y = (s[1] * e + s[5] * i + s[9] * r + s[13]) * n, this.z = (s[2] * e + s[6] * i + s[10] * r + s[14]) * n, this;
    }
    applyQuaternion(t) {
      const e = this.x, i = this.y, r = this.z, s = t.x, n = t.y, a = t.z, o = t.w, h = 2 * (n * r - a * i), l = 2 * (a * e - s * r), c = 2 * (s * i - n * e);
      return this.x = e + o * h + n * c - a * l, this.y = i + o * l + a * h - s * c, this.z = r + o * c + s * l - n * h, this;
    }
    project(t) {
      return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
    }
    unproject(t) {
      return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
    }
    transformDirection(t) {
      const e = this.x, i = this.y, r = this.z, s = t.elements;
      return this.x = s[0] * e + s[4] * i + s[8] * r, this.y = s[1] * e + s[5] * i + s[9] * r, this.z = s[2] * e + s[6] * i + s[10] * r, this.normalize();
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
    }
    clamp(t, e) {
      return this.x = clamp(this.x, t.x, e.x), this.y = clamp(this.y, t.y, e.y), this.z = clamp(this.z, t.z, e.z), this;
    }
    clampScalar(t, e) {
      return this.x = clamp(this.x, t, e), this.y = clamp(this.y, t, e), this.z = clamp(this.z, t, e), this;
    }
    clampLength(t, e) {
      const i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(clamp(i, t, e));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
    }
    lerpVectors(t, e, i) {
      return this.x = t.x + (e.x - t.x) * i, this.y = t.y + (e.y - t.y) * i, this.z = t.z + (e.z - t.z) * i, this;
    }
    cross(t) {
      return this.crossVectors(this, t);
    }
    crossVectors(t, e) {
      const i = t.x, r = t.y, s = t.z, n = e.x, a = e.y, o = e.z;
      return this.x = r * o - s * a, this.y = s * n - i * o, this.z = i * a - r * n, this;
    }
    projectOnVector(t) {
      const e = t.lengthSq();
      if (0 === e) return this.set(0, 0, 0);
      const i = t.dot(this) / e;
      return this.copy(t).multiplyScalar(i);
    }
    projectOnPlane(t) {
      return _vector$c.copy(this).projectOnVector(t), this.sub(_vector$c);
    }
    reflect(t) {
      return this.sub(_vector$c.copy(t).multiplyScalar(2 * this.dot(t)));
    }
    angleTo(t) {
      const e = Math.sqrt(this.lengthSq() * t.lengthSq());
      if (0 === e) return Math.PI / 2;
      const i = this.dot(t) / e;
      return Math.acos(clamp(i, -1, 1));
    }
    distanceTo(t) {
      return Math.sqrt(this.distanceToSquared(t));
    }
    distanceToSquared(t) {
      const e = this.x - t.x, i = this.y - t.y, r = this.z - t.z;
      return e * e + i * i + r * r;
    }
    manhattanDistanceTo(t) {
      return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
    }
    setFromSpherical(t) {
      return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
    }
    setFromSphericalCoords(t, e, i) {
      const r = Math.sin(e) * t;
      return this.x = r * Math.sin(i), this.y = Math.cos(e) * t, this.z = r * Math.cos(i), this;
    }
    setFromCylindrical(t) {
      return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
    }
    setFromCylindricalCoords(t, e, i) {
      return this.x = t * Math.sin(e), this.y = i, this.z = t * Math.cos(e), this;
    }
    setFromMatrixPosition(t) {
      const e = t.elements;
      return this.x = e[12], this.y = e[13], this.z = e[14], this;
    }
    setFromMatrixScale(t) {
      const e = this.setFromMatrixColumn(t, 0).length(), i = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
      return this.x = e, this.y = i, this.z = r, this;
    }
    setFromMatrixColumn(t, e) {
      return this.fromArray(t.elements, 4 * e);
    }
    setFromMatrix3Column(t, e) {
      return this.fromArray(t.elements, 3 * e);
    }
    setFromEuler(t) {
      return this.x = t._x, this.y = t._y, this.z = t._z, this;
    }
    setFromColor(t) {
      return this.x = t.r, this.y = t.g, this.z = t.b, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
    }
    randomDirection() {
      const t = Math.random() * Math.PI * 2, e = 2 * Math.random() - 1, i = Math.sqrt(1 - e * e);
      return this.x = i * Math.cos(t), this.y = e, this.z = i * Math.sin(t), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z;
    }
  };
  _Vector3.prototype.isVector3 = true;
  var Vector3 = _Vector3;
  var _vector$c = new Vector3();
  var _quaternion$5 = new Quaternion();
  var _Matrix3 = class _Matrix3 {
    constructor(t, e, i, r, s, n, a, o, h) {
      this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], void 0 !== t && this.set(t, e, i, r, s, n, a, o, h);
    }
    set(t, e, i, r, s, n, a, o, h) {
      const l = this.elements;
      return l[0] = t, l[1] = r, l[2] = a, l[3] = e, l[4] = s, l[5] = o, l[6] = i, l[7] = n, l[8] = h, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
    }
    copy(t) {
      const e = this.elements, i = t.elements;
      return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], e[6] = i[6], e[7] = i[7], e[8] = i[8], this;
    }
    extractBasis(t, e, i) {
      return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this;
    }
    setFromMatrix4(t) {
      const e = t.elements;
      return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this;
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const i = t.elements, r = e.elements, s = this.elements, n = i[0], a = i[3], o = i[6], h = i[1], l = i[4], c = i[7], u = i[2], p = i[5], d = i[8], m = r[0], y = r[3], f = r[6], g = r[1], x = r[4], _ = r[7], v = r[2], b = r[5], M = r[8];
      return s[0] = n * m + a * g + o * v, s[3] = n * y + a * x + o * b, s[6] = n * f + a * _ + o * M, s[1] = h * m + l * g + c * v, s[4] = h * y + l * x + c * b, s[7] = h * f + l * _ + c * M, s[2] = u * m + p * g + d * v, s[5] = u * y + p * x + d * b, s[8] = u * f + p * _ + d * M, this;
    }
    multiplyScalar(t) {
      const e = this.elements;
      return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
    }
    determinant() {
      const t = this.elements, e = t[0], i = t[1], r = t[2], s = t[3], n = t[4], a = t[5], o = t[6], h = t[7], l = t[8];
      return e * n * l - e * a * h - i * s * l + i * a * o + r * s * h - r * n * o;
    }
    invert() {
      const t = this.elements, e = t[0], i = t[1], r = t[2], s = t[3], n = t[4], a = t[5], o = t[6], h = t[7], l = t[8], c = l * n - a * h, u = a * o - l * s, p = h * s - n * o, d = e * c + i * u + r * p;
      if (0 === d) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const m = 1 / d;
      return t[0] = c * m, t[1] = (r * h - l * i) * m, t[2] = (a * i - r * n) * m, t[3] = u * m, t[4] = (l * e - r * o) * m, t[5] = (r * s - a * e) * m, t[6] = p * m, t[7] = (i * o - h * e) * m, t[8] = (n * e - i * s) * m, this;
    }
    transpose() {
      let t;
      const e = this.elements;
      return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
    }
    getNormalMatrix(t) {
      return this.setFromMatrix4(t).invert().transpose();
    }
    transposeIntoArray(t) {
      const e = this.elements;
      return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
    }
    setUvTransform(t, e, i, r, s, n, a) {
      const o = Math.cos(s), h = Math.sin(s);
      return this.set(i * o, i * h, -i * (o * n + h * a) + n + t, -r * h, r * o, -r * (-h * n + o * a) + a + e, 0, 0, 1), this;
    }
    scale(t, e) {
      return warnOnce("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(_m3.makeScale(t, e)), this;
    }
    rotate(t) {
      return warnOnce("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(_m3.makeRotation(-t)), this;
    }
    translate(t, e) {
      return warnOnce("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(_m3.makeTranslation(t, e)), this;
    }
    makeTranslation(t, e) {
      return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this;
    }
    makeRotation(t) {
      const e = Math.cos(t), i = Math.sin(t);
      return this.set(e, -i, 0, i, e, 0, 0, 0, 1), this;
    }
    makeScale(t, e) {
      return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
    }
    equals(t) {
      const e = this.elements, i = t.elements;
      for (let t2 = 0; t2 < 9; t2++) if (e[t2] !== i[t2]) return false;
      return true;
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 9; i++) this.elements[i] = t[i + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const i = this.elements;
      return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t;
    }
    clone() {
      return new this.constructor().fromArray(this.elements);
    }
  };
  _Matrix3.prototype.isMatrix3 = true;
  var Matrix3 = _Matrix3;
  var _m3 = new Matrix3();
  var LINEAR_REC709_TO_XYZ = new Matrix3().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322);
  var XYZ_TO_LINEAR_REC709 = new Matrix3().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
  function createColorManagement() {
    const t = { enabled: true, workingColorSpace: "srgb-linear", spaces: {}, convert: function(t2, e2, i2) {
      return false !== this.enabled && e2 !== i2 && e2 && i2 ? ("srgb" === this.spaces[e2].transfer && (t2.r = SRGBToLinear(t2.r), t2.g = SRGBToLinear(t2.g), t2.b = SRGBToLinear(t2.b)), this.spaces[e2].primaries !== this.spaces[i2].primaries && (t2.applyMatrix3(this.spaces[e2].toXYZ), t2.applyMatrix3(this.spaces[i2].fromXYZ)), "srgb" === this.spaces[i2].transfer && (t2.r = LinearToSRGB(t2.r), t2.g = LinearToSRGB(t2.g), t2.b = LinearToSRGB(t2.b)), t2) : t2;
    }, workingToColorSpace: function(t2, e2) {
      return this.convert(t2, this.workingColorSpace, e2);
    }, colorSpaceToWorking: function(t2, e2) {
      return this.convert(t2, e2, this.workingColorSpace);
    }, getPrimaries: function(t2) {
      return this.spaces[t2].primaries;
    }, getTransfer: function(t2) {
      return "" === t2 ? "linear" : this.spaces[t2].transfer;
    }, getToneMappingMode: function(t2) {
      return this.spaces[t2].outputColorSpaceConfig.toneMappingMode || "standard";
    }, getLuminanceCoefficients: function(t2, e2 = this.workingColorSpace) {
      return t2.fromArray(this.spaces[e2].luminanceCoefficients);
    }, define: function(t2) {
      Object.assign(this.spaces, t2);
    }, _getMatrix: function(t2, e2, i2) {
      return t2.copy(this.spaces[e2].toXYZ).multiply(this.spaces[i2].fromXYZ);
    }, _getDrawingBufferColorSpace: function(t2) {
      return this.spaces[t2].outputColorSpaceConfig.drawingBufferColorSpace;
    }, _getUnpackColorSpace: function(t2 = this.workingColorSpace) {
      return this.spaces[t2].workingColorSpaceConfig.unpackColorSpace;
    }, fromWorkingColorSpace: function(e2, i2) {
      return warnOnce("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), t.workingToColorSpace(e2, i2);
    }, toWorkingColorSpace: function(e2, i2) {
      return warnOnce("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), t.colorSpaceToWorking(e2, i2);
    } }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], i = [0.2126, 0.7152, 0.0722], r = [0.3127, 0.329];
    return t.define({ [LinearSRGBColorSpace]: { primaries: e, whitePoint: r, transfer: "linear", toXYZ: LINEAR_REC709_TO_XYZ, fromXYZ: XYZ_TO_LINEAR_REC709, luminanceCoefficients: i, workingColorSpaceConfig: { unpackColorSpace: "srgb" }, outputColorSpaceConfig: { drawingBufferColorSpace: "srgb" } }, [SRGBColorSpace]: { primaries: e, whitePoint: r, transfer: "srgb", toXYZ: LINEAR_REC709_TO_XYZ, fromXYZ: XYZ_TO_LINEAR_REC709, luminanceCoefficients: i, outputColorSpaceConfig: { drawingBufferColorSpace: "srgb" } } }), t;
  }
  var ColorManagement = createColorManagement();
  function SRGBToLinear(t) {
    return t < 0.04045 ? 0.0773993808 * t : Math.pow(0.9478672986 * t + 0.0521327014, 2.4);
  }
  function LinearToSRGB(t) {
    return t < 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 0.41666) - 0.055;
  }
  var _canvas;
  var ImageUtils = class {
    static getDataURL(t, e = "image/png") {
      if (/^data:/i.test(t.src)) return t.src;
      if ("undefined" == typeof HTMLCanvasElement) return t.src;
      let i;
      if (t instanceof HTMLCanvasElement) i = t;
      else {
        void 0 === _canvas && (_canvas = createElementNS("canvas")), _canvas.width = t.width, _canvas.height = t.height;
        const e2 = _canvas.getContext("2d");
        t instanceof ImageData ? e2.putImageData(t, 0, 0) : e2.drawImage(t, 0, 0, t.width, t.height), i = _canvas;
      }
      return i.toDataURL(e);
    }
    static sRGBToLinear(t) {
      if ("undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap) {
        const e = createElementNS("canvas");
        e.width = t.width, e.height = t.height;
        const i = e.getContext("2d");
        i.drawImage(t, 0, 0, t.width, t.height);
        const r = i.getImageData(0, 0, t.width, t.height), s = r.data;
        for (let t2 = 0; t2 < s.length; t2++) s[t2] = 255 * SRGBToLinear(s[t2] / 255);
        return i.putImageData(r, 0, 0), e;
      }
      if (t.data) {
        const e = t.data.slice(0);
        for (let t2 = 0; t2 < e.length; t2++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[t2] = Math.floor(255 * SRGBToLinear(e[t2] / 255)) : e[t2] = SRGBToLinear(e[t2]);
        return { data: e, width: t.width, height: t.height };
      }
      return warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
    }
  };
  var _sourceId = 0;
  var TextureSource = class {
    constructor(t = null) {
      this.isTextureSource = true, Object.defineProperty(this, "id", { value: _sourceId++ }), this.uuid = generateUUID(), this.data = t, this.dataReady = true, this.version = 0;
    }
    getSize(t) {
      const e = this.data;
      return "undefined" != typeof HTMLVideoElement && e instanceof HTMLVideoElement ? t.set(e.videoWidth, e.videoHeight, 0) : "undefined" != typeof VideoFrame && e instanceof VideoFrame ? t.set(e.displayWidth, e.displayHeight, 0) : null !== e ? t.set(e.width, e.height, e.depth || 0) : t.set(0, 0, 0), t;
    }
    set needsUpdate(t) {
      true === t && this.version++;
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      if (!e && void 0 !== t.images[this.uuid]) return t.images[this.uuid];
      const i = { uuid: this.uuid, url: "" }, r = this.data;
      if (null !== r) {
        let t2;
        if (Array.isArray(r)) {
          t2 = [];
          for (let e2 = 0, i2 = r.length; e2 < i2; e2++) r[e2].isDataTexture ? t2.push(serializeImage(r[e2].image)) : t2.push(serializeImage(r[e2]));
        } else t2 = serializeImage(r);
        i.url = t2;
      }
      return e || (t.images[this.uuid] = i), i;
    }
  };
  function serializeImage(t) {
    return "undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap ? ImageUtils.getDataURL(t) : t.data ? { data: Array.from(t.data), width: t.width, height: t.height, type: t.data.constructor.name } : (warn("Texture: Unable to serialize Texture."), {});
  }
  var _textureId = 0;
  var _tempVec3 = new Vector3();
  var Texture = class _Texture extends EventDispatcher {
    constructor(t = _Texture.DEFAULT_IMAGE, e = _Texture.DEFAULT_MAPPING, i = 1001, r = 1001, s = 1006, n = 1008, a = 1023, o = 1009, h = _Texture.DEFAULT_ANISOTROPY, l = "") {
      super(), this.isTexture = true, Object.defineProperty(this, "id", { value: _textureId++ }), this.uuid = generateUUID(), this.name = "", this.source = new TextureSource(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = i, this.wrapT = r, this.magFilter = s, this.minFilter = n, this.anisotropy = h, this.format = a, this.internalFormat = null, this.type = o, this.offset = new Vector2(0, 0), this.repeat = new Vector2(1, 1), this.center = new Vector2(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new Matrix3(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = l, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = false, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = false;
    }
    get width() {
      return this.source.getSize(_tempVec3).x;
    }
    get height() {
      return this.source.getSize(_tempVec3).y;
    }
    get depth() {
      return this.source.getSize(_tempVec3).z;
    }
    get image() {
      return this.source.data;
    }
    set image(t) {
      this.source.data = t;
    }
    updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
    addUpdateRange(t, e) {
      this.updateRanges.push({ start: t, count: e });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.normalized = t.normalized, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.isArrayTexture = t.isArrayTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = true, this;
    }
    setValues(t) {
      for (const e in t) {
        const i = t[e];
        if (void 0 === i) {
          warn(`Texture.setValues(): parameter '${e}' has value of undefined.`);
          continue;
        }
        const r = this[e];
        void 0 !== r ? r && i && r.isVector2 && i.isVector2 || r && i && r.isVector3 && i.isVector3 || r && i && r.isMatrix3 && i.isMatrix3 ? r.copy(i) : this[e] = i : warn(`Texture.setValues(): property '${e}' does not exist.`);
      }
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
      const i = { metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(t).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, normalized: this.normalized, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
      return Object.keys(this.userData).length > 0 && (i.userData = this.userData), e || (t.textures[this.uuid] = i), i;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    transformUv(t) {
      if (300 !== this.mapping) return t;
      if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
        case 1e3:
          t.x = t.x - Math.floor(t.x);
          break;
        case 1001:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case 1002:
          1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
      }
      if (t.y < 0 || t.y > 1) switch (this.wrapT) {
        case 1e3:
          t.y = t.y - Math.floor(t.y);
          break;
        case 1001:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case 1002:
          1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
      }
      return this.flipY && (t.y = 1 - t.y), t;
    }
    set needsUpdate(t) {
      true === t && (this.version++, this.source.needsUpdate = true);
    }
    set needsPMREMUpdate(t) {
      true === t && this.pmremVersion++;
    }
  };
  Texture.DEFAULT_IMAGE = null, Texture.DEFAULT_MAPPING = 300, Texture.DEFAULT_ANISOTROPY = 1;
  var _Vector4 = class _Vector4 {
    constructor(t = 0, e = 0, i = 0, r = 1) {
      this.x = t, this.y = e, this.z = i, this.w = r;
    }
    get width() {
      return this.z;
    }
    set width(t) {
      this.z = t;
    }
    get height() {
      return this.w;
    }
    set height(t) {
      this.w = t;
    }
    set(t, e, i, r) {
      return this.x = t, this.y = e, this.z = i, this.w = r, this;
    }
    setScalar(t) {
      return this.x = t, this.y = t, this.z = t, this.w = t, this;
    }
    setX(t) {
      return this.x = t, this;
    }
    setY(t) {
      return this.y = t, this;
    }
    setZ(t) {
      return this.z = t, this;
    }
    setW(t) {
      return this.w = t, this;
    }
    setComponent(t, e) {
      switch (t) {
        case 0:
          this.x = e;
          break;
        case 1:
          this.y = e;
          break;
        case 2:
          this.z = e;
          break;
        case 3:
          this.w = e;
          break;
        default:
          throw new Error("THREE.Vector4: index is out of range: " + t);
      }
      return this;
    }
    getComponent(t) {
      switch (t) {
        case 0:
          return this.x;
        case 1:
          return this.y;
        case 2:
          return this.z;
        case 3:
          return this.w;
        default:
          throw new Error("THREE.Vector4: index is out of range: " + t);
      }
    }
    clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
    copy(t) {
      return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this;
    }
    add(t) {
      return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
    }
    addScalar(t) {
      return this.x += t, this.y += t, this.z += t, this.w += t, this;
    }
    addVectors(t, e) {
      return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
    }
    addScaledVector(t, e) {
      return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
    }
    sub(t) {
      return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
    }
    subScalar(t) {
      return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
    }
    subVectors(t, e) {
      return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
    }
    multiply(t) {
      return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
    }
    multiplyScalar(t) {
      return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
    }
    applyMatrix4(t) {
      const e = this.x, i = this.y, r = this.z, s = this.w, n = t.elements;
      return this.x = n[0] * e + n[4] * i + n[8] * r + n[12] * s, this.y = n[1] * e + n[5] * i + n[9] * r + n[13] * s, this.z = n[2] * e + n[6] * i + n[10] * r + n[14] * s, this.w = n[3] * e + n[7] * i + n[11] * r + n[15] * s, this;
    }
    divide(t) {
      return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
    }
    divideScalar(t) {
      return this.multiplyScalar(1 / t);
    }
    setAxisAngleFromQuaternion(t) {
      this.w = 2 * Math.acos(t.w);
      const e = Math.sqrt(1 - t.w * t.w);
      return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
    }
    setAxisAngleFromRotationMatrix(t) {
      let e, i, r, s;
      const n = 0.01, a = 0.1, o = t.elements, h = o[0], l = o[4], c = o[8], u = o[1], p = o[5], d = o[9], m = o[2], y = o[6], f = o[10];
      if (Math.abs(l - u) < n && Math.abs(c - m) < n && Math.abs(d - y) < n) {
        if (Math.abs(l + u) < a && Math.abs(c + m) < a && Math.abs(d + y) < a && Math.abs(h + p + f - 3) < a) return this.set(1, 0, 0, 0), this;
        e = Math.PI;
        const t2 = (h + 1) / 2, o2 = (p + 1) / 2, g2 = (f + 1) / 2, x = (l + u) / 4, _ = (c + m) / 4, v = (d + y) / 4;
        return t2 > o2 && t2 > g2 ? t2 < n ? (i = 0, r = 0.707106781, s = 0.707106781) : (i = Math.sqrt(t2), r = x / i, s = _ / i) : o2 > g2 ? o2 < n ? (i = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(o2), i = x / r, s = v / r) : g2 < n ? (i = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(g2), i = _ / s, r = v / s), this.set(i, r, s, e), this;
      }
      let g = Math.sqrt((y - d) * (y - d) + (c - m) * (c - m) + (u - l) * (u - l));
      return Math.abs(g) < 1e-3 && (g = 1), this.x = (y - d) / g, this.y = (c - m) / g, this.z = (u - l) / g, this.w = Math.acos((h + p + f - 1) / 2), this;
    }
    setFromMatrixPosition(t) {
      const e = t.elements;
      return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
    }
    min(t) {
      return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
    }
    max(t) {
      return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
    }
    clamp(t, e) {
      return this.x = clamp(this.x, t.x, e.x), this.y = clamp(this.y, t.y, e.y), this.z = clamp(this.z, t.z, e.z), this.w = clamp(this.w, t.w, e.w), this;
    }
    clampScalar(t, e) {
      return this.x = clamp(this.x, t, e), this.y = clamp(this.y, t, e), this.z = clamp(this.z, t, e), this.w = clamp(this.w, t, e), this;
    }
    clampLength(t, e) {
      const i = this.length();
      return this.divideScalar(i || 1).multiplyScalar(clamp(i, t, e));
    }
    floor() {
      return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
    }
    ceil() {
      return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
    }
    round() {
      return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
    }
    roundToZero() {
      return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
    }
    negate() {
      return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
    }
    dot(t) {
      return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
    }
    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
    normalize() {
      return this.divideScalar(this.length() || 1);
    }
    setLength(t) {
      return this.normalize().multiplyScalar(t);
    }
    lerp(t, e) {
      return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
    }
    lerpVectors(t, e, i) {
      return this.x = t.x + (e.x - t.x) * i, this.y = t.y + (e.y - t.y) * i, this.z = t.z + (e.z - t.z) * i, this.w = t.w + (e.w - t.w) * i, this;
    }
    equals(t) {
      return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
    }
    fromArray(t, e = 0) {
      return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
    }
    fromBufferAttribute(t, e) {
      return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
    }
    random() {
      return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
    }
    *[Symbol.iterator]() {
      yield this.x, yield this.y, yield this.z, yield this.w;
    }
  };
  _Vector4.prototype.isVector4 = true;
  var Vector4 = _Vector4;
  var RenderTarget = class extends EventDispatcher {
    constructor(t = 1, e = 1, i = {}) {
      super(), i = Object.assign({ generateMipmaps: false, internalFormat: null, minFilter: 1006, depthBuffer: true, stencilBuffer: false, resolveColorBuffer: true, resolveDepthBuffer: true, resolveStencilBuffer: true, storeMultisampledColorBuffer: true, storeMultisampledDepthBuffer: true, storeMultisampledStencilBuffer: true, depthTexture: null, samples: 0, count: 1, depth: 1, multiview: false, useArrayDepthTexture: false }, i), this.isRenderTarget = true, this.width = t, this.height = e, this.depth = i.depth, this.scissor = new Vector4(0, 0, t, e), this.scissorTest = false, this.viewport = new Vector4(0, 0, t, e), this.textures = [];
      const r = { width: t, height: e, depth: i.depth }, s = new Texture(r), n = i.count;
      for (let t2 = 0; t2 < n; t2++) this.textures[t2] = s.clone(), this.textures[t2].isRenderTargetTexture = true, this.textures[t2].renderTarget = this;
      this._setTextureOptions(i), this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveColorBuffer = i.resolveColorBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this.storeMultisampledColorBuffer = i.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = i.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = i.storeMultisampledStencilBuffer, this._depthTexture = null, this.depthTexture = i.depthTexture, this.samples = i.samples, this.multiview = i.multiview, this.useArrayDepthTexture = i.useArrayDepthTexture;
    }
    _setTextureOptions(t = {}) {
      const e = { minFilter: 1006, generateMipmaps: false, flipY: false, internalFormat: null };
      void 0 !== t.mapping && (e.mapping = t.mapping), void 0 !== t.wrapS && (e.wrapS = t.wrapS), void 0 !== t.wrapT && (e.wrapT = t.wrapT), void 0 !== t.wrapR && (e.wrapR = t.wrapR), void 0 !== t.magFilter && (e.magFilter = t.magFilter), void 0 !== t.minFilter && (e.minFilter = t.minFilter), void 0 !== t.format && (e.format = t.format), void 0 !== t.type && (e.type = t.type), void 0 !== t.anisotropy && (e.anisotropy = t.anisotropy), void 0 !== t.colorSpace && (e.colorSpace = t.colorSpace), void 0 !== t.flipY && (e.flipY = t.flipY), void 0 !== t.generateMipmaps && (e.generateMipmaps = t.generateMipmaps), void 0 !== t.internalFormat && (e.internalFormat = t.internalFormat);
      for (let t2 = 0; t2 < this.textures.length; t2++) {
        this.textures[t2].setValues(e);
      }
    }
    get texture() {
      return this.textures[0];
    }
    set texture(t) {
      this.textures[0] = t;
    }
    set depthTexture(t) {
      null !== this._depthTexture && this._depthTexture.renderTarget === this && (this._depthTexture.renderTarget = null), null !== t && null === t.renderTarget && (t.renderTarget = this), this._depthTexture = t;
    }
    get depthTexture() {
      return this._depthTexture;
    }
    setSize(t, e, i = 1) {
      if (this.width !== t || this.height !== e || this.depth !== i) {
        this.width = t, this.height = e, this.depth = i;
        for (let r = 0, s = this.textures.length; r < s; r++) this.textures[r].image.width = t, this.textures[r].image.height = e, this.textures[r].image.depth = i, true !== this.textures[r].isData3DTexture && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
        this.dispose();
      }
      this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
      for (let e = 0, i = t.textures.length; e < i; e++) {
        this.textures[e] = t.textures[e].clone(), this.textures[e].isRenderTargetTexture = true, this.textures[e].renderTarget = this;
        const i2 = Object.assign({}, t.textures[e].image);
        this.textures[e].source = new TextureSource(i2);
      }
      if (this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveColorBuffer = t.resolveColorBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, this.storeMultisampledColorBuffer = t.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = t.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = t.storeMultisampledStencilBuffer, null !== t.depthTexture) if (t.depthTexture.renderTarget === t) {
        const e = t.depthTexture.clone();
        e.renderTarget = null, this.depthTexture = e;
      } else this.depthTexture = t.depthTexture;
      return this.samples = t.samples, this.multiview = t.multiview, this.useArrayDepthTexture = t.useArrayDepthTexture, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  var WebGLRenderTarget = class extends RenderTarget {
    constructor(t = 1, e = 1, i = {}) {
      super(t, e, i), this.isWebGLRenderTarget = true;
    }
  };
  var DataArrayTexture = class extends Texture {
    constructor(t = null, e = 1, i = 1, r = 1) {
      super(null), this.isDataArrayTexture = true, this.image = { data: t, width: e, height: i, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
    }
    copy(t) {
      return super.copy(t), this.wrapR = t.wrapR, this;
    }
    addLayerUpdate(t) {
      this.layerUpdates.add(t);
    }
    clearLayerUpdates() {
      this.layerUpdates.clear();
    }
  };
  var Data3DTexture = class extends Texture {
    constructor(t = null, e = 1, i = 1, r = 1) {
      super(null), this.isData3DTexture = true, this.image = { data: t, width: e, height: i, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
    copy(t) {
      return super.copy(t), this.wrapR = t.wrapR, this;
    }
  };
  var _Matrix4 = class _Matrix4 {
    constructor(t, e, i, r, s, n, a, o, h, l, c, u, p, d, m, y) {
      this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], void 0 !== t && this.set(t, e, i, r, s, n, a, o, h, l, c, u, p, d, m, y);
    }
    set(t, e, i, r, s, n, a, o, h, l, c, u, p, d, m, y) {
      const f = this.elements;
      return f[0] = t, f[4] = e, f[8] = i, f[12] = r, f[1] = s, f[5] = n, f[9] = a, f[13] = o, f[2] = h, f[6] = l, f[10] = c, f[14] = u, f[3] = p, f[7] = d, f[11] = m, f[15] = y, this;
    }
    identity() {
      return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    clone() {
      return new _Matrix4().fromArray(this.elements);
    }
    copy(t) {
      const e = this.elements, i = t.elements;
      return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], e[6] = i[6], e[7] = i[7], e[8] = i[8], e[9] = i[9], e[10] = i[10], e[11] = i[11], e[12] = i[12], e[13] = i[13], e[14] = i[14], e[15] = i[15], this;
    }
    copyPosition(t) {
      const e = this.elements, i = t.elements;
      return e[12] = i[12], e[13] = i[13], e[14] = i[14], this;
    }
    setFromMatrix3(t) {
      const e = t.elements;
      return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this;
    }
    extractBasis(t, e, i) {
      return 0 === this.determinantAffine() ? (t.set(1, 0, 0), e.set(0, 1, 0), i.set(0, 0, 1), this) : (t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this);
    }
    makeBasis(t, e, i) {
      return this.set(t.x, e.x, i.x, 0, t.y, e.y, i.y, 0, t.z, e.z, i.z, 0, 0, 0, 0, 1), this;
    }
    extractRotation(t) {
      if (0 === t.determinantAffine()) return this.identity();
      const e = this.elements, i = t.elements, r = 1 / _v1$7.setFromMatrixColumn(t, 0).length(), s = 1 / _v1$7.setFromMatrixColumn(t, 1).length(), n = 1 / _v1$7.setFromMatrixColumn(t, 2).length();
      return e[0] = i[0] * r, e[1] = i[1] * r, e[2] = i[2] * r, e[3] = 0, e[4] = i[4] * s, e[5] = i[5] * s, e[6] = i[6] * s, e[7] = 0, e[8] = i[8] * n, e[9] = i[9] * n, e[10] = i[10] * n, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }
    makeRotationFromEuler(t) {
      const e = this.elements, i = t.x, r = t.y, s = t.z, n = Math.cos(i), a = Math.sin(i), o = Math.cos(r), h = Math.sin(r), l = Math.cos(s), c = Math.sin(s);
      if ("XYZ" === t.order) {
        const t2 = n * l, i2 = n * c, r2 = a * l, s2 = a * c;
        e[0] = o * l, e[4] = -o * c, e[8] = h, e[1] = i2 + r2 * h, e[5] = t2 - s2 * h, e[9] = -a * o, e[2] = s2 - t2 * h, e[6] = r2 + i2 * h, e[10] = n * o;
      } else if ("YXZ" === t.order) {
        const t2 = o * l, i2 = o * c, r2 = h * l, s2 = h * c;
        e[0] = t2 + s2 * a, e[4] = r2 * a - i2, e[8] = n * h, e[1] = n * c, e[5] = n * l, e[9] = -a, e[2] = i2 * a - r2, e[6] = s2 + t2 * a, e[10] = n * o;
      } else if ("ZXY" === t.order) {
        const t2 = o * l, i2 = o * c, r2 = h * l, s2 = h * c;
        e[0] = t2 - s2 * a, e[4] = -n * c, e[8] = r2 + i2 * a, e[1] = i2 + r2 * a, e[5] = n * l, e[9] = s2 - t2 * a, e[2] = -n * h, e[6] = a, e[10] = n * o;
      } else if ("ZYX" === t.order) {
        const t2 = n * l, i2 = n * c, r2 = a * l, s2 = a * c;
        e[0] = o * l, e[4] = r2 * h - i2, e[8] = t2 * h + s2, e[1] = o * c, e[5] = s2 * h + t2, e[9] = i2 * h - r2, e[2] = -h, e[6] = a * o, e[10] = n * o;
      } else if ("YZX" === t.order) {
        const t2 = n * o, i2 = n * h, r2 = a * o, s2 = a * h;
        e[0] = o * l, e[4] = s2 - t2 * c, e[8] = r2 * c + i2, e[1] = c, e[5] = n * l, e[9] = -a * l, e[2] = -h * l, e[6] = i2 * c + r2, e[10] = t2 - s2 * c;
      } else if ("XZY" === t.order) {
        const t2 = n * o, i2 = n * h, r2 = a * o, s2 = a * h;
        e[0] = o * l, e[4] = -c, e[8] = h * l, e[1] = t2 * c + s2, e[5] = n * l, e[9] = i2 * c - r2, e[2] = r2 * c - i2, e[6] = a * l, e[10] = s2 * c + t2;
      }
      return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
    }
    makeRotationFromQuaternion(t) {
      return this.compose(_zero, t, _one);
    }
    lookAt(t, e, i) {
      const r = this.elements;
      return _z.subVectors(t, e), 0 === _z.lengthSq() && (_z.z = 1), _z.normalize(), _x.crossVectors(i, _z), 0 === _x.lengthSq() && (1 === Math.abs(i.z) ? _z.x += 1e-4 : _z.z += 1e-4, _z.normalize(), _x.crossVectors(i, _z)), _x.normalize(), _y.crossVectors(_z, _x), r[0] = _x.x, r[4] = _y.x, r[8] = _z.x, r[1] = _x.y, r[5] = _y.y, r[9] = _z.y, r[2] = _x.z, r[6] = _y.z, r[10] = _z.z, this;
    }
    multiply(t) {
      return this.multiplyMatrices(this, t);
    }
    premultiply(t) {
      return this.multiplyMatrices(t, this);
    }
    multiplyMatrices(t, e) {
      const i = t.elements, r = e.elements, s = this.elements, n = i[0], a = i[4], o = i[8], h = i[12], l = i[1], c = i[5], u = i[9], p = i[13], d = i[2], m = i[6], y = i[10], f = i[14], g = i[3], x = i[7], _ = i[11], v = i[15], b = r[0], M = r[4], w = r[8], S = r[12], A = r[1], T = r[5], C = r[9], B = r[13], I = r[2], z = r[6], V = r[10], P = r[14], R = r[3], F = r[7], L = r[11], E = r[15];
      return s[0] = n * b + a * A + o * I + h * R, s[4] = n * M + a * T + o * z + h * F, s[8] = n * w + a * C + o * V + h * L, s[12] = n * S + a * B + o * P + h * E, s[1] = l * b + c * A + u * I + p * R, s[5] = l * M + c * T + u * z + p * F, s[9] = l * w + c * C + u * V + p * L, s[13] = l * S + c * B + u * P + p * E, s[2] = d * b + m * A + y * I + f * R, s[6] = d * M + m * T + y * z + f * F, s[10] = d * w + m * C + y * V + f * L, s[14] = d * S + m * B + y * P + f * E, s[3] = g * b + x * A + _ * I + v * R, s[7] = g * M + x * T + _ * z + v * F, s[11] = g * w + x * C + _ * V + v * L, s[15] = g * S + x * B + _ * P + v * E, this;
    }
    multiplyScalar(t) {
      const e = this.elements;
      return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
    }
    determinant() {
      const t = this.elements, e = t[0], i = t[4], r = t[8], s = t[12], n = t[1], a = t[5], o = t[9], h = t[13], l = t[2], c = t[6], u = t[10], p = t[14], d = t[3], m = t[7], y = t[11], f = t[15], g = o * p - h * u, x = a * p - h * c, _ = a * u - o * c, v = n * p - h * l, b = n * u - o * l, M = n * c - a * l;
      return e * (m * g - y * x + f * _) - i * (d * g - y * v + f * b) + r * (d * x - m * v + f * M) - s * (d * _ - m * b + y * M);
    }
    determinantAffine() {
      const t = this.elements, e = t[0], i = t[4], r = t[8], s = t[1], n = t[5], a = t[9], o = t[2], h = t[6], l = t[10];
      return e * (n * l - a * h) - i * (s * l - a * o) + r * (s * h - n * o);
    }
    transpose() {
      const t = this.elements;
      let e;
      return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
    }
    setPosition(t, e, i) {
      const r = this.elements;
      return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = e, r[14] = i), this;
    }
    invert() {
      const t = this.elements, e = t[0], i = t[1], r = t[2], s = t[3], n = t[4], a = t[5], o = t[6], h = t[7], l = t[8], c = t[9], u = t[10], p = t[11], d = t[12], m = t[13], y = t[14], f = t[15], g = e * a - i * n, x = e * o - r * n, _ = e * h - s * n, v = i * o - r * a, b = i * h - s * a, M = r * h - s * o, w = l * m - c * d, S = l * y - u * d, A = l * f - p * d, T = c * y - u * m, C = c * f - p * m, B = u * f - p * y, I = g * B - x * C + _ * T + v * A - b * S + M * w;
      if (0 === I) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      const z = 1 / I;
      return t[0] = (a * B - o * C + h * T) * z, t[1] = (r * C - i * B - s * T) * z, t[2] = (m * M - y * b + f * v) * z, t[3] = (u * b - c * M - p * v) * z, t[4] = (o * A - n * B - h * S) * z, t[5] = (e * B - r * A + s * S) * z, t[6] = (y * _ - d * M - f * x) * z, t[7] = (l * M - u * _ + p * x) * z, t[8] = (n * C - a * A + h * w) * z, t[9] = (i * A - e * C - s * w) * z, t[10] = (d * b - m * _ + f * g) * z, t[11] = (c * _ - l * b - p * g) * z, t[12] = (a * S - n * T - o * w) * z, t[13] = (e * T - i * S + r * w) * z, t[14] = (m * x - d * v - y * g) * z, t[15] = (l * v - c * x + u * g) * z, this;
    }
    scale(t) {
      const e = this.elements, i = t.x, r = t.y, s = t.z;
      return e[0] *= i, e[4] *= r, e[8] *= s, e[1] *= i, e[5] *= r, e[9] *= s, e[2] *= i, e[6] *= r, e[10] *= s, e[3] *= i, e[7] *= r, e[11] *= s, this;
    }
    getMaxScaleOnAxis() {
      const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
      return Math.sqrt(Math.max(e, i, r));
    }
    makeTranslation(t, e, i) {
      return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1), this;
    }
    makeRotationX(t) {
      const e = Math.cos(t), i = Math.sin(t);
      return this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationY(t) {
      const e = Math.cos(t), i = Math.sin(t);
      return this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this;
    }
    makeRotationZ(t) {
      const e = Math.cos(t), i = Math.sin(t);
      return this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
    }
    makeRotationAxis(t, e) {
      const i = Math.cos(e), r = Math.sin(e), s = 1 - i, n = t.x, a = t.y, o = t.z, h = s * n, l = s * a;
      return this.set(h * n + i, h * a - r * o, h * o + r * a, 0, h * a + r * o, l * a + i, l * o - r * n, 0, h * o - r * a, l * o + r * n, s * o * o + i, 0, 0, 0, 0, 1), this;
    }
    makeScale(t, e, i) {
      return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
    }
    makeShear(t, e, i, r, s, n) {
      return this.set(1, i, s, 0, t, 1, n, 0, e, r, 1, 0, 0, 0, 0, 1), this;
    }
    compose(t, e, i) {
      const r = this.elements, s = e._x, n = e._y, a = e._z, o = e._w, h = s + s, l = n + n, c = a + a, u = s * h, p = s * l, d = s * c, m = n * l, y = n * c, f = a * c, g = o * h, x = o * l, _ = o * c, v = i.x, b = i.y, M = i.z;
      return r[0] = (1 - (m + f)) * v, r[1] = (p + _) * v, r[2] = (d - x) * v, r[3] = 0, r[4] = (p - _) * b, r[5] = (1 - (u + f)) * b, r[6] = (y + g) * b, r[7] = 0, r[8] = (d + x) * M, r[9] = (y - g) * M, r[10] = (1 - (u + m)) * M, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
    }
    decompose(t, e, i) {
      const r = this.elements;
      t.x = r[12], t.y = r[13], t.z = r[14];
      const s = this.determinantAffine();
      if (0 === s) return i.set(1, 1, 1), e.identity(), this;
      let n = _v1$7.set(r[0], r[1], r[2]).length();
      const a = _v1$7.set(r[4], r[5], r[6]).length(), o = _v1$7.set(r[8], r[9], r[10]).length();
      s < 0 && (n = -n), _m1$2.copy(this);
      const h = 1 / n, l = 1 / a, c = 1 / o;
      return _m1$2.elements[0] *= h, _m1$2.elements[1] *= h, _m1$2.elements[2] *= h, _m1$2.elements[4] *= l, _m1$2.elements[5] *= l, _m1$2.elements[6] *= l, _m1$2.elements[8] *= c, _m1$2.elements[9] *= c, _m1$2.elements[10] *= c, e.setFromRotationMatrix(_m1$2), i.x = n, i.y = a, i.z = o, this;
    }
    makePerspective(t, e, i, r, s, n, a = 2e3, o = false) {
      const h = this.elements, l = 2 * s / (e - t), c = 2 * s / (i - r), u = (e + t) / (e - t), p = (i + r) / (i - r);
      let d, m;
      if (o) d = s / (n - s), m = n * s / (n - s);
      else if (2e3 === a) d = -(n + s) / (n - s), m = -2 * n * s / (n - s);
      else {
        if (2001 !== a) throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
        d = -n / (n - s), m = -n * s / (n - s);
      }
      return h[0] = l, h[4] = 0, h[8] = u, h[12] = 0, h[1] = 0, h[5] = c, h[9] = p, h[13] = 0, h[2] = 0, h[6] = 0, h[10] = d, h[14] = m, h[3] = 0, h[7] = 0, h[11] = -1, h[15] = 0, this;
    }
    makeOrthographic(t, e, i, r, s, n, a = 2e3, o = false) {
      const h = this.elements, l = 2 / (e - t), c = 2 / (i - r), u = -(e + t) / (e - t), p = -(i + r) / (i - r);
      let d, m;
      if (o) d = 1 / (n - s), m = n / (n - s);
      else if (2e3 === a) d = -2 / (n - s), m = -(n + s) / (n - s);
      else {
        if (2001 !== a) throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
        d = -1 / (n - s), m = -s / (n - s);
      }
      return h[0] = l, h[4] = 0, h[8] = 0, h[12] = u, h[1] = 0, h[5] = c, h[9] = 0, h[13] = p, h[2] = 0, h[6] = 0, h[10] = d, h[14] = m, h[3] = 0, h[7] = 0, h[11] = 0, h[15] = 1, this;
    }
    equals(t) {
      const e = this.elements, i = t.elements;
      for (let t2 = 0; t2 < 16; t2++) if (e[t2] !== i[t2]) return false;
      return true;
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 16; i++) this.elements[i] = t[i + e];
      return this;
    }
    toArray(t = [], e = 0) {
      const i = this.elements;
      return t[e] = i[0], t[e + 1] = i[1], t[e + 2] = i[2], t[e + 3] = i[3], t[e + 4] = i[4], t[e + 5] = i[5], t[e + 6] = i[6], t[e + 7] = i[7], t[e + 8] = i[8], t[e + 9] = i[9], t[e + 10] = i[10], t[e + 11] = i[11], t[e + 12] = i[12], t[e + 13] = i[13], t[e + 14] = i[14], t[e + 15] = i[15], t;
    }
  };
  _Matrix4.prototype.isMatrix4 = true;
  var Matrix4 = _Matrix4;
  var _v1$7 = new Vector3();
  var _m1$2 = new Matrix4();
  var _zero = new Vector3(0, 0, 0);
  var _one = new Vector3(1, 1, 1);
  var _x = new Vector3();
  var _y = new Vector3();
  var _z = new Vector3();
  var _matrix$2 = new Matrix4();
  var _quaternion$4 = new Quaternion();
  var Euler = class _Euler {
    constructor(t = 0, e = 0, i = 0, r = _Euler.DEFAULT_ORDER) {
      this.isEuler = true, this._x = t, this._y = e, this._z = i, this._order = r;
    }
    get x() {
      return this._x;
    }
    set x(t) {
      this._x = t, this._onChangeCallback();
    }
    get y() {
      return this._y;
    }
    set y(t) {
      this._y = t, this._onChangeCallback();
    }
    get z() {
      return this._z;
    }
    set z(t) {
      this._z = t, this._onChangeCallback();
    }
    get order() {
      return this._order;
    }
    set order(t) {
      this._order = t, this._onChangeCallback();
    }
    set(t, e, i, r = this._order) {
      return this._x = t, this._y = e, this._z = i, this._order = r, this._onChangeCallback(), this;
    }
    clone() {
      return new this.constructor(this._x, this._y, this._z, this._order);
    }
    copy(t) {
      return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
    }
    setFromRotationMatrix(t, e = this._order, i = true) {
      const r = t.elements, s = r[0], n = r[4], a = r[8], o = r[1], h = r[5], l = r[9], c = r[2], u = r[6], p = r[10];
      switch (e) {
        case "XYZ":
          this._y = Math.asin(clamp(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-l, p), this._z = Math.atan2(-n, s)) : (this._x = Math.atan2(u, h), this._z = 0);
          break;
        case "YXZ":
          this._x = Math.asin(-clamp(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._y = Math.atan2(a, p), this._z = Math.atan2(o, h)) : (this._y = Math.atan2(-c, s), this._z = 0);
          break;
        case "ZXY":
          this._x = Math.asin(clamp(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-c, p), this._z = Math.atan2(-n, h)) : (this._y = 0, this._z = Math.atan2(o, s));
          break;
        case "ZYX":
          this._y = Math.asin(-clamp(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(u, p), this._z = Math.atan2(o, s)) : (this._x = 0, this._z = Math.atan2(-n, h));
          break;
        case "YZX":
          this._z = Math.asin(clamp(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-l, h), this._y = Math.atan2(-c, s)) : (this._x = 0, this._y = Math.atan2(a, p));
          break;
        case "XZY":
          this._z = Math.asin(-clamp(n, -1, 1)), Math.abs(n) < 0.9999999 ? (this._x = Math.atan2(u, h), this._y = Math.atan2(a, s)) : (this._x = Math.atan2(-l, p), this._y = 0);
          break;
        default:
          warn("Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
      }
      return this._order = e, true === i && this._onChangeCallback(), this;
    }
    setFromQuaternion(t, e, i) {
      return _matrix$2.makeRotationFromQuaternion(t), this.setFromRotationMatrix(_matrix$2, e, i);
    }
    setFromVector3(t, e = this._order) {
      return this.set(t.x, t.y, t.z, e);
    }
    reorder(t) {
      return _quaternion$4.setFromEuler(this), this.setFromQuaternion(_quaternion$4, t);
    }
    equals(t) {
      return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
    }
    fromArray(t) {
      return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this._onChangeCallback(), this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
    }
    _onChange(t) {
      return this._onChangeCallback = t, this;
    }
    _onChangeCallback() {
    }
    *[Symbol.iterator]() {
      yield this._x, yield this._y, yield this._z, yield this._order;
    }
  };
  Euler.DEFAULT_ORDER = "XYZ";
  var Layers = class {
    constructor() {
      this.mask = 1;
    }
    set(t) {
      this.mask = 1 << t >>> 0;
    }
    enable(t) {
      this.mask |= 1 << t;
    }
    enableAll() {
      this.mask = -1;
    }
    toggle(t) {
      this.mask ^= 1 << t;
    }
    disable(t) {
      this.mask &= ~(1 << t);
    }
    disableAll() {
      this.mask = 0;
    }
    test(t) {
      return 0 !== (this.mask & t.mask);
    }
    isEnabled(t) {
      return !!(this.mask & 1 << t);
    }
  };
  var _object3DId = 0;
  var _v1$6 = new Vector3();
  var _q1 = new Quaternion();
  var _m1$1 = new Matrix4();
  var _target = new Vector3();
  var _position$4 = new Vector3();
  var _scale$3 = new Vector3();
  var _quaternion$3 = new Quaternion();
  var _xAxis = new Vector3(1, 0, 0);
  var _yAxis = new Vector3(0, 1, 0);
  var _zAxis = new Vector3(0, 0, 1);
  var _addedEvent = { type: "added" };
  var _removedEvent = { type: "removed" };
  var _childaddedEvent = { type: "childadded", child: null };
  var _childremovedEvent = { type: "childremoved", child: null };
  var Object3D = class _Object3D extends EventDispatcher {
    constructor() {
      super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: _object3DId++ }), this.uuid = generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = _Object3D.DEFAULT_UP.clone();
      const t = new Vector3(), e = new Euler(), i = new Quaternion(), r = new Vector3(1, 1, 1);
      e._onChange(function() {
        i.setFromEuler(e, false);
      }), i._onChange(function() {
        e.setFromQuaternion(i, void 0, false);
      }), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: t }, rotation: { configurable: true, enumerable: true, value: e }, quaternion: { configurable: true, enumerable: true, value: i }, scale: { configurable: true, enumerable: true, value: r }, modelViewMatrix: { value: new Matrix4() }, normalMatrix: { value: new Matrix3() } }), this.matrix = new Matrix4(), this.matrixWorld = new Matrix4(), this.matrixAutoUpdate = _Object3D.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = _Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new Layers(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = false, this.userData = {}, this.pivot = null;
    }
    onBeforeShadow() {
    }
    onAfterShadow() {
    }
    onBeforeRender() {
    }
    onAfterRender() {
    }
    applyMatrix4(t) {
      this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
    }
    applyQuaternion(t) {
      return this.quaternion.premultiply(t), this;
    }
    setRotationFromAxisAngle(t, e) {
      this.quaternion.setFromAxisAngle(t, e);
    }
    setRotationFromEuler(t) {
      this.quaternion.setFromEuler(t, true);
    }
    setRotationFromMatrix(t) {
      this.quaternion.setFromRotationMatrix(t);
    }
    setRotationFromQuaternion(t) {
      this.quaternion.copy(t);
    }
    rotateOnAxis(t, e) {
      return _q1.setFromAxisAngle(t, e), this.quaternion.multiply(_q1), this;
    }
    rotateOnWorldAxis(t, e) {
      return _q1.setFromAxisAngle(t, e), this.quaternion.premultiply(_q1), this;
    }
    rotateX(t) {
      return this.rotateOnAxis(_xAxis, t);
    }
    rotateY(t) {
      return this.rotateOnAxis(_yAxis, t);
    }
    rotateZ(t) {
      return this.rotateOnAxis(_zAxis, t);
    }
    translateOnAxis(t, e) {
      return _v1$6.copy(t).applyQuaternion(this.quaternion), this.position.add(_v1$6.multiplyScalar(e)), this;
    }
    translateX(t) {
      return this.translateOnAxis(_xAxis, t);
    }
    translateY(t) {
      return this.translateOnAxis(_yAxis, t);
    }
    translateZ(t) {
      return this.translateOnAxis(_zAxis, t);
    }
    localToWorld(t) {
      return this.updateWorldMatrix(true, false), t.applyMatrix4(this.matrixWorld);
    }
    worldToLocal(t) {
      return this.updateWorldMatrix(true, false), t.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
    }
    lookAt(t, e, i) {
      t.isVector3 ? _target.copy(t) : _target.set(t, e, i);
      const r = this.parent;
      this.updateWorldMatrix(true, false), _position$4.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? _m1$1.lookAt(_position$4, _target, this.up) : _m1$1.lookAt(_target, _position$4, this.up), this.quaternion.setFromRotationMatrix(_m1$1), r && (_m1$1.extractRotation(r.matrixWorld), _q1.setFromRotationMatrix(_m1$1), this.quaternion.premultiply(_q1.invert()));
    }
    add(t) {
      if (arguments.length > 1) {
        for (let t2 = 0; t2 < arguments.length; t2++) this.add(arguments[t2]);
        return this;
      }
      return t === this ? (error("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(_addedEvent), _childaddedEvent.child = t, this.dispatchEvent(_childaddedEvent), _childaddedEvent.child = null) : error("Object3D.add: object not an instance of THREE.Object3D.", t), this);
    }
    remove(t) {
      if (arguments.length > 1) {
        for (let t2 = 0; t2 < arguments.length; t2++) this.remove(arguments[t2]);
        return this;
      }
      const e = this.children.indexOf(t);
      return -1 !== e && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(_removedEvent), _childremovedEvent.child = t, this.dispatchEvent(_childremovedEvent), _childremovedEvent.child = null), this;
    }
    removeFromParent() {
      const t = this.parent;
      return null !== t && t.remove(this), this;
    }
    clear() {
      return this.remove(...this.children);
    }
    attach(t) {
      return this.updateWorldMatrix(true, false), _m1$1.copy(this.matrixWorld).invert(), null !== t.parent && (t.parent.updateWorldMatrix(true, false), _m1$1.multiply(t.parent.matrixWorld)), t.applyMatrix4(_m1$1), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(false, true), t.dispatchEvent(_addedEvent), _childaddedEvent.child = t, this.dispatchEvent(_childaddedEvent), _childaddedEvent.child = null, this;
    }
    getObjectById(t) {
      return this.getObjectByProperty("id", t);
    }
    getObjectByName(t) {
      return this.getObjectByProperty("name", t);
    }
    getObjectByProperty(t, e) {
      if (this[t] === e) return this;
      for (let i = 0, r = this.children.length; i < r; i++) {
        const r2 = this.children[i].getObjectByProperty(t, e);
        if (void 0 !== r2) return r2;
      }
    }
    getObjectsByProperty(t, e, i = []) {
      this[t] === e && i.push(this);
      const r = this.children;
      for (let s = 0, n = r.length; s < n; s++) r[s].getObjectsByProperty(t, e, i);
      return i;
    }
    getWorldPosition(t) {
      return this.updateWorldMatrix(true, false), t.setFromMatrixPosition(this.matrixWorld);
    }
    getWorldQuaternion(t) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(_position$4, t, _scale$3), t;
    }
    getWorldScale(t) {
      return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(_position$4, _quaternion$3, t), t;
    }
    getWorldDirection(t) {
      this.updateWorldMatrix(true, false);
      const e = this.matrixWorld.elements;
      return t.set(e[8], e[9], e[10]).normalize();
    }
    raycast() {
    }
    intersectsFrustum() {
    }
    traverse(t) {
      t(this);
      const e = this.children;
      for (let i = 0, r = e.length; i < r; i++) e[i].traverse(t);
    }
    traverseVisible(t) {
      if (false === this.visible) return;
      t(this);
      const e = this.children;
      for (let i = 0, r = e.length; i < r; i++) e[i].traverseVisible(t);
    }
    traverseAncestors(t) {
      const e = this.parent;
      null !== e && (t(e), e.traverseAncestors(t));
    }
    updateMatrix() {
      this.matrix.compose(this.position, this.quaternion, this.scale);
      const t = this.pivot;
      if (null !== t) {
        const e = t.x, i = t.y, r = t.z, s = this.matrix.elements;
        s[12] += e - s[0] * e - s[4] * i - s[8] * r, s[13] += i - s[1] * e - s[5] * i - s[9] * r, s[14] += r - s[2] * e - s[6] * i - s[10] * r;
      }
      this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(t) {
      this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (true === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, t = true);
      const e = this.children;
      for (let i = 0, r = e.length; i < r; i++) {
        e[i].updateMatrixWorld(t);
      }
    }
    updateWorldMatrix(t, e, i = false) {
      const r = this.parent;
      if (true === t && null !== r && r.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || i) && (true === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, i = true), true === e) {
        const t2 = this.children;
        for (let e2 = 0, r2 = t2.length; e2 < r2; e2++) {
          t2[e2].updateWorldMatrix(false, true, i);
        }
      }
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t, i = {};
      e && (t = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, i.metadata = { version: 4.7, type: "Object", generator: "Object3D.toJSON" });
      const r = {};
      function s(e2, i2) {
        return void 0 === e2[i2.uuid] && (e2[i2.uuid] = i2.toJSON(t)), i2.uuid;
      }
      if (r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), null !== this.pivot && (r.pivot = this.pivot.toArray()), void 0 !== this.morphTargetDictionary && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), void 0 !== this.morphTargetInfluences && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((t2) => ({ ...t2, boundingBox: t2.boundingBox ? t2.boundingBox.toJSON() : void 0, boundingSphere: t2.boundingSphere ? t2.boundingSphere.toJSON() : void 0 })), r.instanceInfo = this._instanceInfo.map((t2) => ({ ...t2 })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(t), r.indirectTexture = this._indirectTexture.toJSON(t), null !== this._colorsTexture && (r.colorsTexture = this._colorsTexture.toJSON(t)), null !== this.boundingSphere && (r.boundingSphere = this.boundingSphere.toJSON()), null !== this.boundingBox && (r.boundingBox = this.boundingBox.toJSON())), this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && true !== this.environment.isRenderTargetTexture && (r.environment = this.environment.toJSON(t).uuid);
      else if (this.isMesh || this.isLine || this.isPoints) {
        r.geometry = s(t.geometries, this.geometry);
        const e2 = this.geometry.parameters;
        if (void 0 !== e2 && void 0 !== e2.shapes) {
          const i2 = e2.shapes;
          if (Array.isArray(i2)) for (let e3 = 0, r2 = i2.length; e3 < r2; e3++) {
            const r3 = i2[e3];
            s(t.shapes, r3);
          }
          else s(t.shapes, i2);
        }
      }
      if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), void 0 !== this.material) if (Array.isArray(this.material)) {
        const e2 = [];
        for (let i2 = 0, r2 = this.material.length; i2 < r2; i2++) e2.push(s(t.materials, this.material[i2]));
        r.material = e2;
      } else r.material = s(t.materials, this.material);
      if (this.children.length > 0) {
        r.children = [];
        for (let e2 = 0; e2 < this.children.length; e2++) r.children.push(this.children[e2].toJSON(t).object);
      }
      if (this.animations.length > 0) {
        r.animations = [];
        for (let e2 = 0; e2 < this.animations.length; e2++) {
          const i2 = this.animations[e2];
          r.animations.push(s(t.animations, i2));
        }
      }
      if (e) {
        const e2 = n(t.geometries), r2 = n(t.materials), s2 = n(t.textures), a = n(t.images), o = n(t.shapes), h = n(t.skeletons), l = n(t.animations), c = n(t.nodes);
        e2.length > 0 && (i.geometries = e2), r2.length > 0 && (i.materials = r2), s2.length > 0 && (i.textures = s2), a.length > 0 && (i.images = a), o.length > 0 && (i.shapes = o), h.length > 0 && (i.skeletons = h), l.length > 0 && (i.animations = l), c.length > 0 && (i.nodes = c);
      }
      return i.object = r, i;
      function n(t2) {
        const e2 = [];
        for (const i2 in t2) {
          const r2 = t2[i2];
          delete r2.metadata, e2.push(r2);
        }
        return e2;
      }
    }
    clone(t) {
      return new this.constructor().copy(this, t);
    }
    copy(t, e = true) {
      if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.pivot = null !== t.pivot ? t.pivot.clone() : null, this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.static = t.static, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), true === e) for (let e2 = 0; e2 < t.children.length; e2++) {
        const i = t.children[e2];
        this.add(i.clone());
      }
      return this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  Object3D.DEFAULT_UP = new Vector3(0, 1, 0), Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true, Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
  var Group = class extends Object3D {
    constructor() {
      super(), this.isGroup = true, this.type = "Group";
    }
  };
  var _moveEvent = { type: "move" };
  var WebXRController = class {
    constructor() {
      this._targetRay = null, this._grip = null, this._hand = null;
    }
    getHandSpace() {
      return null === this._hand && (this._hand = new Group(), this._hand.matrixAutoUpdate = false, this._hand.visible = false, this._hand.joints = {}, this._hand.inputState = { pinching: false }), this._hand;
    }
    getTargetRaySpace() {
      return null === this._targetRay && (this._targetRay = new Group(), this._targetRay.matrixAutoUpdate = false, this._targetRay.visible = false, this._targetRay.hasLinearVelocity = false, this._targetRay.linearVelocity = new Vector3(), this._targetRay.hasAngularVelocity = false, this._targetRay.angularVelocity = new Vector3()), this._targetRay;
    }
    getGripSpace() {
      return null === this._grip && (this._grip = new Group(), this._grip.matrixAutoUpdate = false, this._grip.visible = false, this._grip.hasLinearVelocity = false, this._grip.linearVelocity = new Vector3(), this._grip.hasAngularVelocity = false, this._grip.angularVelocity = new Vector3(), this._grip.eventsEnabled = false), this._grip;
    }
    dispatchEvent(t) {
      return null !== this._targetRay && this._targetRay.dispatchEvent(t), null !== this._grip && this._grip.dispatchEvent(t), null !== this._hand && this._hand.dispatchEvent(t), this;
    }
    connect(t) {
      if (t && t.hand) {
        const e = this._hand;
        if (e) for (const i of t.hand.values()) this._getHandJoint(e, i);
      }
      return this.dispatchEvent({ type: "connected", data: t }), this;
    }
    disconnect(t) {
      return this.dispatchEvent({ type: "disconnected", data: t }), null !== this._targetRay && (this._targetRay.visible = false), null !== this._grip && (this._grip.visible = false), null !== this._hand && (this._hand.visible = false), this;
    }
    update(t, e, i) {
      let r = null, s = null, n = null;
      const a = this._targetRay, o = this._grip, h = this._hand;
      if (t && "visible-blurred" !== e.session.visibilityState) {
        if (h && t.hand) {
          n = true;
          for (const r3 of t.hand.values()) {
            const t2 = e.getJointPose(r3, i), s3 = this._getHandJoint(h, r3);
            null !== t2 && (s3.matrix.fromArray(t2.transform.matrix), s3.matrix.decompose(s3.position, s3.rotation, s3.scale), s3.matrixWorldNeedsUpdate = true, s3.jointRadius = t2.radius), s3.visible = null !== t2;
          }
          const r2 = h.joints["index-finger-tip"], s2 = h.joints["thumb-tip"], a2 = r2.position.distanceTo(s2.position), o2 = 0.02, l = 5e-3;
          h.inputState.pinching && a2 > o2 + l ? (h.inputState.pinching = false, this.dispatchEvent({ type: "pinchend", handedness: t.handedness, target: this })) : !h.inputState.pinching && a2 <= o2 - l && (h.inputState.pinching = true, this.dispatchEvent({ type: "pinchstart", handedness: t.handedness, target: this }));
        } else null !== o && t.gripSpace && (s = e.getPose(t.gripSpace, i), null !== s && (o.matrix.fromArray(s.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = true, s.linearVelocity ? (o.hasLinearVelocity = true, o.linearVelocity.copy(s.linearVelocity)) : o.hasLinearVelocity = false, s.angularVelocity ? (o.hasAngularVelocity = true, o.angularVelocity.copy(s.angularVelocity)) : o.hasAngularVelocity = false, o.eventsEnabled && o.dispatchEvent({ type: "gripUpdated", data: t, target: this })));
        null !== a && (r = e.getPose(t.targetRaySpace, i), null === r && null !== s && (r = s), null !== r && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = true, r.linearVelocity ? (a.hasLinearVelocity = true, a.linearVelocity.copy(r.linearVelocity)) : a.hasLinearVelocity = false, r.angularVelocity ? (a.hasAngularVelocity = true, a.angularVelocity.copy(r.angularVelocity)) : a.hasAngularVelocity = false, this.dispatchEvent(_moveEvent)));
      }
      return null !== a && (a.visible = null !== r), null !== o && (o.visible = null !== s), null !== h && (h.visible = null !== n), this;
    }
    _getHandJoint(t, e) {
      if (void 0 === t.joints[e.jointName]) {
        const i = new Group();
        i.matrixAutoUpdate = false, i.visible = false, t.joints[e.jointName] = i, t.add(i);
      }
      return t.joints[e.jointName];
    }
  };
  var _colorKeywords = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
  var _hslA = { h: 0, s: 0, l: 0 };
  var _hslB = { h: 0, s: 0, l: 0 };
  function hue2rgb(t, e, i) {
    return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < 0.5 ? e : i < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - i) : t;
  }
  var Color = class {
    constructor(t, e, i) {
      return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, i);
    }
    set(t, e, i) {
      if (void 0 === e && void 0 === i) {
        const e2 = t;
        e2 && e2.isColor ? this.copy(e2) : "number" == typeof e2 ? this.setHex(e2) : "string" == typeof e2 && this.setStyle(e2);
      } else this.setRGB(t, e, i);
      return this;
    }
    setScalar(t) {
      return this.r = t, this.g = t, this.b = t, this;
    }
    setHex(t, e = "srgb") {
      return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, ColorManagement.colorSpaceToWorking(this, e), this;
    }
    setRGB(t, e, i, r = ColorManagement.workingColorSpace) {
      return this.r = t, this.g = e, this.b = i, ColorManagement.colorSpaceToWorking(this, r), this;
    }
    setHSL(t, e, i, r = ColorManagement.workingColorSpace) {
      if (t = euclideanModulo(t, 1), e = clamp(e, 0, 1), i = clamp(i, 0, 1), 0 === e) this.r = this.g = this.b = i;
      else {
        const r2 = i <= 0.5 ? i * (1 + e) : i + e - i * e, s = 2 * i - r2;
        this.r = hue2rgb(s, r2, t + 1 / 3), this.g = hue2rgb(s, r2, t), this.b = hue2rgb(s, r2, t - 1 / 3);
      }
      return ColorManagement.colorSpaceToWorking(this, r), this;
    }
    setStyle(t, e = "srgb") {
      function i(e2) {
        void 0 !== e2 && parseFloat(e2) < 1 && warn("Color: Alpha component of " + t + " will be ignored.");
      }
      let r;
      if (r = /^(\w+)\(([^\)]*)\)/.exec(t)) {
        let s;
        const n = r[1], a = r[2];
        switch (n) {
          case "rgb":
          case "rgba":
            if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return i(s[4]), this.setRGB(Math.min(255, parseInt(s[1], 10)) / 255, Math.min(255, parseInt(s[2], 10)) / 255, Math.min(255, parseInt(s[3], 10)) / 255, e);
            if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return i(s[4]), this.setRGB(Math.min(100, parseInt(s[1], 10)) / 100, Math.min(100, parseInt(s[2], 10)) / 100, Math.min(100, parseInt(s[3], 10)) / 100, e);
            break;
          case "hsl":
          case "hsla":
            if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return i(s[4]), this.setHSL(parseFloat(s[1]) / 360, parseFloat(s[2]) / 100, parseFloat(s[3]) / 100, e);
            break;
          default:
            warn("Color: Unknown color model " + t);
        }
      } else if (r = /^\#([A-Fa-f\d]+)$/.exec(t)) {
        const i2 = r[1], s = i2.length;
        if (3 === s) return this.setRGB(parseInt(i2.charAt(0), 16) / 15, parseInt(i2.charAt(1), 16) / 15, parseInt(i2.charAt(2), 16) / 15, e);
        if (6 === s) return this.setHex(parseInt(i2, 16), e);
        warn("Color: Invalid hex color " + t);
      } else if (t && t.length > 0) return this.setColorName(t, e);
      return this;
    }
    setColorName(t, e = "srgb") {
      const i = _colorKeywords[t.toLowerCase()];
      return void 0 !== i ? this.setHex(i, e) : warn("Color: Unknown color " + t), this;
    }
    clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
    copy(t) {
      return this.r = t.r, this.g = t.g, this.b = t.b, this;
    }
    copySRGBToLinear(t) {
      return this.r = SRGBToLinear(t.r), this.g = SRGBToLinear(t.g), this.b = SRGBToLinear(t.b), this;
    }
    copyLinearToSRGB(t) {
      return this.r = LinearToSRGB(t.r), this.g = LinearToSRGB(t.g), this.b = LinearToSRGB(t.b), this;
    }
    convertSRGBToLinear() {
      return this.copySRGBToLinear(this), this;
    }
    convertLinearToSRGB() {
      return this.copyLinearToSRGB(this), this;
    }
    getHex(t = "srgb") {
      return ColorManagement.workingToColorSpace(_color.copy(this), t), 65536 * Math.round(clamp(255 * _color.r, 0, 255)) + 256 * Math.round(clamp(255 * _color.g, 0, 255)) + Math.round(clamp(255 * _color.b, 0, 255));
    }
    getHexString(t = "srgb") {
      return ("000000" + this.getHex(t).toString(16)).slice(-6);
    }
    getHSL(t, e = ColorManagement.workingColorSpace) {
      ColorManagement.workingToColorSpace(_color.copy(this), e);
      const i = _color.r, r = _color.g, s = _color.b, n = Math.max(i, r, s), a = Math.min(i, r, s);
      let o, h;
      const l = (a + n) / 2;
      if (a === n) o = 0, h = 0;
      else {
        const t2 = n - a;
        switch (h = l <= 0.5 ? t2 / (n + a) : t2 / (2 - n - a), n) {
          case i:
            o = (r - s) / t2 + (r < s ? 6 : 0);
            break;
          case r:
            o = (s - i) / t2 + 2;
            break;
          case s:
            o = (i - r) / t2 + 4;
        }
        o /= 6;
      }
      return t.h = o, t.s = h, t.l = l, t;
    }
    getRGB(t, e = ColorManagement.workingColorSpace) {
      return ColorManagement.workingToColorSpace(_color.copy(this), e), t.r = _color.r, t.g = _color.g, t.b = _color.b, t;
    }
    getStyle(t = "srgb") {
      ColorManagement.workingToColorSpace(_color.copy(this), t);
      const e = _color.r, i = _color.g, r = _color.b;
      return "srgb" !== t ? `color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(255 * e)},${Math.round(255 * i)},${Math.round(255 * r)})`;
    }
    offsetHSL(t, e, i) {
      return this.getHSL(_hslA), this.setHSL(_hslA.h + t, _hslA.s + e, _hslA.l + i);
    }
    add(t) {
      return this.r += t.r, this.g += t.g, this.b += t.b, this;
    }
    addColors(t, e) {
      return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
    }
    addScalar(t) {
      return this.r += t, this.g += t, this.b += t, this;
    }
    sub(t) {
      return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
    }
    multiply(t) {
      return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
    }
    multiplyScalar(t) {
      return this.r *= t, this.g *= t, this.b *= t, this;
    }
    lerp(t, e) {
      return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
    }
    lerpColors(t, e, i) {
      return this.r = t.r + (e.r - t.r) * i, this.g = t.g + (e.g - t.g) * i, this.b = t.b + (e.b - t.b) * i, this;
    }
    lerpHSL(t, e) {
      this.getHSL(_hslA), t.getHSL(_hslB);
      const i = lerp(_hslA.h, _hslB.h, e), r = lerp(_hslA.s, _hslB.s, e), s = lerp(_hslA.l, _hslB.l, e);
      return this.setHSL(i, r, s), this;
    }
    setFromVector3(t) {
      return this.r = t.x, this.g = t.y, this.b = t.z, this;
    }
    applyMatrix3(t) {
      const e = this.r, i = this.g, r = this.b, s = t.elements;
      return this.r = s[0] * e + s[3] * i + s[6] * r, this.g = s[1] * e + s[4] * i + s[7] * r, this.b = s[2] * e + s[5] * i + s[8] * r, this;
    }
    equals(t) {
      return t.r === this.r && t.g === this.g && t.b === this.b;
    }
    fromArray(t, e = 0) {
      return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
    }
    toArray(t = [], e = 0) {
      return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
    }
    fromBufferAttribute(t, e) {
      return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
    }
    toJSON() {
      return this.getHex();
    }
    *[Symbol.iterator]() {
      yield this.r, yield this.g, yield this.b;
    }
  };
  var _color = new Color();
  Color.NAMES = _colorKeywords;
  var Scene = class extends Object3D {
    constructor() {
      super(), this.isScene = true, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Euler(), this.environmentIntensity = 1, this.environmentRotation = new Euler(), this.overrideMaterial = null, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    copy(t, e) {
      return super.copy(t, e), null !== t.background && (this.background = t.background.clone()), null !== t.environment && (this.environment = t.environment.clone()), null !== t.fog && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return null !== this.fog && (e.object.fog = this.fog.toJSON()), e.object.backgroundBlurriness = this.backgroundBlurriness, e.object.backgroundIntensity = this.backgroundIntensity, e.object.backgroundRotation = this.backgroundRotation.toArray(), e.object.environmentIntensity = this.environmentIntensity, e.object.environmentRotation = this.environmentRotation.toArray(), e;
    }
  };
  var _v0$2 = new Vector3();
  var _v1$5 = new Vector3();
  var _v2$4 = new Vector3();
  var _v3$2 = new Vector3();
  var _vab = new Vector3();
  var _vac = new Vector3();
  var _vbc = new Vector3();
  var _vap = new Vector3();
  var _vbp = new Vector3();
  var _vcp = new Vector3();
  var _v40 = new Vector4();
  var _v41 = new Vector4();
  var _v42 = new Vector4();
  var Triangle = class _Triangle {
    constructor(t = new Vector3(), e = new Vector3(), i = new Vector3()) {
      this.a = t, this.b = e, this.c = i;
    }
    static getNormal(t, e, i, r) {
      r.subVectors(i, e), _v0$2.subVectors(t, e), r.cross(_v0$2);
      const s = r.lengthSq();
      return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
    }
    static getBarycoord(t, e, i, r, s) {
      _v0$2.subVectors(r, e), _v1$5.subVectors(i, e), _v2$4.subVectors(t, e);
      const n = _v0$2.dot(_v0$2), a = _v0$2.dot(_v1$5), o = _v0$2.dot(_v2$4), h = _v1$5.dot(_v1$5), l = _v1$5.dot(_v2$4), c = n * h - a * a;
      if (0 === c) return s.set(0, 0, 0), null;
      const u = 1 / c, p = (h * o - a * l) * u, d = (n * l - a * o) * u;
      return s.set(1 - p - d, d, p);
    }
    static containsPoint(t, e, i, r) {
      return null !== this.getBarycoord(t, e, i, r, _v3$2) && (_v3$2.x >= 0 && _v3$2.y >= 0 && _v3$2.x + _v3$2.y <= 1);
    }
    static getInterpolation(t, e, i, r, s, n, a, o) {
      return null === this.getBarycoord(t, e, i, r, _v3$2) ? (o.x = 0, o.y = 0, "z" in o && (o.z = 0), "w" in o && (o.w = 0), null) : (o.setScalar(0), o.addScaledVector(s, _v3$2.x), o.addScaledVector(n, _v3$2.y), o.addScaledVector(a, _v3$2.z), o);
    }
    static getInterpolatedAttribute(t, e, i, r, s, n) {
      return _v40.setScalar(0), _v41.setScalar(0), _v42.setScalar(0), _v40.fromBufferAttribute(t, e), _v41.fromBufferAttribute(t, i), _v42.fromBufferAttribute(t, r), n.setScalar(0), n.addScaledVector(_v40, s.x), n.addScaledVector(_v41, s.y), n.addScaledVector(_v42, s.z), n;
    }
    static isFrontFacing(t, e, i, r) {
      return _v0$2.subVectors(i, e), _v1$5.subVectors(t, e), _v0$2.cross(_v1$5).dot(r) < 0;
    }
    set(t, e, i) {
      return this.a.copy(t), this.b.copy(e), this.c.copy(i), this;
    }
    setFromPointsAndIndices(t, e, i, r) {
      return this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[r]), this;
    }
    setFromAttributeAndIndices(t, e, i, r) {
      return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, i), this.c.fromBufferAttribute(t, r), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
    }
    getArea() {
      return _v0$2.subVectors(this.c, this.b), _v1$5.subVectors(this.a, this.b), 0.5 * _v0$2.cross(_v1$5).length();
    }
    getMidpoint(t) {
      return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
    }
    getNormal(t) {
      return _Triangle.getNormal(this.a, this.b, this.c, t);
    }
    getPlane(t) {
      return t.setFromCoplanarPoints(this.a, this.b, this.c);
    }
    getBarycoord(t, e) {
      return _Triangle.getBarycoord(t, this.a, this.b, this.c, e);
    }
    getInterpolation(t, e, i, r, s) {
      return _Triangle.getInterpolation(t, this.a, this.b, this.c, e, i, r, s);
    }
    containsPoint(t) {
      return _Triangle.containsPoint(t, this.a, this.b, this.c);
    }
    isFrontFacing(t) {
      return _Triangle.isFrontFacing(this.a, this.b, this.c, t);
    }
    intersectsBox(t) {
      return t.intersectsTriangle(this);
    }
    closestPointToPoint(t, e) {
      const i = this.a, r = this.b, s = this.c;
      let n, a;
      _vab.subVectors(r, i), _vac.subVectors(s, i), _vap.subVectors(t, i);
      const o = _vab.dot(_vap), h = _vac.dot(_vap);
      if (o <= 0 && h <= 0) return e.copy(i);
      _vbp.subVectors(t, r);
      const l = _vab.dot(_vbp), c = _vac.dot(_vbp);
      if (l >= 0 && c <= l) return e.copy(r);
      const u = o * c - l * h;
      if (u <= 0 && o >= 0 && l <= 0) return n = o / (o - l), e.copy(i).addScaledVector(_vab, n);
      _vcp.subVectors(t, s);
      const p = _vab.dot(_vcp), d = _vac.dot(_vcp);
      if (d >= 0 && p <= d) return e.copy(s);
      const m = p * h - o * d;
      if (m <= 0 && h >= 0 && d <= 0) return a = h / (h - d), e.copy(i).addScaledVector(_vac, a);
      const y = l * d - p * c;
      if (y <= 0 && c - l >= 0 && p - d >= 0) return _vbc.subVectors(s, r), a = (c - l) / (c - l + (p - d)), e.copy(r).addScaledVector(_vbc, a);
      const f = 1 / (y + m + u);
      return n = m * f, a = u * f, e.copy(i).addScaledVector(_vab, n).addScaledVector(_vac, a);
    }
    equals(t) {
      return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
    }
  };
  var Box3 = class {
    constructor(t = new Vector3(1 / 0, 1 / 0, 1 / 0), e = new Vector3(-1 / 0, -1 / 0, -1 / 0)) {
      this.isBox3 = true, this.min = t, this.max = e;
    }
    set(t, e) {
      return this.min.copy(t), this.max.copy(e), this;
    }
    setFromArray(t) {
      this.makeEmpty();
      for (let e = 0, i = t.length; e < i; e += 3) this.expandByPoint(_vector$b.fromArray(t, e));
      return this;
    }
    setFromBufferAttribute(t) {
      this.makeEmpty();
      for (let e = 0, i = t.count; e < i; e++) this.expandByPoint(_vector$b.fromBufferAttribute(t, e));
      return this;
    }
    setFromPoints(t) {
      this.makeEmpty();
      for (let e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
      return this;
    }
    setFromCenterAndSize(t, e) {
      const i = _vector$b.copy(e).multiplyScalar(0.5);
      return this.min.copy(t).sub(i), this.max.copy(t).add(i), this;
    }
    setFromObject(t, e = false) {
      return this.makeEmpty(), this.expandByObject(t, e);
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.min.copy(t.min), this.max.copy(t.max), this;
    }
    makeEmpty() {
      return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
    }
    isEmpty() {
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
    getCenter(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
    getSize(t) {
      return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
    }
    expandByPoint(t) {
      return this.min.min(t), this.max.max(t), this;
    }
    expandByVector(t) {
      return this.min.sub(t), this.max.add(t), this;
    }
    expandByScalar(t) {
      return this.min.addScalar(-t), this.max.addScalar(t), this;
    }
    expandByObject(t, e = false) {
      t.updateWorldMatrix(false, false);
      const i = t.geometry;
      if (void 0 !== i) {
        const r2 = i.getAttribute("position");
        if (true === e && void 0 !== r2 && true !== t.isInstancedMesh) for (let e2 = 0, i2 = r2.count; e2 < i2; e2++) true === t.isMesh ? t.getVertexPosition(e2, _vector$b) : _vector$b.fromBufferAttribute(r2, e2), _vector$b.applyMatrix4(t.matrixWorld), this.expandByPoint(_vector$b);
        else void 0 !== t.boundingBox ? (null === t.boundingBox && t.computeBoundingBox(), _box$4.copy(t.boundingBox)) : (null === i.boundingBox && i.computeBoundingBox(), _box$4.copy(i.boundingBox)), _box$4.applyMatrix4(t.matrixWorld), this.union(_box$4);
      }
      const r = t.children;
      for (let t2 = 0, i2 = r.length; t2 < i2; t2++) this.expandByObject(r[t2], e);
      return this;
    }
    containsPoint(t) {
      return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
    }
    containsBox(t) {
      return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
    }
    getParameter(t, e) {
      return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z));
    }
    intersectsBox(t) {
      return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
    }
    intersectsSphere(t) {
      return this.clampPoint(t.center, _vector$b), _vector$b.distanceToSquared(t.center) <= t.radius * t.radius;
    }
    intersectsPlane(t) {
      let e, i;
      return t.normal.x > 0 ? (e = t.normal.x * this.min.x, i = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, i = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, i += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, i += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, i += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, i += t.normal.z * this.min.z), e <= -t.constant && i >= -t.constant;
    }
    intersectsTriangle(t) {
      if (this.isEmpty()) return false;
      this.getCenter(_center), _extents.subVectors(this.max, _center), _v0$1.subVectors(t.a, _center), _v1$4.subVectors(t.b, _center), _v2$3.subVectors(t.c, _center), _f0.subVectors(_v1$4, _v0$1), _f1.subVectors(_v2$3, _v1$4), _f2.subVectors(_v0$1, _v2$3);
      let e = [0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y, _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x, -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0];
      return !!satForAxes(e, _v0$1, _v1$4, _v2$3, _extents) && (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!satForAxes(e, _v0$1, _v1$4, _v2$3, _extents) && (_triangleNormal.crossVectors(_f0, _f1), e = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z], satForAxes(e, _v0$1, _v1$4, _v2$3, _extents)));
    }
    clampPoint(t, e) {
      return e.copy(t).clamp(this.min, this.max);
    }
    distanceToPoint(t) {
      return this.clampPoint(t, _vector$b).distanceTo(t);
    }
    getBoundingSphere(t) {
      return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = 0.5 * this.getSize(_vector$b).length()), t;
    }
    intersect(t) {
      return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
    }
    union(t) {
      return this.min.min(t.min), this.max.max(t.max), this;
    }
    applyMatrix4(t) {
      return this.isEmpty() || (_points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(_points)), this;
    }
    translate(t) {
      return this.min.add(t), this.max.add(t), this;
    }
    equals(t) {
      return t.min.equals(this.min) && t.max.equals(this.max);
    }
    toJSON() {
      return { min: this.min.toArray(), max: this.max.toArray() };
    }
    fromJSON(t) {
      return this.min.fromArray(t.min), this.max.fromArray(t.max), this;
    }
  };
  var _points = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
  var _vector$b = new Vector3();
  var _box$4 = new Box3();
  var _v0$1 = new Vector3();
  var _v1$4 = new Vector3();
  var _v2$3 = new Vector3();
  var _f0 = new Vector3();
  var _f1 = new Vector3();
  var _f2 = new Vector3();
  var _center = new Vector3();
  var _extents = new Vector3();
  var _triangleNormal = new Vector3();
  var _testAxis = new Vector3();
  function satForAxes(t, e, i, r, s) {
    for (let n = 0, a = t.length - 3; n <= a; n += 3) {
      _testAxis.fromArray(t, n);
      const a2 = s.x * Math.abs(_testAxis.x) + s.y * Math.abs(_testAxis.y) + s.z * Math.abs(_testAxis.z), o = e.dot(_testAxis), h = i.dot(_testAxis), l = r.dot(_testAxis);
      if (Math.max(-Math.max(o, h, l), Math.min(o, h, l)) > a2) return false;
    }
    return true;
  }
  var _tables = _generateTables();
  function _generateTables() {
    const t = new ArrayBuffer(4), e = new Float32Array(t), i = new Uint32Array(t), r = new Uint32Array(512), s = new Uint32Array(512);
    for (let t2 = 0; t2 < 256; ++t2) {
      const e2 = t2 - 127;
      e2 < -27 ? (r[t2] = 0, r[256 | t2] = 32768, s[t2] = 24, s[256 | t2] = 24) : e2 < -14 ? (r[t2] = 1024 >> -e2 - 14, r[256 | t2] = 1024 >> -e2 - 14 | 32768, s[t2] = -e2 - 1, s[256 | t2] = -e2 - 1) : e2 <= 15 ? (r[t2] = e2 + 15 << 10, r[256 | t2] = e2 + 15 << 10 | 32768, s[t2] = 13, s[256 | t2] = 13) : e2 < 128 ? (r[t2] = 31744, r[256 | t2] = 64512, s[t2] = 24, s[256 | t2] = 24) : (r[t2] = 31744, r[256 | t2] = 64512, s[t2] = 13, s[256 | t2] = 13);
    }
    const n = new Uint32Array(2048), a = new Uint32Array(64), o = new Uint32Array(64);
    for (let t2 = 1; t2 < 1024; ++t2) {
      let e2 = t2 << 13, i2 = 0;
      for (; !(8388608 & e2); ) e2 <<= 1, i2 -= 8388608;
      e2 &= -8388609, i2 += 947912704, n[t2] = e2 | i2;
    }
    for (let t2 = 1024; t2 < 2048; ++t2) n[t2] = 939524096 + (t2 - 1024 << 13);
    for (let t2 = 1; t2 < 31; ++t2) a[t2] = t2 << 23;
    a[31] = 1199570944, a[32] = 2147483648;
    for (let t2 = 33; t2 < 63; ++t2) a[t2] = 2147483648 + (t2 - 32 << 23);
    a[63] = 3347054592;
    for (let t2 = 1; t2 < 64; ++t2) 32 !== t2 && (o[t2] = 1024);
    return { floatView: e, uint32View: i, baseTable: r, shiftTable: s, mantissaTable: n, exponentTable: a, offsetTable: o };
  }
  var _vector$a = new Vector3();
  var _vector2$1 = new Vector2();
  var _id$2 = 0;
  var BufferAttribute = class extends EventDispatcher {
    constructor(t, e, i = false) {
      if (super(), Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
      this.isBufferAttribute = true, Object.defineProperty(this, "id", { value: _id$2++ }), this.name = "", this.array = t, this.itemSize = e, this.count = void 0 !== t ? t.length / e : 0, this.normalized = i, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
    }
    onUploadCallback() {
    }
    set needsUpdate(t) {
      true === t && this.version++;
    }
    setUsage(t) {
      return this.usage = t, this;
    }
    addUpdateRange(t, e) {
      this.updateRanges.push({ start: t, count: e });
    }
    clearUpdateRanges() {
      this.updateRanges.length = 0;
    }
    copy(t) {
      return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
    }
    copyAt(t, e, i) {
      t *= this.itemSize, i *= e.itemSize;
      for (let r = 0, s = this.itemSize; r < s; r++) this.array[t + r] = e.array[i + r];
      return this;
    }
    copyArray(t) {
      return this.array.set(t), this;
    }
    applyMatrix3(t) {
      if (2 === this.itemSize) for (let e = 0, i = this.count; e < i; e++) _vector2$1.fromBufferAttribute(this, e), _vector2$1.applyMatrix3(t), this.setXY(e, _vector2$1.x, _vector2$1.y);
      else if (3 === this.itemSize) for (let e = 0, i = this.count; e < i; e++) _vector$a.fromBufferAttribute(this, e), _vector$a.applyMatrix3(t), this.setXYZ(e, _vector$a.x, _vector$a.y, _vector$a.z);
      return this;
    }
    applyMatrix4(t) {
      for (let e = 0, i = this.count; e < i; e++) _vector$a.fromBufferAttribute(this, e), _vector$a.applyMatrix4(t), this.setXYZ(e, _vector$a.x, _vector$a.y, _vector$a.z);
      return this;
    }
    applyNormalMatrix(t) {
      for (let e = 0, i = this.count; e < i; e++) _vector$a.fromBufferAttribute(this, e), _vector$a.applyNormalMatrix(t), this.setXYZ(e, _vector$a.x, _vector$a.y, _vector$a.z);
      return this;
    }
    transformDirection(t) {
      for (let e = 0, i = this.count; e < i; e++) _vector$a.fromBufferAttribute(this, e), _vector$a.transformDirection(t), this.setXYZ(e, _vector$a.x, _vector$a.y, _vector$a.z);
      return this;
    }
    set(t, e = 0) {
      return this.array.set(t, e), this;
    }
    getComponent(t, e) {
      let i = this.array[t * this.itemSize + e];
      return this.normalized && (i = denormalize(i, this.array)), i;
    }
    setComponent(t, e, i) {
      return this.normalized && (i = normalize(i, this.array)), this.array[t * this.itemSize + e] = i, this;
    }
    getX(t) {
      let e = this.array[t * this.itemSize];
      return this.normalized && (e = denormalize(e, this.array)), e;
    }
    setX(t, e) {
      return this.normalized && (e = normalize(e, this.array)), this.array[t * this.itemSize] = e, this;
    }
    getY(t) {
      let e = this.array[t * this.itemSize + 1];
      return this.normalized && (e = denormalize(e, this.array)), e;
    }
    setY(t, e) {
      return this.normalized && (e = normalize(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
    }
    getZ(t) {
      let e = this.array[t * this.itemSize + 2];
      return this.normalized && (e = denormalize(e, this.array)), e;
    }
    setZ(t, e) {
      return this.normalized && (e = normalize(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
    }
    getW(t) {
      let e = this.array[t * this.itemSize + 3];
      return this.normalized && (e = denormalize(e, this.array)), e;
    }
    setW(t, e) {
      return this.normalized && (e = normalize(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
    }
    setXY(t, e, i) {
      return t *= this.itemSize, this.normalized && (e = normalize(e, this.array), i = normalize(i, this.array)), this.array[t + 0] = e, this.array[t + 1] = i, this;
    }
    setXYZ(t, e, i, r) {
      return t *= this.itemSize, this.normalized && (e = normalize(e, this.array), i = normalize(i, this.array), r = normalize(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = i, this.array[t + 2] = r, this;
    }
    setXYZW(t, e, i, r, s) {
      return t *= this.itemSize, this.normalized && (e = normalize(e, this.array), i = normalize(i, this.array), r = normalize(r, this.array), s = normalize(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = i, this.array[t + 2] = r, this.array[t + 3] = s, this;
    }
    onUpload(t) {
      return this.onUploadCallback = t, this;
    }
    clone() {
      return new this.constructor(this.array, this.itemSize).copy(this);
    }
    toJSON() {
      const t = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
      return t.name = this.name, t.usage = this.usage, t.gpuType = this.gpuType, t;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  var Uint16BufferAttribute = class extends BufferAttribute {
    constructor(t, e, i) {
      super(new Uint16Array(t), e, i);
    }
  };
  var Uint32BufferAttribute = class extends BufferAttribute {
    constructor(t, e, i) {
      super(new Uint32Array(t), e, i);
    }
  };
  var Float32BufferAttribute = class extends BufferAttribute {
    constructor(t, e, i) {
      super(new Float32Array(t), e, i);
    }
  };
  var _box$3 = new Box3();
  var _v1$3 = new Vector3();
  var _v2$2 = new Vector3();
  var Sphere = class {
    constructor(t = new Vector3(), e = -1) {
      this.isSphere = true, this.center = t, this.radius = e;
    }
    set(t, e) {
      return this.center.copy(t), this.radius = e, this;
    }
    setFromPoints(t, e) {
      const i = this.center;
      void 0 !== e ? i.copy(e) : _box$3.setFromPoints(t).getCenter(i);
      let r = 0;
      for (let e2 = 0, s = t.length; e2 < s; e2++) r = Math.max(r, i.distanceToSquared(t[e2]));
      return this.radius = Math.sqrt(r), this;
    }
    copy(t) {
      return this.center.copy(t.center), this.radius = t.radius, this;
    }
    isEmpty() {
      return this.radius < 0;
    }
    makeEmpty() {
      return this.center.set(0, 0, 0), this.radius = -1, this;
    }
    containsPoint(t) {
      return t.distanceToSquared(this.center) <= this.radius * this.radius;
    }
    distanceToPoint(t) {
      return t.distanceTo(this.center) - this.radius;
    }
    intersectsSphere(t) {
      const e = this.radius + t.radius;
      return t.center.distanceToSquared(this.center) <= e * e;
    }
    intersectsBox(t) {
      return t.intersectsSphere(this);
    }
    intersectsPlane(t) {
      return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
    }
    clampPoint(t, e) {
      const i = this.center.distanceToSquared(t);
      return e.copy(t), i > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
    }
    getBoundingBox(t) {
      return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
    }
    applyMatrix4(t) {
      return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
    }
    translate(t) {
      return this.center.add(t), this;
    }
    expandByPoint(t) {
      if (this.isEmpty()) return this.center.copy(t), this.radius = 0, this;
      _v1$3.subVectors(t, this.center);
      const e = _v1$3.lengthSq();
      if (e > this.radius * this.radius) {
        const t2 = Math.sqrt(e), i = 0.5 * (t2 - this.radius);
        this.center.addScaledVector(_v1$3, i / t2), this.radius += i;
      }
      return this;
    }
    union(t) {
      return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (true === this.center.equals(t.center) ? this.radius = Math.max(this.radius, t.radius) : (_v2$2.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(_v1$3.copy(t.center).add(_v2$2)), this.expandByPoint(_v1$3.copy(t.center).sub(_v2$2))), this);
    }
    equals(t) {
      return t.center.equals(this.center) && t.radius === this.radius;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      return { radius: this.radius, center: this.center.toArray() };
    }
    fromJSON(t) {
      return this.radius = t.radius, this.center.fromArray(t.center), this;
    }
  };
  var _id$1 = 0;
  var _m1 = new Matrix4();
  var _obj = new Object3D();
  var _offset = new Vector3();
  var _box$2 = new Box3();
  var _boxMorphTargets = new Box3();
  var _vector$9 = new Vector3();
  var BufferGeometry = class _BufferGeometry extends EventDispatcher {
    constructor() {
      super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: _id$1++ }), this.uuid = generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {}, this._transformed = false;
    }
    getIndex() {
      return this.index;
    }
    setIndex(t) {
      return Array.isArray(t) ? this.index = new (arrayNeedsUint32(t) ? Uint32BufferAttribute : Uint16BufferAttribute)(t, 1) : this.index = t, this;
    }
    setIndirect(t, e = 0) {
      return this.indirect = t, this.indirectOffset = e, this;
    }
    getIndirect() {
      return this.indirect;
    }
    getAttribute(t) {
      return this.attributes[t];
    }
    setAttribute(t, e) {
      return this.attributes[t] = e, this;
    }
    deleteAttribute(t) {
      return delete this.attributes[t], this;
    }
    hasAttribute(t) {
      return void 0 !== this.attributes[t];
    }
    addGroup(t, e, i = 0) {
      this.groups.push({ start: t, count: e, materialIndex: i });
    }
    clearGroups() {
      this.groups = [];
    }
    setDrawRange(t, e) {
      this.drawRange.start = t, this.drawRange.count = e;
    }
    applyMatrix4(t) {
      const e = this.attributes.position;
      void 0 !== e && (e.applyMatrix4(t), e.needsUpdate = true);
      const i = this.attributes.normal;
      if (void 0 !== i) {
        const e2 = new Matrix3().getNormalMatrix(t);
        i.applyNormalMatrix(e2), i.needsUpdate = true;
      }
      const r = this.attributes.tangent;
      return void 0 !== r && (r.transformDirection(t), r.needsUpdate = true), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this._transformed = true, this;
    }
    applyQuaternion(t) {
      return _m1.makeRotationFromQuaternion(t), this.applyMatrix4(_m1), this;
    }
    rotateX(t) {
      return _m1.makeRotationX(t), this.applyMatrix4(_m1), this;
    }
    rotateY(t) {
      return _m1.makeRotationY(t), this.applyMatrix4(_m1), this;
    }
    rotateZ(t) {
      return _m1.makeRotationZ(t), this.applyMatrix4(_m1), this;
    }
    translate(t, e, i) {
      return _m1.makeTranslation(t, e, i), this.applyMatrix4(_m1), this;
    }
    scale(t, e, i) {
      return _m1.makeScale(t, e, i), this.applyMatrix4(_m1), this;
    }
    lookAt(t) {
      return _obj.lookAt(t), _obj.updateMatrix(), this.applyMatrix4(_obj.matrix), this;
    }
    center() {
      return this.computeBoundingBox(), this.boundingBox.getCenter(_offset).negate(), this.translate(_offset.x, _offset.y, _offset.z), this;
    }
    setFromPoints(t) {
      const e = this.getAttribute("position");
      if (void 0 === e) {
        const e2 = [];
        for (let i = 0, r = t.length; i < r; i++) {
          const r2 = t[i];
          e2.push(r2.x, r2.y, r2.z || 0);
        }
        this.setAttribute("position", new Float32BufferAttribute(e2, 3));
      } else {
        const i = Math.min(t.length, e.count);
        for (let r = 0; r < i; r++) {
          const i2 = t[r];
          e.setXYZ(r, i2.x, i2.y, i2.z || 0);
        }
        t.length > e.count && warn("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = true;
      }
      return this;
    }
    computeBoundingBox() {
      null === this.boundingBox && (this.boundingBox = new Box3());
      const t = this.attributes.position, e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) return error("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), void this.boundingBox.set(new Vector3(-1 / 0, -1 / 0, -1 / 0), new Vector3(1 / 0, 1 / 0, 1 / 0));
      if (void 0 !== t) {
        if (this.boundingBox.setFromBufferAttribute(t), e) for (let t2 = 0, i = e.length; t2 < i; t2++) {
          const i2 = e[t2];
          _box$2.setFromBufferAttribute(i2), this.morphTargetsRelative ? (_vector$9.addVectors(this.boundingBox.min, _box$2.min), this.boundingBox.expandByPoint(_vector$9), _vector$9.addVectors(this.boundingBox.max, _box$2.max), this.boundingBox.expandByPoint(_vector$9)) : (this.boundingBox.expandByPoint(_box$2.min), this.boundingBox.expandByPoint(_box$2.max));
        }
      } else this.boundingBox.makeEmpty();
      (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && error('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    }
    computeBoundingSphere() {
      null === this.boundingSphere && (this.boundingSphere = new Sphere());
      const t = this.attributes.position, e = this.morphAttributes.position;
      if (t && t.isGLBufferAttribute) return error("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), void this.boundingSphere.set(new Vector3(), 1 / 0);
      if (t) {
        const i = this.boundingSphere.center;
        if (_box$2.setFromBufferAttribute(t), e) for (let t2 = 0, i2 = e.length; t2 < i2; t2++) {
          const i3 = e[t2];
          _boxMorphTargets.setFromBufferAttribute(i3), this.morphTargetsRelative ? (_vector$9.addVectors(_box$2.min, _boxMorphTargets.min), _box$2.expandByPoint(_vector$9), _vector$9.addVectors(_box$2.max, _boxMorphTargets.max), _box$2.expandByPoint(_vector$9)) : (_box$2.expandByPoint(_boxMorphTargets.min), _box$2.expandByPoint(_boxMorphTargets.max));
        }
        _box$2.getCenter(i);
        let r = 0;
        for (let e2 = 0, s = t.count; e2 < s; e2++) _vector$9.fromBufferAttribute(t, e2), r = Math.max(r, i.distanceToSquared(_vector$9));
        if (e) for (let s = 0, n = e.length; s < n; s++) {
          const n2 = e[s], a = this.morphTargetsRelative;
          for (let e2 = 0, s2 = n2.count; e2 < s2; e2++) _vector$9.fromBufferAttribute(n2, e2), a && (_offset.fromBufferAttribute(t, e2), _vector$9.add(_offset)), r = Math.max(r, i.distanceToSquared(_vector$9));
        }
        this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && error('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
      }
    }
    computeTangents() {
      const t = this.index, e = this.attributes;
      if (null === t || void 0 === e.position || void 0 === e.normal || void 0 === e.uv) return void error("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      const i = e.position, r = e.normal, s = e.uv;
      let n = this.getAttribute("tangent");
      void 0 !== n && n.count === i.count || (n = new BufferAttribute(new Float32Array(4 * i.count), 4), this.setAttribute("tangent", n));
      const a = [], o = [];
      for (let t2 = 0; t2 < i.count; t2++) a[t2] = new Vector3(), o[t2] = new Vector3();
      const h = new Vector3(), l = new Vector3(), c = new Vector3(), u = new Vector2(), p = new Vector2(), d = new Vector2(), m = new Vector3(), y = new Vector3();
      function f(t2, e2, r2) {
        h.fromBufferAttribute(i, t2), l.fromBufferAttribute(i, e2), c.fromBufferAttribute(i, r2), u.fromBufferAttribute(s, t2), p.fromBufferAttribute(s, e2), d.fromBufferAttribute(s, r2), l.sub(h), c.sub(h), p.sub(u), d.sub(u);
        const n2 = 1 / (p.x * d.y - d.x * p.y);
        isFinite(n2) && (m.copy(l).multiplyScalar(d.y).addScaledVector(c, -p.y).multiplyScalar(n2), y.copy(c).multiplyScalar(p.x).addScaledVector(l, -d.x).multiplyScalar(n2), a[t2].add(m), a[e2].add(m), a[r2].add(m), o[t2].add(y), o[e2].add(y), o[r2].add(y));
      }
      let g = this.groups;
      0 === g.length && (g = [{ start: 0, count: t.count }]);
      for (let e2 = 0, i2 = g.length; e2 < i2; ++e2) {
        const i3 = g[e2], r2 = i3.start;
        for (let e3 = r2, s2 = r2 + i3.count; e3 < s2; e3 += 3) f(t.getX(e3 + 0), t.getX(e3 + 1), t.getX(e3 + 2));
      }
      const x = new Vector3(), _ = new Vector3(), v = new Vector3(), b = new Vector3();
      function M(t2) {
        v.fromBufferAttribute(r, t2), b.copy(v);
        const e2 = a[t2];
        x.copy(e2), x.sub(v.multiplyScalar(v.dot(e2))).normalize(), _.crossVectors(b, e2);
        const i2 = _.dot(o[t2]) < 0 ? -1 : 1;
        n.setXYZW(t2, x.x, x.y, x.z, i2);
      }
      for (let e2 = 0, i2 = g.length; e2 < i2; ++e2) {
        const i3 = g[e2], r2 = i3.start;
        for (let e3 = r2, s2 = r2 + i3.count; e3 < s2; e3 += 3) M(t.getX(e3 + 0)), M(t.getX(e3 + 1)), M(t.getX(e3 + 2));
      }
      this._transformed = true;
    }
    computeVertexNormals() {
      const t = this.index, e = this.getAttribute("position");
      if (void 0 !== e) {
        let i = this.getAttribute("normal");
        if (void 0 === i || i.count !== e.count) i = new BufferAttribute(new Float32Array(3 * e.count), 3), this.setAttribute("normal", i);
        else for (let t2 = 0, e2 = i.count; t2 < e2; t2++) i.setXYZ(t2, 0, 0, 0);
        const r = new Vector3(), s = new Vector3(), n = new Vector3(), a = new Vector3(), o = new Vector3(), h = new Vector3(), l = new Vector3(), c = new Vector3();
        if (t) for (let u = 0, p = t.count; u < p; u += 3) {
          const p2 = t.getX(u + 0), d = t.getX(u + 1), m = t.getX(u + 2);
          r.fromBufferAttribute(e, p2), s.fromBufferAttribute(e, d), n.fromBufferAttribute(e, m), l.subVectors(n, s), c.subVectors(r, s), l.cross(c), a.fromBufferAttribute(i, p2), o.fromBufferAttribute(i, d), h.fromBufferAttribute(i, m), a.add(l), o.add(l), h.add(l), i.setXYZ(p2, a.x, a.y, a.z), i.setXYZ(d, o.x, o.y, o.z), i.setXYZ(m, h.x, h.y, h.z);
        }
        else for (let t2 = 0, a2 = e.count; t2 < a2; t2 += 3) r.fromBufferAttribute(e, t2 + 0), s.fromBufferAttribute(e, t2 + 1), n.fromBufferAttribute(e, t2 + 2), l.subVectors(n, s), c.subVectors(r, s), l.cross(c), i.setXYZ(t2 + 0, l.x, l.y, l.z), i.setXYZ(t2 + 1, l.x, l.y, l.z), i.setXYZ(t2 + 2, l.x, l.y, l.z);
        this.normalizeNormals(), i.needsUpdate = true;
      }
    }
    normalizeNormals() {
      const t = this.attributes.normal;
      for (let e = 0, i = t.count; e < i; e++) _vector$9.fromBufferAttribute(t, e), _vector$9.normalize(), t.setXYZ(e, _vector$9.x, _vector$9.y, _vector$9.z);
    }
    toNonIndexed() {
      function t(t2, e2) {
        const i2 = t2.array, r2 = t2.itemSize, s2 = t2.normalized, n2 = new i2.constructor(e2.length * r2);
        let a = 0, o = 0;
        for (let s3 = 0, h = e2.length; s3 < h; s3++) {
          a = t2.isInterleavedBufferAttribute ? e2[s3] * t2.data.stride + t2.offset : e2[s3] * r2;
          for (let t3 = 0; t3 < r2; t3++) n2[o++] = i2[a++];
        }
        return new BufferAttribute(n2, r2, s2);
      }
      if (null === this.index) return warn("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
      const e = new _BufferGeometry(), i = this.index.array, r = this.attributes;
      for (const s2 in r) {
        const n2 = t(r[s2], i);
        e.setAttribute(s2, n2);
      }
      const s = this.morphAttributes;
      for (const r2 in s) {
        const n2 = [], a = s[r2];
        for (let e2 = 0, r3 = a.length; e2 < r3; e2++) {
          const r4 = t(a[e2], i);
          n2.push(r4);
        }
        e.morphAttributes[r2] = n2;
      }
      e.morphTargetsRelative = this.morphTargetsRelative;
      const n = this.groups;
      for (let t2 = 0, i2 = n.length; t2 < i2; t2++) {
        const i3 = n[t2];
        e.addGroup(i3.start, i3.count, i3.materialIndex);
      }
      return e;
    }
    toJSON() {
      const t = { metadata: { version: 4.7, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
      if (t.uuid = this.uuid, t.type = void 0 !== this.parameters && true === this._transformed ? "BufferGeometry" : this.type, t.name = this.name, Object.keys(this.userData).length > 0 && (t.userData = this.userData), void 0 !== this.parameters && true !== this._transformed) {
        const e2 = this.parameters;
        for (const i2 in e2) void 0 !== e2[i2] && (t[i2] = e2[i2]);
        return t;
      }
      t.data = { attributes: {} };
      const e = this.index;
      null !== e && (t.data.index = { type: e.array.constructor.name, array: Array.prototype.slice.call(e.array) });
      const i = this.attributes;
      for (const e2 in i) {
        const r2 = i[e2];
        t.data.attributes[e2] = r2.toJSON(t.data);
      }
      const r = {};
      let s = false;
      for (const e2 in this.morphAttributes) {
        const i2 = this.morphAttributes[e2], n2 = [];
        for (let e3 = 0, r2 = i2.length; e3 < r2; e3++) {
          const r3 = i2[e3];
          n2.push(r3.toJSON(t.data));
        }
        n2.length > 0 && (r[e2] = n2, s = true);
      }
      s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
      const n = this.groups;
      n.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(n)));
      const a = this.boundingSphere;
      return null !== a && (t.data.boundingSphere = a.toJSON()), t;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
      const e = {};
      this.name = t.name;
      const i = t.index;
      null !== i && this.setIndex(i.clone());
      const r = t.attributes;
      for (const t2 in r) {
        const i2 = r[t2];
        this.setAttribute(t2, i2.clone(e));
      }
      const s = t.morphAttributes;
      for (const t2 in s) {
        const i2 = [], r2 = s[t2];
        for (let t3 = 0, s2 = r2.length; t3 < s2; t3++) i2.push(r2[t3].clone(e));
        this.morphAttributes[t2] = i2;
      }
      this.morphTargetsRelative = t.morphTargetsRelative;
      const n = t.groups;
      for (let t2 = 0, e2 = n.length; t2 < e2; t2++) {
        const e3 = n[t2];
        this.addGroup(e3.start, e3.count, e3.materialIndex);
      }
      const a = t.boundingBox;
      null !== a && (this.boundingBox = a.clone());
      const o = t.boundingSphere;
      return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this._transformed = t._transformed, this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
  };
  var _vector$8 = new Vector3();
  var _vector1 = new Vector3();
  var _vector2 = new Vector3();
  var _normalMatrix = new Matrix3();
  var Plane = class {
    constructor(t = new Vector3(1, 0, 0), e = 0) {
      this.isPlane = true, this.normal = t, this.constant = e;
    }
    set(t, e) {
      return this.normal.copy(t), this.constant = e, this;
    }
    setComponents(t, e, i, r) {
      return this.normal.set(t, e, i), this.constant = r, this;
    }
    setFromNormalAndCoplanarPoint(t, e) {
      return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
    }
    setFromCoplanarPoints(t, e, i) {
      const r = _vector1.subVectors(i, e).cross(_vector2.subVectors(t, e)).normalize();
      return this.setFromNormalAndCoplanarPoint(r, t), this;
    }
    copy(t) {
      return this.normal.copy(t.normal), this.constant = t.constant, this;
    }
    normalize() {
      const t = 1 / this.normal.length();
      return this.normal.multiplyScalar(t), this.constant *= t, this;
    }
    negate() {
      return this.constant *= -1, this.normal.negate(), this;
    }
    distanceToPoint(t) {
      return this.normal.dot(t) + this.constant;
    }
    distanceToSphere(t) {
      return this.distanceToPoint(t.center) - t.radius;
    }
    projectPoint(t, e) {
      return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
    }
    intersectLine(t, e, i = true) {
      const r = t.delta(_vector1), s = this.normal.dot(r);
      if (0 === s) return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : null;
      const n = -(t.start.dot(this.normal) + this.constant) / s;
      return true === i && (n < 0 || n > 1) ? null : e.copy(t.start).addScaledVector(r, n);
    }
    intersectsLine(t) {
      const e = this.distanceToPoint(t.start), i = this.distanceToPoint(t.end);
      return e < 0 && i > 0 || i < 0 && e > 0;
    }
    intersectsBox(t) {
      return t.intersectsPlane(this);
    }
    intersectsSphere(t) {
      return t.intersectsPlane(this);
    }
    coplanarPoint(t) {
      return t.copy(this.normal).multiplyScalar(-this.constant);
    }
    applyMatrix4(t, e) {
      const i = e || _normalMatrix.getNormalMatrix(t), r = this.coplanarPoint(_vector1).applyMatrix4(t), s = this.normal.applyMatrix3(i).normalize();
      return this.constant = -r.dot(s), this;
    }
    translate(t) {
      return this.constant -= t.dot(this.normal), this;
    }
    equals(t) {
      return t.normal.equals(this.normal) && t.constant === this.constant;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    toJSON() {
      return { normal: this.normal.toArray(), constant: this.constant };
    }
    fromJSON(t) {
      return this.normal.fromArray(t.normal), this.constant = t.constant, this;
    }
  };
  var _materialId = 0;
  var Material = class extends EventDispatcher {
    constructor() {
      super(), this.isMaterial = true, Object.defineProperty(this, "id", { value: _materialId++ }), this.uuid = generateUUID(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = false, this.opacity = 1, this.transparent = false, this.alphaHash = false, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Color(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = true, this.depthWrite = true, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = false, this.clippingPlanes = null, this.clipIntersection = false, this.clipShadows = false, this.shadowSide = null, this.colorWrite = true, this.precision = null, this.polygonOffset = false, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = false, this.alphaToCoverage = false, this.premultipliedAlpha = false, this.forceSinglePass = false, this.allowOverride = true, this.visible = true, this.toneMapped = true, this.userData = {}, this.version = 0, this._alphaTest = 0;
    }
    get alphaTest() {
      return this._alphaTest;
    }
    set alphaTest(t) {
      this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
    }
    onBeforeRender() {
    }
    onBeforeCompile() {
    }
    customProgramCacheKey() {
      return this.onBeforeCompile.toString();
    }
    setValues(t) {
      if (void 0 !== t) for (const e in t) {
        const i = t[e];
        if (void 0 === i) {
          warn(`Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const r = this[e];
        void 0 !== r ? r && r.isColor ? r.set(i) : r && r.isVector2 && i && i.isVector2 || r && r.isEuler && i && i.isEuler || r && r.isVector3 && i && i.isVector3 ? r.copy(i) : this[e] = i : warn(`Material: '${e}' is not a property of THREE.${this.type}.`);
      }
    }
    toJSON(t) {
      const e = void 0 === t || "string" == typeof t;
      e && (t = { textures: {}, images: {} });
      const i = { metadata: { version: 4.7, type: "Material", generator: "Material.toJSON" } };
      function r(t2) {
        const e2 = [];
        for (const i2 in t2) {
          const r2 = t2[i2];
          delete r2.metadata, e2.push(r2);
        }
        return e2;
      }
      if (i.uuid = this.uuid, i.type = this.type, i.blending = this.blending, i.side = this.side, i.shadowSide = this.shadowSide, i.vertexColors = this.vertexColors, i.opacity = this.opacity, i.transparent = this.transparent, i.blendSrc = this.blendSrc, i.blendDst = this.blendDst, i.blendEquation = this.blendEquation, i.blendSrcAlpha = this.blendSrcAlpha, i.blendDstAlpha = this.blendDstAlpha, i.blendEquationAlpha = this.blendEquationAlpha, i.blendColor = this.blendColor.getHex(), i.blendAlpha = this.blendAlpha, i.depthFunc = this.depthFunc, i.depthTest = this.depthTest, i.depthWrite = this.depthWrite, i.colorWrite = this.colorWrite, i.clipIntersection = this.clipIntersection, i.clipShadows = this.clipShadows, i.stencilWriteMask = this.stencilWriteMask, i.stencilFunc = this.stencilFunc, i.stencilRef = this.stencilRef, i.stencilFuncMask = this.stencilFuncMask, i.stencilFail = this.stencilFail, i.stencilZFail = this.stencilZFail, i.stencilZPass = this.stencilZPass, i.stencilWrite = this.stencilWrite, i.polygonOffset = this.polygonOffset, i.polygonOffsetFactor = this.polygonOffsetFactor, i.polygonOffsetUnits = this.polygonOffsetUnits, i.dithering = this.dithering, i.alphaTest = this.alphaTest, i.alphaHash = this.alphaHash, i.alphaToCoverage = this.alphaToCoverage, i.premultipliedAlpha = this.premultipliedAlpha, i.forceSinglePass = this.forceSinglePass, i.allowOverride = this.allowOverride, i.visible = this.visible, i.toneMapped = this.toneMapped, i.name = this.name, this.color && this.color.isColor && (i.color = this.color.getHex()), void 0 !== this.roughness && (i.roughness = this.roughness), void 0 !== this.metalness && (i.metalness = this.metalness), void 0 !== this.sheen && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), void 0 !== this.emissiveIntensity && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (i.shininess = this.shininess), void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (i.sheenColorMap = this.sheenColorMap.toJSON(t).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(t).uuid), void 0 !== this.dispersion && (i.dispersion = this.dispersion), void 0 !== this.retroreflectivity && (i.retroreflectivity = this.retroreflectivity), void 0 !== this.iridescence && (i.iridescence = this.iridescence), void 0 !== this.iridescenceIOR && (i.iridescenceIOR = this.iridescenceIOR), void 0 !== this.iridescenceThicknessRange && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), void 0 !== this.anisotropy && (i.anisotropy = this.anisotropy), void 0 !== this.anisotropyRotation && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(t).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(t).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(t).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(t).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(t).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(t).uuid, void 0 !== this.combine && (i.combine = this.combine)), void 0 !== this.envMapRotation && (i.envMapRotation = this.envMapRotation.toArray()), void 0 !== this.envMapIntensity && (i.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (i.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.transmission && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(t).uuid), void 0 !== this.thickness && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(t).uuid), void 0 !== this.attenuationDistance && (i.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (i.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (i.size = this.size), void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (i.clippingPlanes = this.clippingPlanes.map((t2) => t2.toJSON())), void 0 !== this.rotation && (i.rotation = this.rotation), void 0 !== this.depthPacking && (i.depthPacking = this.depthPacking), void 0 !== this.linewidth && (i.linewidth = this.linewidth), void 0 !== this.linecap && (i.linecap = this.linecap), void 0 !== this.linejoin && (i.linejoin = this.linejoin), void 0 !== this.dashSize && (i.dashSize = this.dashSize), void 0 !== this.gapSize && (i.gapSize = this.gapSize), void 0 !== this.scale && (i.scale = this.scale), void 0 !== this.wireframe && (i.wireframe = this.wireframe), void 0 !== this.wireframeLinewidth && (i.wireframeLinewidth = this.wireframeLinewidth), void 0 !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap), void 0 !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin), void 0 !== this.flatShading && (i.flatShading = this.flatShading), void 0 !== this.fog && (i.fog = this.fog), Object.keys(this.userData).length > 0 && (i.userData = this.userData), e) {
        const e2 = r(t.textures), s = r(t.images);
        e2.length > 0 && (i.textures = e2), s.length > 0 && (i.images = s);
      }
      return i;
    }
    fromJSON(t, e) {
      if (void 0 !== t.uuid && (this.uuid = t.uuid), void 0 !== t.name && (this.name = t.name), void 0 !== t.color && void 0 !== this.color && this.color.setHex(t.color), void 0 !== t.roughness && (this.roughness = t.roughness), void 0 !== t.metalness && (this.metalness = t.metalness), void 0 !== t.sheen && (this.sheen = t.sheen), void 0 !== t.sheenColor && (this.sheenColor = new Color().setHex(t.sheenColor)), void 0 !== t.sheenRoughness && (this.sheenRoughness = t.sheenRoughness), void 0 !== t.emissive && void 0 !== this.emissive && this.emissive.setHex(t.emissive), void 0 !== t.specular && void 0 !== this.specular && this.specular.setHex(t.specular), void 0 !== t.specularIntensity && (this.specularIntensity = t.specularIntensity), void 0 !== t.specularColor && void 0 !== this.specularColor && this.specularColor.setHex(t.specularColor), void 0 !== t.shininess && (this.shininess = t.shininess), void 0 !== t.clearcoat && (this.clearcoat = t.clearcoat), void 0 !== t.clearcoatRoughness && (this.clearcoatRoughness = t.clearcoatRoughness), void 0 !== t.dispersion && (this.dispersion = t.dispersion), void 0 !== t.retroreflectivity && (this.retroreflectivity = t.retroreflectivity), void 0 !== t.iridescence && (this.iridescence = t.iridescence), void 0 !== t.iridescenceIOR && (this.iridescenceIOR = t.iridescenceIOR), void 0 !== t.iridescenceThicknessRange && (this.iridescenceThicknessRange = t.iridescenceThicknessRange), void 0 !== t.transmission && (this.transmission = t.transmission), void 0 !== t.thickness && (this.thickness = t.thickness), void 0 !== t.attenuationDistance && (this.attenuationDistance = t.attenuationDistance), void 0 !== t.attenuationColor && void 0 !== this.attenuationColor && this.attenuationColor.setHex(t.attenuationColor), void 0 !== t.anisotropy && (this.anisotropy = t.anisotropy), void 0 !== t.anisotropyRotation && (this.anisotropyRotation = t.anisotropyRotation), void 0 !== t.fog && (this.fog = t.fog), void 0 !== t.flatShading && (this.flatShading = t.flatShading), void 0 !== t.blending && (this.blending = t.blending), void 0 !== t.combine && (this.combine = t.combine), void 0 !== t.side && (this.side = t.side), void 0 !== t.shadowSide && (this.shadowSide = t.shadowSide), void 0 !== t.opacity && (this.opacity = t.opacity), void 0 !== t.transparent && (this.transparent = t.transparent), void 0 !== t.alphaTest && (this.alphaTest = t.alphaTest), void 0 !== t.alphaHash && (this.alphaHash = t.alphaHash), void 0 !== t.depthFunc && (this.depthFunc = t.depthFunc), void 0 !== t.depthTest && (this.depthTest = t.depthTest), void 0 !== t.depthWrite && (this.depthWrite = t.depthWrite), void 0 !== t.colorWrite && (this.colorWrite = t.colorWrite), void 0 !== t.clippingPlanes && (this.clippingPlanes = t.clippingPlanes.map((t2) => new Plane().fromJSON(t2))), void 0 !== t.clipIntersection && (this.clipIntersection = t.clipIntersection), void 0 !== t.clipShadows && (this.clipShadows = t.clipShadows), void 0 !== t.depthPacking && (this.depthPacking = t.depthPacking), void 0 !== t.blendSrc && (this.blendSrc = t.blendSrc), void 0 !== t.blendDst && (this.blendDst = t.blendDst), void 0 !== t.blendEquation && (this.blendEquation = t.blendEquation), void 0 !== t.blendSrcAlpha && (this.blendSrcAlpha = t.blendSrcAlpha), void 0 !== t.blendDstAlpha && (this.blendDstAlpha = t.blendDstAlpha), void 0 !== t.blendEquationAlpha && (this.blendEquationAlpha = t.blendEquationAlpha), void 0 !== t.blendColor && void 0 !== this.blendColor && this.blendColor.setHex(t.blendColor), void 0 !== t.blendAlpha && (this.blendAlpha = t.blendAlpha), void 0 !== t.stencilWriteMask && (this.stencilWriteMask = t.stencilWriteMask), void 0 !== t.stencilFunc && (this.stencilFunc = t.stencilFunc), void 0 !== t.stencilRef && (this.stencilRef = t.stencilRef), void 0 !== t.stencilFuncMask && (this.stencilFuncMask = t.stencilFuncMask), void 0 !== t.stencilFail && (this.stencilFail = t.stencilFail), void 0 !== t.stencilZFail && (this.stencilZFail = t.stencilZFail), void 0 !== t.stencilZPass && (this.stencilZPass = t.stencilZPass), void 0 !== t.stencilWrite && (this.stencilWrite = t.stencilWrite), void 0 !== t.wireframe && (this.wireframe = t.wireframe), void 0 !== t.wireframeLinewidth && (this.wireframeLinewidth = t.wireframeLinewidth), void 0 !== t.wireframeLinecap && (this.wireframeLinecap = t.wireframeLinecap), void 0 !== t.wireframeLinejoin && (this.wireframeLinejoin = t.wireframeLinejoin), void 0 !== t.rotation && (this.rotation = t.rotation), void 0 !== t.linewidth && (this.linewidth = t.linewidth), void 0 !== t.linecap && (this.linecap = t.linecap), void 0 !== t.linejoin && (this.linejoin = t.linejoin), void 0 !== t.dashSize && (this.dashSize = t.dashSize), void 0 !== t.gapSize && (this.gapSize = t.gapSize), void 0 !== t.scale && (this.scale = t.scale), void 0 !== t.polygonOffset && (this.polygonOffset = t.polygonOffset), void 0 !== t.polygonOffsetFactor && (this.polygonOffsetFactor = t.polygonOffsetFactor), void 0 !== t.polygonOffsetUnits && (this.polygonOffsetUnits = t.polygonOffsetUnits), void 0 !== t.dithering && (this.dithering = t.dithering), void 0 !== t.alphaToCoverage && (this.alphaToCoverage = t.alphaToCoverage), void 0 !== t.premultipliedAlpha && (this.premultipliedAlpha = t.premultipliedAlpha), void 0 !== t.forceSinglePass && (this.forceSinglePass = t.forceSinglePass), void 0 !== t.allowOverride && (this.allowOverride = t.allowOverride), void 0 !== t.visible && (this.visible = t.visible), void 0 !== t.toneMapped && (this.toneMapped = t.toneMapped), void 0 !== t.userData && (this.userData = t.userData), void 0 !== t.vertexColors && ("number" == typeof t.vertexColors ? this.vertexColors = t.vertexColors > 0 : this.vertexColors = t.vertexColors), void 0 !== t.size && (this.size = t.size), void 0 !== t.sizeAttenuation && (this.sizeAttenuation = t.sizeAttenuation), void 0 !== t.map && (this.map = e[t.map] || null), void 0 !== t.matcap && (this.matcap = e[t.matcap] || null), void 0 !== t.alphaMap && (this.alphaMap = e[t.alphaMap] || null), void 0 !== t.bumpMap && (this.bumpMap = e[t.bumpMap] || null), void 0 !== t.bumpScale && (this.bumpScale = t.bumpScale), void 0 !== t.normalMap && (this.normalMap = e[t.normalMap] || null), void 0 !== t.normalMapType && (this.normalMapType = t.normalMapType), void 0 !== t.normalScale) {
        let e2 = t.normalScale;
        false === Array.isArray(e2) && (e2 = [e2, e2]), this.normalScale = new Vector2().fromArray(e2);
      }
      return void 0 !== t.displacementMap && (this.displacementMap = e[t.displacementMap] || null), void 0 !== t.displacementScale && (this.displacementScale = t.displacementScale), void 0 !== t.displacementBias && (this.displacementBias = t.displacementBias), void 0 !== t.roughnessMap && (this.roughnessMap = e[t.roughnessMap] || null), void 0 !== t.metalnessMap && (this.metalnessMap = e[t.metalnessMap] || null), void 0 !== t.emissiveMap && (this.emissiveMap = e[t.emissiveMap] || null), void 0 !== t.emissiveIntensity && (this.emissiveIntensity = t.emissiveIntensity), void 0 !== t.specularMap && (this.specularMap = e[t.specularMap] || null), void 0 !== t.specularIntensityMap && (this.specularIntensityMap = e[t.specularIntensityMap] || null), void 0 !== t.specularColorMap && (this.specularColorMap = e[t.specularColorMap] || null), void 0 !== t.envMap && (this.envMap = e[t.envMap] || null), void 0 !== t.envMapRotation && this.envMapRotation.fromArray(t.envMapRotation), void 0 !== t.envMapIntensity && (this.envMapIntensity = t.envMapIntensity), void 0 !== t.reflectivity && (this.reflectivity = t.reflectivity), void 0 !== t.refractionRatio && (this.refractionRatio = t.refractionRatio), void 0 !== t.lightMap && (this.lightMap = e[t.lightMap] || null), void 0 !== t.lightMapIntensity && (this.lightMapIntensity = t.lightMapIntensity), void 0 !== t.aoMap && (this.aoMap = e[t.aoMap] || null), void 0 !== t.aoMapIntensity && (this.aoMapIntensity = t.aoMapIntensity), void 0 !== t.gradientMap && (this.gradientMap = e[t.gradientMap] || null), void 0 !== t.clearcoatMap && (this.clearcoatMap = e[t.clearcoatMap] || null), void 0 !== t.clearcoatRoughnessMap && (this.clearcoatRoughnessMap = e[t.clearcoatRoughnessMap] || null), void 0 !== t.clearcoatNormalMap && (this.clearcoatNormalMap = e[t.clearcoatNormalMap] || null), void 0 !== t.clearcoatNormalScale && (this.clearcoatNormalScale = new Vector2().fromArray(t.clearcoatNormalScale)), void 0 !== t.iridescenceMap && (this.iridescenceMap = e[t.iridescenceMap] || null), void 0 !== t.iridescenceThicknessMap && (this.iridescenceThicknessMap = e[t.iridescenceThicknessMap] || null), void 0 !== t.transmissionMap && (this.transmissionMap = e[t.transmissionMap] || null), void 0 !== t.thicknessMap && (this.thicknessMap = e[t.thicknessMap] || null), void 0 !== t.anisotropyMap && (this.anisotropyMap = e[t.anisotropyMap] || null), void 0 !== t.sheenColorMap && (this.sheenColorMap = e[t.sheenColorMap] || null), void 0 !== t.sheenRoughnessMap && (this.sheenRoughnessMap = e[t.sheenRoughnessMap] || null), this;
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
      const e = t.clippingPlanes;
      let i = null;
      if (null !== e) {
        const t2 = e.length;
        i = new Array(t2);
        for (let r = 0; r !== t2; ++r) i[r] = e[r].clone();
      }
      return this.clippingPlanes = i, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.allowOverride = t.allowOverride, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
    }
    dispose() {
      this.dispatchEvent({ type: "dispose" });
    }
    set needsUpdate(t) {
      true === t && this.version++;
    }
  };
  var _intersectPoint = new Vector3();
  var _worldScale = new Vector3();
  var _mvPosition = new Vector3();
  var _alignedPosition = new Vector2();
  var _rotatedPosition = new Vector2();
  var _viewWorldMatrix = new Matrix4();
  var _vA$1 = new Vector3();
  var _vB$1 = new Vector3();
  var _vC$1 = new Vector3();
  var _uvA = new Vector2();
  var _uvB = new Vector2();
  var _uvC = new Vector2();
  var _v1$2 = new Vector3();
  var _v2$1 = new Vector3();
  var _vector$7 = new Vector3();
  var _segCenter = new Vector3();
  var _segDir = new Vector3();
  var _diff = new Vector3();
  var Ray = class {
    constructor(t = new Vector3(), e = new Vector3(0, 0, -1)) {
      this.origin = t, this.direction = e;
    }
    set(t, e) {
      return this.origin.copy(t), this.direction.copy(e), this;
    }
    copy(t) {
      return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
    }
    at(t, e) {
      return e.copy(this.origin).addScaledVector(this.direction, t);
    }
    lookAt(t) {
      return this.direction.copy(t).sub(this.origin).normalize(), this;
    }
    recast(t) {
      return this.origin.copy(this.at(t, _vector$7)), this;
    }
    closestPointToPoint(t, e) {
      e.subVectors(t, this.origin);
      const i = e.dot(this.direction);
      return i < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, i);
    }
    distanceToPoint(t) {
      return Math.sqrt(this.distanceSqToPoint(t));
    }
    distanceSqToPoint(t) {
      const e = _vector$7.subVectors(t, this.origin).dot(this.direction);
      return e < 0 ? this.origin.distanceToSquared(t) : (_vector$7.copy(this.origin).addScaledVector(this.direction, e), _vector$7.distanceToSquared(t));
    }
    distanceSqToSegment(t, e, i, r) {
      _segCenter.copy(t).add(e).multiplyScalar(0.5), _segDir.copy(e).sub(t).normalize(), _diff.copy(this.origin).sub(_segCenter);
      const s = 0.5 * t.distanceTo(e), n = -this.direction.dot(_segDir), a = _diff.dot(this.direction), o = -_diff.dot(_segDir), h = _diff.lengthSq(), l = Math.abs(1 - n * n);
      let c, u, p, d;
      if (l > 0) if (c = n * o - a, u = n * a - o, d = s * l, c >= 0) if (u >= -d) if (u <= d) {
        const t2 = 1 / l;
        c *= t2, u *= t2, p = c * (c + n * u + 2 * a) + u * (n * c + u + 2 * o) + h;
      } else u = s, c = Math.max(0, -(n * u + a)), p = -c * c + u * (u + 2 * o) + h;
      else u = -s, c = Math.max(0, -(n * u + a)), p = -c * c + u * (u + 2 * o) + h;
      else u <= -d ? (c = Math.max(0, -(-n * s + a)), u = c > 0 ? -s : Math.min(Math.max(-s, -o), s), p = -c * c + u * (u + 2 * o) + h) : u <= d ? (c = 0, u = Math.min(Math.max(-s, -o), s), p = u * (u + 2 * o) + h) : (c = Math.max(0, -(n * s + a)), u = c > 0 ? s : Math.min(Math.max(-s, -o), s), p = -c * c + u * (u + 2 * o) + h);
      else u = n > 0 ? -s : s, c = Math.max(0, -(n * u + a)), p = -c * c + u * (u + 2 * o) + h;
      return i && i.copy(this.origin).addScaledVector(this.direction, c), r && r.copy(_segCenter).addScaledVector(_segDir, u), p;
    }
    intersectSphere(t, e) {
      if (t.radius < 0) return null;
      _vector$7.subVectors(t.center, this.origin);
      const i = _vector$7.dot(this.direction), r = _vector$7.dot(_vector$7) - i * i, s = t.radius * t.radius;
      if (r > s) return null;
      const n = Math.sqrt(s - r), a = i - n, o = i + n;
      return o < 0 ? null : a < 0 ? this.at(o, e) : this.at(a, e);
    }
    intersectsSphere(t) {
      return !(t.radius < 0) && this.distanceSqToPoint(t.center) <= t.radius * t.radius;
    }
    distanceToPlane(t) {
      const e = t.normal.dot(this.direction);
      if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
      const i = -(this.origin.dot(t.normal) + t.constant) / e;
      return i >= 0 ? i : null;
    }
    intersectPlane(t, e) {
      const i = this.distanceToPlane(t);
      return null === i ? null : this.at(i, e);
    }
    intersectsPlane(t) {
      const e = t.distanceToPoint(this.origin);
      if (0 === e) return true;
      return t.normal.dot(this.direction) * e < 0;
    }
    intersectBox(t, e) {
      let i, r, s, n, a, o;
      const h = 1 / this.direction.x, l = 1 / this.direction.y, c = 1 / this.direction.z, u = this.origin;
      return h >= 0 ? (i = (t.min.x - u.x) * h, r = (t.max.x - u.x) * h) : (i = (t.max.x - u.x) * h, r = (t.min.x - u.x) * h), l >= 0 ? (s = (t.min.y - u.y) * l, n = (t.max.y - u.y) * l) : (s = (t.max.y - u.y) * l, n = (t.min.y - u.y) * l), i > n || s > r ? null : ((s > i || isNaN(i)) && (i = s), (n < r || isNaN(r)) && (r = n), c >= 0 ? (a = (t.min.z - u.z) * c, o = (t.max.z - u.z) * c) : (a = (t.max.z - u.z) * c, o = (t.min.z - u.z) * c), i > o || a > r ? null : ((a > i || i != i) && (i = a), (o < r || r != r) && (r = o), r < 0 ? null : this.at(i >= 0 ? i : r, e)));
    }
    intersectsBox(t) {
      return null !== this.intersectBox(t, _vector$7);
    }
    intersectTriangle(t, e, i, r, s) {
      const n = this.origin, a = this.direction, o = a.x, h = a.y, l = a.z, c = t.x - n.x, u = t.y - n.y, p = t.z - n.z, d = e.x - n.x, m = e.y - n.y, y = e.z - n.z, f = i.x - n.x, g = i.y - n.y, x = i.z - n.z, _ = Math.abs(o), v = Math.abs(h), b = Math.abs(l);
      let M, w, S, A, T, C, B, I, z, V, P, R;
      if (_ >= v && _ >= b ? (S = o, C = c, z = d, R = f, o >= 0 ? (M = h, w = l, A = u, T = p, B = m, I = y, V = g, P = x) : (M = l, w = h, A = p, T = u, B = y, I = m, V = x, P = g)) : v >= b ? (S = h, C = u, z = m, R = g, h >= 0 ? (M = l, w = o, A = p, T = c, B = y, I = d, V = x, P = f) : (M = o, w = l, A = c, T = p, B = d, I = y, V = f, P = x)) : (S = l, C = p, z = y, R = x, l >= 0 ? (M = o, w = h, A = c, T = u, B = d, I = m, V = f, P = g) : (M = h, w = o, A = u, T = c, B = m, I = d, V = g, P = f)), 0 === S) return null;
      const F = M / S, L = w / S, E = A - F * C, O = T - L * C, k = B - F * z, D = I - L * z, N = V - F * R, G = P - L * R, U = N * D - G * k, $ = E * G - O * N, j = k * O - D * E;
      if (r) {
        if (U < 0 || $ < 0 || j < 0) return null;
      } else if ((U < 0 || $ < 0 || j < 0) && (U > 0 || $ > 0 || j > 0)) return null;
      const W = U + $ + j;
      if (0 === W) return null;
      const q = 1 / S * (U * C + $ * z + j * R);
      return (W > 0 ? q < 0 : q > 0) ? null : this.at(q / W, s);
    }
    applyMatrix4(t) {
      return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
    }
    equals(t) {
      return t.origin.equals(this.origin) && t.direction.equals(this.direction);
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var MeshBasicMaterial = class extends Material {
    constructor(t) {
      super(), this.isMeshBasicMaterial = true, this.type = "MeshBasicMaterial", this.color = new Color(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = false, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = true, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
    }
  };
  var _inverseMatrix$3 = new Matrix4();
  var _ray$3 = new Ray();
  var _sphere$6 = new Sphere();
  var _sphereHitAt = new Vector3();
  var _vA = new Vector3();
  var _vB = new Vector3();
  var _vC = new Vector3();
  var _tempA = new Vector3();
  var _morphA = new Vector3();
  var _intersectionPoint = new Vector3();
  var _intersectionPointWorld = new Vector3();
  var Mesh = class extends Object3D {
    constructor(t = new BufferGeometry(), e = new MeshBasicMaterial()) {
      super(), this.isMesh = true, this.type = "Mesh", this.geometry = t, this.material = e, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
    }
    copy(t, e) {
      return super.copy(t, e), void 0 !== t.morphTargetInfluences && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), void 0 !== t.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
    }
    updateMorphTargets() {
      const t = this.geometry.morphAttributes, e = Object.keys(t);
      if (e.length > 0) {
        const i = t[e[0]];
        if (void 0 !== i) {
          this.morphTargetInfluences = [], this.morphTargetDictionary = {};
          for (let t2 = 0, e2 = i.length; t2 < e2; t2++) {
            const e3 = i[t2].name || String(t2);
            this.morphTargetInfluences.push(0), this.morphTargetDictionary[e3] = t2;
          }
        }
      }
    }
    getVertexPosition(t, e) {
      const i = this.geometry, r = i.attributes.position, s = i.morphAttributes.position, n = i.morphTargetsRelative;
      e.fromBufferAttribute(r, t);
      const a = this.morphTargetInfluences;
      if (s && a) {
        _morphA.set(0, 0, 0);
        for (let i2 = 0, r2 = s.length; i2 < r2; i2++) {
          const r3 = a[i2], o = s[i2];
          0 !== r3 && (_tempA.fromBufferAttribute(o, t), n ? _morphA.addScaledVector(_tempA, r3) : _morphA.addScaledVector(_tempA.sub(e), r3));
        }
        e.add(_morphA);
      }
      return e;
    }
    intersectsFrustum(t) {
      return t.intersectsObject(this);
    }
    raycast(t, e) {
      const i = this.geometry, r = this.material, s = this.matrixWorld;
      if (void 0 !== r) {
        if (null === i.boundingSphere && i.computeBoundingSphere(), _sphere$6.copy(i.boundingSphere), _sphere$6.applyMatrix4(s), _ray$3.copy(t.ray).recast(t.near), false === _sphere$6.containsPoint(_ray$3.origin)) {
          if (null === _ray$3.intersectSphere(_sphere$6, _sphereHitAt)) return;
          if (_ray$3.origin.distanceToSquared(_sphereHitAt) > (t.far - t.near) ** 2) return;
        }
        _inverseMatrix$3.copy(s).invert(), _ray$3.copy(t.ray).applyMatrix4(_inverseMatrix$3), null !== i.boundingBox && false === _ray$3.intersectsBox(i.boundingBox) || this._computeIntersections(t, e, _ray$3);
      }
    }
    _computeIntersections(t, e, i) {
      let r;
      const s = this.geometry, n = this.material, a = s.index, o = s.attributes.position, h = s.attributes.uv, l = s.attributes.uv1, c = s.attributes.normal, u = s.groups, p = s.drawRange;
      if (null !== a) if (Array.isArray(n)) for (let s2 = 0, o2 = u.length; s2 < o2; s2++) {
        const o3 = u[s2], d = n[o3.materialIndex];
        for (let s3 = Math.max(o3.start, p.start), n2 = Math.min(a.count, Math.min(o3.start + o3.count, p.start + p.count)); s3 < n2; s3 += 3) {
          r = checkGeometryIntersection(this, d, t, i, h, l, c, a.getX(s3), a.getX(s3 + 1), a.getX(s3 + 2)), r && (r.faceIndex = Math.floor(s3 / 3), r.face.materialIndex = o3.materialIndex, e.push(r));
        }
      }
      else {
        for (let s2 = Math.max(0, p.start), o2 = Math.min(a.count, p.start + p.count); s2 < o2; s2 += 3) {
          r = checkGeometryIntersection(this, n, t, i, h, l, c, a.getX(s2), a.getX(s2 + 1), a.getX(s2 + 2)), r && (r.faceIndex = Math.floor(s2 / 3), e.push(r));
        }
      }
      else if (void 0 !== o) if (Array.isArray(n)) for (let s2 = 0, a2 = u.length; s2 < a2; s2++) {
        const a3 = u[s2], d = n[a3.materialIndex];
        for (let s3 = Math.max(a3.start, p.start), n2 = Math.min(o.count, Math.min(a3.start + a3.count, p.start + p.count)); s3 < n2; s3 += 3) {
          r = checkGeometryIntersection(this, d, t, i, h, l, c, s3, s3 + 1, s3 + 2), r && (r.faceIndex = Math.floor(s3 / 3), r.face.materialIndex = a3.materialIndex, e.push(r));
        }
      }
      else {
        for (let s2 = Math.max(0, p.start), a2 = Math.min(o.count, p.start + p.count); s2 < a2; s2 += 3) {
          r = checkGeometryIntersection(this, n, t, i, h, l, c, s2, s2 + 1, s2 + 2), r && (r.faceIndex = Math.floor(s2 / 3), e.push(r));
        }
      }
    }
  };
  function checkIntersection$1(t, e, i, r, s, n, a, o) {
    let h;
    if (h = 1 === e.side ? r.intersectTriangle(a, n, s, true, o) : r.intersectTriangle(s, n, a, 0 === e.side, o), null === h) return null;
    _intersectionPointWorld.copy(o), _intersectionPointWorld.applyMatrix4(t.matrixWorld);
    const l = i.ray.origin.distanceTo(_intersectionPointWorld);
    return l < i.near || l > i.far ? null : { distance: l, point: _intersectionPointWorld.clone(), object: t };
  }
  function checkGeometryIntersection(t, e, i, r, s, n, a, o, h, l) {
    t.getVertexPosition(o, _vA), t.getVertexPosition(h, _vB), t.getVertexPosition(l, _vC);
    const c = checkIntersection$1(t, e, i, r, _vA, _vB, _vC, _intersectionPoint);
    if (c) {
      const t2 = new Vector3();
      Triangle.getBarycoord(_intersectionPoint, _vA, _vB, _vC, t2), s && (c.uv = Triangle.getInterpolatedAttribute(s, o, h, l, t2, new Vector2())), n && (c.uv1 = Triangle.getInterpolatedAttribute(n, o, h, l, t2, new Vector2())), a && (c.normal = Triangle.getInterpolatedAttribute(a, o, h, l, t2, new Vector3()), c.normal.dot(r.direction) > 0 && c.normal.multiplyScalar(-1));
      const e2 = { a: o, b: h, c: l, normal: new Vector3(), materialIndex: 0 };
      Triangle.getNormal(_vA, _vB, _vC, e2.normal), c.face = e2, c.barycoord = t2;
    }
    return c;
  }
  var _baseVector = new Vector4();
  var _skinIndex = new Vector4();
  var _skinWeight = new Vector4();
  var _vector4 = new Vector4();
  var _matrix4 = new Matrix4();
  var _vertex = new Vector3();
  var _sphere$5 = new Sphere();
  var _inverseMatrix$2 = new Matrix4();
  var _ray$2 = new Ray();
  var DataTexture = class extends Texture {
    constructor(t = null, e = 1, i = 1, r, s, n, a, o, h = 1003, l = 1003, c, u) {
      super(null, n, a, o, h, l, r, s, c, u), this.isDataTexture = true, this.image = { data: t, width: e, height: i }, this.generateMipmaps = false, this.flipY = false, this.unpackAlignment = 1;
    }
  };
  var _offsetMatrix = new Matrix4();
  var _identityMatrix = new Matrix4();
  var _instanceLocalMatrix = new Matrix4();
  var _instanceWorldMatrix = new Matrix4();
  var _box3 = new Box3();
  var _identity = new Matrix4();
  var _mesh$1 = new Mesh();
  var _sphere$4 = new Sphere();
  var _sphere$3 = new Sphere();
  var _defaultSpriteCenter = new Vector2(0.5, 0.5);
  var _vector$6 = new Vector3();
  var Frustum = class {
    constructor(t = new Plane(), e = new Plane(), i = new Plane(), r = new Plane(), s = new Plane(), n = new Plane()) {
      this.planes = [t, e, i, r, s, n];
    }
    set(t, e, i, r, s, n) {
      const a = this.planes;
      return a[0].copy(t), a[1].copy(e), a[2].copy(i), a[3].copy(r), a[4].copy(s), a[5].copy(n), this;
    }
    copy(t) {
      const e = this.planes;
      for (let i = 0; i < 6; i++) e[i].copy(t.planes[i]);
      return this;
    }
    setFromProjectionMatrix(t, e = 2e3, i = false) {
      const r = this.planes, s = t.elements, n = s[0], a = s[1], o = s[2], h = s[3], l = s[4], c = s[5], u = s[6], p = s[7], d = s[8], m = s[9], y = s[10], f = s[11], g = s[12], x = s[13], _ = s[14], v = s[15];
      if (r[0].setComponents(h - n, p - l, f - d, v - g).normalize(), r[1].setComponents(h + n, p + l, f + d, v + g).normalize(), r[2].setComponents(h + a, p + c, f + m, v + x).normalize(), r[3].setComponents(h - a, p - c, f - m, v - x).normalize(), i) r[4].setComponents(o, u, y, _).normalize(), r[5].setComponents(h - o, p - u, f - y, v - _).normalize();
      else if (r[4].setComponents(h - o, p - u, f - y, v - _).normalize(), 2e3 === e) r[5].setComponents(h + o, p + u, f + y, v + _).normalize();
      else {
        if (2001 !== e) throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
        r[5].setComponents(o, u, y, _).normalize();
      }
      return this;
    }
    intersectsObject(t) {
      if (void 0 !== t.boundingSphere) null === t.boundingSphere && t.computeBoundingSphere(), _sphere$3.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
      else {
        const e = t.geometry;
        null === e.boundingSphere && e.computeBoundingSphere(), _sphere$3.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
      }
      return this.intersectsSphere(_sphere$3);
    }
    intersectsSprite(t) {
      _sphere$3.center.set(0, 0, 0);
      const e = _defaultSpriteCenter.distanceTo(t.center);
      return _sphere$3.radius = 0.7071067811865476 + e, _sphere$3.applyMatrix4(t.matrixWorld), this.intersectsSphere(_sphere$3);
    }
    intersectsSphere(t) {
      const e = this.planes, i = t.center, r = -t.radius;
      for (let t2 = 0; t2 < 6; t2++) {
        if (e[t2].distanceToPoint(i) < r) return false;
      }
      return true;
    }
    intersectsBox(t) {
      const e = this.planes;
      for (let i = 0; i < 6; i++) {
        const r = e[i];
        if (_vector$6.x = r.normal.x > 0 ? t.max.x : t.min.x, _vector$6.y = r.normal.y > 0 ? t.max.y : t.min.y, _vector$6.z = r.normal.z > 0 ? t.max.z : t.min.z, r.distanceToPoint(_vector$6) < 0) return false;
      }
      return true;
    }
    containsPoint(t) {
      const e = this.planes;
      for (let i = 0; i < 6; i++) if (e[i].distanceToPoint(t) < 0) return false;
      return true;
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var _projScreenMatrix$1 = new Matrix4();
  var FrustumArray = class _FrustumArray {
    constructor() {
      this.coordinateSystem = 2e3, this._frustums = [], this._count = 0;
    }
    setFromArrayCamera(t) {
      const e = t.cameras, i = this._frustums;
      for (let t2 = 0; t2 < e.length; t2++) {
        const r = e[t2];
        _projScreenMatrix$1.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse), void 0 === i[t2] && (i[t2] = new Frustum()), i[t2].setFromProjectionMatrix(_projScreenMatrix$1, r.coordinateSystem, r.reversedDepth);
      }
      return this._count = e.length, this;
    }
    intersectsObject(t) {
      const e = this._frustums;
      for (let i = 0; i < this._count; i++) if (e[i].intersectsObject(t)) return true;
      return false;
    }
    intersectsSprite(t) {
      const e = this._frustums;
      for (let i = 0; i < this._count; i++) if (e[i].intersectsSprite(t)) return true;
      return false;
    }
    intersectsSphere(t) {
      const e = this._frustums;
      for (let i = 0; i < this._count; i++) if (e[i].intersectsSphere(t)) return true;
      return false;
    }
    intersectsBox(t) {
      const e = this._frustums;
      for (let i = 0; i < this._count; i++) if (e[i].intersectsBox(t)) return true;
      return false;
    }
    containsPoint(t) {
      const e = this._frustums;
      for (let i = 0; i < this._count; i++) if (e[i].containsPoint(t)) return true;
      return false;
    }
    copy(t) {
      this.coordinateSystem = t.coordinateSystem;
      const e = this._frustums, i = t._frustums;
      for (let r = 0; r < t._count; r++) void 0 === e[r] && (e[r] = new Frustum()), e[r].copy(i[r]);
      return this._count = t._count, this;
    }
    clone() {
      return new _FrustumArray().copy(this);
    }
  };
  var MultiDrawRenderList = class {
    constructor() {
      this.index = 0, this.pool = [], this.list = [];
    }
    push(t, e, i, r) {
      const s = this.pool, n = this.list;
      this.index >= s.length && s.push({ start: -1, count: -1, z: -1, index: -1 });
      const a = s[this.index];
      n.push(a), this.index++, a.start = t, a.count = e, a.z = i, a.index = r;
    }
    reset() {
      this.list.length = 0, this.index = 0;
    }
  };
  var _matrix$1 = new Matrix4();
  var _whiteColor = new Color(1, 1, 1);
  var _frustum = new Frustum();
  var _frustumArray = new FrustumArray();
  var _box$1 = new Box3();
  var _sphere$2 = new Sphere();
  var _vector$5 = new Vector3();
  var _forward$1 = new Vector3();
  var _temp = new Vector3();
  var _renderList = new MultiDrawRenderList();
  var _mesh = new Mesh();
  var _vStart = new Vector3();
  var _vEnd = new Vector3();
  var _inverseMatrix$1 = new Matrix4();
  var _ray$1 = new Ray();
  var _sphere$1 = new Sphere();
  var _intersectPointOnRay = new Vector3();
  var _intersectPointOnSegment = new Vector3();
  var _start = new Vector3();
  var _end = new Vector3();
  var _inverseMatrix = new Matrix4();
  var _ray = new Ray();
  var _sphere = new Sphere();
  var _position$3 = new Vector3();
  var CubeTexture = class extends Texture {
    constructor(t = [], e = 301, i, r, s, n, a, o, h, l) {
      super(t, e, i, r, s, n, a, o, h, l), this.isCubeTexture = true, this.flipY = false;
    }
    get images() {
      return this.image;
    }
    set images(t) {
      this.image = t;
    }
  };
  var DepthTexture = class extends Texture {
    constructor(t, e, i = 1014, r, s, n, a = 1003, o = 1003, h, l = 1026, c = 1) {
      if (1026 !== l && 1027 !== l) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
      super({ width: t, height: e, depth: c }, r, s, n, a, o, l, i, h), this.isDepthTexture = true, this.flipY = false, this.generateMipmaps = false, this.compareFunction = null;
    }
    copy(t) {
      return super.copy(t), this.source = new TextureSource(Object.assign({}, t.image)), this.compareFunction = t.compareFunction, this;
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return e.compareFunction = this.compareFunction, e;
    }
  };
  var CubeDepthTexture = class extends DepthTexture {
    constructor(t, e = 1014, i = 301, r, s, n = 1003, a = 1003, o, h = 1026) {
      const l = { width: t, height: t, depth: 1 }, c = [l, l, l, l, l, l];
      super(t, t, e, i, r, s, n, a, o, h), this.image = c, this.isCubeDepthTexture = true, this.isCubeTexture = true;
    }
    get images() {
      return this.image;
    }
    set images(t) {
      this.image = t;
    }
  };
  var ExternalTexture = class extends Texture {
    constructor(t = null) {
      super(), this.sourceTexture = t, this.isExternalTexture = true;
    }
    copy(t) {
      return super.copy(t), this.sourceTexture = t.sourceTexture, this;
    }
  };
  var BoxGeometry = class _BoxGeometry extends BufferGeometry {
    constructor(t = 1, e = 1, i = 1, r = 1, s = 1, n = 1) {
      super(), this.type = "BoxGeometry", this.parameters = { width: t, height: e, depth: i, widthSegments: r, heightSegments: s, depthSegments: n };
      const a = this;
      r = Math.floor(r), s = Math.floor(s), n = Math.floor(n);
      const o = [], h = [], l = [], c = [];
      let u = 0, p = 0;
      function d(t2, e2, i2, r2, s2, n2, d2, m, y, f, g) {
        const x = n2 / y, _ = d2 / f, v = n2 / 2, b = d2 / 2, M = m / 2, w = y + 1, S = f + 1;
        let A = 0, T = 0;
        const C = new Vector3();
        for (let n3 = 0; n3 < S; n3++) {
          const a2 = n3 * _ - b;
          for (let o2 = 0; o2 < w; o2++) {
            const u2 = o2 * x - v;
            C[t2] = u2 * r2, C[e2] = a2 * s2, C[i2] = M, h.push(C.x, C.y, C.z), C[t2] = 0, C[e2] = 0, C[i2] = m > 0 ? 1 : -1, l.push(C.x, C.y, C.z), c.push(o2 / y), c.push(1 - n3 / f), A += 1;
          }
        }
        for (let t3 = 0; t3 < f; t3++) for (let e3 = 0; e3 < y; e3++) {
          const i3 = u + e3 + w * t3, r3 = u + e3 + w * (t3 + 1), s3 = u + (e3 + 1) + w * (t3 + 1), n3 = u + (e3 + 1) + w * t3;
          o.push(i3, r3, n3), o.push(r3, s3, n3), T += 6;
        }
        a.addGroup(p, T, g), p += T, u += A;
      }
      d("z", "y", "x", -1, -1, i, e, t, n, s, 0), d("z", "y", "x", 1, -1, i, e, -t, n, s, 1), d("x", "z", "y", 1, 1, t, i, e, r, n, 2), d("x", "z", "y", 1, -1, t, i, -e, r, n, 3), d("x", "y", "z", 1, -1, t, e, i, r, s, 4), d("x", "y", "z", -1, -1, t, e, -i, r, s, 5), this.setIndex(o), this.setAttribute("position", new Float32BufferAttribute(h, 3)), this.setAttribute("normal", new Float32BufferAttribute(l, 3)), this.setAttribute("uv", new Float32BufferAttribute(c, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _BoxGeometry(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
    }
  };
  var CapsuleGeometry = class _CapsuleGeometry extends BufferGeometry {
    constructor(t = 1, e = 1, i = 4, r = 8, s = 1) {
      super(), this.type = "CapsuleGeometry", this.parameters = { radius: t, height: e, capSegments: i, radialSegments: r, heightSegments: s }, e = Math.max(0, e), i = Math.max(1, Math.floor(i)), r = Math.max(3, Math.floor(r)), s = Math.max(1, Math.floor(s));
      const n = [], a = [], o = [], h = [], l = e / 2, c = Math.PI / 2 * t, u = e, p = 2 * c + u, d = 2 * i + s, m = r + 1, y = new Vector3(), f = new Vector3();
      for (let g = 0; g <= d; g++) {
        let x = 0, _ = 0, v = 0, b = 0;
        if (g <= i) {
          const e2 = g / i, r2 = e2 * Math.PI / 2;
          _ = -l - t * Math.cos(r2), v = t * Math.sin(r2), b = -t * Math.cos(r2), x = e2 * c;
        } else if (g <= i + s) {
          const r2 = (g - i) / s;
          _ = r2 * e - l, v = t, b = 0, x = c + r2 * u;
        } else {
          const e2 = (g - i - s) / i, r2 = e2 * Math.PI / 2;
          _ = l + t * Math.sin(r2), v = t * Math.cos(r2), b = t * Math.sin(r2), x = c + u + e2 * c;
        }
        const M = Math.max(0, Math.min(1, x / p));
        let w = 0;
        0 === g ? w = 0.5 / r : g === d && (w = -0.5 / r);
        for (let t2 = 0; t2 <= r; t2++) {
          const e2 = t2 / r, i2 = e2 * Math.PI * 2, s2 = Math.sin(i2), n2 = Math.cos(i2);
          f.x = -v * n2, f.y = _, f.z = v * s2, a.push(f.x, f.y, f.z), y.set(-v * n2, b, v * s2), y.normalize(), o.push(y.x, y.y, y.z), h.push(e2 + w, M);
        }
        if (g > 0) {
          const t2 = (g - 1) * m;
          for (let e2 = 0; e2 < r; e2++) {
            const i2 = t2 + e2, r2 = t2 + e2 + 1, s2 = g * m + e2, a2 = g * m + e2 + 1;
            n.push(i2, r2, s2), n.push(r2, a2, s2);
          }
        }
      }
      this.setIndex(n), this.setAttribute("position", new Float32BufferAttribute(a, 3)), this.setAttribute("normal", new Float32BufferAttribute(o, 3)), this.setAttribute("uv", new Float32BufferAttribute(h, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _CapsuleGeometry(t.radius, t.height, t.capSegments, t.radialSegments, t.heightSegments);
    }
  };
  var CircleGeometry = class _CircleGeometry extends BufferGeometry {
    constructor(t = 1, e = 32, i = 0, r = 2 * Math.PI) {
      super(), this.type = "CircleGeometry", this.parameters = { radius: t, segments: e, thetaStart: i, thetaLength: r }, e = Math.max(3, e);
      const s = [], n = [], a = [], o = [], h = new Vector3(), l = new Vector2();
      n.push(0, 0, 0), a.push(0, 0, 1), o.push(0.5, 0.5);
      for (let s2 = 0, c = 3; s2 <= e; s2++, c += 3) {
        const u = i + s2 / e * r;
        h.x = t * Math.cos(u), h.y = t * Math.sin(u), n.push(h.x, h.y, h.z), a.push(0, 0, 1), l.x = (n[c] / t + 1) / 2, l.y = (n[c + 1] / t + 1) / 2, o.push(l.x, l.y);
      }
      for (let t2 = 1; t2 <= e; t2++) s.push(t2, t2 + 1, 0);
      this.setIndex(s), this.setAttribute("position", new Float32BufferAttribute(n, 3)), this.setAttribute("normal", new Float32BufferAttribute(a, 3)), this.setAttribute("uv", new Float32BufferAttribute(o, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _CircleGeometry(t.radius, t.segments, t.thetaStart, t.thetaLength);
    }
  };
  var CylinderGeometry = class _CylinderGeometry extends BufferGeometry {
    constructor(t = 1, e = 1, i = 1, r = 32, s = 1, n = false, a = 0, o = 2 * Math.PI) {
      super(), this.type = "CylinderGeometry", this.parameters = { radiusTop: t, radiusBottom: e, height: i, radialSegments: r, heightSegments: s, openEnded: n, thetaStart: a, thetaLength: o };
      const h = this;
      r = Math.floor(r), s = Math.floor(s);
      const l = [], c = [], u = [], p = [];
      let d = 0;
      const m = [], y = i / 2;
      let f = 0;
      function g(i2) {
        const s2 = d, n2 = new Vector2(), m2 = new Vector3();
        let g2 = 0;
        const x = true === i2 ? t : e, _ = true === i2 ? 1 : -1;
        for (let t2 = 1; t2 <= r; t2++) c.push(0, y * _, 0), u.push(0, _, 0), p.push(0.5, 0.5), d++;
        const v = d;
        for (let t2 = 0; t2 <= r; t2++) {
          const e2 = t2 / r * o + a, i3 = Math.cos(e2), s3 = Math.sin(e2);
          m2.x = x * s3, m2.y = y * _, m2.z = x * i3, c.push(m2.x, m2.y, m2.z), u.push(0, _, 0), n2.x = 0.5 * i3 + 0.5, n2.y = 0.5 * s3 * _ + 0.5, p.push(n2.x, n2.y), d++;
        }
        for (let t2 = 0; t2 < r; t2++) {
          const e2 = s2 + t2, r2 = v + t2;
          true === i2 ? l.push(r2, r2 + 1, e2) : l.push(r2 + 1, r2, e2), g2 += 3;
        }
        h.addGroup(f, g2, true === i2 ? 1 : 2), f += g2;
      }
      !(function() {
        const n2 = new Vector3(), g2 = new Vector3();
        let x = 0;
        const _ = (e - t) / i;
        for (let h2 = 0; h2 <= s; h2++) {
          const l2 = [], f2 = h2 / s, x2 = f2 * (e - t) + t;
          for (let t2 = 0; t2 <= r; t2++) {
            const e2 = t2 / r, s2 = e2 * o + a, h3 = Math.sin(s2), m2 = Math.cos(s2);
            g2.x = x2 * h3, g2.y = -f2 * i + y, g2.z = x2 * m2, c.push(g2.x, g2.y, g2.z), n2.set(h3, _, m2).normalize(), u.push(n2.x, n2.y, n2.z), p.push(e2, 1 - f2), l2.push(d++);
          }
          m.push(l2);
        }
        for (let i2 = 0; i2 < r; i2++) for (let r2 = 0; r2 < s; r2++) {
          const n3 = m[r2][i2], a2 = m[r2 + 1][i2], o2 = m[r2 + 1][i2 + 1], h2 = m[r2][i2 + 1];
          (t > 0 || 0 !== r2) && (l.push(n3, a2, h2), x += 3), (e > 0 || r2 !== s - 1) && (l.push(a2, o2, h2), x += 3);
        }
        h.addGroup(f, x, 0), f += x;
      })(), false === n && (t > 0 && g(true), e > 0 && g(false)), this.setIndex(l), this.setAttribute("position", new Float32BufferAttribute(c, 3)), this.setAttribute("normal", new Float32BufferAttribute(u, 3)), this.setAttribute("uv", new Float32BufferAttribute(p, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _CylinderGeometry(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
  };
  var ConeGeometry = class _ConeGeometry extends CylinderGeometry {
    constructor(t = 1, e = 1, i = 32, r = 1, s = false, n = 0, a = 2 * Math.PI) {
      super(0, t, e, i, r, s, n, a), this.type = "ConeGeometry", this.parameters = { radius: t, height: e, radialSegments: i, heightSegments: r, openEnded: s, thetaStart: n, thetaLength: a };
    }
    static fromJSON(t) {
      return new _ConeGeometry(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
    }
  };
  var PolyhedronGeometry = class _PolyhedronGeometry extends BufferGeometry {
    constructor(t = [], e = [], i = 1, r = 0) {
      super(), this.type = "PolyhedronGeometry", this.parameters = { vertices: t, indices: e, radius: i, detail: r };
      const s = [], n = [];
      function a(t2, e2, i2, r2) {
        const s2 = r2 + 1, n2 = [];
        for (let r3 = 0; r3 <= s2; r3++) {
          n2[r3] = [];
          const a2 = t2.clone().lerp(i2, r3 / s2), o2 = e2.clone().lerp(i2, r3 / s2), h2 = s2 - r3;
          for (let t3 = 0; t3 <= h2; t3++) n2[r3][t3] = 0 === t3 && r3 === s2 ? a2 : a2.clone().lerp(o2, t3 / h2);
        }
        for (let t3 = 0; t3 < s2; t3++) for (let e3 = 0; e3 < 2 * (s2 - t3) - 1; e3++) {
          const i3 = Math.floor(e3 / 2);
          e3 % 2 == 0 ? (o(n2[t3][i3 + 1]), o(n2[t3 + 1][i3]), o(n2[t3][i3])) : (o(n2[t3][i3 + 1]), o(n2[t3 + 1][i3 + 1]), o(n2[t3 + 1][i3]));
        }
      }
      function o(t2) {
        s.push(t2.x, t2.y, t2.z);
      }
      function h(e2, i2) {
        const r2 = 3 * e2;
        i2.x = t[r2 + 0], i2.y = t[r2 + 1], i2.z = t[r2 + 2];
      }
      function l(t2, e2, i2, r2) {
        r2 < 0 && 1 === t2.x && (n[e2] = t2.x - 1), 0 === i2.x && 0 === i2.z && (n[e2] = r2 / 2 / Math.PI + 0.5);
      }
      function c(t2) {
        return Math.atan2(t2.z, -t2.x);
      }
      function u(t2) {
        return Math.atan2(-t2.y, Math.sqrt(t2.x * t2.x + t2.z * t2.z));
      }
      !(function(t2) {
        const i2 = new Vector3(), r2 = new Vector3(), s2 = new Vector3();
        for (let n2 = 0; n2 < e.length; n2 += 3) h(e[n2 + 0], i2), h(e[n2 + 1], r2), h(e[n2 + 2], s2), a(i2, r2, s2, t2);
      })(r), (function(t2) {
        const e2 = new Vector3();
        for (let i2 = 0; i2 < s.length; i2 += 3) e2.x = s[i2 + 0], e2.y = s[i2 + 1], e2.z = s[i2 + 2], e2.normalize().multiplyScalar(t2), s[i2 + 0] = e2.x, s[i2 + 1] = e2.y, s[i2 + 2] = e2.z;
      })(i), (function() {
        const t2 = new Vector3();
        for (let e2 = 0; e2 < s.length; e2 += 3) {
          t2.x = s[e2 + 0], t2.y = s[e2 + 1], t2.z = s[e2 + 2];
          const i2 = c(t2) / 2 / Math.PI + 0.5, r2 = u(t2) / Math.PI + 0.5;
          n.push(i2, 1 - r2);
        }
        (function() {
          const t3 = new Vector3(), e2 = new Vector3(), i2 = new Vector3(), r2 = new Vector3(), a2 = new Vector2(), o2 = new Vector2(), h2 = new Vector2();
          for (let u2 = 0, p = 0; u2 < s.length; u2 += 9, p += 6) {
            t3.set(s[u2 + 0], s[u2 + 1], s[u2 + 2]), e2.set(s[u2 + 3], s[u2 + 4], s[u2 + 5]), i2.set(s[u2 + 6], s[u2 + 7], s[u2 + 8]), a2.set(n[p + 0], n[p + 1]), o2.set(n[p + 2], n[p + 3]), h2.set(n[p + 4], n[p + 5]), r2.copy(t3).add(e2).add(i2).divideScalar(3);
            const d = c(r2);
            l(a2, p + 0, t3, d), l(o2, p + 2, e2, d), l(h2, p + 4, i2, d);
          }
        })(), (function() {
          for (let t3 = 0; t3 < n.length; t3 += 6) {
            const e2 = n[t3 + 0], i2 = n[t3 + 2], r2 = n[t3 + 4], s2 = Math.max(e2, i2, r2), a2 = Math.min(e2, i2, r2);
            s2 > 0.9 && a2 < 0.1 && (e2 < 0.2 && (n[t3 + 0] += 1), i2 < 0.2 && (n[t3 + 2] += 1), r2 < 0.2 && (n[t3 + 4] += 1));
          }
        })();
      })(), this.setAttribute("position", new Float32BufferAttribute(s, 3)), this.setAttribute("normal", new Float32BufferAttribute(s.slice(), 3)), this.setAttribute("uv", new Float32BufferAttribute(n, 2)), 0 === r ? this.computeVertexNormals() : this.normalizeNormals();
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _PolyhedronGeometry(t.vertices, t.indices, t.radius, t.detail);
    }
  };
  var DodecahedronGeometry = class _DodecahedronGeometry extends PolyhedronGeometry {
    constructor(t = 1, e = 0) {
      const i = (1 + Math.sqrt(5)) / 2, r = 1 / i;
      super([-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -r, -i, 0, -r, i, 0, r, -i, 0, r, i, -r, -i, 0, -r, i, 0, r, -i, 0, r, i, 0, -i, 0, -r, i, 0, -r, -i, 0, r, i, 0, r], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], t, e), this.type = "DodecahedronGeometry", this.parameters = { radius: t, detail: e };
    }
    static fromJSON(t) {
      return new _DodecahedronGeometry(t.radius, t.detail);
    }
  };
  var _v0 = new Vector3();
  var _v1$1 = new Vector3();
  var _normal = new Vector3();
  var _triangle = new Triangle();
  var EdgesGeometry = class extends BufferGeometry {
    constructor(t = null, e = 1) {
      if (super(), this.type = "EdgesGeometry", this.parameters = { geometry: t, thresholdAngle: e }, null !== t) {
        const i = 4, r = Math.pow(10, i), s = Math.cos(DEG2RAD * e), n = t.getIndex(), a = t.getAttribute("position"), o = n ? n.count : a.count, h = [0, 0, 0], l = ["a", "b", "c"], c = new Array(3), u = {}, p = [];
        for (let t2 = 0; t2 < o; t2 += 3) {
          n ? (h[0] = n.getX(t2), h[1] = n.getX(t2 + 1), h[2] = n.getX(t2 + 2)) : (h[0] = t2, h[1] = t2 + 1, h[2] = t2 + 2);
          const { a: e2, b: i2, c: o2 } = _triangle;
          if (e2.fromBufferAttribute(a, h[0]), i2.fromBufferAttribute(a, h[1]), o2.fromBufferAttribute(a, h[2]), _triangle.getNormal(_normal), c[0] = `${Math.round(e2.x * r)},${Math.round(e2.y * r)},${Math.round(e2.z * r)}`, c[1] = `${Math.round(i2.x * r)},${Math.round(i2.y * r)},${Math.round(i2.z * r)}`, c[2] = `${Math.round(o2.x * r)},${Math.round(o2.y * r)},${Math.round(o2.z * r)}`, c[0] !== c[1] && c[1] !== c[2] && c[2] !== c[0]) for (let t3 = 0; t3 < 3; t3++) {
            const e3 = (t3 + 1) % 3, i3 = c[t3], r2 = c[e3], n2 = _triangle[l[t3]], a2 = _triangle[l[e3]], o3 = `${i3}_${r2}`, d = `${r2}_${i3}`;
            d in u && u[d] ? (_normal.dot(u[d].normal) <= s && (p.push(n2.x, n2.y, n2.z), p.push(a2.x, a2.y, a2.z)), u[d] = null) : o3 in u || (u[o3] = { index0: h[t3], index1: h[e3], normal: _normal.clone() });
          }
        }
        for (const t2 in u) if (u[t2]) {
          const { index0: e2, index1: i2 } = u[t2];
          _v0.fromBufferAttribute(a, e2), _v1$1.fromBufferAttribute(a, i2), p.push(_v0.x, _v0.y, _v0.z), p.push(_v1$1.x, _v1$1.y, _v1$1.z);
        }
        this.setAttribute("position", new Float32BufferAttribute(p, 3));
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
  };
  var Curve = class {
    constructor() {
      this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = false, this.cacheArcLengths = null;
    }
    getPoint() {
      warn("Curve: .getPoint() not implemented.");
    }
    getPointAt(t, e) {
      const i = this.getUtoTmapping(t);
      return this.getPoint(i, e);
    }
    getPoints(t = 5) {
      const e = [];
      for (let i = 0; i <= t; i++) e.push(this.getPoint(i / t));
      return e;
    }
    getSpacedPoints(t = 5) {
      const e = [];
      for (let i = 0; i <= t; i++) e.push(this.getPointAt(i / t));
      return e;
    }
    getLength() {
      const t = this.getLengths();
      return t[t.length - 1];
    }
    getLengths(t = this.arcLengthDivisions) {
      if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate) return this.cacheArcLengths;
      this.needsUpdate = false;
      const e = [];
      let i, r = this.getPoint(0), s = 0;
      e.push(0);
      for (let n = 1; n <= t; n++) i = this.getPoint(n / t), s += i.distanceTo(r), e.push(s), r = i;
      return this.cacheArcLengths = e, e;
    }
    updateArcLengths() {
      this.needsUpdate = true, this.getLengths();
    }
    getUtoTmapping(t, e = null) {
      const i = this.getLengths();
      let r = 0;
      const s = i.length;
      let n;
      n = e || t * i[s - 1];
      let a, o = 0, h = s - 1;
      for (; o <= h; ) if (r = Math.floor(o + (h - o) / 2), a = i[r] - n, a < 0) o = r + 1;
      else {
        if (!(a > 0)) {
          h = r;
          break;
        }
        h = r - 1;
      }
      if (r = h, i[r] === n) return r / (s - 1);
      const l = i[r];
      return (r + (n - l) / (i[r + 1] - l)) / (s - 1);
    }
    getTangent(t, e) {
      const i = 1e-4;
      let r = t - i, s = t + i;
      r < 0 && (r = 0), s > 1 && (s = 1);
      const n = this.getPoint(r), a = this.getPoint(s), o = e || (n.isVector2 ? new Vector2() : new Vector3());
      return o.copy(a).sub(n).normalize(), o;
    }
    getTangentAt(t, e) {
      const i = this.getUtoTmapping(t);
      return this.getTangent(i, e);
    }
    computeFrenetFrames(t, e = false) {
      const i = new Vector3(), r = [], s = [], n = [], a = new Vector3(), o = new Matrix4();
      for (let e2 = 0; e2 <= t; e2++) {
        const i2 = e2 / t;
        r[e2] = this.getTangentAt(i2, new Vector3());
      }
      s[0] = new Vector3(), n[0] = new Vector3();
      let h = Number.MAX_VALUE;
      const l = Math.abs(r[0].x), c = Math.abs(r[0].y), u = Math.abs(r[0].z);
      l <= h && (h = l, i.set(1, 0, 0)), c <= h && (h = c, i.set(0, 1, 0)), u <= h && i.set(0, 0, 1), a.crossVectors(r[0], i).normalize(), s[0].crossVectors(r[0], a), n[0].crossVectors(r[0], s[0]);
      for (let e2 = 1; e2 <= t; e2++) {
        if (s[e2] = s[e2 - 1].clone(), n[e2] = n[e2 - 1].clone(), a.crossVectors(r[e2 - 1], r[e2]), a.length() > Number.EPSILON) {
          a.normalize();
          const t2 = Math.acos(clamp(r[e2 - 1].dot(r[e2]), -1, 1));
          s[e2].applyMatrix4(o.makeRotationAxis(a, t2));
        }
        n[e2].crossVectors(r[e2], s[e2]);
      }
      if (true === e) {
        let e2 = Math.acos(clamp(s[0].dot(s[t]), -1, 1));
        e2 /= t, r[0].dot(a.crossVectors(s[0], s[t])) > 0 && (e2 = -e2);
        for (let i2 = 1; i2 <= t; i2++) s[i2].applyMatrix4(o.makeRotationAxis(r[i2], e2 * i2)), n[i2].crossVectors(r[i2], s[i2]);
      }
      return { tangents: r, normals: s, binormals: n };
    }
    clone() {
      return new this.constructor().copy(this);
    }
    copy(t) {
      return this.arcLengthDivisions = t.arcLengthDivisions, this;
    }
    toJSON() {
      const t = { metadata: { version: 4.7, type: "Curve", generator: "Curve.toJSON" } };
      return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
    }
    fromJSON(t) {
      return this.arcLengthDivisions = t.arcLengthDivisions, this;
    }
  };
  var EllipseCurve = class extends Curve {
    constructor(t = 0, e = 0, i = 1, r = 1, s = 0, n = 2 * Math.PI, a = false, o = 0) {
      super(), this.isEllipseCurve = true, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = i, this.yRadius = r, this.aStartAngle = s, this.aEndAngle = n, this.aClockwise = a, this.aRotation = o;
    }
    getPoint(t, e = new Vector2()) {
      const i = e, r = 2 * Math.PI;
      let s = this.aEndAngle - this.aStartAngle;
      const n = Math.abs(s) < Number.EPSILON;
      for (; s < 0; ) s += r;
      for (; s > r; ) s -= r;
      s < Number.EPSILON && (s = n ? 0 : r), true !== this.aClockwise || n || (s === r ? s = -r : s -= r);
      const a = this.aStartAngle + t * s;
      let o = this.aX + this.xRadius * Math.cos(a), h = this.aY + this.yRadius * Math.sin(a);
      if (0 !== this.aRotation) {
        const t2 = Math.cos(this.aRotation), e2 = Math.sin(this.aRotation), i2 = o - this.aX, r2 = h - this.aY;
        o = i2 * t2 - r2 * e2 + this.aX, h = i2 * e2 + r2 * t2 + this.aY;
      }
      return i.set(o, h);
    }
    copy(t) {
      return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
    }
  };
  var ArcCurve = class extends EllipseCurve {
    constructor(t, e, i, r, s, n) {
      super(t, e, i, i, r, s, n), this.isArcCurve = true, this.type = "ArcCurve";
    }
  };
  function CubicPoly() {
    let t = 0, e = 0, i = 0, r = 0;
    function s(s2, n, a, o) {
      t = s2, e = a, i = -3 * s2 + 3 * n - 2 * a - o, r = 2 * s2 - 2 * n + a + o;
    }
    return { initCatmullRom: function(t2, e2, i2, r2, n) {
      s(e2, i2, n * (i2 - t2), n * (r2 - e2));
    }, initNonuniformCatmullRom: function(t2, e2, i2, r2, n, a, o) {
      let h = (e2 - t2) / n - (i2 - t2) / (n + a) + (i2 - e2) / a, l = (i2 - e2) / a - (r2 - e2) / (a + o) + (r2 - i2) / o;
      h *= a, l *= a, s(e2, i2, h, l);
    }, calc: function(s2) {
      const n = s2 * s2;
      return t + e * s2 + i * n + r * (n * s2);
    } };
  }
  var tmp = new Vector3();
  var tmp2 = new Vector3();
  var px = new CubicPoly();
  var py = new CubicPoly();
  var pz = new CubicPoly();
  var CatmullRomCurve3 = class extends Curve {
    constructor(t = [], e = false, i = "centripetal", r = 0.5) {
      super(), this.isCatmullRomCurve3 = true, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = i, this.tension = r;
    }
    getPoint(t, e = new Vector3()) {
      const i = e, r = this.points, s = r.length, n = (s - (this.closed ? 0 : 1)) * t;
      let a, o, h = Math.floor(n), l = n - h;
      this.closed ? h += h > 0 ? 0 : (Math.floor(Math.abs(h) / s) + 1) * s : 0 === l && h === s - 1 && (h = s - 2, l = 1), this.closed || h > 0 ? a = r[(h - 1) % s] : (tmp2.subVectors(r[0], r[1]).add(r[0]), a = tmp2);
      const c = r[h % s], u = r[(h + 1) % s];
      if (this.closed || h + 2 < s ? o = r[(h + 2) % s] : (tmp.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), o = tmp), "centripetal" === this.curveType || "chordal" === this.curveType) {
        const t2 = "chordal" === this.curveType ? 0.5 : 0.25;
        let e2 = Math.pow(a.distanceToSquared(c), t2), i2 = Math.pow(c.distanceToSquared(u), t2), r2 = Math.pow(u.distanceToSquared(o), t2);
        i2 < 1e-4 && (i2 = 1), e2 < 1e-4 && (e2 = i2), r2 < 1e-4 && (r2 = i2), px.initNonuniformCatmullRom(a.x, c.x, u.x, o.x, e2, i2, r2), py.initNonuniformCatmullRom(a.y, c.y, u.y, o.y, e2, i2, r2), pz.initNonuniformCatmullRom(a.z, c.z, u.z, o.z, e2, i2, r2);
      } else "catmullrom" === this.curveType && (px.initCatmullRom(a.x, c.x, u.x, o.x, this.tension), py.initCatmullRom(a.y, c.y, u.y, o.y, this.tension), pz.initCatmullRom(a.z, c.z, u.z, o.z, this.tension));
      return i.set(px.calc(l), py.calc(l), pz.calc(l)), i;
    }
    copy(t) {
      super.copy(t), this.points = [];
      for (let e = 0, i = t.points.length; e < i; e++) {
        const i2 = t.points[e];
        this.points.push(i2.clone());
      }
      return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
    }
    toJSON() {
      const t = super.toJSON();
      t.points = [];
      for (let e = 0, i = this.points.length; e < i; e++) {
        const i2 = this.points[e];
        t.points.push(i2.toArray());
      }
      return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.points = [];
      for (let e = 0, i = t.points.length; e < i; e++) {
        const i2 = t.points[e];
        this.points.push(new Vector3().fromArray(i2));
      }
      return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
    }
  };
  function CatmullRom(t, e, i, r, s) {
    const n = 0.5 * (r - e), a = 0.5 * (s - i), o = t * t;
    return (2 * i - 2 * r + n + a) * (t * o) + (-3 * i + 3 * r - 2 * n - a) * o + n * t + i;
  }
  function QuadraticBezierP0(t, e) {
    const i = 1 - t;
    return i * i * e;
  }
  function QuadraticBezierP1(t, e) {
    return 2 * (1 - t) * t * e;
  }
  function QuadraticBezierP2(t, e) {
    return t * t * e;
  }
  function QuadraticBezier(t, e, i, r) {
    return QuadraticBezierP0(t, e) + QuadraticBezierP1(t, i) + QuadraticBezierP2(t, r);
  }
  function CubicBezierP0(t, e) {
    const i = 1 - t;
    return i * i * i * e;
  }
  function CubicBezierP1(t, e) {
    const i = 1 - t;
    return 3 * i * i * t * e;
  }
  function CubicBezierP2(t, e) {
    return 3 * (1 - t) * t * t * e;
  }
  function CubicBezierP3(t, e) {
    return t * t * t * e;
  }
  function CubicBezier(t, e, i, r, s) {
    return CubicBezierP0(t, e) + CubicBezierP1(t, i) + CubicBezierP2(t, r) + CubicBezierP3(t, s);
  }
  var CubicBezierCurve = class extends Curve {
    constructor(t = new Vector2(), e = new Vector2(), i = new Vector2(), r = new Vector2()) {
      super(), this.isCubicBezierCurve = true, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = i, this.v3 = r;
    }
    getPoint(t, e = new Vector2()) {
      const i = e, r = this.v0, s = this.v1, n = this.v2, a = this.v3;
      return i.set(CubicBezier(t, r.x, s.x, n.x, a.x), CubicBezier(t, r.y, s.y, n.y, a.y)), i;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
    }
  };
  var CubicBezierCurve3 = class extends Curve {
    constructor(t = new Vector3(), e = new Vector3(), i = new Vector3(), r = new Vector3()) {
      super(), this.isCubicBezierCurve3 = true, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = i, this.v3 = r;
    }
    getPoint(t, e = new Vector3()) {
      const i = e, r = this.v0, s = this.v1, n = this.v2, a = this.v3;
      return i.set(CubicBezier(t, r.x, s.x, n.x, a.x), CubicBezier(t, r.y, s.y, n.y, a.y), CubicBezier(t, r.z, s.z, n.z, a.z)), i;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
    }
  };
  var LineCurve = class extends Curve {
    constructor(t = new Vector2(), e = new Vector2()) {
      super(), this.isLineCurve = true, this.type = "LineCurve", this.v1 = t, this.v2 = e;
    }
    getPoint(t, e = new Vector2()) {
      const i = e;
      return 1 === t ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(t).add(this.v1)), i;
    }
    getPointAt(t, e) {
      return this.getPoint(t, e);
    }
    getTangent(t, e = new Vector2()) {
      return e.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(t, e) {
      return this.getTangent(t, e);
    }
    copy(t) {
      return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  };
  var LineCurve3 = class extends Curve {
    constructor(t = new Vector3(), e = new Vector3()) {
      super(), this.isLineCurve3 = true, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
    }
    getPoint(t, e = new Vector3()) {
      const i = e;
      return 1 === t ? i.copy(this.v2) : (i.copy(this.v2).sub(this.v1), i.multiplyScalar(t).add(this.v1)), i;
    }
    getPointAt(t, e) {
      return this.getPoint(t, e);
    }
    getTangent(t, e = new Vector3()) {
      return e.subVectors(this.v2, this.v1).normalize();
    }
    getTangentAt(t, e) {
      return this.getTangent(t, e);
    }
    copy(t) {
      return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  };
  var QuadraticBezierCurve = class extends Curve {
    constructor(t = new Vector2(), e = new Vector2(), i = new Vector2()) {
      super(), this.isQuadraticBezierCurve = true, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = i;
    }
    getPoint(t, e = new Vector2()) {
      const i = e, r = this.v0, s = this.v1, n = this.v2;
      return i.set(QuadraticBezier(t, r.x, s.x, n.x), QuadraticBezier(t, r.y, s.y, n.y)), i;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  };
  var QuadraticBezierCurve3 = class extends Curve {
    constructor(t = new Vector3(), e = new Vector3(), i = new Vector3()) {
      super(), this.isQuadraticBezierCurve3 = true, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = i;
    }
    getPoint(t, e = new Vector3()) {
      const i = e, r = this.v0, s = this.v1, n = this.v2;
      return i.set(QuadraticBezier(t, r.x, s.x, n.x), QuadraticBezier(t, r.y, s.y, n.y), QuadraticBezier(t, r.z, s.z, n.z)), i;
    }
    copy(t) {
      return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
    }
  };
  var SplineCurve = class extends Curve {
    constructor(t = []) {
      super(), this.isSplineCurve = true, this.type = "SplineCurve", this.points = t;
    }
    getPoint(t, e = new Vector2()) {
      const i = e, r = this.points, s = (r.length - 1) * t, n = Math.floor(s), a = s - n, o = r[0 === n ? n : n - 1], h = r[n], l = r[n > r.length - 2 ? r.length - 1 : n + 1], c = r[n > r.length - 3 ? r.length - 1 : n + 2];
      return i.set(CatmullRom(a, o.x, h.x, l.x, c.x), CatmullRom(a, o.y, h.y, l.y, c.y)), i;
    }
    copy(t) {
      super.copy(t), this.points = [];
      for (let e = 0, i = t.points.length; e < i; e++) {
        const i2 = t.points[e];
        this.points.push(i2.clone());
      }
      return this;
    }
    toJSON() {
      const t = super.toJSON();
      t.points = [];
      for (let e = 0, i = this.points.length; e < i; e++) {
        const i2 = this.points[e];
        t.points.push(i2.toArray());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.points = [];
      for (let e = 0, i = t.points.length; e < i; e++) {
        const i2 = t.points[e];
        this.points.push(new Vector2().fromArray(i2));
      }
      return this;
    }
  };
  var Curves = Object.freeze({ __proto__: null, ArcCurve, CatmullRomCurve3, CubicBezierCurve, CubicBezierCurve3, EllipseCurve, LineCurve, LineCurve3, QuadraticBezierCurve, QuadraticBezierCurve3, SplineCurve });
  var CurvePath = class extends Curve {
    constructor() {
      super(), this.type = "CurvePath", this.curves = [], this.autoClose = false;
    }
    add(t) {
      this.curves.push(t);
    }
    closePath() {
      const t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
      if (!t.equals(e)) {
        const i = true === t.isVector2 ? "LineCurve" : "LineCurve3";
        this.curves.push(new Curves[i](e, t));
      }
      return this;
    }
    getPoint(t, e) {
      const i = t * this.getLength(), r = this.getCurveLengths();
      let s = 0;
      for (; s < r.length; ) {
        if (r[s] >= i) {
          const t2 = r[s] - i, n = this.curves[s], a = n.getLength(), o = 0 === a ? 0 : 1 - t2 / a;
          return n.getPointAt(o, e);
        }
        s++;
      }
      return null;
    }
    getLength() {
      const t = this.getCurveLengths();
      return t[t.length - 1];
    }
    updateArcLengths() {
      this.needsUpdate = true, this.cacheLengths = null, this.getCurveLengths();
    }
    getCurveLengths() {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
      const t = [];
      let e = 0;
      for (let i = 0, r = this.curves.length; i < r; i++) e += this.curves[i].getLength(), t.push(e);
      return this.cacheLengths = t, t;
    }
    getSpacedPoints(t = 40) {
      const e = [];
      for (let i = 0; i <= t; i++) e.push(this.getPoint(i / t));
      return this.autoClose && e.push(e[0]), e;
    }
    getPoints(t = 12) {
      const e = [];
      let i;
      for (let r = 0, s = this.curves; r < s.length; r++) {
        const n = s[r], a = n.isEllipseCurve ? 2 * t : n.isLineCurve || n.isLineCurve3 ? 1 : n.isSplineCurve ? t * n.points.length : t, o = n.getPoints(a);
        for (let t2 = 0; t2 < o.length; t2++) {
          const r2 = o[t2];
          i && i.equals(r2) || (e.push(r2), i = r2);
        }
      }
      return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
    }
    copy(t) {
      super.copy(t), this.curves = [];
      for (let e = 0, i = t.curves.length; e < i; e++) {
        const i2 = t.curves[e];
        this.curves.push(i2.clone());
      }
      return this.autoClose = t.autoClose, this;
    }
    toJSON() {
      const t = super.toJSON();
      t.autoClose = this.autoClose, t.curves = [];
      for (let e = 0, i = this.curves.length; e < i; e++) {
        const i2 = this.curves[e];
        t.curves.push(i2.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
      for (let e = 0, i = t.curves.length; e < i; e++) {
        const i2 = t.curves[e];
        this.curves.push(new Curves[i2.type]().fromJSON(i2));
      }
      return this;
    }
  };
  var Path = class extends CurvePath {
    constructor(t) {
      super(), this.type = "Path", this.currentPoint = new Vector2(), t && this.setFromPoints(t);
    }
    setFromPoints(t) {
      this.moveTo(t[0].x, t[0].y);
      for (let e = 1, i = t.length; e < i; e++) this.lineTo(t[e].x, t[e].y);
      return this;
    }
    moveTo(t, e) {
      return this.currentPoint.set(t, e), this;
    }
    lineTo(t, e) {
      const i = new LineCurve(this.currentPoint.clone(), new Vector2(t, e));
      return this.curves.push(i), this.currentPoint.set(t, e), this;
    }
    quadraticCurveTo(t, e, i, r) {
      const s = new QuadraticBezierCurve(this.currentPoint.clone(), new Vector2(t, e), new Vector2(i, r));
      return this.curves.push(s), this.currentPoint.set(i, r), this;
    }
    bezierCurveTo(t, e, i, r, s, n) {
      const a = new CubicBezierCurve(this.currentPoint.clone(), new Vector2(t, e), new Vector2(i, r), new Vector2(s, n));
      return this.curves.push(a), this.currentPoint.set(s, n), this;
    }
    splineThru(t) {
      const e = [this.currentPoint.clone()].concat(t), i = new SplineCurve(e);
      return this.curves.push(i), this.currentPoint.copy(t[t.length - 1]), this;
    }
    arc(t, e, i, r, s, n) {
      const a = this.currentPoint.x, o = this.currentPoint.y;
      return this.absarc(t + a, e + o, i, r, s, n), this;
    }
    absarc(t, e, i, r, s, n) {
      return this.absellipse(t, e, i, i, r, s, n), this;
    }
    ellipse(t, e, i, r, s, n, a, o) {
      const h = this.currentPoint.x, l = this.currentPoint.y;
      return this.absellipse(t + h, e + l, i, r, s, n, a, o), this;
    }
    absellipse(t, e, i, r, s, n, a, o) {
      const h = new EllipseCurve(t, e, i, r, s, n, a, o);
      if (this.curves.length > 0) {
        const t2 = h.getPoint(0);
        t2.equals(this.currentPoint) || this.lineTo(t2.x, t2.y);
      }
      this.curves.push(h);
      const l = h.getPoint(1);
      return this.currentPoint.copy(l), this;
    }
    copy(t) {
      return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.currentPoint = this.currentPoint.toArray(), t;
    }
    fromJSON(t) {
      return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
    }
  };
  var Shape = class extends Path {
    constructor(t) {
      super(t), this.uuid = generateUUID(), this.type = "Shape", this.holes = [];
    }
    getPointsHoles(t) {
      const e = [];
      for (let i = 0, r = this.holes.length; i < r; i++) e[i] = this.holes[i].getPoints(t);
      return e;
    }
    extractPoints(t) {
      return { shape: this.getPoints(t), holes: this.getPointsHoles(t) };
    }
    copy(t) {
      super.copy(t), this.holes = [];
      for (let e = 0, i = t.holes.length; e < i; e++) {
        const i2 = t.holes[e];
        this.holes.push(i2.clone());
      }
      return this;
    }
    toJSON() {
      const t = super.toJSON();
      t.uuid = this.uuid, t.holes = [];
      for (let e = 0, i = this.holes.length; e < i; e++) {
        const i2 = this.holes[e];
        t.holes.push(i2.toJSON());
      }
      return t;
    }
    fromJSON(t) {
      super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
      for (let e = 0, i = t.holes.length; e < i; e++) {
        const i2 = t.holes[e];
        this.holes.push(new Path().fromJSON(i2));
      }
      return this;
    }
  };
  function earcut(t, e, i = 2) {
    const r = e && e.length, s = r ? e[0] * i : t.length;
    let n = linkedList(t, 0, s, i, true);
    const a = [];
    if (!n || n.next === n.prev) return a;
    let o, h, l;
    if (r && (n = eliminateHoles(t, e, n, i)), t.length > 80 * i) {
      o = t[0], h = t[1];
      let e2 = o, r2 = h;
      for (let n2 = i; n2 < s; n2 += i) {
        const i2 = t[n2], s2 = t[n2 + 1];
        i2 < o && (o = i2), s2 < h && (h = s2), i2 > e2 && (e2 = i2), s2 > r2 && (r2 = s2);
      }
      l = Math.max(e2 - o, r2 - h), l = 0 !== l ? 32767 / l : 0;
    }
    return earcutLinked(n, a, i, o, h, l, 0), a;
  }
  function linkedList(t, e, i, r, s) {
    let n;
    if (s === signedArea(t, e, i, r) > 0) for (let s2 = e; s2 < i; s2 += r) n = insertNode(s2 / r | 0, t[s2], t[s2 + 1], n);
    else for (let s2 = i - r; s2 >= e; s2 -= r) n = insertNode(s2 / r | 0, t[s2], t[s2 + 1], n);
    return n && equals(n, n.next) && (removeNode(n), n = n.next), n;
  }
  function filterPoints(t, e) {
    if (!t) return t;
    e || (e = t);
    let i, r = t;
    do {
      if (i = false, r.steiner || !equals(r, r.next) && 0 !== area(r.prev, r, r.next)) r = r.next;
      else {
        if (removeNode(r), r = e = r.prev, r === r.next) break;
        i = true;
      }
    } while (i || r !== e);
    return e;
  }
  function earcutLinked(t, e, i, r, s, n, a) {
    if (!t) return;
    !a && n && indexCurve(t, r, s, n);
    let o = t;
    for (; t.prev !== t.next; ) {
      const h = t.prev, l = t.next;
      if (n ? isEarHashed(t, r, s, n) : isEar(t)) e.push(h.i, t.i, l.i), removeNode(t), t = l.next, o = l.next;
      else if ((t = l) === o) {
        a ? 1 === a ? earcutLinked(t = cureLocalIntersections(filterPoints(t), e), e, i, r, s, n, 2) : 2 === a && splitEarcut(t, e, i, r, s, n) : earcutLinked(filterPoints(t), e, i, r, s, n, 1);
        break;
      }
    }
  }
  function isEar(t) {
    const e = t.prev, i = t, r = t.next;
    if (area(e, i, r) >= 0) return false;
    const s = e.x, n = i.x, a = r.x, o = e.y, h = i.y, l = r.y, c = Math.min(s, n, a), u = Math.min(o, h, l), p = Math.max(s, n, a), d = Math.max(o, h, l);
    let m = r.next;
    for (; m !== e; ) {
      if (m.x >= c && m.x <= p && m.y >= u && m.y <= d && pointInTriangleExceptFirst(s, o, n, h, a, l, m.x, m.y) && area(m.prev, m, m.next) >= 0) return false;
      m = m.next;
    }
    return true;
  }
  function isEarHashed(t, e, i, r) {
    const s = t.prev, n = t, a = t.next;
    if (area(s, n, a) >= 0) return false;
    const o = s.x, h = n.x, l = a.x, c = s.y, u = n.y, p = a.y, d = Math.min(o, h, l), m = Math.min(c, u, p), y = Math.max(o, h, l), f = Math.max(c, u, p), g = zOrder(d, m, e, i, r), x = zOrder(y, f, e, i, r);
    let _ = t.prevZ, v = t.nextZ;
    for (; _ && _.z >= g && v && v.z <= x; ) {
      if (_.x >= d && _.x <= y && _.y >= m && _.y <= f && _ !== s && _ !== a && pointInTriangleExceptFirst(o, c, h, u, l, p, _.x, _.y) && area(_.prev, _, _.next) >= 0) return false;
      if (_ = _.prevZ, v.x >= d && v.x <= y && v.y >= m && v.y <= f && v !== s && v !== a && pointInTriangleExceptFirst(o, c, h, u, l, p, v.x, v.y) && area(v.prev, v, v.next) >= 0) return false;
      v = v.nextZ;
    }
    for (; _ && _.z >= g; ) {
      if (_.x >= d && _.x <= y && _.y >= m && _.y <= f && _ !== s && _ !== a && pointInTriangleExceptFirst(o, c, h, u, l, p, _.x, _.y) && area(_.prev, _, _.next) >= 0) return false;
      _ = _.prevZ;
    }
    for (; v && v.z <= x; ) {
      if (v.x >= d && v.x <= y && v.y >= m && v.y <= f && v !== s && v !== a && pointInTriangleExceptFirst(o, c, h, u, l, p, v.x, v.y) && area(v.prev, v, v.next) >= 0) return false;
      v = v.nextZ;
    }
    return true;
  }
  function cureLocalIntersections(t, e) {
    let i = t;
    do {
      const r = i.prev, s = i.next.next;
      !equals(r, s) && intersects(r, i, i.next, s) && locallyInside(r, s) && locallyInside(s, r) && (e.push(r.i, i.i, s.i), removeNode(i), removeNode(i.next), i = t = s), i = i.next;
    } while (i !== t);
    return filterPoints(i);
  }
  function splitEarcut(t, e, i, r, s, n) {
    let a = t;
    do {
      let t2 = a.next.next;
      for (; t2 !== a.prev; ) {
        if (a.i !== t2.i && isValidDiagonal(a, t2)) {
          let o = splitPolygon(a, t2);
          return a = filterPoints(a, a.next), o = filterPoints(o, o.next), earcutLinked(a, e, i, r, s, n, 0), void earcutLinked(o, e, i, r, s, n, 0);
        }
        t2 = t2.next;
      }
      a = a.next;
    } while (a !== t);
  }
  function eliminateHoles(t, e, i, r) {
    const s = [];
    for (let i2 = 0, n = e.length; i2 < n; i2++) {
      const a = linkedList(t, e[i2] * r, i2 < n - 1 ? e[i2 + 1] * r : t.length, r, false);
      a === a.next && (a.steiner = true), s.push(getLeftmost(a));
    }
    s.sort(compareXYSlope);
    for (let t2 = 0; t2 < s.length; t2++) i = eliminateHole(s[t2], i);
    return i;
  }
  function compareXYSlope(t, e) {
    let i = t.x - e.x;
    if (0 === i && (i = t.y - e.y, 0 === i)) {
      i = (t.next.y - t.y) / (t.next.x - t.x) - (e.next.y - e.y) / (e.next.x - e.x);
    }
    return i;
  }
  function eliminateHole(t, e) {
    const i = findHoleBridge(t, e);
    if (!i) return e;
    const r = splitPolygon(i, t);
    return filterPoints(r, r.next), filterPoints(i, i.next);
  }
  function findHoleBridge(t, e) {
    let i = e;
    const r = t.x, s = t.y;
    let n, a = -1 / 0;
    if (equals(t, i)) return i;
    do {
      if (equals(t, i.next)) return i.next;
      if (s <= i.y && s >= i.next.y && i.next.y !== i.y) {
        const t2 = i.x + (s - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
        if (t2 <= r && t2 > a && (a = t2, n = i.x < i.next.x ? i : i.next, t2 === r)) return n;
      }
      i = i.next;
    } while (i !== e);
    if (!n) return null;
    const o = n, h = n.x, l = n.y;
    let c = 1 / 0;
    i = n;
    do {
      if (r >= i.x && i.x >= h && r !== i.x && pointInTriangle(s < l ? r : a, s, h, l, s < l ? a : r, s, i.x, i.y)) {
        const e2 = Math.abs(s - i.y) / (r - i.x);
        locallyInside(i, t) && (e2 < c || e2 === c && (i.x > n.x || i.x === n.x && sectorContainsSector(n, i))) && (n = i, c = e2);
      }
      i = i.next;
    } while (i !== o);
    return n;
  }
  function sectorContainsSector(t, e) {
    return area(t.prev, t, e.prev) < 0 && area(e.next, t, t.next) < 0;
  }
  function indexCurve(t, e, i, r) {
    let s = t;
    do {
      0 === s.z && (s.z = zOrder(s.x, s.y, e, i, r)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
    } while (s !== t);
    s.prevZ.nextZ = null, s.prevZ = null, sortLinked(s);
  }
  function sortLinked(t) {
    let e, i = 1;
    do {
      let r, s = t;
      t = null;
      let n = null;
      for (e = 0; s; ) {
        e++;
        let a = s, o = 0;
        for (let t2 = 0; t2 < i && (o++, a = a.nextZ, a); t2++) ;
        let h = i;
        for (; o > 0 || h > 0 && a; ) 0 !== o && (0 === h || !a || s.z <= a.z) ? (r = s, s = s.nextZ, o--) : (r = a, a = a.nextZ, h--), n ? n.nextZ = r : t = r, r.prevZ = n, n = r;
        s = a;
      }
      n.nextZ = null, i *= 2;
    } while (e > 1);
    return t;
  }
  function zOrder(t, e, i, r, s) {
    return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = (t - i) * s | 0) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = (e - r) * s | 0) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1;
  }
  function getLeftmost(t) {
    let e = t, i = t;
    do {
      (e.x < i.x || e.x === i.x && e.y < i.y) && (i = e), e = e.next;
    } while (e !== t);
    return i;
  }
  function pointInTriangle(t, e, i, r, s, n, a, o) {
    return (s - a) * (e - o) >= (t - a) * (n - o) && (t - a) * (r - o) >= (i - a) * (e - o) && (i - a) * (n - o) >= (s - a) * (r - o);
  }
  function pointInTriangleExceptFirst(t, e, i, r, s, n, a, o) {
    return !(t === a && e === o) && pointInTriangle(t, e, i, r, s, n, a, o);
  }
  function isValidDiagonal(t, e) {
    return t.next.i !== e.i && t.prev.i !== e.i && !intersectsPolygon(t, e) && (locallyInside(t, e) && locallyInside(e, t) && middleInside(t, e) && (area(t.prev, t, e.prev) || area(t, e.prev, e)) || equals(t, e) && area(t.prev, t, t.next) > 0 && area(e.prev, e, e.next) > 0);
  }
  function area(t, e, i) {
    return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y);
  }
  function equals(t, e) {
    return t.x === e.x && t.y === e.y;
  }
  function intersects(t, e, i, r) {
    const s = sign(area(t, e, i)), n = sign(area(t, e, r)), a = sign(area(i, r, t)), o = sign(area(i, r, e));
    return s !== n && a !== o || (!(0 !== s || !onSegment(t, i, e)) || (!(0 !== n || !onSegment(t, r, e)) || (!(0 !== a || !onSegment(i, t, r)) || !(0 !== o || !onSegment(i, e, r)))));
  }
  function onSegment(t, e, i) {
    return e.x <= Math.max(t.x, i.x) && e.x >= Math.min(t.x, i.x) && e.y <= Math.max(t.y, i.y) && e.y >= Math.min(t.y, i.y);
  }
  function sign(t) {
    return t > 0 ? 1 : t < 0 ? -1 : 0;
  }
  function intersectsPolygon(t, e) {
    let i = t;
    do {
      if (i.i !== t.i && i.next.i !== t.i && i.i !== e.i && i.next.i !== e.i && intersects(i, i.next, t, e)) return true;
      i = i.next;
    } while (i !== t);
    return false;
  }
  function locallyInside(t, e) {
    return area(t.prev, t, t.next) < 0 ? area(t, e, t.next) >= 0 && area(t, t.prev, e) >= 0 : area(t, e, t.prev) < 0 || area(t, t.next, e) < 0;
  }
  function middleInside(t, e) {
    let i = t, r = false;
    const s = (t.x + e.x) / 2, n = (t.y + e.y) / 2;
    do {
      i.y > n != i.next.y > n && i.next.y !== i.y && s < (i.next.x - i.x) * (n - i.y) / (i.next.y - i.y) + i.x && (r = !r), i = i.next;
    } while (i !== t);
    return r;
  }
  function splitPolygon(t, e) {
    const i = createNode(t.i, t.x, t.y), r = createNode(e.i, e.x, e.y), s = t.next, n = e.prev;
    return t.next = e, e.prev = t, i.next = s, s.prev = i, r.next = i, i.prev = r, n.next = r, r.prev = n, r;
  }
  function insertNode(t, e, i, r) {
    const s = createNode(t, e, i);
    return r ? (s.next = r.next, s.prev = r, r.next.prev = s, r.next = s) : (s.prev = s, s.next = s), s;
  }
  function removeNode(t) {
    t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ);
  }
  function createNode(t, e, i) {
    return { i: t, x: e, y: i, prev: null, next: null, z: 0, prevZ: null, nextZ: null, steiner: false };
  }
  function signedArea(t, e, i, r) {
    let s = 0;
    for (let n = e, a = i - r; n < i; n += r) s += (t[a] - t[n]) * (t[n + 1] + t[a + 1]), a = n;
    return s;
  }
  var Earcut = class {
    static triangulate(t, e, i = 2) {
      return earcut(t, e, i);
    }
  };
  var ShapeUtils = class _ShapeUtils {
    static area(t) {
      const e = t.length;
      let i = 0;
      for (let r = e - 1, s = 0; s < e; r = s++) i += t[r].x * t[s].y - t[s].x * t[r].y;
      return 0.5 * i;
    }
    static isClockWise(t) {
      return _ShapeUtils.area(t) < 0;
    }
    static triangulateShape(t, e) {
      const i = [], r = [], s = [];
      removeDupEndPts(t), addContour(i, t);
      let n = t.length;
      e.forEach(removeDupEndPts);
      for (let t2 = 0; t2 < e.length; t2++) r.push(n), n += e[t2].length, addContour(i, e[t2]);
      const a = Earcut.triangulate(i, r);
      for (let t2 = 0; t2 < a.length; t2 += 3) s.push(a.slice(t2, t2 + 3));
      return s;
    }
  };
  function removeDupEndPts(t) {
    const e = t.length;
    e > 2 && t[e - 1].equals(t[0]) && t.pop();
  }
  function addContour(t, e) {
    for (let i = 0; i < e.length; i++) t.push(e[i].x), t.push(e[i].y);
  }
  var ExtrudeGeometry = class _ExtrudeGeometry extends BufferGeometry {
    constructor(t = new Shape([new Vector2(0.5, 0.5), new Vector2(-0.5, 0.5), new Vector2(-0.5, -0.5), new Vector2(0.5, -0.5)]), e = {}) {
      super(), this.type = "ExtrudeGeometry", this.parameters = { shapes: t, options: e }, t = Array.isArray(t) ? t : [t];
      const i = this, r = [], s = [];
      for (let e2 = 0, i2 = t.length; e2 < i2; e2++) {
        n(t[e2]);
      }
      function n(t2) {
        const n2 = [], a = void 0 !== e.curveSegments ? e.curveSegments : 12, o = void 0 !== e.steps ? e.steps : 1, h = void 0 !== e.depth ? e.depth : 1;
        let l = void 0 === e.bevelEnabled || e.bevelEnabled, c = void 0 !== e.bevelThickness ? e.bevelThickness : 0.2, u = void 0 !== e.bevelSize ? e.bevelSize : c - 0.1, p = void 0 !== e.bevelOffset ? e.bevelOffset : 0, d = void 0 !== e.bevelSegments ? e.bevelSegments : 3;
        const m = e.extrudePath, y = void 0 !== e.UVGenerator ? e.UVGenerator : WorldUVGenerator;
        let f, g, x, _, v, b = false;
        if (m) {
          f = m.getSpacedPoints(o), b = true, l = false;
          const t3 = !!m.isCatmullRomCurve3 && m.closed;
          g = m.computeFrenetFrames(o, t3), x = new Vector3(), _ = new Vector3(), v = new Vector3();
        }
        l || (d = 0, c = 0, u = 0, p = 0);
        const M = t2.extractPoints(a);
        let w = M.shape;
        const S = M.holes;
        if (!ShapeUtils.isClockWise(w)) {
          w = w.reverse();
          for (let t3 = 0, e2 = S.length; t3 < e2; t3++) {
            const e3 = S[t3];
            ShapeUtils.isClockWise(e3) && (S[t3] = e3.reverse());
          }
        }
        function A(t3) {
          const e2 = 1e-10 * 1e-10;
          let i2 = t3[0];
          for (let r2 = 1; r2 <= t3.length; r2++) {
            const s2 = r2 % t3.length, n3 = t3[s2], a2 = n3.x - i2.x, o2 = n3.y - i2.y, h2 = a2 * a2 + o2 * o2, l2 = Math.max(Math.abs(n3.x), Math.abs(n3.y), Math.abs(i2.x), Math.abs(i2.y));
            h2 <= e2 * l2 * l2 ? (t3.splice(s2, 1), r2--) : i2 = n3;
          }
        }
        A(w), S.forEach(A);
        const T = S.length, C = w;
        for (let t3 = 0; t3 < T; t3++) {
          const e2 = S[t3];
          w = w.concat(e2);
        }
        function B(t3, e2, i2) {
          return e2 || error("ExtrudeGeometry: vec does not exist"), t3.clone().addScaledVector(e2, i2);
        }
        const I = w.length;
        function z(t3, e2, i2) {
          let r2, s2, n3;
          const a2 = t3.x - e2.x, o2 = t3.y - e2.y, h2 = i2.x - t3.x, l2 = i2.y - t3.y, c2 = a2 * a2 + o2 * o2, u2 = a2 * l2 - o2 * h2;
          if (Math.abs(u2) > Number.EPSILON) {
            const u3 = Math.sqrt(c2), p2 = Math.sqrt(h2 * h2 + l2 * l2), d2 = e2.x - o2 / u3, m2 = e2.y + a2 / u3, y2 = ((i2.x - l2 / p2 - d2) * l2 - (i2.y + h2 / p2 - m2) * h2) / (a2 * l2 - o2 * h2);
            r2 = d2 + a2 * y2 - t3.x, s2 = m2 + o2 * y2 - t3.y;
            const f2 = r2 * r2 + s2 * s2;
            if (f2 <= 2) return new Vector2(r2, s2);
            n3 = Math.sqrt(f2 / 2);
          } else {
            let t4 = false;
            a2 > Number.EPSILON ? h2 > Number.EPSILON && (t4 = true) : a2 < -Number.EPSILON ? h2 < -Number.EPSILON && (t4 = true) : Math.sign(o2) === Math.sign(l2) && (t4 = true), t4 ? (r2 = -o2, s2 = a2, n3 = Math.sqrt(c2)) : (r2 = a2, s2 = o2, n3 = Math.sqrt(c2 / 2));
          }
          return new Vector2(r2 / n3, s2 / n3);
        }
        const V = [];
        for (let t3 = 0, e2 = C.length, i2 = e2 - 1, r2 = t3 + 1; t3 < e2; t3++, i2++, r2++) i2 === e2 && (i2 = 0), r2 === e2 && (r2 = 0), V[t3] = z(C[t3], C[i2], C[r2]);
        const P = [];
        let R, F, L = V.concat();
        for (let t3 = 0, e2 = T; t3 < e2; t3++) {
          const e3 = S[t3];
          R = [];
          for (let t4 = 0, i2 = e3.length, r2 = i2 - 1, s2 = t4 + 1; t4 < i2; t4++, r2++, s2++) r2 === i2 && (r2 = 0), s2 === i2 && (s2 = 0), R[t4] = z(e3[t4], e3[r2], e3[s2]);
          P.push(R), L = L.concat(R);
        }
        if (0 === d) F = ShapeUtils.triangulateShape(C, S);
        else {
          const t3 = [], e2 = [];
          for (let i2 = 0; i2 < d; i2++) {
            const r2 = i2 / d, s2 = c * Math.cos(r2 * Math.PI / 2), n3 = u * Math.sin(r2 * Math.PI / 2) + p;
            for (let e3 = 0, i3 = C.length; e3 < i3; e3++) {
              const i4 = B(C[e3], V[e3], n3);
              D(i4.x, i4.y, -s2), 0 === r2 && t3.push(i4);
            }
            for (let t4 = 0, i3 = T; t4 < i3; t4++) {
              const i4 = S[t4];
              R = P[t4];
              const a2 = [];
              for (let t5 = 0, e3 = i4.length; t5 < e3; t5++) {
                const e4 = B(i4[t5], R[t5], n3);
                D(e4.x, e4.y, -s2), 0 === r2 && a2.push(e4);
              }
              0 === r2 && e2.push(a2);
            }
          }
          F = ShapeUtils.triangulateShape(t3, e2);
        }
        const E = F.length, O = u + p;
        for (let t3 = 0; t3 < I; t3++) {
          const e2 = l ? B(w[t3], L[t3], O) : w[t3];
          b ? (_.copy(g.normals[0]).multiplyScalar(e2.x), x.copy(g.binormals[0]).multiplyScalar(e2.y), v.copy(f[0]).add(_).add(x), D(v.x, v.y, v.z)) : D(e2.x, e2.y, 0);
        }
        for (let t3 = 1; t3 <= o; t3++) for (let e2 = 0; e2 < I; e2++) {
          const i2 = l ? B(w[e2], L[e2], O) : w[e2];
          b ? (_.copy(g.normals[t3]).multiplyScalar(i2.x), x.copy(g.binormals[t3]).multiplyScalar(i2.y), v.copy(f[t3]).add(_).add(x), D(v.x, v.y, v.z)) : D(i2.x, i2.y, h / o * t3);
        }
        for (let t3 = d - 1; t3 >= 0; t3--) {
          const e2 = t3 / d, i2 = c * Math.cos(e2 * Math.PI / 2), r2 = u * Math.sin(e2 * Math.PI / 2) + p;
          for (let t4 = 0, e3 = C.length; t4 < e3; t4++) {
            const e4 = B(C[t4], V[t4], r2);
            D(e4.x, e4.y, h + i2);
          }
          for (let t4 = 0, e3 = S.length; t4 < e3; t4++) {
            const e4 = S[t4];
            R = P[t4];
            for (let t5 = 0, s2 = e4.length; t5 < s2; t5++) {
              const s3 = B(e4[t5], R[t5], r2);
              b ? D(s3.x, s3.y + f[o - 1].y, f[o - 1].x + i2) : D(s3.x, s3.y, h + i2);
            }
          }
        }
        function k(t3, e2) {
          let i2 = t3.length;
          for (; --i2 >= 0; ) {
            const r2 = i2;
            let s2 = i2 - 1;
            s2 < 0 && (s2 = t3.length - 1);
            for (let t4 = 0, i3 = o + 2 * d; t4 < i3; t4++) {
              const i4 = I * t4, n3 = I * (t4 + 1);
              G(e2 + r2 + i4, e2 + s2 + i4, e2 + s2 + n3, e2 + r2 + n3);
            }
          }
        }
        function D(t3, e2, i2) {
          n2.push(t3), n2.push(e2), n2.push(i2);
        }
        function N(t3, e2, s2) {
          U(t3), U(e2), U(s2);
          const n3 = r.length / 3, a2 = y.generateTopUV(i, r, n3 - 3, n3 - 2, n3 - 1);
          $(a2[0]), $(a2[1]), $(a2[2]);
        }
        function G(t3, e2, s2, n3) {
          U(t3), U(e2), U(n3), U(e2), U(s2), U(n3);
          const a2 = r.length / 3, o2 = y.generateSideWallUV(i, r, a2 - 6, a2 - 3, a2 - 2, a2 - 1);
          $(o2[0]), $(o2[1]), $(o2[3]), $(o2[1]), $(o2[2]), $(o2[3]);
        }
        function U(t3) {
          r.push(n2[3 * t3 + 0]), r.push(n2[3 * t3 + 1]), r.push(n2[3 * t3 + 2]);
        }
        function $(t3) {
          s.push(t3.x), s.push(t3.y);
        }
        !(function() {
          const t3 = r.length / 3;
          if (l) {
            let t4 = 0, e2 = I * t4;
            for (let t5 = 0; t5 < E; t5++) {
              const i2 = F[t5];
              N(i2[2] + e2, i2[1] + e2, i2[0] + e2);
            }
            t4 = o + 2 * d, e2 = I * t4;
            for (let t5 = 0; t5 < E; t5++) {
              const i2 = F[t5];
              N(i2[0] + e2, i2[1] + e2, i2[2] + e2);
            }
          } else {
            for (let t4 = 0; t4 < E; t4++) {
              const e2 = F[t4];
              N(e2[2], e2[1], e2[0]);
            }
            for (let t4 = 0; t4 < E; t4++) {
              const e2 = F[t4];
              N(e2[0] + I * o, e2[1] + I * o, e2[2] + I * o);
            }
          }
          i.addGroup(t3, r.length / 3 - t3, 0);
        })(), (function() {
          const t3 = r.length / 3;
          let e2 = 0;
          k(C, e2), e2 += C.length;
          for (let t4 = 0, i2 = S.length; t4 < i2; t4++) {
            const i3 = S[t4];
            k(i3, e2), e2 += i3.length;
          }
          i.addGroup(t3, r.length / 3 - t3, 1);
        })();
      }
      this.setAttribute("position", new Float32BufferAttribute(r, 3)), this.setAttribute("uv", new Float32BufferAttribute(s, 2)), this.computeVertexNormals();
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    toJSON() {
      const t = super.toJSON();
      return toJSON$1(this.parameters.shapes, this.parameters.options, t);
    }
    static fromJSON(t, e) {
      const i = [];
      for (let r2 = 0, s = t.shapes.length; r2 < s; r2++) {
        const s2 = e[t.shapes[r2]];
        i.push(s2);
      }
      const r = t.options.extrudePath;
      return void 0 !== r && (t.options.extrudePath = new Curves[r.type]().fromJSON(r)), new _ExtrudeGeometry(i, t.options);
    }
  };
  var WorldUVGenerator = { generateTopUV: function(t, e, i, r, s) {
    const n = e[3 * i], a = e[3 * i + 1], o = e[3 * r], h = e[3 * r + 1], l = e[3 * s], c = e[3 * s + 1];
    return [new Vector2(n, a), new Vector2(o, h), new Vector2(l, c)];
  }, generateSideWallUV: function(t, e, i, r, s, n) {
    const a = e[3 * i], o = e[3 * i + 1], h = e[3 * i + 2], l = e[3 * r], c = e[3 * r + 1], u = e[3 * r + 2], p = e[3 * s], d = e[3 * s + 1], m = e[3 * s + 2], y = e[3 * n], f = e[3 * n + 1], g = e[3 * n + 2];
    return Math.abs(o - c) < Math.abs(a - l) ? [new Vector2(a, 1 - h), new Vector2(l, 1 - u), new Vector2(p, 1 - m), new Vector2(y, 1 - g)] : [new Vector2(o, 1 - h), new Vector2(c, 1 - u), new Vector2(d, 1 - m), new Vector2(f, 1 - g)];
  } };
  function toJSON$1(t, e, i) {
    if (i.shapes = [], Array.isArray(t)) for (let e2 = 0, r = t.length; e2 < r; e2++) {
      const r2 = t[e2];
      i.shapes.push(r2.uuid);
    }
    else i.shapes.push(t.uuid);
    return i.options = Object.assign({}, e), void 0 !== e.extrudePath && (i.options.extrudePath = e.extrudePath.toJSON()), i;
  }
  var IcosahedronGeometry = class _IcosahedronGeometry extends PolyhedronGeometry {
    constructor(t = 1, e = 0) {
      const i = (1 + Math.sqrt(5)) / 2;
      super([-1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, 0, 0, -1, i, 0, 1, i, 0, -1, -i, 0, 1, -i, i, 0, -1, i, 0, 1, -i, 0, -1, -i, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], t, e), this.type = "IcosahedronGeometry", this.parameters = { radius: t, detail: e };
    }
    static fromJSON(t) {
      return new _IcosahedronGeometry(t.radius, t.detail);
    }
  };
  var LatheGeometry = class _LatheGeometry extends BufferGeometry {
    constructor(t = [new Vector2(0, -0.5), new Vector2(0.5, 0), new Vector2(0, 0.5)], e = 12, i = 0, r = 2 * Math.PI) {
      super(), this.type = "LatheGeometry", this.parameters = { points: t, segments: e, phiStart: i, phiLength: r }, e = Math.floor(e), r = clamp(r, 0, 2 * Math.PI);
      const s = [], n = [], a = [], o = [], h = [], l = 1 / e, c = new Vector3(), u = new Vector2(), p = new Vector3(), d = new Vector3(), m = new Vector3();
      let y = 0, f = 0;
      for (let e2 = 0; e2 <= t.length - 1; e2++) switch (e2) {
        case 0:
          y = t[e2 + 1].x - t[e2].x, f = t[e2 + 1].y - t[e2].y, p.x = 1 * f, p.y = -y, p.z = 0 * f, m.copy(p), p.normalize(), o.push(p.x, p.y, p.z);
          break;
        case t.length - 1:
          o.push(m.x, m.y, m.z);
          break;
        default:
          y = t[e2 + 1].x - t[e2].x, f = t[e2 + 1].y - t[e2].y, p.x = 1 * f, p.y = -y, p.z = 0 * f, d.copy(p), p.x += m.x, p.y += m.y, p.z += m.z, p.normalize(), o.push(p.x, p.y, p.z), m.copy(d);
      }
      for (let s2 = 0; s2 <= e; s2++) {
        const p2 = i + s2 * l * r, d2 = Math.sin(p2), m2 = Math.cos(p2);
        for (let i2 = 0; i2 <= t.length - 1; i2++) {
          c.x = t[i2].x * d2, c.y = t[i2].y, c.z = t[i2].x * m2, n.push(c.x, c.y, c.z), u.x = s2 / e, u.y = i2 / (t.length - 1), a.push(u.x, u.y);
          const r2 = o[3 * i2 + 0] * d2, l2 = o[3 * i2 + 1], p3 = o[3 * i2 + 0] * m2;
          h.push(r2, l2, p3);
        }
      }
      for (let i2 = 0; i2 < e; i2++) for (let e2 = 0; e2 < t.length - 1; e2++) {
        const r2 = e2 + i2 * t.length, n2 = r2, a2 = r2 + t.length, o2 = r2 + t.length + 1, h2 = r2 + 1;
        s.push(n2, a2, h2), s.push(o2, h2, a2);
      }
      this.setIndex(s), this.setAttribute("position", new Float32BufferAttribute(n, 3)), this.setAttribute("uv", new Float32BufferAttribute(a, 2)), this.setAttribute("normal", new Float32BufferAttribute(h, 3));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _LatheGeometry(t.points, t.segments, t.phiStart, t.phiLength);
    }
  };
  var OctahedronGeometry = class _OctahedronGeometry extends PolyhedronGeometry {
    constructor(t = 1, e = 0) {
      super([1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], t, e), this.type = "OctahedronGeometry", this.parameters = { radius: t, detail: e };
    }
    static fromJSON(t) {
      return new _OctahedronGeometry(t.radius, t.detail);
    }
  };
  var PlaneGeometry = class _PlaneGeometry extends BufferGeometry {
    constructor(t = 1, e = 1, i = 1, r = 1) {
      super(), this.type = "PlaneGeometry", this.parameters = { width: t, height: e, widthSegments: i, heightSegments: r };
      const s = t / 2, n = e / 2, a = Math.floor(i), o = Math.floor(r), h = a + 1, l = o + 1, c = t / a, u = e / o, p = [], d = [], m = [], y = [];
      for (let t2 = 0; t2 < l; t2++) {
        const e2 = t2 * u - n;
        for (let i2 = 0; i2 < h; i2++) {
          const r2 = i2 * c - s;
          d.push(r2, -e2, 0), m.push(0, 0, 1), y.push(i2 / a), y.push(1 - t2 / o);
        }
      }
      for (let t2 = 0; t2 < o; t2++) for (let e2 = 0; e2 < a; e2++) {
        const i2 = e2 + h * t2, r2 = e2 + h * (t2 + 1), s2 = e2 + 1 + h * (t2 + 1), n2 = e2 + 1 + h * t2;
        p.push(i2, r2, n2), p.push(r2, s2, n2);
      }
      this.setIndex(p), this.setAttribute("position", new Float32BufferAttribute(d, 3)), this.setAttribute("normal", new Float32BufferAttribute(m, 3)), this.setAttribute("uv", new Float32BufferAttribute(y, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _PlaneGeometry(t.width, t.height, t.widthSegments, t.heightSegments);
    }
  };
  var RingGeometry = class _RingGeometry extends BufferGeometry {
    constructor(t = 0.5, e = 1, i = 32, r = 1, s = 0, n = 2 * Math.PI) {
      super(), this.type = "RingGeometry", this.parameters = { innerRadius: t, outerRadius: e, thetaSegments: i, phiSegments: r, thetaStart: s, thetaLength: n }, i = Math.max(3, i);
      const a = [], o = [], h = [], l = [];
      let c = t;
      const u = (e - t) / (r = Math.max(1, r)), p = new Vector3(), d = new Vector2();
      for (let t2 = 0; t2 <= r; t2++) {
        for (let t3 = 0; t3 <= i; t3++) {
          const r2 = s + t3 / i * n;
          p.x = c * Math.cos(r2), p.y = c * Math.sin(r2), o.push(p.x, p.y, p.z), h.push(0, 0, 1), d.x = (p.x / e + 1) / 2, d.y = (p.y / e + 1) / 2, l.push(d.x, d.y);
        }
        c += u;
      }
      for (let t2 = 0; t2 < r; t2++) {
        const e2 = t2 * (i + 1);
        for (let t3 = 0; t3 < i; t3++) {
          const r2 = t3 + e2, s2 = r2, n2 = r2 + i + 1, o2 = r2 + i + 2, h2 = r2 + 1;
          a.push(s2, n2, h2), a.push(n2, o2, h2);
        }
      }
      this.setIndex(a), this.setAttribute("position", new Float32BufferAttribute(o, 3)), this.setAttribute("normal", new Float32BufferAttribute(h, 3)), this.setAttribute("uv", new Float32BufferAttribute(l, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _RingGeometry(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
    }
  };
  var ShapeGeometry = class _ShapeGeometry extends BufferGeometry {
    constructor(t = new Shape([new Vector2(0, 0.5), new Vector2(-0.5, -0.5), new Vector2(0.5, -0.5)]), e = 12) {
      super(), this.type = "ShapeGeometry", this.parameters = { shapes: t, curveSegments: e };
      const i = [], r = [], s = [], n = [];
      let a = 0, o = 0;
      if (false === Array.isArray(t)) h(t);
      else for (let e2 = 0; e2 < t.length; e2++) h(t[e2]), this.addGroup(a, o, e2), a += o, o = 0;
      function h(t2) {
        const a2 = r.length / 3, h2 = t2.extractPoints(e);
        let l = h2.shape;
        const c = h2.holes;
        false === ShapeUtils.isClockWise(l) && (l = l.reverse());
        for (let t3 = 0, e2 = c.length; t3 < e2; t3++) {
          const e3 = c[t3];
          true === ShapeUtils.isClockWise(e3) && (c[t3] = e3.reverse());
        }
        const u = ShapeUtils.triangulateShape(l, c);
        for (let t3 = 0, e2 = c.length; t3 < e2; t3++) {
          const e3 = c[t3];
          l = l.concat(e3);
        }
        for (let t3 = 0, e2 = l.length; t3 < e2; t3++) {
          const e3 = l[t3];
          r.push(e3.x, e3.y, 0), s.push(0, 0, 1), n.push(e3.x, e3.y);
        }
        for (let t3 = 0, e2 = u.length; t3 < e2; t3++) {
          const e3 = u[t3], r2 = e3[0] + a2, s2 = e3[1] + a2, n2 = e3[2] + a2;
          i.push(r2, s2, n2), o += 3;
        }
      }
      this.setIndex(i), this.setAttribute("position", new Float32BufferAttribute(r, 3)), this.setAttribute("normal", new Float32BufferAttribute(s, 3)), this.setAttribute("uv", new Float32BufferAttribute(n, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    toJSON() {
      const t = super.toJSON();
      return toJSON(this.parameters.shapes, t);
    }
    static fromJSON(t, e) {
      const i = [];
      for (let r = 0, s = t.shapes.length; r < s; r++) {
        const s2 = e[t.shapes[r]];
        i.push(s2);
      }
      return new _ShapeGeometry(i, t.curveSegments);
    }
  };
  function toJSON(t, e) {
    if (e.shapes = [], Array.isArray(t)) for (let i = 0, r = t.length; i < r; i++) {
      const r2 = t[i];
      e.shapes.push(r2.uuid);
    }
    else e.shapes.push(t.uuid);
    return e;
  }
  var SphereGeometry = class _SphereGeometry extends BufferGeometry {
    constructor(t = 1, e = 32, i = 16, r = 0, s = 2 * Math.PI, n = 0, a = Math.PI) {
      super(), this.type = "SphereGeometry", this.parameters = { radius: t, widthSegments: e, heightSegments: i, phiStart: r, phiLength: s, thetaStart: n, thetaLength: a }, e = Math.max(3, Math.floor(e)), i = Math.max(2, Math.floor(i));
      const o = Math.min(n + a, Math.PI);
      let h = 0;
      const l = [], c = new Vector3(), u = new Vector3(), p = [], d = [], m = [], y = [];
      for (let p2 = 0; p2 <= i; p2++) {
        const f = [], g = p2 / i, x = n + g * a, _ = t * Math.cos(x), v = Math.sqrt(t * t - _ * _);
        let b = 0;
        0 === p2 && 0 === n ? b = 0.5 / e : p2 === i && o === Math.PI && (b = -0.5 / e);
        for (let t2 = 0; t2 <= e; t2++) {
          const i2 = t2 / e, n2 = r + i2 * s;
          c.x = -v * Math.cos(n2), c.y = _, c.z = v * Math.sin(n2), d.push(c.x, c.y, c.z), u.copy(c).normalize(), m.push(u.x, u.y, u.z), y.push(i2 + b, 1 - g), f.push(h++);
        }
        l.push(f);
      }
      for (let t2 = 0; t2 < i; t2++) for (let r2 = 0; r2 < e; r2++) {
        const e2 = l[t2][r2 + 1], s2 = l[t2][r2], a2 = l[t2 + 1][r2], h2 = l[t2 + 1][r2 + 1];
        (0 !== t2 || n > 0) && p.push(e2, s2, h2), (t2 !== i - 1 || o < Math.PI) && p.push(s2, a2, h2);
      }
      this.setIndex(p), this.setAttribute("position", new Float32BufferAttribute(d, 3)), this.setAttribute("normal", new Float32BufferAttribute(m, 3)), this.setAttribute("uv", new Float32BufferAttribute(y, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _SphereGeometry(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
    }
  };
  var TetrahedronGeometry = class _TetrahedronGeometry extends PolyhedronGeometry {
    constructor(t = 1, e = 0) {
      super([1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], t, e), this.type = "TetrahedronGeometry", this.parameters = { radius: t, detail: e };
    }
    static fromJSON(t) {
      return new _TetrahedronGeometry(t.radius, t.detail);
    }
  };
  var TorusGeometry = class _TorusGeometry extends BufferGeometry {
    constructor(t = 1, e = 0.4, i = 12, r = 48, s = 2 * Math.PI, n = 0, a = 2 * Math.PI) {
      super(), this.type = "TorusGeometry", this.parameters = { radius: t, tube: e, radialSegments: i, tubularSegments: r, arc: s, thetaStart: n, thetaLength: a }, i = Math.floor(i), r = Math.floor(r);
      const o = [], h = [], l = [], c = [], u = new Vector3(), p = new Vector3(), d = new Vector3();
      for (let o2 = 0; o2 <= i; o2++) {
        const m = n + o2 / i * a;
        for (let n2 = 0; n2 <= r; n2++) {
          const a2 = n2 / r * s;
          p.x = (t + e * Math.cos(m)) * Math.cos(a2), p.y = (t + e * Math.cos(m)) * Math.sin(a2), p.z = e * Math.sin(m), h.push(p.x, p.y, p.z), u.x = t * Math.cos(a2), u.y = t * Math.sin(a2), d.subVectors(p, u).normalize(), l.push(d.x, d.y, d.z), c.push(n2 / r), c.push(o2 / i);
        }
      }
      for (let t2 = 1; t2 <= i; t2++) for (let e2 = 1; e2 <= r; e2++) {
        const i2 = (r + 1) * t2 + e2 - 1, s2 = (r + 1) * (t2 - 1) + e2 - 1, n2 = (r + 1) * (t2 - 1) + e2, a2 = (r + 1) * t2 + e2;
        o.push(i2, s2, a2), o.push(s2, n2, a2);
      }
      this.setIndex(o), this.setAttribute("position", new Float32BufferAttribute(h, 3)), this.setAttribute("normal", new Float32BufferAttribute(l, 3)), this.setAttribute("uv", new Float32BufferAttribute(c, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _TorusGeometry(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc, t.thetaStart, t.thetaLength);
    }
  };
  var TorusKnotGeometry = class _TorusKnotGeometry extends BufferGeometry {
    constructor(t = 1, e = 0.4, i = 64, r = 8, s = 2, n = 3) {
      super(), this.type = "TorusKnotGeometry", this.parameters = { radius: t, tube: e, tubularSegments: i, radialSegments: r, p: s, q: n }, i = Math.floor(i), r = Math.floor(r);
      const a = [], o = [], h = [], l = [], c = new Vector3(), u = new Vector3(), p = new Vector3(), d = new Vector3(), m = new Vector3(), y = new Vector3(), f = new Vector3();
      for (let a2 = 0; a2 <= i; ++a2) {
        const x = a2 / i * s * Math.PI * 2;
        g(x, s, n, t, p), g(x + 0.01, s, n, t, d), y.subVectors(d, p), f.addVectors(d, p), m.crossVectors(y, f), f.crossVectors(m, y), m.normalize(), f.normalize();
        for (let t2 = 0; t2 <= r; ++t2) {
          const s2 = t2 / r * Math.PI * 2, n2 = -e * Math.cos(s2), d2 = e * Math.sin(s2);
          c.x = p.x + (n2 * f.x + d2 * m.x), c.y = p.y + (n2 * f.y + d2 * m.y), c.z = p.z + (n2 * f.z + d2 * m.z), o.push(c.x, c.y, c.z), u.subVectors(c, p).normalize(), h.push(u.x, u.y, u.z), l.push(a2 / i), l.push(t2 / r);
        }
      }
      for (let t2 = 1; t2 <= i; t2++) for (let e2 = 1; e2 <= r; e2++) {
        const i2 = (r + 1) * (t2 - 1) + (e2 - 1), s2 = (r + 1) * t2 + (e2 - 1), n2 = (r + 1) * t2 + e2, o2 = (r + 1) * (t2 - 1) + e2;
        a.push(i2, s2, o2), a.push(s2, n2, o2);
      }
      function g(t2, e2, i2, r2, s2) {
        const n2 = Math.cos(t2), a2 = Math.sin(t2), o2 = i2 / e2 * t2, h2 = Math.cos(o2);
        s2.x = r2 * (2 + h2) * 0.5 * n2, s2.y = r2 * (2 + h2) * a2 * 0.5, s2.z = r2 * Math.sin(o2) * 0.5;
      }
      this.setIndex(a), this.setAttribute("position", new Float32BufferAttribute(o, 3)), this.setAttribute("normal", new Float32BufferAttribute(h, 3)), this.setAttribute("uv", new Float32BufferAttribute(l, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    static fromJSON(t) {
      return new _TorusKnotGeometry(t.radius, t.tube, t.tubularSegments, t.radialSegments, t.p, t.q);
    }
  };
  var TubeGeometry = class _TubeGeometry extends BufferGeometry {
    constructor(t = new QuadraticBezierCurve3(new Vector3(-1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 0)), e = 64, i = 1, r = 8, s = false) {
      super(), this.type = "TubeGeometry", this.parameters = { path: t, tubularSegments: e, radius: i, radialSegments: r, closed: s };
      const n = t.computeFrenetFrames(e, s);
      this.tangents = n.tangents, this.normals = n.normals, this.binormals = n.binormals;
      const a = new Vector3(), o = new Vector3(), h = new Vector2();
      let l = new Vector3();
      const c = [], u = [], p = [], d = [];
      function m(s2) {
        l = t.getPointAt(s2 / e, l);
        const h2 = n.normals[s2], p2 = n.binormals[s2];
        for (let t2 = 0; t2 <= r; t2++) {
          const e2 = t2 / r * Math.PI * 2, s3 = Math.sin(e2), n2 = -Math.cos(e2);
          o.x = n2 * h2.x + s3 * p2.x, o.y = n2 * h2.y + s3 * p2.y, o.z = n2 * h2.z + s3 * p2.z, o.normalize(), u.push(o.x, o.y, o.z), a.x = l.x + i * o.x, a.y = l.y + i * o.y, a.z = l.z + i * o.z, c.push(a.x, a.y, a.z);
        }
      }
      !(function() {
        for (let t2 = 0; t2 < e; t2++) m(t2);
        m(false === s ? e : 0), (function() {
          for (let t2 = 0; t2 <= e; t2++) for (let i2 = 0; i2 <= r; i2++) h.x = t2 / e, h.y = i2 / r, p.push(h.x, h.y);
        })(), (function() {
          for (let t2 = 1; t2 <= e; t2++) for (let e2 = 1; e2 <= r; e2++) {
            const i2 = (r + 1) * (t2 - 1) + (e2 - 1), s2 = (r + 1) * t2 + (e2 - 1), n2 = (r + 1) * t2 + e2, a2 = (r + 1) * (t2 - 1) + e2;
            d.push(i2, s2, a2), d.push(s2, n2, a2);
          }
        })();
      })(), this.setIndex(d), this.setAttribute("position", new Float32BufferAttribute(c, 3)), this.setAttribute("normal", new Float32BufferAttribute(u, 3)), this.setAttribute("uv", new Float32BufferAttribute(p, 2));
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
    toJSON() {
      const t = super.toJSON();
      return t.path = this.parameters.path.toJSON(), t;
    }
    static fromJSON(t) {
      return new _TubeGeometry(new Curves[t.path.type]().fromJSON(t.path), t.tubularSegments, t.radius, t.radialSegments, t.closed);
    }
  };
  var WireframeGeometry = class extends BufferGeometry {
    constructor(t = null) {
      if (super(), this.type = "WireframeGeometry", this.parameters = { geometry: t }, null !== t) {
        const e = [], i = /* @__PURE__ */ new Set(), r = new Vector3(), s = new Vector3();
        if (null !== t.index) {
          const n = t.attributes.position, a = t.index;
          let o = t.groups;
          0 === o.length && (o = [{ start: 0, count: a.count, materialIndex: 0 }]);
          for (let t2 = 0, h = o.length; t2 < h; ++t2) {
            const h2 = o[t2], l = h2.start;
            for (let t3 = l, o2 = l + h2.count; t3 < o2; t3 += 3) for (let o3 = 0; o3 < 3; o3++) {
              const h3 = a.getX(t3 + o3), l2 = a.getX(t3 + (o3 + 1) % 3);
              r.fromBufferAttribute(n, h3), s.fromBufferAttribute(n, l2), true === isUniqueEdge(r, s, i) && (e.push(r.x, r.y, r.z), e.push(s.x, s.y, s.z));
            }
          }
        } else {
          const n = t.attributes.position;
          for (let t2 = 0, a = n.count / 3; t2 < a; t2++) for (let a2 = 0; a2 < 3; a2++) {
            const o = 3 * t2 + a2, h = 3 * t2 + (a2 + 1) % 3;
            r.fromBufferAttribute(n, o), s.fromBufferAttribute(n, h), true === isUniqueEdge(r, s, i) && (e.push(r.x, r.y, r.z), e.push(s.x, s.y, s.z));
          }
        }
        this.setAttribute("position", new Float32BufferAttribute(e, 3));
      }
    }
    copy(t) {
      return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
    }
  };
  function isUniqueEdge(t, e, i) {
    const r = `${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`, s = `${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`;
    return true !== i.has(r) && true !== i.has(s) && (i.add(r), i.add(s), true);
  }
  var Geometries = Object.freeze({ __proto__: null, BoxGeometry, CapsuleGeometry, CircleGeometry, ConeGeometry, CylinderGeometry, DodecahedronGeometry, EdgesGeometry, ExtrudeGeometry, IcosahedronGeometry, LatheGeometry, OctahedronGeometry, PlaneGeometry, PolyhedronGeometry, RingGeometry, ShapeGeometry, SphereGeometry, TetrahedronGeometry, TorusGeometry, TorusKnotGeometry, TubeGeometry, WireframeGeometry });
  function cloneUniforms(t) {
    const e = {};
    for (const i in t) {
      e[i] = {};
      for (const r in t[i]) {
        const s = t[i][r];
        if (isThreeObject(s)) s.isRenderTargetTexture ? (warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[i][r] = null) : e[i][r] = s.clone();
        else if (Array.isArray(s)) if (isThreeObject(s[0])) {
          const t2 = [];
          for (let e2 = 0, i2 = s.length; e2 < i2; e2++) t2[e2] = s[e2].clone();
          e[i][r] = t2;
        } else e[i][r] = s.slice();
        else e[i][r] = s;
      }
    }
    return e;
  }
  function mergeUniforms(t) {
    const e = {};
    for (let i = 0; i < t.length; i++) {
      const r = cloneUniforms(t[i]);
      for (const t2 in r) e[t2] = r[t2];
    }
    return e;
  }
  function isThreeObject(t) {
    return t && (t.isColor || t.isMatrix3 || t.isMatrix4 || t.isVector2 || t.isVector3 || t.isVector4 || t.isTexture || t.isQuaternion);
  }
  function cloneUniformsGroups(t) {
    const e = [];
    for (let i = 0; i < t.length; i++) e.push(t[i].clone());
    return e;
  }
  function getUnlitUniformColorSpace(t) {
    const e = t.getRenderTarget();
    return null === e ? t.outputColorSpace : true === e.isXRRenderTarget ? e.texture.colorSpace : ColorManagement.workingColorSpace;
  }
  var UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };
  var default_vertex = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
  var default_fragment = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
  var ShaderMaterial = class extends Material {
    constructor(t) {
      super(), this.isShaderMaterial = true, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = default_vertex, this.fragmentShader = default_fragment, this.linewidth = 1, this.wireframe = false, this.wireframeLinewidth = 1, this.fog = false, this.lights = false, this.clipping = false, this.forceSinglePass = true, this.extensions = { clipCullDistance: false, multiDraw: false }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = false, this.glslVersion = null, void 0 !== t && this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = cloneUniforms(t.uniforms), this.uniformsGroups = cloneUniformsGroups(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this.defaultAttributeValues = Object.assign({}, t.defaultAttributeValues), this.index0AttributeName = t.index0AttributeName, this.uniformsNeedUpdate = t.uniformsNeedUpdate, this;
    }
    toJSON(t) {
      const e = super.toJSON(t);
      e.glslVersion = this.glslVersion, e.uniforms = {};
      for (const i2 in this.uniforms) {
        const r = this.uniforms[i2].value;
        r && r.isTexture ? e.uniforms[i2] = { type: "t", value: r.toJSON(t).uuid } : r && r.isColor ? e.uniforms[i2] = { type: "c", value: r.getHex() } : r && r.isVector2 ? e.uniforms[i2] = { type: "v2", value: r.toArray() } : r && r.isVector3 ? e.uniforms[i2] = { type: "v3", value: r.toArray() } : r && r.isVector4 ? e.uniforms[i2] = { type: "v4", value: r.toArray() } : r && r.isMatrix3 ? e.uniforms[i2] = { type: "m3", value: r.toArray() } : r && r.isMatrix4 ? e.uniforms[i2] = { type: "m4", value: r.toArray() } : e.uniforms[i2] = { value: r };
      }
      Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
      const i = {};
      for (const t2 in this.extensions) true === this.extensions[t2] && (i[t2] = true);
      return Object.keys(i).length > 0 && (e.extensions = i), e;
    }
    fromJSON(t, e) {
      if (super.fromJSON(t, e), void 0 !== t.uniforms) for (const i in t.uniforms) {
        const r = t.uniforms[i];
        switch (this.uniforms[i] = {}, r.type) {
          case "t":
            this.uniforms[i].value = e[r.value] || null;
            break;
          case "c":
            this.uniforms[i].value = new Color().setHex(r.value);
            break;
          case "v2":
            this.uniforms[i].value = new Vector2().fromArray(r.value);
            break;
          case "v3":
            this.uniforms[i].value = new Vector3().fromArray(r.value);
            break;
          case "v4":
            this.uniforms[i].value = new Vector4().fromArray(r.value);
            break;
          case "m3":
            this.uniforms[i].value = new Matrix3().fromArray(r.value);
            break;
          case "m4":
            this.uniforms[i].value = new Matrix4().fromArray(r.value);
            break;
          default:
            this.uniforms[i].value = r.value;
        }
      }
      if (void 0 !== t.defines && (this.defines = t.defines), void 0 !== t.vertexShader && (this.vertexShader = t.vertexShader), void 0 !== t.fragmentShader && (this.fragmentShader = t.fragmentShader), void 0 !== t.glslVersion && (this.glslVersion = t.glslVersion), void 0 !== t.extensions) for (const e2 in t.extensions) this.extensions[e2] = t.extensions[e2];
      return void 0 !== t.lights && (this.lights = t.lights), void 0 !== t.clipping && (this.clipping = t.clipping), this;
    }
  };
  var RawShaderMaterial = class extends ShaderMaterial {
    constructor(t) {
      super(t), this.isRawShaderMaterial = true, this.type = "RawShaderMaterial";
    }
  };
  var MeshDepthMaterial = class extends Material {
    constructor(t) {
      super(), this.isMeshDepthMaterial = true, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = false, this.wireframeLinewidth = 1, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
    }
  };
  var MeshDistanceMaterial = class extends Material {
    constructor(t) {
      super(), this.isMeshDistanceMaterial = true, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
    }
    copy(t) {
      return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
    }
  };
  function convertArray(t, e) {
    return t && t.constructor !== e ? "number" == typeof e.BYTES_PER_ELEMENT ? new e(t) : Array.prototype.slice.call(t) : t;
  }
  function hasTangents(t) {
    return void 0 !== t && void 0 !== t.inTangents && void 0 !== t.outTangents;
  }
  var Interpolant = class {
    constructor(t, e, i, r) {
      this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = void 0 !== r ? r : new e.constructor(i), this.sampleValues = e, this.valueSize = i, this.settings = null, this.DefaultSettings_ = {};
    }
    evaluate(t) {
      const e = this.parameterPositions;
      let i = this._cachedIndex, r = e[i], s = e[i - 1];
      t: {
        e: {
          let n;
          i: {
            r: if (!(t < r)) {
              for (let n2 = i + 2; ; ) {
                if (void 0 === r) {
                  if (t < s) break r;
                  return i = e.length, this._cachedIndex = i, this.copySampleValue_(i - 1);
                }
                if (i === n2) break;
                if (s = r, r = e[++i], t < r) break e;
              }
              n = e.length;
              break i;
            }
            if (!(t >= s)) {
              const a = e[1];
              t < a && (i = 2, s = a);
              for (let n2 = i - 2; ; ) {
                if (void 0 === s) return this._cachedIndex = 0, this.copySampleValue_(0);
                if (i === n2) break;
                if (r = s, s = e[--i - 1], t >= s) break e;
              }
              n = i, i = 0;
              break i;
            }
            break t;
          }
          for (; i < n; ) {
            const r2 = i + n >>> 1;
            t < e[r2] ? n = r2 : i = r2 + 1;
          }
          if (r = e[i], s = e[i - 1], void 0 === s) return this._cachedIndex = 0, this.copySampleValue_(0);
          if (void 0 === r) return i = e.length, this._cachedIndex = i, this.copySampleValue_(i - 1);
        }
        this._cachedIndex = i, this.intervalChanged_(i, s, r);
      }
      return this.interpolate_(i, s, t, r);
    }
    getSettings_() {
      return this.settings || this.DefaultSettings_;
    }
    copySampleValue_(t) {
      const e = this.resultBuffer, i = this.sampleValues, r = this.valueSize, s = t * r;
      for (let t2 = 0; t2 !== r; ++t2) e[t2] = i[s + t2];
      return e;
    }
    interpolate_() {
      throw new Error("THREE.Interpolant: Call to abstract method.");
    }
    intervalChanged_() {
    }
  };
  var CubicInterpolant = class extends Interpolant {
    constructor(t, e, i, r) {
      super(t, e, i, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: 2400, endingEnd: 2400 };
    }
    intervalChanged_(t, e, i) {
      const r = this.parameterPositions;
      let s = t - 2, n = t + 1, a = r[s], o = r[n];
      if (void 0 === a) switch (this.getSettings_().endingStart) {
        case 2401:
          s = t, a = 2 * e - i;
          break;
        case 2402:
          s = r.length - 2, a = e + r[s] - r[s + 1];
          break;
        default:
          s = t, a = i;
      }
      if (void 0 === o) switch (this.getSettings_().endingEnd) {
        case 2401:
          n = t, o = 2 * i - e;
          break;
        case 2402:
          n = 1, o = i + r[1] - r[0];
          break;
        default:
          n = t - 1, o = e;
      }
      const h = 0.5 * (i - e), l = this.valueSize;
      this._weightPrev = h / (e - a), this._weightNext = h / (o - i), this._offsetPrev = s * l, this._offsetNext = n * l;
    }
    interpolate_(t, e, i, r) {
      const s = this.resultBuffer, n = this.sampleValues, a = this.valueSize, o = t * a, h = o - a, l = this._offsetPrev, c = this._offsetNext, u = this._weightPrev, p = this._weightNext, d = (i - e) / (r - e), m = d * d, y = m * d, f = -u * y + 2 * u * m - u * d, g = (1 + u) * y + (-1.5 - 2 * u) * m + (-0.5 + u) * d + 1, x = (-1 - p) * y + (1.5 + p) * m + 0.5 * d, _ = p * y - p * m;
      for (let t2 = 0; t2 !== a; ++t2) s[t2] = f * n[l + t2] + g * n[h + t2] + x * n[o + t2] + _ * n[c + t2];
      return s;
    }
  };
  var LinearInterpolant = class extends Interpolant {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
    interpolate_(t, e, i, r) {
      const s = this.resultBuffer, n = this.sampleValues, a = this.valueSize, o = t * a, h = o - a, l = (i - e) / (r - e), c = 1 - l;
      for (let t2 = 0; t2 !== a; ++t2) s[t2] = n[h + t2] * c + n[o + t2] * l;
      return s;
    }
  };
  var DiscreteInterpolant = class extends Interpolant {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
    interpolate_(t) {
      return this.copySampleValue_(t - 1);
    }
  };
  var BezierInterpolant = class extends Interpolant {
    interpolate_(t, e, i, r) {
      const s = this.resultBuffer, n = this.sampleValues, a = this.valueSize, o = t * a, h = o - a, l = this.inTangents, c = this.outTangents;
      if (!l || !c) {
        const t2 = (i - e) / (r - e), l2 = 1 - t2;
        for (let e2 = 0; e2 !== a; ++e2) s[e2] = n[h + e2] * l2 + n[o + e2] * t2;
        return s;
      }
      const u = 2 * a, p = t - 1;
      for (let d = 0; d !== a; ++d) {
        const a2 = n[h + d], m = n[o + d], y = p * u + 2 * d, f = c[y], g = c[y + 1], x = t * u + 2 * d, _ = l[x], v = l[x + 1], b = solveBezierParameter(i, e, f, _, r);
        s[d] = cubicBezier(b, a2, g, v, m);
      }
      return s;
    }
  };
  function cubicBezier(t, e, i, r, s) {
    const n = 1 - t;
    return n * n * n * e + 3 * n * n * t * i + 3 * n * t * t * r + t * t * t * s;
  }
  function cubicBezierSlope(t, e, i, r, s) {
    const n = 1 - t;
    return 3 * n * n * (i - e) + 6 * n * t * (r - i) + 3 * t * t * (s - r);
  }
  function solveBezierParameter(t, e, i, r, s) {
    let n = (t - e) / (s - e);
    for (let a = 0; a < 8; a++) {
      const a2 = cubicBezier(n, e, i, r, s) - t;
      if (Math.abs(a2) < 1e-10) break;
      const o = cubicBezierSlope(n, e, i, r, s);
      if (Math.abs(o) < 1e-10) break;
      n = Math.max(0, Math.min(1, n - a2 / o));
    }
    return n;
  }
  var KeyframeTrack = class {
    constructor(t, e, i, r) {
      if (void 0 === t) throw new Error("THREE.KeyframeTrack: track name is undefined");
      if (void 0 === e || 0 === e.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
      this.name = t, this.times = convertArray(e, this.TimeBufferType), this.values = convertArray(i, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
    }
    static toJSON(t) {
      const e = t.constructor;
      let i;
      if (e.toJSON !== this.toJSON) i = e.toJSON(t);
      else {
        i = { name: t.name, times: convertArray(t.times, Array), values: convertArray(t.values, Array) };
        const e2 = t.getInterpolation();
        e2 !== t.DefaultInterpolation && (i.interpolation = e2), hasTangents(t.settings) && (i.settings = { inTangents: convertArray(t.settings.inTangents, Array), outTangents: convertArray(t.settings.outTangents, Array) });
      }
      return i.type = t.ValueTypeName, i;
    }
    InterpolantFactoryMethodDiscrete(t) {
      return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodLinear(t) {
      return new LinearInterpolant(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodSmooth(t) {
      return new CubicInterpolant(this.times, this.values, this.getValueSize(), t);
    }
    InterpolantFactoryMethodBezier(t) {
      const e = new BezierInterpolant(this.times, this.values, this.getValueSize(), t);
      return this.settings && (e.inTangents = this.settings.inTangents, e.outTangents = this.settings.outTangents), e;
    }
    setInterpolation(t) {
      let e;
      switch (t) {
        case 2300:
          e = this.InterpolantFactoryMethodDiscrete;
          break;
        case 2301:
          e = this.InterpolantFactoryMethodLinear;
          break;
        case 2302:
          e = this.InterpolantFactoryMethodSmooth;
          break;
        case 2303:
          e = this.InterpolantFactoryMethodBezier;
      }
      if (void 0 === e) {
        const e2 = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
        if (void 0 === this.createInterpolant) {
          if (t === this.DefaultInterpolation) throw new Error(e2);
          this.setInterpolation(this.DefaultInterpolation);
        }
        return warn("KeyframeTrack:", e2), this;
      }
      return this.createInterpolant = e, this;
    }
    getInterpolation() {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return 2300;
        case this.InterpolantFactoryMethodLinear:
          return 2301;
        case this.InterpolantFactoryMethodSmooth:
          return 2302;
        case this.InterpolantFactoryMethodBezier:
          return 2303;
      }
    }
    getValueSize() {
      return this.values.length / this.times.length;
    }
    shift(t) {
      if (0 !== t) {
        const e = this.times;
        for (let i = 0, r = e.length; i !== r; ++i) e[i] += t;
      }
      return this;
    }
    scale(t) {
      if (1 !== t) {
        const e = this.times;
        for (let i = 0, r = e.length; i !== r; ++i) e[i] *= t;
        hasTangents(this.settings) && (scaleTangentTimes(this.settings.inTangents, t), scaleTangentTimes(this.settings.outTangents, t));
      }
      return this;
    }
    trim(t, e) {
      const i = this.times, r = i.length;
      let s = 0, n = r - 1;
      for (; s !== r && i[s] < t; ) ++s;
      for (; -1 !== n && i[n] > e; ) --n;
      if (++n, 0 !== s || n !== r) {
        s >= n && (n = Math.max(n, 1), s = n - 1);
        const t2 = this.getValueSize();
        this.times = i.slice(s, n), this.values = this.values.slice(s * t2, n * t2);
      }
      return this;
    }
    validate() {
      let t = true;
      const e = this.getValueSize();
      e - Math.floor(e) !== 0 && (error("KeyframeTrack: Invalid value size in track.", this), t = false);
      const i = this.times, r = this.values, s = i.length;
      0 === s && (error("KeyframeTrack: Track is empty.", this), t = false);
      let n = null;
      for (let e2 = 0; e2 !== s; e2++) {
        const r2 = i[e2];
        if ("number" == typeof r2 && isNaN(r2)) {
          error("KeyframeTrack: Time is not a valid number.", this, e2, r2), t = false;
          break;
        }
        if (null !== n && n > r2) {
          error("KeyframeTrack: Out of order keys.", this, e2, r2, n), t = false;
          break;
        }
        n = r2;
      }
      if (void 0 !== r && isTypedArray(r)) for (let e2 = 0, i2 = r.length; e2 !== i2; ++e2) {
        const i3 = r[e2];
        if (isNaN(i3)) {
          error("KeyframeTrack: Value is not a valid number.", this, e2, i3), t = false;
          break;
        }
      }
      return t;
    }
    optimize() {
      const t = this.times.slice(), e = this.values.slice(), i = this.getValueSize(), r = 2302 === this.getInterpolation(), s = t.length - 1;
      let n = 1;
      for (let a = 1; a < s; ++a) {
        let s2 = false;
        const o = t[a];
        if (o !== t[a + 1] && (1 !== a || o !== t[0])) if (r) s2 = true;
        else {
          const t2 = a * i, r2 = t2 - i, n2 = t2 + i;
          for (let a2 = 0; a2 !== i; ++a2) {
            const i2 = e[t2 + a2];
            if (i2 !== e[r2 + a2] || i2 !== e[n2 + a2]) {
              s2 = true;
              break;
            }
          }
        }
        if (s2) {
          if (a !== n) {
            t[n] = t[a];
            const r2 = a * i, s3 = n * i;
            for (let t2 = 0; t2 !== i; ++t2) e[s3 + t2] = e[r2 + t2];
          }
          ++n;
        }
      }
      if (s > 0) {
        t[n] = t[s];
        for (let t2 = s * i, r2 = n * i, a = 0; a !== i; ++a) e[r2 + a] = e[t2 + a];
        ++n;
      }
      return n !== t.length ? (this.times = t.slice(0, n), this.values = e.slice(0, n * i)) : (this.times = t, this.values = e), this;
    }
    clone() {
      const t = this.times.slice(), e = this.values.slice(), i = new (0, this.constructor)(this.name, t, e);
      return i.createInterpolant = this.createInterpolant, hasTangents(this.settings) && (i.settings = { inTangents: this.settings.inTangents.slice(), outTangents: this.settings.outTangents.slice() }), i;
    }
  };
  function scaleTangentTimes(t, e) {
    for (let i = 0, r = t.length; i !== r; i += 2) t[i] *= e;
  }
  KeyframeTrack.prototype.ValueTypeName = "", KeyframeTrack.prototype.TimeBufferType = Float32Array, KeyframeTrack.prototype.ValueBufferType = Float32Array, KeyframeTrack.prototype.DefaultInterpolation = 2301;
  var BooleanKeyframeTrack = class extends KeyframeTrack {
    constructor(t, e, i) {
      super(t, e, i);
    }
  };
  BooleanKeyframeTrack.prototype.ValueTypeName = "bool", BooleanKeyframeTrack.prototype.ValueBufferType = Array, BooleanKeyframeTrack.prototype.DefaultInterpolation = 2300, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
  var ColorKeyframeTrack = class extends KeyframeTrack {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
  };
  ColorKeyframeTrack.prototype.ValueTypeName = "color";
  var NumberKeyframeTrack = class extends KeyframeTrack {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
  };
  NumberKeyframeTrack.prototype.ValueTypeName = "number";
  var QuaternionLinearInterpolant = class extends Interpolant {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
    interpolate_(t, e, i, r) {
      const s = this.resultBuffer, n = this.sampleValues, a = this.valueSize, o = (i - e) / (r - e);
      let h = t * a;
      for (let t2 = h + a; h !== t2; h += 4) Quaternion.slerpFlat(s, 0, n, h - a, n, h, o);
      return s;
    }
  };
  var QuaternionKeyframeTrack = class extends KeyframeTrack {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
    InterpolantFactoryMethodLinear(t) {
      return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), t);
    }
  };
  QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion", QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
  var StringKeyframeTrack = class extends KeyframeTrack {
    constructor(t, e, i) {
      super(t, e, i);
    }
  };
  StringKeyframeTrack.prototype.ValueTypeName = "string", StringKeyframeTrack.prototype.ValueBufferType = Array, StringKeyframeTrack.prototype.DefaultInterpolation = 2300, StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
  var VectorKeyframeTrack = class extends KeyframeTrack {
    constructor(t, e, i, r) {
      super(t, e, i, r);
    }
  };
  VectorKeyframeTrack.prototype.ValueTypeName = "vector";
  var Cache = { enabled: false, files: {}, add: function(t, e) {
    false !== this.enabled && (isBlobURL(t) || (this.files[t] = e));
  }, get: function(t) {
    if (false !== this.enabled && !isBlobURL(t)) return this.files[t];
  }, remove: function(t) {
    delete this.files[t];
  }, clear: function() {
    this.files = {};
  } };
  function isBlobURL(t) {
    try {
      const e = t.slice(t.indexOf(":") + 1);
      return "blob:" === new URL(e).protocol;
    } catch (t2) {
      return false;
    }
  }
  var LoadingManager = class {
    constructor(t, e, i) {
      const r = this;
      let s, n = false, a = 0, o = 0;
      const h = [];
      this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = i, this._abortController = null, this.itemStart = function(t2) {
        o++, false === n && void 0 !== r.onStart && r.onStart(t2, a, o), n = true;
      }, this.itemEnd = function(t2) {
        a++, void 0 !== r.onProgress && r.onProgress(t2, a, o), a === o && (n = false, void 0 !== r.onLoad && r.onLoad());
      }, this.itemError = function(t2) {
        void 0 !== r.onError && r.onError(t2);
      }, this.resolveURL = function(t2) {
        return t2 = t2.normalize("NFC"), s ? s(t2) : t2;
      }, this.setURLModifier = function(t2) {
        return s = t2, this;
      }, this.addHandler = function(t2, e2) {
        return h.push(t2, e2), this;
      }, this.removeHandler = function(t2) {
        const e2 = h.indexOf(t2);
        return -1 !== e2 && h.splice(e2, 2), this;
      }, this.getHandler = function(t2) {
        for (let e2 = 0, i2 = h.length; e2 < i2; e2 += 2) {
          const i3 = h[e2], r2 = h[e2 + 1];
          if (i3.global && (i3.lastIndex = 0), i3.test(t2)) return r2;
        }
        return null;
      }, this.abort = function() {
        return this.abortController.abort(), this._abortController = null, this;
      };
    }
    get abortController() {
      return this._abortController || (this._abortController = new AbortController()), this._abortController;
    }
  };
  var DefaultLoadingManager = new LoadingManager();
  var Loader = class {
    constructor(t) {
      this.manager = void 0 !== t ? t : DefaultLoadingManager, this.crossOrigin = "anonymous", this.withCredentials = false, this.path = "", this.resourcePath = "", this.requestHeader = {}, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    load() {
    }
    loadAsync(t, e) {
      const i = this;
      return new Promise(function(r, s) {
        i.load(t, r, e, s);
      });
    }
    parse() {
    }
    setCrossOrigin(t) {
      return this.crossOrigin = t, this;
    }
    setWithCredentials(t) {
      return this.withCredentials = t, this;
    }
    setPath(t) {
      return this.path = t, this;
    }
    setResourcePath(t) {
      return this.resourcePath = t, this;
    }
    setRequestHeader(t) {
      return this.requestHeader = t, this;
    }
    abort() {
      return this;
    }
  };
  Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
  var _loading = /* @__PURE__ */ new WeakMap();
  var ImageLoader = class extends Loader {
    constructor(t) {
      super(t);
    }
    load(t, e, i, r) {
      void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
      const s = this, n = Cache.get(`image:${t}`);
      if (void 0 !== n) {
        if (true === n.complete) s.manager.itemStart(t), setTimeout(function() {
          e && e(n), s.manager.itemEnd(t);
        }, 0);
        else {
          let t2 = _loading.get(n);
          void 0 === t2 && (t2 = [], _loading.set(n, t2)), t2.push({ onLoad: e, onError: r });
        }
        return n;
      }
      const a = createElementNS("img");
      function o() {
        l(), e && e(this);
        const i2 = _loading.get(this) || [];
        for (let t2 = 0; t2 < i2.length; t2++) {
          const e2 = i2[t2];
          e2.onLoad && e2.onLoad(this);
        }
        _loading.delete(this), s.manager.itemEnd(t);
      }
      function h(e2) {
        l(), r && r(e2), Cache.remove(`image:${t}`);
        const i2 = _loading.get(this) || [];
        for (let t2 = 0; t2 < i2.length; t2++) {
          const r2 = i2[t2];
          r2.onError && r2.onError(e2);
        }
        _loading.delete(this), s.manager.itemError(t), s.manager.itemEnd(t);
      }
      function l() {
        a.removeEventListener("load", o, false), a.removeEventListener("error", h, false);
      }
      return a.addEventListener("load", o, false), a.addEventListener("error", h, false), "data:" !== t.slice(0, 5) && void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin), Cache.add(`image:${t}`, a), s.manager.itemStart(t), a.src = t, a;
    }
  };
  var TextureLoader = class extends Loader {
    constructor(t) {
      super(t);
    }
    load(t, e, i, r) {
      const s = new Texture(), n = new ImageLoader(this.manager);
      return n.setCrossOrigin(this.crossOrigin), n.setPath(this.path), n.load(t, function(t2) {
        s.image = t2, s.needsUpdate = true, void 0 !== e && e(s);
      }, i, r), s;
    }
  };
  var _projScreenMatrix = new Matrix4();
  var _lightPositionWorld = new Vector3();
  var _lookTarget = new Vector3();
  var _position$2 = new Vector3();
  var _quaternion$2 = new Quaternion();
  var _scale$2 = new Vector3();
  var Camera = class extends Object3D {
    constructor() {
      super(), this.isCamera = true, this.type = "Camera", this.matrixWorldInverse = new Matrix4(), this.projectionMatrix = new Matrix4(), this.projectionMatrixInverse = new Matrix4(), this.coordinateSystem = 2e3, this._reversedDepth = false;
    }
    get reversedDepth() {
      return this._reversedDepth;
    }
    copy(t, e) {
      return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
    }
    getWorldDirection(t) {
      return super.getWorldDirection(t).negate();
    }
    updateMatrixWorld(t) {
      super.updateMatrixWorld(t), this.matrixWorld.decompose(_position$2, _quaternion$2, _scale$2), 1 === _scale$2.x && 1 === _scale$2.y && 1 === _scale$2.z ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(_position$2, _quaternion$2, _scale$2.set(1, 1, 1)).invert();
    }
    updateWorldMatrix(t, e, i = false) {
      super.updateWorldMatrix(t, e, i), this.matrixWorld.decompose(_position$2, _quaternion$2, _scale$2), 1 === _scale$2.x && 1 === _scale$2.y && 1 === _scale$2.z ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(_position$2, _quaternion$2, _scale$2.set(1, 1, 1)).invert();
    }
    clone() {
      return new this.constructor().copy(this);
    }
  };
  var _v3$1 = new Vector3();
  var _minTarget = new Vector2();
  var _maxTarget = new Vector2();
  var PerspectiveCamera = class extends Camera {
    constructor(t = 50, e = 1, i = 0.1, r = 2e3) {
      super(), this.isPerspectiveCamera = true, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = i, this.far = r, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
    }
    copy(t, e) {
      return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
    }
    setFocalLength(t) {
      const e = 0.5 * this.getFilmHeight() / t;
      this.fov = 2 * RAD2DEG * Math.atan(e), this.updateProjectionMatrix();
    }
    getFocalLength() {
      const t = Math.tan(0.5 * DEG2RAD * this.fov);
      return 0.5 * this.getFilmHeight() / t;
    }
    getEffectiveFOV() {
      return 2 * RAD2DEG * Math.atan(Math.tan(0.5 * DEG2RAD * this.fov) / this.zoom);
    }
    getFilmWidth() {
      return this.filmGauge * Math.min(this.aspect, 1);
    }
    getFilmHeight() {
      return this.filmGauge / Math.max(this.aspect, 1);
    }
    getViewBounds(t, e, i) {
      _v3$1.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(_v3$1.x, _v3$1.y).multiplyScalar(-t / _v3$1.z), _v3$1.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i.set(_v3$1.x, _v3$1.y).multiplyScalar(-t / _v3$1.z);
    }
    getViewSize(t, e) {
      return this.getViewBounds(t, _minTarget, _maxTarget), e.subVectors(_maxTarget, _minTarget);
    }
    setViewOffset(t, e, i, r, s, n) {
      this.aspect = t / e, null === this.view && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = n, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const t = this.near;
      let e = t * Math.tan(0.5 * DEG2RAD * this.fov) / this.zoom, i = 2 * e, r = this.aspect * i, s = -0.5 * r;
      const n = this.view;
      if (null !== this.view && this.view.enabled) {
        const t2 = n.fullWidth, a2 = n.fullHeight;
        s += n.offsetX * r / t2, e -= n.offsetY * i / a2, r *= n.width / t2, i *= n.height / a2;
      }
      const a = this.filmOffset;
      0 !== a && (s += t * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, e, e - i, t, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
    }
  };
  var OrthographicCamera = class extends Camera {
    constructor(t = -1, e = 1, i = 1, r = -1, s = 0.1, n = 2e3) {
      super(), this.isOrthographicCamera = true, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = i, this.bottom = r, this.near = s, this.far = n, this.updateProjectionMatrix();
    }
    copy(t, e) {
      return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this;
    }
    setViewOffset(t, e, i, r, s, n) {
      null === this.view && (this.view = { enabled: true, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = true, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = n, this.updateProjectionMatrix();
    }
    clearViewOffset() {
      null !== this.view && (this.view.enabled = false), this.updateProjectionMatrix();
    }
    updateProjectionMatrix() {
      const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
      let s = i - t, n = i + t, a = r + e, o = r - e;
      if (null !== this.view && this.view.enabled) {
        const t2 = (this.right - this.left) / this.view.fullWidth / this.zoom, e2 = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
        s += t2 * this.view.offsetX, n = s + t2 * this.view.width, a -= e2 * this.view.offsetY, o = a - e2 * this.view.height;
      }
      this.projectionMatrix.makeOrthographic(s, n, a, o, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
    }
    toJSON(t) {
      const e = super.toJSON(t);
      return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e;
    }
  };
  var _eyeRight = new Matrix4();
  var _eyeLeft = new Matrix4();
  var _projectionMatrix = new Matrix4();
  var CubeCamera = class extends Object3D {
    constructor(t, e, i) {
      super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
      const r = new PerspectiveCamera(-90, 1, t, e);
      r.layers = this.layers, this.add(r);
      const s = new PerspectiveCamera(-90, 1, t, e);
      s.layers = this.layers, this.add(s);
      const n = new PerspectiveCamera(-90, 1, t, e);
      n.layers = this.layers, this.add(n);
      const a = new PerspectiveCamera(-90, 1, t, e);
      a.layers = this.layers, this.add(a);
      const o = new PerspectiveCamera(-90, 1, t, e);
      o.layers = this.layers, this.add(o);
      const h = new PerspectiveCamera(-90, 1, t, e);
      h.layers = this.layers, this.add(h);
    }
    updateCoordinateSystem() {
      const t = this.coordinateSystem, e = this.children.concat(), [i, r, s, n, a, o] = e;
      for (const t2 of e) this.remove(t2);
      if (2e3 === t) i.up.set(0, 1, 0), i.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), n.up.set(0, 0, 1), n.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);
      else {
        if (2001 !== t) throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
        i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), n.up.set(0, 0, -1), n.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
      }
      for (const t2 of e) this.add(t2), t2.updateMatrixWorld();
    }
    update(t, e) {
      null === this.parent && this.updateMatrixWorld();
      const { renderTarget: i, activeMipmapLevel: r } = this;
      this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
      const [s, n, a, o, h, l] = this.children, c = t.getRenderTarget(), u = t.getActiveCubeFace(), p = t.getActiveMipmapLevel(), d = t.xr.enabled;
      t.xr.enabled = false;
      const m = i.texture.generateMipmaps;
      i.texture.generateMipmaps = false;
      let y = false;
      y = true === t.isWebGLRenderer ? t.state.buffers.depth.getReversed() : t.reversedDepthBuffer, t.setRenderTarget(i, 0, r), y && false === t.autoClear && t.clearDepth(), t.render(e, s), t.setRenderTarget(i, 1, r), y && false === t.autoClear && t.clearDepth(), t.render(e, n), t.setRenderTarget(i, 2, r), y && false === t.autoClear && t.clearDepth(), t.render(e, a), t.setRenderTarget(i, 3, r), y && false === t.autoClear && t.clearDepth(), t.render(e, o), t.setRenderTarget(i, 4, r), y && false === t.autoClear && t.clearDepth(), t.render(e, h), i.texture.generateMipmaps = m, t.setRenderTarget(i, 5, r), y && false === t.autoClear && t.clearDepth(), t.render(e, l), t.setRenderTarget(c, u, p), t.xr.enabled = d, i.texture.needsPMREMUpdate = true;
    }
  };
  var ArrayCamera = class extends PerspectiveCamera {
    constructor(t = []) {
      super(), this.isArrayCamera = true, this.isMultiViewCamera = false, this.cameras = t;
    }
  };
  var _position$1 = new Vector3();
  var _quaternion$1 = new Quaternion();
  var _scale$1 = new Vector3();
  var _forward = new Vector3();
  var _up = new Vector3();
  var _position = new Vector3();
  var _quaternion = new Quaternion();
  var _scale = new Vector3();
  var _orientation = new Vector3();
  var _reservedRe = new RegExp("[\\[\\]\\.:\\/]", "g");
  var _wordChar = "[^\\[\\]\\.:\\/]";
  var _wordCharOrDot = "[^" + "\\[\\]\\.:\\/".replace("\\.", "") + "]";
  var _directoryRe = /((?:WC+[\/:])*)/.source.replace("WC", _wordChar);
  var _nodeRe = /(WCOD+)?/.source.replace("WCOD", _wordCharOrDot);
  var _objectRe = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", _wordChar);
  var _propertyRe = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", _wordChar);
  var _trackRe = new RegExp("^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + "$");
  var _supportedObjectNames = ["material", "materials", "bones", "map"];
  var Composite = class {
    constructor(t, e, i) {
      const r = i || PropertyBinding.parseTrackName(e);
      this._targetGroup = t, this._bindings = t.subscribe_(e, r);
    }
    getValue(t, e) {
      this.bind();
      const i = this._targetGroup.nCachedObjects_, r = this._bindings[i];
      void 0 !== r && r.getValue(t, e);
    }
    setValue(t, e) {
      const i = this._bindings;
      for (let r = this._targetGroup.nCachedObjects_, s = i.length; r !== s; ++r) i[r].setValue(t, e);
    }
    bind() {
      const t = this._bindings;
      for (let e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].bind();
    }
    unbind() {
      const t = this._bindings;
      for (let e = this._targetGroup.nCachedObjects_, i = t.length; e !== i; ++e) t[e].unbind();
    }
  };
  var PropertyBinding = class _PropertyBinding {
    constructor(t, e, i) {
      this.path = e, this.parsedPath = i || _PropertyBinding.parseTrackName(e), this.node = _PropertyBinding.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
    static create(t, e, i) {
      return t && t.isAnimationObjectGroup ? new _PropertyBinding.Composite(t, e, i) : new _PropertyBinding(t, e, i);
    }
    static sanitizeNodeName(t) {
      return t.replace(/\s/g, "_").replace(_reservedRe, "");
    }
    static parseTrackName(t) {
      const e = _trackRe.exec(t);
      if (null === e) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + t);
      const i = { nodeName: e[2], objectName: e[3], objectIndex: e[4], propertyName: e[5], propertyIndex: e[6] }, r = i.nodeName && i.nodeName.lastIndexOf(".");
      if (void 0 !== r && -1 !== r) {
        const t2 = i.nodeName.substring(r + 1);
        -1 !== _supportedObjectNames.indexOf(t2) && (i.nodeName = i.nodeName.substring(0, r), i.objectName = t2);
      }
      if (null === i.propertyName || 0 === i.propertyName.length) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + t);
      return i;
    }
    static findNode(t, e) {
      if (void 0 === e || "" === e || "." === e || -1 === e || e === t.name || e === t.uuid) return t;
      if (t.skeleton) {
        const i = t.skeleton.getBoneByName(e);
        if (void 0 !== i) return i;
      }
      if (t.children) {
        const i = function(t2) {
          for (let r2 = 0; r2 < t2.length; r2++) {
            const s = t2[r2];
            if (s.name === e || s.uuid === e) return s;
            const n = i(s.children);
            if (n) return n;
          }
          return null;
        }, r = i(t.children);
        if (r) return r;
      }
      return null;
    }
    _getValue_unavailable() {
    }
    _setValue_unavailable() {
    }
    _getValue_direct(t, e) {
      t[e] = this.targetObject[this.propertyName];
    }
    _getValue_array(t, e) {
      const i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) t[e++] = i[r];
    }
    _getValue_arrayElement(t, e) {
      t[e] = this.resolvedProperty[this.propertyIndex];
    }
    _getValue_toArray(t, e) {
      this.resolvedProperty.toArray(t, e);
    }
    _setValue_direct(t, e) {
      this.targetObject[this.propertyName] = t[e];
    }
    _setValue_direct_setNeedsUpdate(t, e) {
      this.targetObject[this.propertyName] = t[e], this.targetObject.needsUpdate = true;
    }
    _setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
      this.targetObject[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_array(t, e) {
      const i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[e++];
    }
    _setValue_array_setNeedsUpdate(t, e) {
      const i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[e++];
      this.targetObject.needsUpdate = true;
    }
    _setValue_array_setMatrixWorldNeedsUpdate(t, e) {
      const i = this.resolvedProperty;
      for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[e++];
      this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_arrayElement(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e];
    }
    _setValue_arrayElement_setNeedsUpdate(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = true;
    }
    _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
      this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _setValue_fromArray(t, e) {
      this.resolvedProperty.fromArray(t, e);
    }
    _setValue_fromArray_setNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = true;
    }
    _setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
      this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = true;
    }
    _getValue_unbound(t, e) {
      this.bind(), this.getValue(t, e);
    }
    _setValue_unbound(t, e) {
      this.bind(), this.setValue(t, e);
    }
    bind() {
      let t = this.node;
      const e = this.parsedPath, i = e.objectName, r = e.propertyName;
      let s = e.propertyIndex;
      if (t || (t = _PropertyBinding.findNode(this.rootNode, e.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) return void warn("PropertyBinding: No target node found for track: " + this.path + ".");
      if (i) {
        let r2 = e.objectIndex;
        switch (i) {
          case "materials":
            if (!t.material) return void error("PropertyBinding: Can not bind to material as node does not have a material.", this);
            if (!t.material.materials) return void error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            t = t.material.materials;
            break;
          case "bones":
            if (!t.skeleton) return void error("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            t = t.skeleton.bones;
            for (let e2 = 0; e2 < t.length; e2++) if (t[e2].name === r2) {
              r2 = e2;
              break;
            }
            break;
          case "map":
            if ("map" in t) {
              t = t.map;
              break;
            }
            if (!t.material) return void error("PropertyBinding: Can not bind to material as node does not have a material.", this);
            if (!t.material.map) return void error("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            t = t.material.map;
            break;
          default:
            if (void 0 === t[i]) return void error("PropertyBinding: Can not bind to objectName of node undefined.", this);
            t = t[i];
        }
        if (void 0 !== r2) {
          if (void 0 === t[r2]) return void error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          t = t[r2];
        }
      }
      const n = t[r];
      if (void 0 === n) {
        return void error("PropertyBinding: Trying to update property for track: " + e.nodeName + "." + r + " but it wasn't found.", t);
      }
      let a = this.Versioning.None;
      this.targetObject = t, true === t.isMaterial ? a = this.Versioning.NeedsUpdate : true === t.isObject3D && (a = this.Versioning.MatrixWorldNeedsUpdate);
      let o = this.BindingType.Direct;
      if (void 0 !== s) {
        if ("morphTargetInfluences" === r) {
          if (!t.geometry) return void error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          if (!t.geometry.morphAttributes) return void error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          void 0 !== t.morphTargetDictionary[s] && (s = t.morphTargetDictionary[s]);
        }
        o = this.BindingType.ArrayElement, this.resolvedProperty = n, this.propertyIndex = s;
      } else void 0 !== n.fromArray && void 0 !== n.toArray ? (o = this.BindingType.HasFromToArray, this.resolvedProperty = n) : Array.isArray(n) ? (o = this.BindingType.EntireArray, this.resolvedProperty = n) : this.propertyName = r;
      this.getValue = this.GetterByBindingType[o], this.setValue = this.SetterByBindingTypeAndVersioning[o][a];
    }
    unbind() {
      this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
    }
  };
  PropertyBinding.Composite = Composite, PropertyBinding.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 }, PropertyBinding.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 }, PropertyBinding.prototype.GetterByBindingType = [PropertyBinding.prototype._getValue_direct, PropertyBinding.prototype._getValue_array, PropertyBinding.prototype._getValue_arrayElement, PropertyBinding.prototype._getValue_toArray], PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [[PropertyBinding.prototype._setValue_direct, PropertyBinding.prototype._setValue_direct_setNeedsUpdate, PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_array, PropertyBinding.prototype._setValue_array_setNeedsUpdate, PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_arrayElement, PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate, PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_fromArray, PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate, PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
  var _controlInterpolantsResultBuffer = new Float32Array(1);
  var _matrix = new Matrix4();
  var _Matrix2 = class _Matrix2 {
    constructor(t, e, i, r) {
      this.elements = [1, 0, 0, 1], void 0 !== t && this.set(t, e, i, r);
    }
    identity() {
      return this.set(1, 0, 0, 1), this;
    }
    fromArray(t, e = 0) {
      for (let i = 0; i < 4; i++) this.elements[i] = t[i + e];
      return this;
    }
    set(t, e, i, r) {
      const s = this.elements;
      return s[0] = t, s[2] = e, s[1] = i, s[3] = r, this;
    }
  };
  _Matrix2.prototype.isMatrix2 = true;
  var Matrix2 = _Matrix2;
  var _vector$4 = new Vector2();
  var _startP = new Vector3();
  var _startEnd = new Vector3();
  var _d1 = new Vector3();
  var _d2 = new Vector3();
  var _r = new Vector3();
  var _c1 = new Vector3();
  var _c2 = new Vector3();
  var _vector$3 = new Vector3();
  var _vector$2 = new Vector3();
  var _boneMatrix = new Matrix4();
  var _matrixWorldInv = new Matrix4();
  var _vector$1 = new Vector3();
  var _color1 = new Color();
  var _color2 = new Color();
  var _v1 = new Vector3();
  var _v2 = new Vector3();
  var _v3 = new Vector3();
  var _vector = new Vector3();
  var _camera = new Camera();
  var _box = new Box3();
  var _axis = new Vector3();
  function getByteLength(t, e, i, r) {
    const s = getTextureTypeByteLength(r);
    switch (i) {
      case 1021:
        return t * e;
      case 1028:
      case 1029:
        return t * e / s.components * s.byteLength;
      case 1030:
      case 1031:
        return t * e * 2 / s.components * s.byteLength;
      case 1022:
        return t * e * 3 / s.components * s.byteLength;
      case 1023:
      case 1033:
        return t * e * 4 / s.components * s.byteLength;
      case 33776:
      case 33777:
      case 36196:
      case 37492:
      case 37488:
      case 37489:
        return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 8;
      case 33778:
      case 33779:
      case 37496:
      case 37490:
      case 37491:
      case 37808:
        return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 16;
      case 35841:
      case 35843:
        return Math.max(t, 16) * Math.max(e, 8) / 4;
      case 35840:
      case 35842:
        return Math.max(t, 8) * Math.max(e, 8) / 2;
      case 37809:
        return Math.floor((t + 4) / 5) * Math.floor((e + 3) / 4) * 16;
      case 37810:
        return Math.floor((t + 4) / 5) * Math.floor((e + 4) / 5) * 16;
      case 37811:
        return Math.floor((t + 5) / 6) * Math.floor((e + 4) / 5) * 16;
      case 37812:
        return Math.floor((t + 5) / 6) * Math.floor((e + 5) / 6) * 16;
      case 37813:
        return Math.floor((t + 7) / 8) * Math.floor((e + 4) / 5) * 16;
      case 37814:
        return Math.floor((t + 7) / 8) * Math.floor((e + 5) / 6) * 16;
      case 37815:
        return Math.floor((t + 7) / 8) * Math.floor((e + 7) / 8) * 16;
      case 37816:
        return Math.floor((t + 9) / 10) * Math.floor((e + 4) / 5) * 16;
      case 37817:
        return Math.floor((t + 9) / 10) * Math.floor((e + 5) / 6) * 16;
      case 37818:
        return Math.floor((t + 9) / 10) * Math.floor((e + 7) / 8) * 16;
      case 37819:
        return Math.floor((t + 9) / 10) * Math.floor((e + 9) / 10) * 16;
      case 37820:
        return Math.floor((t + 11) / 12) * Math.floor((e + 9) / 10) * 16;
      case 37821:
        return Math.floor((t + 11) / 12) * Math.floor((e + 11) / 12) * 16;
      case 36492:
      case 36494:
      case 36495:
      case 36285:
      case 36286:
        return Math.ceil(t / 4) * Math.ceil(e / 4) * 16;
      case 36283:
      case 36284:
        return Math.ceil(t / 4) * Math.ceil(e / 4) * 8;
    }
    throw new Error(`Unable to determine texture byte length for ${i} format.`);
  }
  function getTextureTypeByteLength(t) {
    switch (t) {
      case 1009:
      case 1010:
        return { byteLength: 1, components: 1 };
      case 1012:
      case 1011:
      case 1016:
        return { byteLength: 2, components: 1 };
      case 1017:
      case 1018:
        return { byteLength: 2, components: 4 };
      case 1014:
      case 1013:
      case 1015:
        return { byteLength: 4, components: 1 };
      case 35902:
      case 35899:
        return { byteLength: 4, components: 3 };
    }
    throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`);
  }
  "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "186" } })), "undefined" != typeof window && (window.__THREE__ ? warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "186");

  // source/js/three.module.min.js
  /**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   */
  function WebGLAnimation() {
    let e = null, t = false, n = null, r = null;
    function a(t2, i) {
      r = e.requestAnimationFrame(a), n(t2, i);
    }
    return { start: function() {
      true !== t && null !== n && null !== e && (r = e.requestAnimationFrame(a), t = true);
    }, stop: function() {
      null !== e && e.cancelAnimationFrame(r), t = false;
    }, setAnimationLoop: function(e2) {
      n = e2;
    }, setContext: function(t2) {
      e = t2;
    } };
  }
  function WebGLAttributes(e) {
    const t = /* @__PURE__ */ new WeakMap();
    return { get: function(e2) {
      return e2.isInterleavedBufferAttribute && (e2 = e2.data), t.get(e2);
    }, remove: function(n) {
      n.isInterleavedBufferAttribute && (n = n.data);
      const r = t.get(n);
      r && (e.deleteBuffer(r.buffer), t.delete(n));
    }, update: function(n, r) {
      if (n.isInterleavedBufferAttribute && (n = n.data), n.isGLBufferAttribute) {
        const e2 = t.get(n);
        return void ((!e2 || e2.version < n.version) && t.set(n, { buffer: n.buffer, type: n.type, bytesPerElement: n.elementSize, version: n.version }));
      }
      const a = t.get(n);
      if (void 0 === a) t.set(n, (function(t2, n2) {
        const r2 = t2.array, a2 = t2.usage, i = r2.byteLength, o = e.createBuffer();
        let s;
        if (e.bindBuffer(n2, o), e.bufferData(n2, r2, a2), t2.onUploadCallback(), r2 instanceof Float32Array) s = e.FLOAT;
        else if ("undefined" != typeof Float16Array && r2 instanceof Float16Array) s = e.HALF_FLOAT;
        else if (r2 instanceof Uint16Array) s = t2.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
        else if (r2 instanceof Int16Array) s = e.SHORT;
        else if (r2 instanceof Uint32Array) s = e.UNSIGNED_INT;
        else if (r2 instanceof Int32Array) s = e.INT;
        else if (r2 instanceof Int8Array) s = e.BYTE;
        else if (r2 instanceof Uint8Array) s = e.UNSIGNED_BYTE;
        else {
          if (!(r2 instanceof Uint8ClampedArray)) throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r2);
          s = e.UNSIGNED_BYTE;
        }
        return { buffer: o, type: s, bytesPerElement: r2.BYTES_PER_ELEMENT, version: t2.version, size: i };
      })(n, r));
      else if (a.version < n.version) {
        if (a.size !== n.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
        !(function(t2, n2, r2) {
          const a2 = n2.array, i = n2.updateRanges;
          if (e.bindBuffer(r2, t2), 0 === i.length) e.bufferSubData(r2, 0, a2);
          else {
            i.sort((e2, t4) => e2.start - t4.start);
            let t3 = 0;
            for (let e2 = 1; e2 < i.length; e2++) {
              const n3 = i[t3], r3 = i[e2];
              r3.start <= n3.start + n3.count + 1 ? n3.count = Math.max(n3.count, r3.start + r3.count - n3.start) : (++t3, i[t3] = r3);
            }
            i.length = t3 + 1;
            for (let t4 = 0, n3 = i.length; t4 < n3; t4++) {
              const n4 = i[t4];
              e.bufferSubData(r2, n4.start * a2.BYTES_PER_ELEMENT, a2, n4.start, n4.count);
            }
            n2.clearUpdateRanges();
          }
          n2.onUploadCallback();
        })(a.buffer, n, r), a.version = n.version;
      }
    } };
  }
  var alphahash_fragment = "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif";
  var alphahash_pars_fragment = "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif";
  var alphamap_fragment = "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif";
  var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif";
  var alphatest_fragment = "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif";
  var alphatest_pars_fragment = "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif";
  var aomap_fragment = "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif";
  var aomap_pars_fragment = "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif";
  var batching_pars_vertex = "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif";
  var batching_vertex = "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif";
  var begin_vertex = "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif";
  var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif";
  var bsdfs = "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated";
  var iridescence_fragment = "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif";
  var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif";
  var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif";
  var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";
  var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif";
  var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif";
  var color_fragment = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif";
  var color_pars_fragment = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif";
  var color_pars_vertex = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif";
  var color_vertex = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif";
  var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated";
  var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif";
  var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif";
  var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif";
  var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif";
  var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif";
  var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif";
  var colorspace_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";
  var colorspace_pars_fragment = "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}";
  var envmap_fragment = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif";
  var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n#endif";
  var envmap_pars_fragment = "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif";
  var envmap_pars_vertex = "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif";
  var envmap_vertex = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif";
  var fog_vertex = "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif";
  var fog_pars_vertex = "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif";
  var fog_fragment = "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";
  var fog_pars_fragment = "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif";
  var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}";
  var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif";
  var lights_lambert_fragment = "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;";
  var lights_lambert_pars_fragment = "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert";
  var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_SUN_LIGHTS > 0\n	struct SunLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];\n	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {\n		light.color = sunLight.color;\n		light.direction = sunLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>";
  var envmap_physical_pars_fragment = "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_RETROREFLECTION\n		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );\n				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );\n				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );\n				return envMapColor.rgb * envMapIntensity;\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n		#ifdef USE_RETROREFLECTION\n			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n				#ifdef ENVMAP_TYPE_CUBE_UV\n					vec3 bentNormal = cross( bitangent, viewDir );\n					bentNormal = normalize( cross( bentNormal, bitangent ) );\n					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n					return getIBLRetroRadiance( viewDir, bentNormal, roughness );\n				#else\n					return vec3( 0.0 );\n				#endif\n			}\n		#endif\n	#endif\n#endif";
  var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";
  var lights_toon_pars_fragment = "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon";
  var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";
  var lights_phong_pars_fragment = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong";
  var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	material.retroreflectivity = retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif";
  var lights_physical_pars_fragment = "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	vec2 dfg;\n	vec3 multiScatteringCompensation;\n	#ifdef USE_RETROREFLECTION\n		float retroreflectivity;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0Dielectric;\n		vec3 iridescenceF0Metallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );\n		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );\n		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;\n	vec3 halfDir = normalize( directLight.direction + geometryViewDir );\n	float dotVH = saturate( dot( geometryViewDir, halfDir ) );\n	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );\n		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );\n		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );\n		F = mix( F, retroF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );\n	#endif\n	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";
  var lights_fragment_begin = "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );\n		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );\n	}\n#endif\n#ifdef STANDARD\n	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );\n	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;\n	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )\n		float EssMs = material.dfg.x + material.dfg.y;\n		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );\n	#endif\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )\n	SunLight sunLight;\n	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {\n		sunLight = sunLights[ i ];\n		getSunLightInfo( sunLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )\n		sunLightShadow = sunLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#ifdef USE_LIGHT_PROBES_GRID\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif";
  var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_RETROREFLECTION\n		#ifdef USE_ANISOTROPY\n			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n		#else\n			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );\n		#endif\n		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );\n	#endif\n	radiance += iblRadiance;\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif";
  var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif";
  var lightprobes_pars_fragment = "#ifdef USE_LIGHT_PROBES_GRID\nuniform highp sampler3D probesSH;\nuniform vec3 probesMin;\nuniform vec3 probesMax;\nuniform vec3 probesResolution;\nvec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 resMinusOne = res - 1.0;\n	vec3 probeSpacing = gridRange / resMinusOne;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );\n	uvw = uvw * resMinusOne / res + 0.5 / res;\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif";
  var logdepthbuf_fragment = "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";
  var logdepthbuf_pars_fragment = "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif";
  var logdepthbuf_pars_vertex = "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif";
  var logdepthbuf_vertex = "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif";
  var map_fragment = "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif";
  var map_pars_fragment = "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif";
  var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";
  var map_particle_pars_fragment = "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif";
  var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif";
  var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif";
  var morphinstance_vertex = "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif";
  var morphcolor_vertex = "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif";
  var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif";
  var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif";
  var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif";
  var normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;";
  var normal_fragment_maps = "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";
  var normal_pars_fragment = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif";
  var normal_pars_vertex = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif";
  var normal_vertex = "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n		#ifdef FLIP_SIDED\n			vBitangent = - vBitangent;\n		#endif\n	#endif\n#endif";
  var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif";
  var clearcoat_normal_fragment_begin = "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif";
  var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif";
  var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif";
  var iridescence_pars_fragment = "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif";
  var opaque_fragment = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );";
  var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}";
  var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif";
  var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";
  var dithering_fragment = "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";
  var dithering_pars_fragment = "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif";
  var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif";
  var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif";
  var shadowmap_pars_fragment = "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		#define SUN_LIGHT_CASCADES 2\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#endif\n		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n		struct SunLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			shadowCoord.z += shadowBias;\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				float radius = shadowRadius * texelSize.x;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		float getSunShadow(\n			#if defined( SHADOWMAP_TYPE_PCF )\n				sampler2DShadow shadowMap,\n			#else\n				sampler2D shadowMap,\n			#endif\n			SunLightShadow sunLightShadow,\n			int shadowIndex\n		) {\n			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );\n			float viewDepth = vSunShadowWorldPosition.w;\n			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;\n			float shadow = 1.0;\n			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {\n				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];\n				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {\n					float cascadeShadow = getShadow(\n						shadowMap,\n						sunLightShadow.shadowMapSize,\n						sunLightShadow.shadowIntensity,\n						sunLightShadow.shadowBias,\n						sunLightShadow.shadowRadius,\n						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition\n					);\n					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );\n				}\n			}\n			return shadow;\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp -= shadowBias;\n			#else\n				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp += shadowBias;\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			vec2 sample0 = vogelDiskSample( 0, 5, phi );\n			vec2 sample1 = vogelDiskSample( 1, 5, phi );\n			vec2 sample2 = vogelDiskSample( 2, 5, phi );\n			vec2 sample3 = vogelDiskSample( 3, 5, phi );\n			vec2 sample4 = vogelDiskSample( 4, 5, phi );\n			shadow = (\n				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )\n			) * 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif";
  var shadowmap_pars_vertex = "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif";
  var shadowmap_vertex = "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );\n		vSunShadowWorldNormal = shadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif";
  var shadowmask_pars_fragment = "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {\n		sunLight = sunLightShadows[ i ];\n		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}";
  var skinbase_vertex = "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";
  var skinning_pars_vertex = "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif";
  var skinning_vertex = "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";
  var skinnormal_vertex = "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif";
  var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif";
  var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif";
  var tonemapping_fragment = "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";
  var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";
  var transmission_fragment = "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif";
  var transmission_pars_fragment = "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif";
  var uv_pars_fragment = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif";
  var uv_pars_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif";
  var uv_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif";
  var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif";
  var vertex$h = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}";
  var fragment$h = "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$g = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}";
  var fragment$g = "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$f = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}";
  var fragment$f = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$e = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}";
  var fragment$e = "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}";
  var vertex$d = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}";
  var fragment$d = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}";
  var vertex$c = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}";
  var fragment$c = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
  var vertex$b = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}";
  var fragment$b = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
  var vertex$a = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$a = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$9 = "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$9 = "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$8 = "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}";
  var fragment$8 = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$7 = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}";
  var fragment$7 = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}";
  var vertex$6 = "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$6 = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$5 = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}";
  var fragment$5 = "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	uniform float retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$4 = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$4 = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
  var vertex$3 = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}";
  var fragment$3 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
  var vertex$2 = "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
  var fragment$2 = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
  var vertex$1 = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}";
  var fragment$1 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}";
  var ShaderChunk = { alphahash_fragment, alphahash_pars_fragment, alphamap_fragment, alphamap_pars_fragment, alphatest_fragment, alphatest_pars_fragment, aomap_fragment, aomap_pars_fragment, batching_pars_vertex, batching_vertex, begin_vertex, beginnormal_vertex, bsdfs, iridescence_fragment, bumpmap_pars_fragment, clipping_planes_fragment, clipping_planes_pars_fragment, clipping_planes_pars_vertex, clipping_planes_vertex, color_fragment, color_pars_fragment, color_pars_vertex, color_vertex, common, cube_uv_reflection_fragment, defaultnormal_vertex, displacementmap_pars_vertex, displacementmap_vertex, emissivemap_fragment, emissivemap_pars_fragment, colorspace_fragment, colorspace_pars_fragment, envmap_fragment, envmap_common_pars_fragment, envmap_pars_fragment, envmap_pars_vertex, envmap_physical_pars_fragment, envmap_vertex, fog_vertex, fog_pars_vertex, fog_fragment, fog_pars_fragment, gradientmap_pars_fragment, lightmap_pars_fragment, lights_lambert_fragment, lights_lambert_pars_fragment, lights_pars_begin, lights_toon_fragment, lights_toon_pars_fragment, lights_phong_fragment, lights_phong_pars_fragment, lights_physical_fragment, lights_physical_pars_fragment, lights_fragment_begin, lights_fragment_maps, lights_fragment_end, lightprobes_pars_fragment, logdepthbuf_fragment, logdepthbuf_pars_fragment, logdepthbuf_pars_vertex, logdepthbuf_vertex, map_fragment, map_pars_fragment, map_particle_fragment, map_particle_pars_fragment, metalnessmap_fragment, metalnessmap_pars_fragment, morphinstance_vertex, morphcolor_vertex, morphnormal_vertex, morphtarget_pars_vertex, morphtarget_vertex, normal_fragment_begin, normal_fragment_maps, normal_pars_fragment, normal_pars_vertex, normal_vertex, normalmap_pars_fragment, clearcoat_normal_fragment_begin, clearcoat_normal_fragment_maps, clearcoat_pars_fragment, iridescence_pars_fragment, opaque_fragment, packing, premultiplied_alpha_fragment, project_vertex, dithering_fragment, dithering_pars_fragment, roughnessmap_fragment, roughnessmap_pars_fragment, shadowmap_pars_fragment, shadowmap_pars_vertex, shadowmap_vertex, shadowmask_pars_fragment, skinbase_vertex, skinning_pars_vertex, skinning_vertex, skinnormal_vertex, specularmap_fragment, specularmap_pars_fragment, tonemapping_fragment, tonemapping_pars_fragment, transmission_fragment, transmission_pars_fragment, uv_pars_fragment, uv_pars_vertex, uv_vertex, worldpos_vertex, background_vert: vertex$h, background_frag: fragment$h, backgroundCube_vert: vertex$g, backgroundCube_frag: fragment$g, cube_vert: vertex$f, cube_frag: fragment$f, depth_vert: vertex$e, depth_frag: fragment$e, distance_vert: vertex$d, distance_frag: fragment$d, equirect_vert: vertex$c, equirect_frag: fragment$c, linedashed_vert: vertex$b, linedashed_frag: fragment$b, meshbasic_vert: vertex$a, meshbasic_frag: fragment$a, meshlambert_vert: vertex$9, meshlambert_frag: fragment$9, meshmatcap_vert: vertex$8, meshmatcap_frag: fragment$8, meshnormal_vert: vertex$7, meshnormal_frag: fragment$7, meshphong_vert: vertex$6, meshphong_frag: fragment$6, meshphysical_vert: vertex$5, meshphysical_frag: fragment$5, meshtoon_vert: vertex$4, meshtoon_frag: fragment$4, points_vert: vertex$3, points_frag: fragment$3, shadow_vert: vertex$2, shadow_frag: fragment$2, sprite_vert: vertex$1, sprite_frag: fragment$1 };
  var UniformsLib = { common: { diffuse: { value: new Color(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new Matrix3() }, alphaMap: { value: null }, alphaMapTransform: { value: new Matrix3() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new Matrix3() } }, envmap: { envMap: { value: null }, envMapRotation: { value: new Matrix3() }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 }, dfgLUT: { value: null } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new Matrix3() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new Matrix3() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new Matrix3() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new Matrix3() }, normalScale: { value: new Vector2(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new Matrix3() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new Matrix3() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new Matrix3() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new Matrix3() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Color(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, sunLights: { value: [], properties: { direction: {}, color: {} } }, sunLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, sunShadowMatrix: { value: [] }, sunShadowCascade: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null }, probesSH: { value: null }, probesMin: { value: new Vector3() }, probesMax: { value: new Vector3() }, probesResolution: { value: new Vector3() } }, points: { diffuse: { value: new Color(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new Matrix3() }, alphaTest: { value: 0 }, uvTransform: { value: new Matrix3() } }, sprite: { diffuse: { value: new Color(16777215) }, opacity: { value: 1 }, center: { value: new Vector2(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new Matrix3() }, alphaMap: { value: null }, alphaMapTransform: { value: new Matrix3() }, alphaTest: { value: 0 } } };
  var ShaderLib = { basic: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.fog]), vertexShader: ShaderChunk.meshbasic_vert, fragmentShader: ShaderChunk.meshbasic_frag }, lambert: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, { emissive: { value: new Color(0) }, envMapIntensity: { value: 1 } }]), vertexShader: ShaderChunk.meshlambert_vert, fragmentShader: ShaderChunk.meshlambert_frag }, phong: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, { emissive: { value: new Color(0) }, specular: { value: new Color(1118481) }, shininess: { value: 30 }, envMapIntensity: { value: 1 } }]), vertexShader: ShaderChunk.meshphong_vert, fragmentShader: ShaderChunk.meshphong_frag }, standard: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.roughnessmap, UniformsLib.metalnessmap, UniformsLib.fog, UniformsLib.lights, { emissive: { value: new Color(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: ShaderChunk.meshphysical_vert, fragmentShader: ShaderChunk.meshphysical_frag }, toon: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.gradientmap, UniformsLib.fog, UniformsLib.lights, { emissive: { value: new Color(0) } }]), vertexShader: ShaderChunk.meshtoon_vert, fragmentShader: ShaderChunk.meshtoon_frag }, matcap: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, { matcap: { value: null } }]), vertexShader: ShaderChunk.meshmatcap_vert, fragmentShader: ShaderChunk.meshmatcap_frag }, points: { uniforms: mergeUniforms([UniformsLib.points, UniformsLib.fog]), vertexShader: ShaderChunk.points_vert, fragmentShader: ShaderChunk.points_frag }, dashed: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: ShaderChunk.linedashed_vert, fragmentShader: ShaderChunk.linedashed_frag }, depth: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap]), vertexShader: ShaderChunk.depth_vert, fragmentShader: ShaderChunk.depth_frag }, normal: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, { opacity: { value: 1 } }]), vertexShader: ShaderChunk.meshnormal_vert, fragmentShader: ShaderChunk.meshnormal_frag }, sprite: { uniforms: mergeUniforms([UniformsLib.sprite, UniformsLib.fog]), vertexShader: ShaderChunk.sprite_vert, fragmentShader: ShaderChunk.sprite_frag }, background: { uniforms: { uvTransform: { value: new Matrix3() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: ShaderChunk.background_vert, fragmentShader: ShaderChunk.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new Matrix3() } }, vertexShader: ShaderChunk.backgroundCube_vert, fragmentShader: ShaderChunk.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: ShaderChunk.cube_vert, fragmentShader: ShaderChunk.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: ShaderChunk.equirect_vert, fragmentShader: ShaderChunk.equirect_frag }, distance: { uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap, { referencePosition: { value: new Vector3() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: ShaderChunk.distance_vert, fragmentShader: ShaderChunk.distance_frag }, shadow: { uniforms: mergeUniforms([UniformsLib.lights, UniformsLib.fog, { color: { value: new Color(0) }, opacity: { value: 1 } }]), vertexShader: ShaderChunk.shadow_vert, fragmentShader: ShaderChunk.shadow_frag } };
  ShaderLib.physical = { uniforms: mergeUniforms([ShaderLib.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new Matrix3() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new Matrix3() }, clearcoatNormalScale: { value: new Vector2(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new Matrix3() }, dispersion: { value: 0 }, retroreflectivity: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new Matrix3() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new Matrix3() }, sheen: { value: 0 }, sheenColor: { value: new Color(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new Matrix3() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new Matrix3() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new Matrix3() }, transmissionSamplerSize: { value: new Vector2() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new Matrix3() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Color(0) }, specularColor: { value: new Color(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new Matrix3() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new Matrix3() }, anisotropyVector: { value: new Vector2() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new Matrix3() } }]), vertexShader: ShaderChunk.meshphysical_vert, fragmentShader: ShaderChunk.meshphysical_frag };
  var _rgb = { r: 0, b: 0, g: 0 };
  var _m1$12 = new Matrix4();
  var _m$1 = new Matrix3();
  function WebGLBackground(e, t, n, r, a, i) {
    const o = new Color(0);
    let s, l, c = true === a ? 0 : 1, d = null, u = 0, f = null;
    function p(e2) {
      let n2 = true === e2.isScene ? e2.background : null;
      if (n2 && n2.isTexture) {
        const r2 = e2.backgroundBlurriness > 0;
        n2 = t.get(n2, r2);
      }
      return n2;
    }
    function m(t2, r2) {
      t2.getRGB(_rgb, getUnlitUniformColorSpace(e)), n.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, r2, i);
    }
    return { getClearColor: function() {
      return o;
    }, setClearColor: function(e2, t2 = 1) {
      o.set(e2), c = t2, m(o, c);
    }, getClearAlpha: function() {
      return c;
    }, setClearAlpha: function(e2) {
      c = e2, m(o, c);
    }, render: function(t2) {
      let r2 = false;
      const a2 = p(t2);
      null === a2 ? m(o, c) : a2 && a2.isColor && (m(a2, 1), r2 = true);
      const s2 = e.xr.getEnvironmentBlendMode();
      "additive" === s2 ? n.buffers.color.setClear(0, 0, 0, 1, i) : "alpha-blend" === s2 && n.buffers.color.setClear(0, 0, 0, 0, i), (e.autoClear || r2) && (n.buffers.depth.setTest(true), n.buffers.depth.setMask(true), n.buffers.color.setMask(true), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
    }, addToRenderList: function(t2, n2) {
      const a2 = p(n2);
      a2 && (a2.isCubeTexture || a2.mapping === CubeUVReflectionMapping) ? (void 0 === l && (l = new Mesh(new BoxGeometry(1, 1, 1), new ShaderMaterial({ name: "BackgroundCubeMaterial", uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms), vertexShader: ShaderLib.backgroundCube.vertexShader, fragmentShader: ShaderLib.backgroundCube.fragmentShader, side: BackSide, depthTest: false, depthWrite: false, fog: false, allowOverride: false })), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(e2, t3, n3) {
        this.matrixWorld.copyPosition(n3.matrixWorld);
      }, Object.defineProperty(l.material, "envMap", { get: function() {
        return this.uniforms.envMap.value;
      } }), r.update(l)), l.material.uniforms.envMap.value = a2, l.material.uniforms.backgroundBlurriness.value = n2.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n2.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(_m1$12.makeRotationFromEuler(n2.backgroundRotation)).transpose(), a2.isCubeTexture && false === a2.isRenderTargetTexture && l.material.uniforms.backgroundRotation.value.premultiply(_m$1), l.material.toneMapped = ColorManagement.getTransfer(a2.colorSpace) !== SRGBTransfer, d === a2 && u === a2.version && f === e.toneMapping || (l.material.needsUpdate = true, d = a2, u = a2.version, f = e.toneMapping), l.layers.enableAll(), t2.unshift(l, l.geometry, l.material, 0, 0, null)) : a2 && a2.isTexture && (void 0 === s && (s = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({ name: "BackgroundMaterial", uniforms: cloneUniforms(ShaderLib.background.uniforms), vertexShader: ShaderLib.background.vertexShader, fragmentShader: ShaderLib.background.fragmentShader, side: FrontSide, depthTest: false, depthWrite: false, fog: false, allowOverride: false })), s.geometry.deleteAttribute("normal"), Object.defineProperty(s.material, "map", { get: function() {
        return this.uniforms.t2D.value;
      } }), r.update(s)), s.material.uniforms.t2D.value = a2, s.material.uniforms.backgroundIntensity.value = n2.backgroundIntensity, s.material.toneMapped = ColorManagement.getTransfer(a2.colorSpace) !== SRGBTransfer, true === a2.matrixAutoUpdate && a2.updateMatrix(), s.material.uniforms.uvTransform.value.copy(a2.matrix), d === a2 && u === a2.version && f === e.toneMapping || (s.material.needsUpdate = true, d = a2, u = a2.version, f = e.toneMapping), s.layers.enableAll(), t2.unshift(s, s.geometry, s.material, 0, 0, null));
    }, dispose: function() {
      void 0 !== l && (l.geometry.dispose(), l.material.dispose(), l = void 0), void 0 !== s && (s.geometry.dispose(), s.material.dispose(), s = void 0);
    } };
  }
  function WebGLBindingStates(e, t) {
    const n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, a = c(null);
    let i = a, o = false;
    function s(t2) {
      return e.bindVertexArray(t2);
    }
    function l(t2) {
      return e.deleteVertexArray(t2);
    }
    function c(e2) {
      const t2 = [], r2 = [], a2 = [];
      for (let e3 = 0; e3 < n; e3++) t2[e3] = 0, r2[e3] = 0, a2[e3] = 0;
      return { geometry: null, program: null, wireframe: false, newAttributes: t2, enabledAttributes: r2, attributeDivisors: a2, object: e2, attributes: {}, index: null };
    }
    function d() {
      const e2 = i.newAttributes;
      for (let t2 = 0, n2 = e2.length; t2 < n2; t2++) e2[t2] = 0;
    }
    function u(e2) {
      f(e2, 0);
    }
    function f(t2, n2) {
      const r2 = i.newAttributes, a2 = i.enabledAttributes, o2 = i.attributeDivisors;
      r2[t2] = 1, 0 === a2[t2] && (e.enableVertexAttribArray(t2), a2[t2] = 1), o2[t2] !== n2 && (e.vertexAttribDivisor(t2, n2), o2[t2] = n2);
    }
    function p() {
      const t2 = i.newAttributes, n2 = i.enabledAttributes;
      for (let r2 = 0, a2 = n2.length; r2 < a2; r2++) n2[r2] !== t2[r2] && (e.disableVertexAttribArray(r2), n2[r2] = 0);
    }
    function m(t2, n2, r2, a2, i2, o2, s2) {
      true === s2 ? e.vertexAttribIPointer(t2, n2, r2, i2, o2) : e.vertexAttribPointer(t2, n2, r2, a2, i2, o2);
    }
    function _() {
      h(), o = true, i !== a && (i = a, s(i.object));
    }
    function h() {
      a.geometry = null, a.program = null, a.wireframe = false;
    }
    return { setup: function(n2, a2, l2, _2, h2) {
      let g = false;
      const v = (function(t2, n3, a3, i2) {
        const o2 = true === i2.wireframe;
        let s2 = r[n3.id];
        void 0 === s2 && (s2 = {}, r[n3.id] = s2);
        const l3 = true === t2.isInstancedMesh ? t2.id : 0;
        let d2 = s2[l3];
        void 0 === d2 && (d2 = {}, s2[l3] = d2);
        let u2 = d2[a3.id];
        void 0 === u2 && (u2 = {}, d2[a3.id] = u2);
        let f2 = u2[o2];
        void 0 === f2 && (f2 = c(e.createVertexArray()), u2[o2] = f2);
        return f2;
      })(n2, _2, l2, a2);
      i !== v && (i = v, s(i.object)), g = (function(e2, t2, n3, r2) {
        const a3 = i.attributes, o2 = t2.attributes;
        let s2 = 0;
        const l3 = n3.getAttributes();
        for (const t3 in l3) {
          if (l3[t3].location >= 0) {
            const n4 = a3[t3];
            let r3 = o2[t3];
            if (void 0 === r3 && ("instanceMatrix" === t3 && e2.instanceMatrix && (r3 = e2.instanceMatrix), "instanceColor" === t3 && e2.instanceColor && (r3 = e2.instanceColor)), void 0 === n4) return true;
            if (n4.attribute !== r3) return true;
            if (r3 && n4.data !== r3.data) return true;
            s2++;
          }
        }
        return i.attributesNum !== s2 || i.index !== r2;
      })(n2, _2, l2, h2), g && (function(e2, t2, n3, r2) {
        const a3 = {}, o2 = t2.attributes;
        let s2 = 0;
        const l3 = n3.getAttributes();
        for (const t3 in l3) {
          if (l3[t3].location >= 0) {
            let n4 = o2[t3];
            void 0 === n4 && ("instanceMatrix" === t3 && e2.instanceMatrix && (n4 = e2.instanceMatrix), "instanceColor" === t3 && e2.instanceColor && (n4 = e2.instanceColor));
            const r3 = {};
            r3.attribute = n4, n4 && n4.data && (r3.data = n4.data), a3[t3] = r3, s2++;
          }
        }
        i.attributes = a3, i.attributesNum = s2, i.index = r2;
      })(n2, _2, l2, h2), null !== h2 && t.update(h2, e.ELEMENT_ARRAY_BUFFER), (g || o) && (o = false, (function(n3, r2, a3, i2) {
        d();
        const o2 = i2.attributes, s2 = a3.getAttributes(), l3 = r2.defaultAttributeValues;
        for (const r3 in s2) {
          const a4 = s2[r3];
          if (a4.location >= 0) {
            let s3 = o2[r3];
            if (void 0 === s3 && ("instanceMatrix" === r3 && n3.instanceMatrix && (s3 = n3.instanceMatrix), "instanceColor" === r3 && n3.instanceColor && (s3 = n3.instanceColor)), void 0 !== s3) {
              const r4 = s3.normalized, o3 = s3.itemSize, l4 = t.get(s3);
              if (void 0 === l4) continue;
              const c2 = l4.buffer, d2 = l4.type, p2 = l4.bytesPerElement, _3 = d2 === e.INT || d2 === e.UNSIGNED_INT || s3.gpuType === IntType;
              if (s3.isInterleavedBufferAttribute) {
                const t2 = s3.data, l5 = t2.stride, h3 = s3.offset;
                if (t2.isInstancedInterleavedBuffer) {
                  for (let e2 = 0; e2 < a4.locationSize; e2++) f(a4.location + e2, t2.meshPerAttribute);
                  true !== n3.isInstancedMesh && void 0 === i2._maxInstanceCount && (i2._maxInstanceCount = t2.meshPerAttribute * t2.count);
                } else for (let e2 = 0; e2 < a4.locationSize; e2++) u(a4.location + e2);
                e.bindBuffer(e.ARRAY_BUFFER, c2);
                for (let e2 = 0; e2 < a4.locationSize; e2++) m(a4.location + e2, o3 / a4.locationSize, d2, r4, l5 * p2, (h3 + o3 / a4.locationSize * e2) * p2, _3);
              } else {
                if (s3.isInstancedBufferAttribute) {
                  for (let e2 = 0; e2 < a4.locationSize; e2++) f(a4.location + e2, s3.meshPerAttribute);
                  true !== n3.isInstancedMesh && void 0 === i2._maxInstanceCount && (i2._maxInstanceCount = s3.meshPerAttribute * s3.count);
                } else for (let e2 = 0; e2 < a4.locationSize; e2++) u(a4.location + e2);
                e.bindBuffer(e.ARRAY_BUFFER, c2);
                for (let e2 = 0; e2 < a4.locationSize; e2++) m(a4.location + e2, o3 / a4.locationSize, d2, r4, o3 * p2, o3 / a4.locationSize * e2 * p2, _3);
              }
            } else if (void 0 !== l3) {
              const t2 = l3[r3];
              if (void 0 !== t2) switch (t2.length) {
                case 2:
                  e.vertexAttrib2fv(a4.location, t2);
                  break;
                case 3:
                  e.vertexAttrib3fv(a4.location, t2);
                  break;
                case 4:
                  e.vertexAttrib4fv(a4.location, t2);
                  break;
                default:
                  e.vertexAttrib1fv(a4.location, t2);
              }
            }
          }
        }
        p();
      })(n2, a2, l2, _2), null !== h2 && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(h2).buffer));
    }, reset: _, resetDefaultState: h, dispose: function() {
      _();
      for (const e2 in r) {
        const t2 = r[e2];
        for (const e3 in t2) {
          const n2 = t2[e3];
          for (const e4 in n2) {
            const t3 = n2[e4];
            for (const e5 in t3) l(t3[e5].object), delete t3[e5];
            delete n2[e4];
          }
        }
        delete r[e2];
      }
    }, releaseStatesOfGeometry: function(e2) {
      if (void 0 === r[e2.id]) return;
      const t2 = r[e2.id];
      for (const e3 in t2) {
        const n2 = t2[e3];
        for (const e4 in n2) {
          const t3 = n2[e4];
          for (const e5 in t3) l(t3[e5].object), delete t3[e5];
          delete n2[e4];
        }
      }
      delete r[e2.id];
    }, releaseStatesOfObject: function(e2) {
      for (const t2 in r) {
        const n2 = r[t2], a2 = true === e2.isInstancedMesh ? e2.id : 0, i2 = n2[a2];
        if (void 0 !== i2) {
          for (const e3 in i2) {
            const t3 = i2[e3];
            for (const e4 in t3) l(t3[e4].object), delete t3[e4];
            delete i2[e3];
          }
          delete n2[a2], 0 === Object.keys(n2).length && delete r[t2];
        }
      }
    }, releaseStatesOfProgram: function(e2) {
      for (const t2 in r) {
        const n2 = r[t2];
        for (const t3 in n2) {
          const r2 = n2[t3];
          if (void 0 === r2[e2.id]) continue;
          const a2 = r2[e2.id];
          for (const e3 in a2) l(a2[e3].object), delete a2[e3];
          delete r2[e2.id];
        }
      }
    }, initAttributes: d, enableAttribute: u, disableUnusedAttributes: p };
  }
  function WebGLBufferRenderer(e, t, n) {
    let r;
    this.setMode = function(e2) {
      r = e2;
    }, this.render = function(t2, a) {
      e.drawArrays(r, t2, a), n.update(a, r, 1);
    }, this.renderInstances = function(t2, a, i) {
      0 !== i && (e.drawArraysInstanced(r, t2, a, i), n.update(a, r, i));
    }, this.renderMultiDraw = function(e2, a, i) {
      if (0 === i) return;
      t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e2, 0, a, 0, i);
      let o = 0;
      for (let e3 = 0; e3 < i; e3++) o += a[e3];
      n.update(o, r, 1);
    };
  }
  function WebGLCapabilities(e, t, n, r) {
    let a;
    function i(t2) {
      if ("highp" === t2) {
        if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
        t2 = "mediump";
      }
      return "mediump" === t2 && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
    }
    let o = void 0 !== n.precision ? n.precision : "highp";
    const s = i(o);
    s !== o && (warn("WebGLRenderer:", o, "not supported, using", s, "instead."), o = s);
    const l = true === n.logarithmicDepthBuffer, c = true === n.reversedDepthBuffer && t.has("EXT_clip_control");
    true === n.reversedDepthBuffer && false === c && warn("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
    return { isWebGL2: true, getMaxAnisotropy: function() {
      if (void 0 !== a) return a;
      if (true === t.has("EXT_texture_filter_anisotropic")) {
        const n2 = t.get("EXT_texture_filter_anisotropic");
        a = e.getParameter(n2.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else a = 0;
      return a;
    }, getMaxPrecision: i, textureFormatReadable: function(t2) {
      return t2 === RGBAFormat || r.convert(t2) === e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT);
    }, textureTypeReadable: function(n2) {
      const a2 = n2 === HalfFloatType && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
      return !(n2 !== UnsignedByteType && n2 !== FloatType && !a2 && r.convert(n2) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE));
    }, precision: o, logarithmicDepthBuffer: l, reversedDepthBuffer: c, maxTextures: e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), maxVertexTextures: e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), maxTextureSize: e.getParameter(e.MAX_TEXTURE_SIZE), maxCubemapSize: e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), maxAttributes: e.getParameter(e.MAX_VERTEX_ATTRIBS), maxVertexUniforms: e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), maxVaryings: e.getParameter(e.MAX_VARYING_VECTORS), maxFragmentUniforms: e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), maxSamples: e.getParameter(e.MAX_SAMPLES), samples: e.getParameter(e.SAMPLES) };
  }
  function WebGLClipping(e) {
    const t = this;
    let n = null, r = 0, a = false, i = false;
    const o = new Plane(), s = new Matrix3(), l = { value: null, needsUpdate: false };
    function c(e2, n2, r2, a2) {
      const i2 = null !== e2 ? e2.length : 0;
      let c2 = null;
      if (0 !== i2) {
        if (c2 = l.value, true !== a2 || null === c2) {
          const t2 = r2 + 4 * i2, a3 = n2.matrixWorldInverse;
          s.getNormalMatrix(a3), (null === c2 || c2.length < t2) && (c2 = new Float32Array(t2));
          for (let t3 = 0, n3 = r2; t3 !== i2; ++t3, n3 += 4) o.copy(e2[t3]).applyMatrix4(a3, s), o.normal.toArray(c2, n3), c2[n3 + 3] = o.constant;
        }
        l.value = c2, l.needsUpdate = true;
      }
      return t.numPlanes = i2, t.numIntersection = 0, c2;
    }
    this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e2, t2) {
      const n2 = 0 !== e2.length || t2 || 0 !== r || a;
      return a = t2, r = e2.length, n2;
    }, this.beginShadows = function() {
      i = true, c(null);
    }, this.endShadows = function() {
      i = false;
    }, this.setGlobalState = function(e2, t2) {
      n = c(e2, t2, 0);
    }, this.setState = function(o2, s2, d) {
      const u = o2.clippingPlanes, f = o2.clipIntersection, p = o2.clipShadows, m = e.get(o2);
      if (!a || null === u || 0 === u.length || i && !p) i ? c(null) : (function() {
        l.value !== n && (l.value = n, l.needsUpdate = r > 0);
        t.numPlanes = r, t.numIntersection = 0;
      })();
      else {
        const e2 = i ? 0 : r, t2 = 4 * e2;
        let a2 = m.clippingState || null;
        l.value = a2, a2 = c(u, s2, t2, d);
        for (let e3 = 0; e3 !== t2; ++e3) a2[e3] = n[e3];
        m.clippingState = a2, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e2;
      }
    };
  }
  _m$1.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
  var _flatCamera = new OrthographicCamera();
  var _clearColor = new Color();
  var _oldTarget = null;
  var _oldActiveCubeFace = 0;
  var _oldActiveMipmapLevel = 0;
  var _oldXrEnabled = false;
  var _origin = new Vector3();
  var _direction = new Vector3();
  var PMREMGenerator = class {
    constructor(e) {
      this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
    }
    fromScene(e, t = 0, n = 0.1, r = 100, a = {}) {
      const { size: i = 256, position: o = _origin } = a;
      _oldTarget = this._renderer.getRenderTarget(), _oldActiveCubeFace = this._renderer.getActiveCubeFace(), _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel(), _oldXrEnabled = this._renderer.xr.enabled, this._renderer.xr.enabled = false, this._setSize(i);
      const s = this._allocateTargets();
      return s.depthBuffer = true, this._sceneToCubeUV(e, n, r, s, o), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
    }
    fromEquirectangular(e, t = null) {
      return this._fromTexture(e, t);
    }
    fromCubemap(e, t = null) {
      return this._fromTexture(e, t);
    }
    compileCubemapShader() {
      null === this._cubemapMaterial && (this._cubemapMaterial = _getCubemapMaterial(), this._compileMaterial(this._cubemapMaterial));
    }
    compileEquirectangularShader() {
      null === this._equirectMaterial && (this._equirectMaterial = _getEquirectMaterial(), this._compileMaterial(this._equirectMaterial));
    }
    dispose() {
      this._dispose(), null !== this._cubemapMaterial && this._cubemapMaterial.dispose(), null !== this._equirectMaterial && this._equirectMaterial.dispose(), null !== this._backgroundBox && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
    }
    _setSize(e) {
      this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
    }
    _dispose() {
      null !== this._blurMaterial && this._blurMaterial.dispose(), null !== this._ggxMaterial && this._ggxMaterial.dispose(), null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
      for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
    }
    _cleanup(e) {
      this._renderer.setRenderTarget(_oldTarget, _oldActiveCubeFace, _oldActiveMipmapLevel), this._renderer.xr.enabled = _oldXrEnabled, e.scissorTest = false, _setViewport(e, 0, 0, e.width, e.height);
    }
    _fromTexture(e, t) {
      e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping ? this._setSize(0 === e.image.length ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), _oldTarget = this._renderer.getRenderTarget(), _oldActiveCubeFace = this._renderer.getActiveCubeFace(), _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel(), _oldXrEnabled = this._renderer.xr.enabled, this._renderer.xr.enabled = false;
      const n = t || this._allocateTargets();
      return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
    }
    _allocateTargets() {
      const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = { magFilter: LinearFilter, minFilter: LinearFilter, generateMipmaps: false, type: HalfFloatType, format: RGBAFormat, colorSpace: LinearSRGBColorSpace, depthBuffer: false }, r = _createRenderTarget(e, t, n);
      if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
        null !== this._pingPongRenderTarget && this._dispose(), this._pingPongRenderTarget = _createRenderTarget(e, t, n);
        const { _lodMax: r2 } = this;
        ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods } = _createPlanes(r2)), this._blurMaterial = _getBlurShader(r2, e, t), this._ggxMaterial = _getGGXShader(r2, e, t);
      }
      return r;
    }
    _compileMaterial(e) {
      const t = new Mesh(new BufferGeometry(), e);
      this._renderer.compile(t, _flatCamera);
    }
    _sceneToCubeUV(e, t, n, r, a) {
      const i = new PerspectiveCamera(90, 1, t, n), o = [1, -1, 1, 1, 1, 1], s = [1, 1, 1, -1, -1, -1], l = this._renderer, c = l.autoClear, d = l.toneMapping;
      l.getClearColor(_clearColor), l.toneMapping = NoToneMapping, l.autoClear = false;
      l.state.buffers.depth.getReversed() && (l.setRenderTarget(r), l.clearDepth(), l.setRenderTarget(null)), null === this._backgroundBox && (this._backgroundBox = new Mesh(new BoxGeometry(), new MeshBasicMaterial({ name: "PMREM.Background", side: BackSide, depthWrite: false, depthTest: false })));
      const u = this._backgroundBox, f = u.material;
      let p = false;
      const m = e.background;
      m ? m.isColor && (f.color.copy(m), e.background = null, p = true) : (f.color.copy(_clearColor), p = true);
      for (let t2 = 0; t2 < 6; t2++) {
        const n2 = t2 % 3;
        0 === n2 ? (i.up.set(0, o[t2], 0), i.position.set(a.x, a.y, a.z), i.lookAt(a.x + s[t2], a.y, a.z)) : 1 === n2 ? (i.up.set(0, 0, o[t2]), i.position.set(a.x, a.y, a.z), i.lookAt(a.x, a.y + s[t2], a.z)) : (i.up.set(0, o[t2], 0), i.position.set(a.x, a.y, a.z), i.lookAt(a.x, a.y, a.z + s[t2]));
        const c2 = this._cubeSize;
        _setViewport(r, n2 * c2, t2 > 2 ? c2 : 0, c2, c2), l.setRenderTarget(r), p && l.render(u, i), l.render(e, i);
      }
      l.toneMapping = d, l.autoClear = c, e.background = m;
    }
    _textureToCubeUV(e, t) {
      const n = this._renderer, r = e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping;
      r ? (null === this._cubemapMaterial && (this._cubemapMaterial = _getCubemapMaterial()), this._cubemapMaterial.uniforms.flipEnvMap.value = false === e.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = _getEquirectMaterial());
      const a = r ? this._cubemapMaterial : this._equirectMaterial, i = this._lodMeshes[0];
      i.material = a;
      a.uniforms.envMap.value = e;
      const o = this._cubeSize;
      _setViewport(t, 0, 0, 3 * o, 2 * o), n.setRenderTarget(t), n.render(i, _flatCamera);
    }
    _applyPMREM(e) {
      const t = this._renderer, n = t.autoClear;
      t.autoClear = false;
      const r = this._lodMeshes.length;
      for (let t2 = 1; t2 < r; t2++) this._applyGGXFilter(e, t2 - 1, t2);
      t.autoClear = n;
    }
    _applyGGXFilter(e, t, n) {
      const r = this._renderer, a = this._pingPongRenderTarget, i = this._ggxMaterial, o = this._lodMeshes[n];
      o.material = i;
      const s = i.uniforms, l = n / (this._lodMeshes.length - 1), c = t / (this._lodMeshes.length - 1), d = Math.sqrt(l * l - c * c) * (1.25 * l), { _lodMax: u } = this, f = this._sizeLods[n], p = 3 * f * (n > u - 4 ? n - u + 4 : 0), m = 4 * (this._cubeSize - f);
      s.envMap.value = e.texture, s.roughness.value = d, s.mipInt.value = u - t, _setViewport(a, p, m, 3 * f, 2 * f), r.setRenderTarget(a), r.render(o, _flatCamera), s.envMap.value = a.texture, s.roughness.value = 0, s.mipInt.value = u - n, _setViewport(e, p, m, 3 * f, 2 * f), r.setRenderTarget(e), r.render(o, _flatCamera);
    }
    _blur(e, t, n, r) {
      const a = this._pingPongRenderTarget, i = Math.min(r, Math.PI) / Math.SQRT2;
      this._blurPass(e, a, t, n, i), this._blurPass(a, e, n, n, i);
    }
    _blurPass(e, t, n, r, a) {
      const i = this._renderer, o = this._blurMaterial, s = this._lodMeshes[r];
      s.material = o;
      const l = o.uniforms;
      l.envMap.value = e.texture, l.sigma.value = a, l.mipInt.value = this._lodMax - n;
      const c = this._sizeLods[r];
      _setViewport(t, 3 * c * (r > this._lodMax - 4 ? r - this._lodMax + 4 : 0), 4 * (this._cubeSize - c), 3 * c, 2 * c), i.setRenderTarget(t), i.render(s, _flatCamera);
    }
  };
  function _createPlanes(e) {
    const t = [], n = [];
    let r = e;
    const a = e - 4 + 1 + 6;
    for (let e2 = 0; e2 < a; e2++) {
      const e3 = Math.pow(2, r);
      t.push(e3);
      const a2 = 1 / (e3 - 2), i = -a2, o = 1 + a2, s = [i, i, o, i, o, o, i, i, o, o, i, o], l = 6, c = 6, d = 3, u = new Float32Array(d * c * l), f = new Float32Array(d * c * l);
      for (let e4 = 0; e4 < l; e4++) {
        const t2 = e4 % 3 * 2 / 3 - 1, n2 = e4 > 2 ? 0 : -1, r2 = [t2, n2, 0, t2 + 2 / 3, n2, 0, t2 + 2 / 3, n2 + 1, 0, t2, n2, 0, t2 + 2 / 3, n2 + 1, 0, t2, n2 + 1, 0];
        u.set(r2, d * c * e4);
        for (let t3 = 0; t3 < c; t3++) {
          const n3 = 2 * s[2 * t3] - 1, r3 = 2 * s[2 * t3 + 1] - 1;
          0 === e4 ? _direction.set(1, r3, n3) : 1 === e4 ? _direction.set(-n3, 1, -r3) : 2 === e4 ? _direction.set(-n3, r3, 1) : 3 === e4 ? _direction.set(-1, r3, -n3) : 4 === e4 ? _direction.set(-n3, -1, r3) : _direction.set(n3, r3, -1), _direction.toArray(f, (e4 * c + t3) * d);
        }
      }
      const p = new BufferGeometry();
      p.setAttribute("position", new BufferAttribute(u, d)), p.setAttribute("outputDirection", new BufferAttribute(f, d)), n.push(new Mesh(p, null)), r > 4 && r--;
    }
    return { lodMeshes: n, sizeLods: t };
  }
  function _createRenderTarget(e, t, n) {
    const r = new WebGLRenderTarget(e, t, n);
    return r.texture.mapping = CubeUVReflectionMapping, r.texture.name = "PMREM.cubeUv", r.scissorTest = true, r;
  }
  function _setViewport(e, t, n, r, a) {
    e.viewport.set(t, n, r, a), e.scissor.set(t, n, r, a);
  }
  function _getGGXShader(e, t, n) {
    return new ShaderMaterial({ name: "PMREMGGXConvolution", defines: { GGX_SAMPLES: 256, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / n, CUBEUV_MAX_MIP: `${e}.0` }, uniforms: { envMap: { value: null }, roughness: { value: 0 }, mipInt: { value: 0 } }, vertexShader: _getCommonVertexShader(), fragmentShader: '\n\n			precision highp float;\n			precision highp int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform float roughness;\n			uniform float mipInt;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			#define PI 3.14159265359\n\n			// Van der Corput radical inverse\n			float radicalInverse_VdC(uint bits) {\n				bits = (bits << 16u) | (bits >> 16u);\n				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);\n				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);\n				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);\n				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);\n				return float(bits) * 2.3283064365386963e-10; // / 0x100000000\n			}\n\n			// Hammersley sequence\n			vec2 hammersley(uint i, uint N) {\n				return vec2(float(i) / float(N), radicalInverse_VdC(i));\n			}\n\n			// GGX VNDF importance sampling (Eric Heitz 2018)\n			// "Sampling the GGX Distribution of Visible Normals"\n			// https://jcgt.org/published/0007/04/01/\n			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {\n				float alpha = roughness * roughness;\n\n				// Section 4.1: Orthonormal basis\n				vec3 T1 = vec3(1.0, 0.0, 0.0);\n				vec3 T2 = cross(V, T1);\n\n				// Section 4.2: Parameterization of projected area\n				float r = sqrt(Xi.x);\n				float phi = 2.0 * PI * Xi.y;\n				float t1 = r * cos(phi);\n				float t2 = r * sin(phi);\n				float s = 0.5 * (1.0 + V.z);\n				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n\n				// Section 4.3: Reprojection onto hemisphere\n				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;\n\n				// Section 3.4: Transform back to ellipsoid configuration\n				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));\n			}\n\n			void main() {\n				vec3 N = normalize(vOutputDirection);\n				vec3 V = N; // Assume view direction equals normal for pre-filtering\n\n				vec3 prefilteredColor = vec3(0.0);\n				float totalWeight = 0.0;\n\n				// For very low roughness, just sample the environment directly\n				if (roughness < 0.001) {\n					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);\n					return;\n				}\n\n				// Tangent space basis for VNDF sampling\n				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n				vec3 tangent = normalize(cross(up, N));\n				vec3 bitangent = cross(N, tangent);\n\n				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {\n					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));\n\n					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)\n					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);\n\n					// Transform H back to world space\n					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);\n					vec3 L = normalize(2.0 * dot(V, H) * H - V);\n\n					float NdotL = max(dot(N, L), 0.0);\n\n					if(NdotL > 0.0) {\n						// Sample environment at fixed mip level\n						// VNDF importance sampling handles the distribution filtering\n						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);\n\n						// Weight by NdotL for the split-sum approximation\n						// VNDF PDF naturally accounts for the visible microfacet distribution\n						prefilteredColor += sampleColor * NdotL;\n						totalWeight += NdotL;\n					}\n				}\n\n				if (totalWeight > 0.0) {\n					prefilteredColor = prefilteredColor / totalWeight;\n				}\n\n				gl_FragColor = vec4(prefilteredColor, 1.0);\n			}\n		', blending: NoBlending, depthTest: false, depthWrite: false });
  }
  function _getBlurShader(e, t, n) {
    return new ShaderMaterial({ name: "SphericalGaussianBlur", defines: { SAMPLES: 20, CUBEUV_TEXEL_WIDTH: 1 / t, CUBEUV_TEXEL_HEIGHT: 1 / n, CUBEUV_MAX_MIP: `${e}.0` }, uniforms: { envMap: { value: null }, sigma: { value: 0 }, mipInt: { value: 0 } }, vertexShader: _getCommonVertexShader(), fragmentShader: "\n\n			precision highp float;\n			precision highp int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform float sigma;\n			uniform float mipInt;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			#define PI 3.14159265359\n			#define GOLDEN_ANGLE 2.39996322973\n\n			void main() {\n\n				if ( sigma == 0.0 ) {\n\n					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );\n					return;\n\n				}\n\n				vec3 outputDirection = normalize( vOutputDirection );\n\n				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );\n				vec3 tangent = normalize( cross( up, outputDirection ) );\n				vec3 bitangent = cross( outputDirection, tangent );\n\n				// Truncate the kernel at three standard deviations or at the antipode.\n				float thetaMax = min( 3.0 * sigma, PI );\n				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );\n\n				vec3 accumColor = vec3( 0.0 );\n				float accumWeight = 0.0;\n\n				for ( int i = 0; i < SAMPLES; i ++ ) {\n\n					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.\n					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );\n					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );\n					float phi = float( i ) * GOLDEN_ANGLE;\n\n					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;\n					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;\n\n					// Correct the planar sample density to solid angle.\n					float weight = sin( theta ) / theta;\n\n					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );\n					accumWeight += weight;\n\n				}\n\n				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );\n\n			}\n		", blending: NoBlending, depthTest: false, depthWrite: false });
  }
  function _getEquirectMaterial() {
    return new ShaderMaterial({ name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: _getCommonVertexShader(), fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n\n			#include <common>\n\n			void main() {\n\n				vec3 outputDirection = normalize( vOutputDirection );\n				vec2 uv = equirectUv( outputDirection );\n\n				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n			}\n		", blending: NoBlending, depthTest: false, depthWrite: false });
  }
  function _getCubemapMaterial() {
    return new ShaderMaterial({ name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: _getCommonVertexShader(), fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			uniform float flipEnvMap;\n\n			varying vec3 vOutputDirection;\n\n			uniform samplerCube envMap;\n\n			void main() {\n\n				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n			}\n		", blending: NoBlending, depthTest: false, depthWrite: false });
  }
  function _getCommonVertexShader() {
    return "\n\n		precision mediump float;\n		precision mediump int;\n\n		attribute vec3 outputDirection;\n\n		varying vec3 vOutputDirection;\n\n		void main() {\n\n			vOutputDirection = outputDirection;\n			gl_Position = vec4( position, 1.0 );\n\n		}\n	";
  }
  var WebGLCubeRenderTarget = class extends WebGLRenderTarget {
    constructor(e = 1, t = {}) {
      super(e, e, t), this.isWebGLCubeRenderTarget = true;
      const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
      this.texture = new CubeTexture(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = true;
    }
    fromEquirectangularTexture(e, t) {
      this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
      const n = { uniforms: { tEquirect: { value: null } }, vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			", fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			" }, r = new BoxGeometry(5, 5, 5), a = new ShaderMaterial({ name: "CubemapFromEquirect", uniforms: cloneUniforms(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: BackSide, blending: NoBlending });
      a.uniforms.tEquirect.value = t;
      const i = new Mesh(r, a), o = t.minFilter;
      t.minFilter === LinearMipmapLinearFilter && (t.minFilter = LinearFilter);
      return new CubeCamera(1, 10, this).update(e, i), t.minFilter = o, i.geometry.dispose(), i.material.dispose(), this;
    }
    clear(e, t = true, n = true, r = true) {
      const a = e.getRenderTarget();
      for (let a2 = 0; a2 < 6; a2++) e.setRenderTarget(this, a2), e.clear(t, n, r);
      e.setRenderTarget(a);
    }
  };
  function WebGLEnvironments(e) {
    let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = null;
    function a(e2, t2) {
      return t2 === EquirectangularReflectionMapping ? e2.mapping = CubeReflectionMapping : t2 === EquirectangularRefractionMapping && (e2.mapping = CubeRefractionMapping), e2;
    }
    function i(e2) {
      const n2 = e2.target;
      n2.removeEventListener("dispose", i);
      const r2 = t.get(n2);
      void 0 !== r2 && (t.delete(n2), r2.dispose());
    }
    function o(e2) {
      const t2 = e2.target;
      t2.removeEventListener("dispose", o);
      const r2 = n.get(t2);
      void 0 !== r2 && (n.delete(t2), r2.dispose());
    }
    return { get: function(s, l = false) {
      return null == s ? null : l ? (function(t2) {
        if (t2 && t2.isTexture) {
          const a2 = t2.mapping, i2 = a2 === EquirectangularReflectionMapping || a2 === EquirectangularRefractionMapping, s2 = a2 === CubeReflectionMapping || a2 === CubeRefractionMapping;
          if (i2 || s2) {
            let a3 = n.get(t2);
            const l2 = void 0 !== a3 ? a3.texture.pmremVersion : 0;
            if (t2.isRenderTargetTexture && t2.pmremVersion !== l2) return null === r && (r = new PMREMGenerator(e)), a3 = i2 ? r.fromEquirectangular(t2, a3) : r.fromCubemap(t2, a3), a3.texture.pmremVersion = t2.pmremVersion, n.set(t2, a3), a3.texture;
            if (void 0 !== a3) return a3.texture;
            {
              const l3 = t2.image;
              return i2 && l3 && l3.height > 0 || s2 && l3 && (function(e2) {
                let t3 = 0;
                const n2 = 6;
                for (let r2 = 0; r2 < n2; r2++) void 0 !== e2[r2] && t3++;
                return t3 === n2;
              })(l3) ? (null === r && (r = new PMREMGenerator(e)), a3 = i2 ? r.fromEquirectangular(t2) : r.fromCubemap(t2), a3.texture.pmremVersion = t2.pmremVersion, n.set(t2, a3), t2.addEventListener("dispose", o), a3.texture) : null;
            }
          }
        }
        return t2;
      })(s) : (function(n2) {
        if (n2 && n2.isTexture) {
          const r2 = n2.mapping;
          if (r2 === EquirectangularReflectionMapping || r2 === EquirectangularRefractionMapping) {
            if (t.has(n2)) {
              return a(t.get(n2).texture, n2.mapping);
            }
            {
              const r3 = n2.image;
              if (r3 && r3.height > 0) {
                const o2 = new WebGLCubeRenderTarget(r3.height);
                return o2.fromEquirectangularTexture(e, n2), t.set(n2, o2), n2.addEventListener("dispose", i), a(o2.texture, n2.mapping);
              }
              return null;
            }
          }
        }
        return n2;
      })(s);
    }, dispose: function() {
      t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), null !== r && (r.dispose(), r = null);
    } };
  }
  function WebGLExtensions(e) {
    const t = {};
    function n(n2) {
      if (void 0 !== t[n2]) return t[n2];
      const r = e.getExtension(n2);
      return t[n2] = r, r;
    }
    return { has: function(e2) {
      return null !== n(e2);
    }, init: function() {
      n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
    }, get: function(e2) {
      const t2 = n(e2);
      return null === t2 && warnOnce("WebGLRenderer: " + e2 + " extension not supported."), t2;
    } };
  }
  function WebGLGeometries(e, t, n, r) {
    const a = {}, i = /* @__PURE__ */ new WeakMap();
    function o(e2) {
      const s2 = e2.target;
      null !== s2.index && t.remove(s2.index);
      for (const e3 in s2.attributes) t.remove(s2.attributes[e3]);
      s2.removeEventListener("dispose", o), delete a[s2.id];
      const l = i.get(s2);
      l && (t.remove(l), i.delete(s2)), r.releaseStatesOfGeometry(s2), true === s2.isInstancedBufferGeometry && delete s2._maxInstanceCount, n.memory.geometries--;
    }
    function s(e2) {
      const n2 = [], r2 = e2.index, a2 = e2.attributes.position;
      let o2 = 0;
      if (void 0 === a2) return;
      if (null !== r2) {
        const e3 = r2.array;
        o2 = r2.version;
        for (let t2 = 0, r3 = e3.length; t2 < r3; t2 += 3) {
          const r4 = e3[t2 + 0], a3 = e3[t2 + 1], i2 = e3[t2 + 2];
          n2.push(r4, a3, a3, i2, i2, r4);
        }
      } else {
        const e3 = a2.array;
        o2 = a2.version;
        for (let t2 = 0, r3 = e3.length / 3 - 1; t2 < r3; t2 += 3) {
          const e4 = t2 + 0, r4 = t2 + 1, a3 = t2 + 2;
          n2.push(e4, r4, r4, a3, a3, e4);
        }
      }
      const s2 = new (a2.count >= 65535 ? Uint32BufferAttribute : Uint16BufferAttribute)(n2, 1);
      s2.version = o2;
      const l = i.get(e2);
      l && t.remove(l), i.set(e2, s2);
    }
    return { get: function(e2, t2) {
      return true === a[t2.id] || (t2.addEventListener("dispose", o), a[t2.id] = true, n.memory.geometries++), t2;
    }, update: function(n2) {
      const r2 = n2.attributes;
      for (const n3 in r2) t.update(r2[n3], e.ARRAY_BUFFER);
    }, getWireframeAttribute: function(e2) {
      const t2 = i.get(e2);
      if (t2) {
        const n2 = e2.index;
        null !== n2 && t2.version < n2.version && s(e2);
      } else s(e2);
      return i.get(e2);
    } };
  }
  function WebGLIndexedBufferRenderer(e, t, n) {
    let r, a, i;
    this.setMode = function(e2) {
      r = e2;
    }, this.setIndex = function(e2) {
      a = e2.type, i = e2.bytesPerElement;
    }, this.render = function(t2, o) {
      e.drawElements(r, o, a, t2 * i), n.update(o, r, 1);
    }, this.renderInstances = function(t2, o, s) {
      0 !== s && (e.drawElementsInstanced(r, o, a, t2 * i, s), n.update(o, r, s));
    }, this.renderMultiDraw = function(e2, i2, o) {
      if (0 === o) return;
      t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, i2, 0, a, e2, 0, o);
      let s = 0;
      for (let e3 = 0; e3 < o; e3++) s += i2[e3];
      n.update(s, r, 1);
    };
  }
  function WebGLInfo(e) {
    const t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 };
    return { memory: { geometries: 0, textures: 0 }, render: t, programs: null, autoReset: true, reset: function() {
      t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
    }, update: function(n, r, a) {
      switch (t.calls++, r) {
        case e.TRIANGLES:
          t.triangles += a * (n / 3);
          break;
        case e.LINES:
          t.lines += a * (n / 2);
          break;
        case e.LINE_STRIP:
          t.lines += a * (n - 1);
          break;
        case e.LINE_LOOP:
          t.lines += a * n;
          break;
        case e.POINTS:
          t.points += a * n;
          break;
        default:
          error("WebGLInfo: Unknown draw mode:", r);
      }
    } };
  }
  function WebGLMorphtargets(e, t, n) {
    const r = /* @__PURE__ */ new WeakMap(), a = new Vector4();
    return { update: function(i, o, s) {
      const l = i.morphTargetInfluences, c = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = void 0 !== c ? c.length : 0;
      let u = r.get(o);
      if (void 0 === u || u.count !== d) {
        void 0 !== u && u.texture.dispose();
        const e2 = void 0 !== o.morphAttributes.position, n2 = void 0 !== o.morphAttributes.normal, i2 = void 0 !== o.morphAttributes.color, s2 = o.morphAttributes.position || [], l2 = o.morphAttributes.normal || [], c2 = o.morphAttributes.color || [];
        let f = 0;
        true === e2 && (f = 1), true === n2 && (f = 2), true === i2 && (f = 3);
        let p = o.attributes.position.count * f, m = 1;
        p > t.maxTextureSize && (m = Math.ceil(p / t.maxTextureSize), p = t.maxTextureSize);
        const _ = new Float32Array(p * m * 4 * d), h = new DataArrayTexture(_, p, m, d);
        h.type = FloatType, h.needsUpdate = true;
        const g = 4 * f;
        for (let t2 = 0; t2 < d; t2++) {
          const r2 = s2[t2], o2 = l2[t2], d2 = c2[t2], u2 = p * m * 4 * t2;
          for (let t3 = 0; t3 < r2.count; t3++) {
            const s3 = t3 * g;
            true === e2 && (a.fromBufferAttribute(r2, t3), _[u2 + s3 + 0] = a.x, _[u2 + s3 + 1] = a.y, _[u2 + s3 + 2] = a.z, _[u2 + s3 + 3] = 0), true === n2 && (a.fromBufferAttribute(o2, t3), _[u2 + s3 + 4] = a.x, _[u2 + s3 + 5] = a.y, _[u2 + s3 + 6] = a.z, _[u2 + s3 + 7] = 0), true === i2 && (a.fromBufferAttribute(d2, t3), _[u2 + s3 + 8] = a.x, _[u2 + s3 + 9] = a.y, _[u2 + s3 + 10] = a.z, _[u2 + s3 + 11] = 4 === d2.itemSize ? a.w : 1);
          }
        }
        u = { count: d, texture: h, size: new Vector2(p, m) }, r.set(o, u), o.addEventListener("dispose", function e3() {
          h.dispose(), r.delete(o), o.removeEventListener("dispose", e3);
        });
      }
      if (true === i.isInstancedMesh && null !== i.morphTexture) s.getUniforms().setValue(e, "morphTexture", i.morphTexture, n);
      else {
        let t2 = 0;
        for (let e2 = 0; e2 < l.length; e2++) t2 += l[e2];
        const n2 = o.morphTargetsRelative ? 1 : 1 - t2;
        s.getUniforms().setValue(e, "morphTargetBaseInfluence", n2), s.getUniforms().setValue(e, "morphTargetInfluences", l);
      }
      s.getUniforms().setValue(e, "morphTargetsTexture", u.texture, n), s.getUniforms().setValue(e, "morphTargetsTextureSize", u.size);
    } };
  }
  function WebGLObjects(e, t, n, r, a) {
    let i = /* @__PURE__ */ new WeakMap();
    function o(e2) {
      const t2 = e2.target;
      t2.removeEventListener("dispose", o), r.releaseStatesOfObject(t2), n.remove(t2.instanceMatrix), null !== t2.instanceColor && n.remove(t2.instanceColor);
    }
    return { update: function(r2) {
      const s = a.render.frame, l = r2.geometry, c = t.get(r2, l);
      if (i.get(c) !== s && (t.update(c), i.set(c, s)), r2.isInstancedMesh && (false === r2.hasEventListener("dispose", o) && r2.addEventListener("dispose", o), i.get(r2) !== s && (n.update(r2.instanceMatrix, e.ARRAY_BUFFER), null !== r2.instanceColor && n.update(r2.instanceColor, e.ARRAY_BUFFER), i.set(r2, s))), r2.isSkinnedMesh) {
        const e2 = r2.skeleton;
        i.get(e2) !== s && (e2.update(), i.set(e2, s));
      }
      return c;
    }, dispose: function() {
      i = /* @__PURE__ */ new WeakMap();
    } };
  }
  var toneMappingMap = { [LinearToneMapping]: "LINEAR_TONE_MAPPING", [ReinhardToneMapping]: "REINHARD_TONE_MAPPING", [CineonToneMapping]: "CINEON_TONE_MAPPING", [ACESFilmicToneMapping]: "ACES_FILMIC_TONE_MAPPING", [AgXToneMapping]: "AGX_TONE_MAPPING", [NeutralToneMapping]: "NEUTRAL_TONE_MAPPING", [CustomToneMapping]: "CUSTOM_TONE_MAPPING" };
  function WebGLOutput(e, t, n, r, a, i) {
    const o = new WebGLRenderTarget(t, n, { type: e, depthBuffer: a, stencilBuffer: i, samples: r ? 4 : 0, storeMultisampledDepthBuffer: false, storeMultisampledStencilBuffer: false, resolveDepthBuffer: false, resolveStencilBuffer: false });
    let s = null, l = null;
    const c = new BufferGeometry();
    c.setAttribute("position", new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), c.setAttribute("uv", new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
    const d = new RawShaderMaterial({ uniforms: { tDiffuse: { value: null } }, vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}", fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}", depthTest: false, depthWrite: false }), u = new Mesh(c, d), f = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    let p, m = null, _ = null, h = false, g = null, v = [], S = false;
    this.setSize = function(e2, t2) {
      o.setSize(e2, t2), null !== s && s.setSize(e2, t2), null !== l && l.setSize(e2, t2);
      for (let n2 = 0; n2 < v.length; n2++) {
        const r2 = v[n2];
        r2.setSize && r2.setSize(e2, t2);
      }
    }, this.setEffects = function(e2) {
      v = e2, S = v.length > 0 && true === v[0].isRenderPass;
      const t2 = o.width, n2 = o.height;
      v.length > 0 && null === s && (s = new WebGLRenderTarget(t2, n2, { type: HalfFloatType, depthBuffer: false, stencilBuffer: false }), l = new WebGLRenderTarget(t2, n2, { type: HalfFloatType, depthBuffer: false, stencilBuffer: false }));
      for (let e3 = 0; e3 < v.length; e3++) {
        const r2 = v[e3];
        r2.setSize && r2.setSize(t2, n2);
      }
    }, this.begin = function(e2, t2) {
      if (h) return false;
      if (e2.toneMapping === NoToneMapping && 0 === v.length) return false;
      if (g = t2, null !== t2) {
        const e3 = t2.width, n2 = t2.height;
        o.width === e3 && o.height === n2 || this.setSize(e3, n2);
      }
      return false === S && e2.setRenderTarget(o), p = e2.toneMapping, e2.toneMapping = NoToneMapping, true;
    }, this.hasRenderPass = function() {
      return S;
    }, this.end = function(e2, t2) {
      e2.toneMapping = p, h = true;
      let n2 = o, r2 = s;
      for (let a2 = 0; a2 < v.length; a2++) {
        const i2 = v[a2];
        false !== i2.enabled && (i2.render(e2, r2, n2, t2), false !== i2.needsSwap && (n2 = r2, r2 = r2 === s ? l : s));
      }
      if (m !== e2.outputColorSpace || _ !== e2.toneMapping) {
        m = e2.outputColorSpace, _ = e2.toneMapping, d.defines = {}, ColorManagement.getTransfer(m) === SRGBTransfer && (d.defines.SRGB_TRANSFER = "");
        const t3 = toneMappingMap[_];
        t3 && (d.defines[t3] = ""), d.needsUpdate = true;
      }
      d.uniforms.tDiffuse.value = n2.texture, e2.setRenderTarget(g), e2.render(u, f), g = null, h = false;
    }, this.isCompositing = function() {
      return h;
    }, this.dispose = function() {
      o.dispose(), null !== s && s.dispose(), null !== l && l.dispose(), c.dispose(), d.dispose();
    };
  }
  var emptyTexture = new Texture();
  var emptyShadowTexture = new DepthTexture(1, 1);
  var emptyArrayTexture = new DataArrayTexture();
  var empty3dTexture = new Data3DTexture();
  var emptyCubeTexture = new CubeTexture();
  var arrayCacheF32 = [];
  var arrayCacheI32 = [];
  var mat4array = new Float32Array(16);
  var mat3array = new Float32Array(9);
  var mat2array = new Float32Array(4);
  function flatten(e, t, n) {
    const r = e[0];
    if (r <= 0 || r > 0) return e;
    const a = t * n;
    let i = arrayCacheF32[a];
    if (void 0 === i && (i = new Float32Array(a), arrayCacheF32[a] = i), 0 !== t) {
      r.toArray(i, 0);
      for (let r2 = 1, a2 = 0; r2 !== t; ++r2) a2 += n, e[r2].toArray(i, a2);
    }
    return i;
  }
  function arraysEqual(e, t) {
    if (e.length !== t.length) return false;
    for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return false;
    return true;
  }
  function copyArray(e, t) {
    for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
  }
  function allocTexUnits(e, t) {
    let n = arrayCacheI32[t];
    void 0 === n && (n = new Int32Array(t), arrayCacheI32[t] = n);
    for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
    return n;
  }
  function setValueV1f(e, t) {
    const n = this.cache;
    n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
  }
  function setValueV2f(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y || (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform2fv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueV3f(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z || (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
    else if (void 0 !== t.r) n[0] === t.r && n[1] === t.g && n[2] === t.b || (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform3fv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueV4f(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z && n[3] === t.w || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform4fv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueM2(e, t) {
    const n = this.cache, r = t.elements;
    if (void 0 === r) {
      if (arraysEqual(n, t)) return;
      e.uniformMatrix2fv(this.addr, false, t), copyArray(n, t);
    } else {
      if (arraysEqual(n, r)) return;
      mat2array.set(r), e.uniformMatrix2fv(this.addr, false, mat2array), copyArray(n, r);
    }
  }
  function setValueM3(e, t) {
    const n = this.cache, r = t.elements;
    if (void 0 === r) {
      if (arraysEqual(n, t)) return;
      e.uniformMatrix3fv(this.addr, false, t), copyArray(n, t);
    } else {
      if (arraysEqual(n, r)) return;
      mat3array.set(r), e.uniformMatrix3fv(this.addr, false, mat3array), copyArray(n, r);
    }
  }
  function setValueM4(e, t) {
    const n = this.cache, r = t.elements;
    if (void 0 === r) {
      if (arraysEqual(n, t)) return;
      e.uniformMatrix4fv(this.addr, false, t), copyArray(n, t);
    } else {
      if (arraysEqual(n, r)) return;
      mat4array.set(r), e.uniformMatrix4fv(this.addr, false, mat4array), copyArray(n, r);
    }
  }
  function setValueV1i(e, t) {
    const n = this.cache;
    n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
  }
  function setValueV2i(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y || (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform2iv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueV3i(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z || (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform3iv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueV4i(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z && n[3] === t.w || (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform4iv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueV1ui(e, t) {
    const n = this.cache;
    n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
  }
  function setValueV2ui(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y || (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform2uiv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueV3ui(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z || (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform3uiv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueV4ui(e, t) {
    const n = this.cache;
    if (void 0 !== t.x) n[0] === t.x && n[1] === t.y && n[2] === t.z && n[3] === t.w || (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
    else {
      if (arraysEqual(n, t)) return;
      e.uniform4uiv(this.addr, t), copyArray(n, t);
    }
  }
  function setValueT1(e, t, n) {
    const r = this.cache, a = n.allocateTextureUnit();
    let i;
    r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), this.type === e.SAMPLER_2D_SHADOW ? (emptyShadowTexture.compareFunction = n.isReversedDepthBuffer() ? GreaterEqualCompare : LessEqualCompare, i = emptyShadowTexture) : i = emptyTexture, n.setTexture2D(t || i, a);
  }
  function setValueT3D1(e, t, n) {
    const r = this.cache, a = n.allocateTextureUnit();
    r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), n.setTexture3D(t || empty3dTexture, a);
  }
  function setValueT6(e, t, n) {
    const r = this.cache, a = n.allocateTextureUnit();
    r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), n.setTextureCube(t || emptyCubeTexture, a);
  }
  function setValueT2DArray1(e, t, n) {
    const r = this.cache, a = n.allocateTextureUnit();
    r[0] !== a && (e.uniform1i(this.addr, a), r[0] = a), n.setTexture2DArray(t || emptyArrayTexture, a);
  }
  function getSingularSetter(e) {
    switch (e) {
      case 5126:
        return setValueV1f;
      case 35664:
        return setValueV2f;
      case 35665:
        return setValueV3f;
      case 35666:
        return setValueV4f;
      case 35674:
        return setValueM2;
      case 35675:
        return setValueM3;
      case 35676:
        return setValueM4;
      case 5124:
      case 35670:
        return setValueV1i;
      case 35667:
      case 35671:
        return setValueV2i;
      case 35668:
      case 35672:
        return setValueV3i;
      case 35669:
      case 35673:
        return setValueV4i;
      case 5125:
        return setValueV1ui;
      case 36294:
        return setValueV2ui;
      case 36295:
        return setValueV3ui;
      case 36296:
        return setValueV4ui;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return setValueT1;
      case 35679:
      case 36299:
      case 36307:
        return setValueT3D1;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return setValueT6;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return setValueT2DArray1;
    }
  }
  function setValueV1fArray(e, t) {
    e.uniform1fv(this.addr, t);
  }
  function setValueV2fArray(e, t) {
    const n = flatten(t, this.size, 2);
    e.uniform2fv(this.addr, n);
  }
  function setValueV3fArray(e, t) {
    const n = flatten(t, this.size, 3);
    e.uniform3fv(this.addr, n);
  }
  function setValueV4fArray(e, t) {
    const n = flatten(t, this.size, 4);
    e.uniform4fv(this.addr, n);
  }
  function setValueM2Array(e, t) {
    const n = flatten(t, this.size, 4);
    e.uniformMatrix2fv(this.addr, false, n);
  }
  function setValueM3Array(e, t) {
    const n = flatten(t, this.size, 9);
    e.uniformMatrix3fv(this.addr, false, n);
  }
  function setValueM4Array(e, t) {
    const n = flatten(t, this.size, 16);
    e.uniformMatrix4fv(this.addr, false, n);
  }
  function setValueV1iArray(e, t) {
    e.uniform1iv(this.addr, t);
  }
  function setValueV2iArray(e, t) {
    e.uniform2iv(this.addr, t);
  }
  function setValueV3iArray(e, t) {
    e.uniform3iv(this.addr, t);
  }
  function setValueV4iArray(e, t) {
    e.uniform4iv(this.addr, t);
  }
  function setValueV1uiArray(e, t) {
    e.uniform1uiv(this.addr, t);
  }
  function setValueV2uiArray(e, t) {
    e.uniform2uiv(this.addr, t);
  }
  function setValueV3uiArray(e, t) {
    e.uniform3uiv(this.addr, t);
  }
  function setValueV4uiArray(e, t) {
    e.uniform4uiv(this.addr, t);
  }
  function setValueT1Array(e, t, n) {
    const r = this.cache, a = t.length, i = allocTexUnits(n, a);
    let o;
    arraysEqual(r, i) || (e.uniform1iv(this.addr, i), copyArray(r, i)), o = this.type === e.SAMPLER_2D_SHADOW ? emptyShadowTexture : emptyTexture;
    for (let e2 = 0; e2 !== a; ++e2) n.setTexture2D(t[e2] || o, i[e2]);
  }
  function setValueT3DArray(e, t, n) {
    const r = this.cache, a = t.length, i = allocTexUnits(n, a);
    arraysEqual(r, i) || (e.uniform1iv(this.addr, i), copyArray(r, i));
    for (let e2 = 0; e2 !== a; ++e2) n.setTexture3D(t[e2] || empty3dTexture, i[e2]);
  }
  function setValueT6Array(e, t, n) {
    const r = this.cache, a = t.length, i = allocTexUnits(n, a);
    arraysEqual(r, i) || (e.uniform1iv(this.addr, i), copyArray(r, i));
    for (let e2 = 0; e2 !== a; ++e2) n.setTextureCube(t[e2] || emptyCubeTexture, i[e2]);
  }
  function setValueT2DArrayArray(e, t, n) {
    const r = this.cache, a = t.length, i = allocTexUnits(n, a);
    arraysEqual(r, i) || (e.uniform1iv(this.addr, i), copyArray(r, i));
    for (let e2 = 0; e2 !== a; ++e2) n.setTexture2DArray(t[e2] || emptyArrayTexture, i[e2]);
  }
  function getPureArraySetter(e) {
    switch (e) {
      case 5126:
        return setValueV1fArray;
      case 35664:
        return setValueV2fArray;
      case 35665:
        return setValueV3fArray;
      case 35666:
        return setValueV4fArray;
      case 35674:
        return setValueM2Array;
      case 35675:
        return setValueM3Array;
      case 35676:
        return setValueM4Array;
      case 5124:
      case 35670:
        return setValueV1iArray;
      case 35667:
      case 35671:
        return setValueV2iArray;
      case 35668:
      case 35672:
        return setValueV3iArray;
      case 35669:
      case 35673:
        return setValueV4iArray;
      case 5125:
        return setValueV1uiArray;
      case 36294:
        return setValueV2uiArray;
      case 36295:
        return setValueV3uiArray;
      case 36296:
        return setValueV4uiArray;
      case 35678:
      case 36198:
      case 36298:
      case 36306:
      case 35682:
        return setValueT1Array;
      case 35679:
      case 36299:
      case 36307:
        return setValueT3DArray;
      case 35680:
      case 36300:
      case 36308:
      case 36293:
        return setValueT6Array;
      case 36289:
      case 36303:
      case 36311:
      case 36292:
        return setValueT2DArrayArray;
    }
  }
  var SingleUniform = class {
    constructor(e, t, n) {
      this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = getSingularSetter(t.type);
    }
  };
  var PureArrayUniform = class {
    constructor(e, t, n) {
      this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = getPureArraySetter(t.type);
    }
  };
  var StructuredUniform = class {
    constructor(e) {
      this.id = e, this.seq = [], this.map = {};
    }
    setValue(e, t, n) {
      const r = this.seq;
      for (let a = 0, i = r.length; a !== i; ++a) {
        const i2 = r[a];
        i2.setValue(e, t[i2.id], n);
      }
    }
  };
  var RePathPart = /(\w+)(\])?(\[|\.)?/g;
  function addUniform(e, t) {
    e.seq.push(t), e.map[t.id] = t;
  }
  function parseUniform(e, t, n) {
    const r = e.name, a = r.length;
    for (RePathPart.lastIndex = 0; ; ) {
      const i = RePathPart.exec(r), o = RePathPart.lastIndex;
      let s = i[1];
      const l = "]" === i[2], c = i[3];
      if (l && (s |= 0), void 0 === c || "[" === c && o + 2 === a) {
        addUniform(n, void 0 === c ? new SingleUniform(s, e, t) : new PureArrayUniform(s, e, t));
        break;
      }
      {
        let e2 = n.map[s];
        void 0 === e2 && (e2 = new StructuredUniform(s), addUniform(n, e2)), n = e2;
      }
    }
  }
  var WebGLUniforms = class {
    constructor(e, t) {
      this.seq = [], this.map = {};
      const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
      for (let r2 = 0; r2 < n; ++r2) {
        const n2 = e.getActiveUniform(t, r2);
        parseUniform(n2, e.getUniformLocation(t, n2.name), this);
      }
      const r = [], a = [];
      for (const t2 of this.seq) t2.type === e.SAMPLER_2D_SHADOW || t2.type === e.SAMPLER_CUBE_SHADOW || t2.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t2) : a.push(t2);
      r.length > 0 && (this.seq = r.concat(a));
    }
    setValue(e, t, n, r) {
      const a = this.map[t];
      void 0 !== a && a.setValue(e, n, r);
    }
    setOptional(e, t, n) {
      const r = t[n];
      void 0 !== r && this.setValue(e, n, r);
    }
    static upload(e, t, n, r) {
      for (let a = 0, i = t.length; a !== i; ++a) {
        const i2 = t[a], o = n[i2.id];
        false !== o.needsUpdate && i2.setValue(e, o.value, r);
      }
    }
    static seqWithValue(e, t) {
      const n = [];
      for (let r = 0, a = e.length; r !== a; ++r) {
        const a2 = e[r];
        a2.id in t && n.push(a2);
      }
      return n;
    }
  };
  function WebGLShader(e, t, n) {
    const r = e.createShader(t);
    return e.shaderSource(r, n), e.compileShader(r), r;
  }
  var programIdCount = 0;
  function handleSource(e, t) {
    const n = e.split("\n"), r = [], a = Math.max(t - 6, 0), i = Math.min(t + 6, n.length);
    for (let e2 = a; e2 < i; e2++) {
      const a2 = e2 + 1;
      r.push(`${a2 === t ? ">" : " "} ${a2}: ${n[e2]}`);
    }
    return r.join("\n");
  }
  var _m0 = new Matrix3();
  function getEncodingComponents(e) {
    ColorManagement._getMatrix(_m0, ColorManagement.workingColorSpace, e);
    const t = `mat3( ${_m0.elements.map((e2) => e2.toFixed(4))} )`;
    switch (ColorManagement.getTransfer(e)) {
      case LinearTransfer:
        return [t, "LinearTransferOETF"];
      case SRGBTransfer:
        return [t, "sRGBTransferOETF"];
      default:
        return warn("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
    }
  }
  function getShaderErrors(e, t, n) {
    const r = e.getShaderParameter(t, e.COMPILE_STATUS), a = (e.getShaderInfoLog(t) || "").trim();
    if (r && "" === a) return "";
    const i = /ERROR: 0:(\d+)/.exec(a);
    if (i) {
      const r2 = parseInt(i[1]);
      return n.toUpperCase() + "\n\n" + a + "\n\n" + handleSource(e.getShaderSource(t), r2);
    }
    return a;
  }
  function getTexelEncodingFunction(e, t) {
    const n = getEncodingComponents(t);
    return [`vec4 ${e}( vec4 value ) {`, `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`, "}"].join("\n");
  }
  var toneMappingFunctions = { [LinearToneMapping]: "Linear", [ReinhardToneMapping]: "Reinhard", [CineonToneMapping]: "Cineon", [ACESFilmicToneMapping]: "ACESFilmic", [AgXToneMapping]: "AgX", [NeutralToneMapping]: "Neutral", [CustomToneMapping]: "Custom" };
  function getToneMappingFunction(e, t) {
    const n = toneMappingFunctions[t];
    return void 0 === n ? (warn("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
  }
  var _v02 = new Vector3();
  function getLuminanceFunction() {
    ColorManagement.getLuminanceCoefficients(_v02);
    return ["float luminance( const in vec3 rgb ) {", `	const vec3 weights = vec3( ${_v02.x.toFixed(4)}, ${_v02.y.toFixed(4)}, ${_v02.z.toFixed(4)} );`, "	return dot( weights, rgb );", "}"].join("\n");
  }
  function generateVertexExtensions(e) {
    return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(filterEmptyLine).join("\n");
  }
  function generateDefines(e) {
    const t = [];
    for (const n in e) {
      const r = e[n];
      false !== r && t.push("#define " + n + " " + r);
    }
    return t.join("\n");
  }
  function fetchAttributeLocations(e, t) {
    const n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
    for (let a = 0; a < r; a++) {
      const r2 = e.getActiveAttrib(t, a), i = r2.name;
      let o = 1;
      r2.type === e.FLOAT_MAT2 && (o = 2), r2.type === e.FLOAT_MAT3 && (o = 3), r2.type === e.FLOAT_MAT4 && (o = 4), n[i] = { type: r2.type, location: e.getAttribLocation(t, i), locationSize: o };
    }
    return n;
  }
  function filterEmptyLine(e) {
    return "" !== e;
  }
  function replaceLightNums(e, t) {
    const n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
    return e.replace(/NUM_SUN_LIGHTS/g, t.numSunLights).replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g, t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
  }
  function replaceClippingPlaneNums(e, t) {
    return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
  }
  var includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function resolveIncludes(e) {
    return e.replace(includePattern, includeReplacer);
  }
  var shaderChunkMap = /* @__PURE__ */ new Map();
  function includeReplacer(e, t) {
    let n = ShaderChunk[t];
    if (void 0 === n) {
      const e2 = shaderChunkMap.get(t);
      if (void 0 === e2) throw new Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
      n = ShaderChunk[e2], warn('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, e2);
    }
    return resolveIncludes(n);
  }
  var unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
  function unrollLoops(e) {
    return e.replace(unrollLoopPattern, loopReplacer);
  }
  function loopReplacer(e, t, n, r) {
    let a = "";
    for (let e2 = parseInt(t); e2 < parseInt(n); e2++) a += r.replace(/\[\s*i\s*\]/g, "[ " + e2 + " ]").replace(/UNROLLED_LOOP_INDEX/g, e2);
    return a;
  }
  function generatePrecision(e) {
    let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
    return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t;
  }
  var shadowMapTypeDefines = { [PCFShadowMap]: "SHADOWMAP_TYPE_PCF", [VSMShadowMap]: "SHADOWMAP_TYPE_VSM" };
  function generateShadowMapTypeDefine(e) {
    return shadowMapTypeDefines[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
  }
  var envMapTypeDefines = { [CubeReflectionMapping]: "ENVMAP_TYPE_CUBE", [CubeRefractionMapping]: "ENVMAP_TYPE_CUBE", [CubeUVReflectionMapping]: "ENVMAP_TYPE_CUBE_UV" };
  function generateEnvMapTypeDefine(e) {
    return false === e.envMap ? "ENVMAP_TYPE_CUBE" : envMapTypeDefines[e.envMapMode] || "ENVMAP_TYPE_CUBE";
  }
  var envMapModeDefines = { [CubeRefractionMapping]: "ENVMAP_MODE_REFRACTION" };
  function generateEnvMapModeDefine(e) {
    return false === e.envMap ? "ENVMAP_MODE_REFLECTION" : envMapModeDefines[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
  }
  var envMapBlendingDefines = { [MultiplyOperation]: "ENVMAP_BLENDING_MULTIPLY", [MixOperation]: "ENVMAP_BLENDING_MIX", [AddOperation]: "ENVMAP_BLENDING_ADD" };
  function generateEnvMapBlendingDefine(e) {
    return false === e.envMap ? "ENVMAP_BLENDING_NONE" : envMapBlendingDefines[e.combine] || "ENVMAP_BLENDING_NONE";
  }
  function generateCubeUVSize(e) {
    const t = e.envMapCubeUVHeight;
    if (null === t) return null;
    const n = Math.log2(t) - 2, r = 1 / t;
    return { texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)), texelHeight: r, maxMip: n };
  }
  function WebGLProgram(e, t, n, r) {
    const a = e.getContext(), i = n.defines;
    let o = n.vertexShader, s = n.fragmentShader;
    const l = generateShadowMapTypeDefine(n), c = generateEnvMapTypeDefine(n), d = generateEnvMapModeDefine(n), u = generateEnvMapBlendingDefine(n), f = generateCubeUVSize(n), p = generateVertexExtensions(n), m = generateDefines(i), _ = a.createProgram();
    let h, g, v = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
    n.isRawShaderMaterial ? (h = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, m].filter(filterEmptyLine).join("\n"), h.length > 0 && (h += "\n"), g = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, m].filter(filterEmptyLine).join("\n"), g.length > 0 && (g += "\n")) : (h = [generatePrecision(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, m, n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", n.batching ? "#define USE_BATCHING" : "", n.batchingColor ? "#define USE_BATCHING_COLOR" : "", n.instancing ? "#define USE_INSTANCING" : "", n.instancingColor ? "#define USE_INSTANCING_COLOR" : "", n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + d : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.mapUv ? "#define MAP_UV " + n.mapUv : "", n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "", n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "", n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "", n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "", n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "", n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "", n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "", n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "", n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "", n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "", n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "", n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "", n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "", n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "", n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "", n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "", n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "", n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "", n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "", n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "", n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "", n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "", n.vertexTangents && false === n.flatShading ? "#define USE_TANGENT" : "", n.vertexNormals ? "#define HAS_NORMAL" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && false === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.morphColors ? "#define USE_MORPHCOLORS" : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", "\n"].filter(filterEmptyLine).join("\n"), g = [generatePrecision(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, m, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + c : "", n.envMap ? "#define " + d : "", n.envMap ? "#define " + u : "", f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "", f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "", f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoat ? "#define USE_CLEARCOAT" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.dispersion ? "#define USE_DISPERSION" : "", n.retroreflection ? "#define USE_RETROREFLECTION" : "", n.iridescence ? "#define USE_IRIDESCENCE" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaTest ? "#define USE_ALPHATEST" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.sheen ? "#define USE_SHEEN" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.vertexTangents && false === n.flatShading ? "#define USE_TANGENT" : "", n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "", n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "", n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", n.toneMapping !== NoToneMapping ? "#define TONE_MAPPING" : "", n.toneMapping !== NoToneMapping ? ShaderChunk.tonemapping_pars_fragment : "", n.toneMapping !== NoToneMapping ? getToneMappingFunction("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.opaque ? "#define OPAQUE" : "", ShaderChunk.colorspace_pars_fragment, getTexelEncodingFunction("linearToOutputTexel", n.outputColorSpace), getLuminanceFunction(), n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(filterEmptyLine).join("\n")), o = resolveIncludes(o), o = replaceLightNums(o, n), o = replaceClippingPlaneNums(o, n), s = resolveIncludes(s), s = replaceLightNums(s, n), s = replaceClippingPlaneNums(s, n), o = unrollLoops(o), s = unrollLoops(s), true !== n.isRawShaderMaterial && (v = "#version 300 es\n", h = [p, "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + h, g = ["#define varying in", n.glslVersion === GLSL3 ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", n.glslVersion === GLSL3 ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + g);
    const S = v + h + o, E = v + g + s, T = WebGLShader(a, a.VERTEX_SHADER, S), M = WebGLShader(a, a.FRAGMENT_SHADER, E);
    function x(t2) {
      if (e.debug.checkShaderErrors) {
        const n2 = a.getProgramInfoLog(_) || "", r2 = a.getShaderInfoLog(T) || "", i2 = a.getShaderInfoLog(M) || "", o2 = n2.trim(), s2 = r2.trim(), l2 = i2.trim();
        let c2 = true, d2 = true;
        if (false === a.getProgramParameter(_, a.LINK_STATUS)) if (c2 = false, "function" == typeof e.debug.onShaderError) e.debug.onShaderError(a, _, T, M);
        else {
          const e2 = getShaderErrors(a, T, "vertex"), n3 = getShaderErrors(a, M, "fragment");
          error("WebGLProgram: Shader Error " + a.getError() + " - VALIDATE_STATUS " + a.getProgramParameter(_, a.VALIDATE_STATUS) + "\n\nMaterial Name: " + t2.name + "\nMaterial Type: " + t2.type + "\n\nProgram Info Log: " + o2 + "\n" + e2 + "\n" + n3);
        }
        else "" !== o2 ? warn("WebGLProgram: Program Info Log:", o2) : "" !== s2 && "" !== l2 || (d2 = false);
        d2 && (t2.diagnostics = { runnable: c2, programLog: o2, vertexShader: { log: s2, prefix: h }, fragmentShader: { log: l2, prefix: g } });
      }
      a.deleteShader(T), a.deleteShader(M), R = new WebGLUniforms(a, _), A = fetchAttributeLocations(a, _);
    }
    let R, A;
    a.attachShader(_, T), a.attachShader(_, M), void 0 !== n.index0AttributeName ? a.bindAttribLocation(_, 0, n.index0AttributeName) : true === n.hasPositionAttribute && a.bindAttribLocation(_, 0, "position"), a.linkProgram(_), this.getUniforms = function() {
      return void 0 === R && x(this), R;
    }, this.getAttributes = function() {
      return void 0 === A && x(this), A;
    };
    let C = false === n.rendererExtensionParallelShaderCompile;
    return this.isReady = function() {
      return false === C && (C = a.getProgramParameter(_, 37297)), C;
    }, this.destroy = function() {
      r.releaseStatesOfProgram(this), a.deleteProgram(_), this.program = void 0;
    }, this.type = n.shaderType, this.name = n.shaderName, this.id = programIdCount++, this.cacheKey = t, this.usedTimes = 1, this.program = _, this.vertexShader = T, this.fragmentShader = M, this;
  }
  var _id = 0;
  var WebGLShaderCache = class {
    constructor() {
      this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
    }
    update(e, t, n) {
      const r = this._getShaderCacheForMaterial(e);
      return false === r.has(t) && (r.add(t), t.usedTimes++), false === r.has(n) && (r.add(n), n.usedTimes++), this;
    }
    remove(e) {
      const t = this.materialCache.get(e);
      for (const e2 of t) e2.usedTimes--, 0 === e2.usedTimes && this.shaderCache.delete(e2.code);
      return this.materialCache.delete(e), this;
    }
    getVertexShaderStage(e) {
      return this._getShaderStage(e.vertexShader);
    }
    getFragmentShaderStage(e) {
      return this._getShaderStage(e.fragmentShader);
    }
    dispose() {
      this.shaderCache.clear(), this.materialCache.clear();
    }
    _getShaderCacheForMaterial(e) {
      const t = this.materialCache;
      let n = t.get(e);
      return void 0 === n && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
    }
    _getShaderStage(e) {
      const t = this.shaderCache;
      let n = t.get(e);
      return void 0 === n && (n = new WebGLShaderStage(e), t.set(e, n)), n;
    }
  };
  var WebGLShaderStage = class {
    constructor(e) {
      this.id = _id++, this.code = e, this.usedTimes = 0;
    }
  };
  function isPackedRGFormat(e) {
    return e === RGFormat || e === RG11_EAC_Format || e === RED_GREEN_RGTC2_Format;
  }
  function WebGLPrograms(e, t, n, r, a, i) {
    const o = new Layers(), s = new WebGLShaderCache(), l = /* @__PURE__ */ new Set(), c = [], d = /* @__PURE__ */ new Map(), u = r.logarithmicDepthBuffer;
    let f = r.precision;
    const p = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distance", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" };
    function m(e2) {
      return l.add(e2), 0 === e2 ? "uv" : `uv${e2}`;
    }
    return { getParameters: function(a2, o2, c2, d2, _, h) {
      const g = d2.fog, v = _.geometry, S = a2.isMeshStandardMaterial || a2.isMeshLambertMaterial || a2.isMeshPhongMaterial ? d2.environment : null, E = a2.isMeshStandardMaterial || a2.isMeshLambertMaterial && !a2.envMap || a2.isMeshPhongMaterial && !a2.envMap, T = t.get(a2.envMap || S, E), M = T && T.mapping === CubeUVReflectionMapping ? T.image.height : null, x = p[a2.type];
      null !== a2.precision && (f = r.getMaxPrecision(a2.precision), f !== a2.precision && warn("WebGLProgram.getParameters:", a2.precision, "not supported, using", f, "instead."));
      const R = v.morphAttributes.position || v.morphAttributes.normal || v.morphAttributes.color, A = void 0 !== R ? R.length : 0;
      let C, b, L, P, U = 0;
      if (void 0 !== v.morphAttributes.position && (U = 1), void 0 !== v.morphAttributes.normal && (U = 2), void 0 !== v.morphAttributes.color && (U = 3), x) {
        const e2 = ShaderLib[x];
        C = e2.vertexShader, b = e2.fragmentShader;
      } else {
        C = a2.vertexShader, b = a2.fragmentShader;
        const e2 = s.getVertexShaderStage(a2), t2 = s.getFragmentShaderStage(a2);
        s.update(a2, e2, t2), L = e2.id, P = t2.id;
      }
      const D = e.getRenderTarget(), w = e.state.buffers.depth.getReversed(), y = true === _.isInstancedMesh, N = true === _.isBatchedMesh, I = !!a2.map, F = !!a2.matcap, O = !!T, G = !!a2.aoMap, B = !!a2.lightMap, V = !!a2.bumpMap && false === a2.wireframe, H = !!a2.normalMap, W = !!a2.displacementMap, k = !!a2.emissiveMap, z = !!a2.metalnessMap, X = !!a2.roughnessMap, q = a2.anisotropy > 0, K = a2.clearcoat > 0, Y = a2.dispersion > 0, j = a2.retroreflectivity > 0, $ = a2.iridescence > 0, Z = a2.sheen > 0, Q = a2.transmission > 0, J = q && !!a2.anisotropyMap, ee = K && !!a2.clearcoatMap, te = K && !!a2.clearcoatNormalMap, ne = K && !!a2.clearcoatRoughnessMap, re = $ && !!a2.iridescenceMap, ae = $ && !!a2.iridescenceThicknessMap, ie = Z && !!a2.sheenColorMap, oe = Z && !!a2.sheenRoughnessMap, se = !!a2.specularMap, le = !!a2.specularColorMap, ce = !!a2.specularIntensityMap, de = Q && !!a2.transmissionMap, ue = Q && !!a2.thicknessMap, fe = !!a2.gradientMap, pe = !!a2.alphaMap, me = a2.alphaTest > 0, _e = !!a2.alphaHash, he = !!a2.extensions;
      let ge = NoToneMapping;
      a2.toneMapped && (null !== D && true !== D.isXRRenderTarget || (ge = e.toneMapping));
      const ve = { shaderID: x, shaderType: a2.type, shaderName: a2.name, vertexShader: C, fragmentShader: b, defines: a2.defines, customVertexShaderID: L, customFragmentShaderID: P, isRawShaderMaterial: true === a2.isRawShaderMaterial, glslVersion: a2.glslVersion, precision: f, batching: N, batchingColor: N && null !== _._colorsTexture, instancing: y, instancingColor: y && null !== _.instanceColor, instancingMorph: y && null !== _.morphTexture, outputColorSpace: null === D ? e.outputColorSpace : true === D.isXRRenderTarget ? D.texture.colorSpace : ColorManagement.workingColorSpace, alphaToCoverage: !!a2.alphaToCoverage, map: I, matcap: F, envMap: O, envMapMode: O && T.mapping, envMapCubeUVHeight: M, aoMap: G, lightMap: B, bumpMap: V, normalMap: H, displacementMap: W, emissiveMap: k, normalMapObjectSpace: H && a2.normalMapType === ObjectSpaceNormalMap, normalMapTangentSpace: H && a2.normalMapType === TangentSpaceNormalMap, packedNormalMap: H && a2.normalMapType === TangentSpaceNormalMap && isPackedRGFormat(a2.normalMap.format), metalnessMap: z, roughnessMap: X, anisotropy: q, anisotropyMap: J, clearcoat: K, clearcoatMap: ee, clearcoatNormalMap: te, clearcoatRoughnessMap: ne, dispersion: Y, retroreflection: j, iridescence: $, iridescenceMap: re, iridescenceThicknessMap: ae, sheen: Z, sheenColorMap: ie, sheenRoughnessMap: oe, specularMap: se, specularColorMap: le, specularIntensityMap: ce, transmission: Q, transmissionMap: de, thicknessMap: ue, gradientMap: fe, opaque: false === a2.transparent && a2.blending === NormalBlending && false === a2.alphaToCoverage, alphaMap: pe, alphaTest: me, alphaHash: _e, combine: a2.combine, mapUv: I && m(a2.map.channel), aoMapUv: G && m(a2.aoMap.channel), lightMapUv: B && m(a2.lightMap.channel), bumpMapUv: V && m(a2.bumpMap.channel), normalMapUv: H && m(a2.normalMap.channel), displacementMapUv: W && m(a2.displacementMap.channel), emissiveMapUv: k && m(a2.emissiveMap.channel), metalnessMapUv: z && m(a2.metalnessMap.channel), roughnessMapUv: X && m(a2.roughnessMap.channel), anisotropyMapUv: J && m(a2.anisotropyMap.channel), clearcoatMapUv: ee && m(a2.clearcoatMap.channel), clearcoatNormalMapUv: te && m(a2.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: ne && m(a2.clearcoatRoughnessMap.channel), iridescenceMapUv: re && m(a2.iridescenceMap.channel), iridescenceThicknessMapUv: ae && m(a2.iridescenceThicknessMap.channel), sheenColorMapUv: ie && m(a2.sheenColorMap.channel), sheenRoughnessMapUv: oe && m(a2.sheenRoughnessMap.channel), specularMapUv: se && m(a2.specularMap.channel), specularColorMapUv: le && m(a2.specularColorMap.channel), specularIntensityMapUv: ce && m(a2.specularIntensityMap.channel), transmissionMapUv: de && m(a2.transmissionMap.channel), thicknessMapUv: ue && m(a2.thicknessMap.channel), alphaMapUv: pe && m(a2.alphaMap.channel), vertexTangents: !!v.attributes.tangent && (H || q), vertexNormals: !!v.attributes.normal, vertexColors: a2.vertexColors, vertexAlphas: true === a2.vertexColors && !!v.attributes.color && 4 === v.attributes.color.itemSize, pointsUvs: true === _.isPoints && !!v.attributes.uv && (I || pe), fog: !!g, useFog: true === a2.fog, fogExp2: !!g && g.isFogExp2, flatShading: false === a2.wireframe && (true === a2.flatShading || void 0 === v.attributes.normal && false === H && (a2.isMeshLambertMaterial || a2.isMeshPhongMaterial || a2.isMeshStandardMaterial || a2.isMeshPhysicalMaterial)), sizeAttenuation: true === a2.sizeAttenuation, logarithmicDepthBuffer: u, reversedDepthBuffer: w, skinning: true === _.isSkinnedMesh, hasPositionAttribute: void 0 !== v.attributes.position, morphTargets: void 0 !== v.morphAttributes.position, morphNormals: void 0 !== v.morphAttributes.normal, morphColors: void 0 !== v.morphAttributes.color, morphTargetsCount: A, morphTextureStride: U, numSunLights: o2.sun.length, numDirLights: o2.directional.length, numPointLights: o2.point.length, numSpotLights: o2.spot.length, numSpotLightMaps: o2.spotLightMap.length, numRectAreaLights: o2.rectArea.length, numHemiLights: o2.hemi.length, numSunLightShadows: o2.sunShadowMap.length, numDirLightShadows: o2.directionalShadowMap.length, numPointLightShadows: o2.pointShadowMap.length, numSpotLightShadows: o2.spotShadowMap.length, numSpotLightShadowsWithMaps: o2.numSpotLightShadowsWithMaps, numLightProbes: o2.numLightProbes, numLightProbeGrids: h.length, numClippingPlanes: i.numPlanes, numClipIntersection: i.numIntersection, dithering: a2.dithering, shadowMapEnabled: e.shadowMap.enabled && c2.length > 0, shadowMapType: e.shadowMap.type, toneMapping: ge, decodeVideoTexture: I && true === a2.map.isVideoTexture && ColorManagement.getTransfer(a2.map.colorSpace) === SRGBTransfer, decodeVideoTextureEmissive: k && true === a2.emissiveMap.isVideoTexture && ColorManagement.getTransfer(a2.emissiveMap.colorSpace) === SRGBTransfer, premultipliedAlpha: a2.premultipliedAlpha, doubleSided: a2.side === DoubleSide, flipSided: a2.side === BackSide, useDepthPacking: a2.depthPacking >= 0, depthPacking: a2.depthPacking || 0, index0AttributeName: a2.index0AttributeName, extensionClipCullDistance: he && true === a2.extensions.clipCullDistance && n.has("WEBGL_clip_cull_distance"), extensionMultiDraw: (he && true === a2.extensions.multiDraw || N) && n.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"), customProgramCacheKey: a2.customProgramCacheKey() };
      return ve.vertexUv1s = l.has(1), ve.vertexUv2s = l.has(2), ve.vertexUv3s = l.has(3), l.clear(), ve;
    }, getProgramCacheKey: function(t2) {
      const n2 = [];
      if (t2.shaderID ? n2.push(t2.shaderID) : (n2.push(t2.customVertexShaderID), n2.push(t2.customFragmentShaderID)), void 0 !== t2.defines) for (const e2 in t2.defines) n2.push(e2), n2.push(t2.defines[e2]);
      return false === t2.isRawShaderMaterial && (!(function(e2, t3) {
        e2.push(t3.precision), e2.push(t3.outputColorSpace), e2.push(t3.envMapMode), e2.push(t3.envMapCubeUVHeight), e2.push(t3.mapUv), e2.push(t3.alphaMapUv), e2.push(t3.lightMapUv), e2.push(t3.aoMapUv), e2.push(t3.bumpMapUv), e2.push(t3.normalMapUv), e2.push(t3.displacementMapUv), e2.push(t3.emissiveMapUv), e2.push(t3.metalnessMapUv), e2.push(t3.roughnessMapUv), e2.push(t3.anisotropyMapUv), e2.push(t3.clearcoatMapUv), e2.push(t3.clearcoatNormalMapUv), e2.push(t3.clearcoatRoughnessMapUv), e2.push(t3.iridescenceMapUv), e2.push(t3.iridescenceThicknessMapUv), e2.push(t3.sheenColorMapUv), e2.push(t3.sheenRoughnessMapUv), e2.push(t3.specularMapUv), e2.push(t3.specularColorMapUv), e2.push(t3.specularIntensityMapUv), e2.push(t3.transmissionMapUv), e2.push(t3.thicknessMapUv), e2.push(t3.combine), e2.push(t3.fogExp2), e2.push(t3.sizeAttenuation), e2.push(t3.morphTargetsCount), e2.push(t3.morphAttributeCount), e2.push(t3.numSunLights), e2.push(t3.numDirLights), e2.push(t3.numPointLights), e2.push(t3.numSpotLights), e2.push(t3.numSpotLightMaps), e2.push(t3.numHemiLights), e2.push(t3.numRectAreaLights), e2.push(t3.numSunLightShadows), e2.push(t3.numDirLightShadows), e2.push(t3.numPointLightShadows), e2.push(t3.numSpotLightShadows), e2.push(t3.numSpotLightShadowsWithMaps), e2.push(t3.numLightProbes), e2.push(t3.shadowMapType), e2.push(t3.toneMapping), e2.push(t3.numClippingPlanes), e2.push(t3.numClipIntersection), e2.push(t3.depthPacking);
      })(n2, t2), (function(e2, t3) {
        o.disableAll(), t3.instancing && o.enable(0);
        t3.instancingColor && o.enable(1);
        t3.instancingMorph && o.enable(2);
        t3.matcap && o.enable(3);
        t3.envMap && o.enable(4);
        t3.normalMapObjectSpace && o.enable(5);
        t3.normalMapTangentSpace && o.enable(6);
        t3.clearcoat && o.enable(7);
        t3.iridescence && o.enable(8);
        t3.alphaTest && o.enable(9);
        t3.vertexColors && o.enable(10);
        t3.vertexAlphas && o.enable(11);
        t3.vertexUv1s && o.enable(12);
        t3.vertexUv2s && o.enable(13);
        t3.vertexUv3s && o.enable(14);
        t3.vertexTangents && o.enable(15);
        t3.anisotropy && o.enable(16);
        t3.alphaHash && o.enable(17);
        t3.batching && o.enable(18);
        t3.dispersion && o.enable(19);
        t3.retroreflection && o.enable(24);
        t3.batchingColor && o.enable(20);
        t3.gradientMap && o.enable(21);
        t3.packedNormalMap && o.enable(22);
        t3.vertexNormals && o.enable(23);
        e2.push(o.mask), o.disableAll(), t3.fog && o.enable(0);
        t3.useFog && o.enable(1);
        t3.flatShading && o.enable(2);
        t3.logarithmicDepthBuffer && o.enable(3);
        t3.reversedDepthBuffer && o.enable(4);
        t3.skinning && o.enable(5);
        t3.morphTargets && o.enable(6);
        t3.morphNormals && o.enable(7);
        t3.morphColors && o.enable(8);
        t3.premultipliedAlpha && o.enable(9);
        t3.shadowMapEnabled && o.enable(10);
        t3.doubleSided && o.enable(11);
        t3.flipSided && o.enable(12);
        t3.useDepthPacking && o.enable(13);
        t3.dithering && o.enable(14);
        t3.transmission && o.enable(15);
        t3.sheen && o.enable(16);
        t3.opaque && o.enable(17);
        t3.pointsUvs && o.enable(18);
        t3.decodeVideoTexture && o.enable(19);
        t3.decodeVideoTextureEmissive && o.enable(20);
        t3.alphaToCoverage && o.enable(21);
        t3.numLightProbeGrids > 0 && o.enable(22);
        t3.hasPositionAttribute && o.enable(23);
        e2.push(o.mask);
      })(n2, t2), n2.push(e.outputColorSpace)), n2.push(t2.customProgramCacheKey), n2.join();
    }, getUniforms: function(e2) {
      const t2 = p[e2.type];
      let n2;
      if (t2) {
        const e3 = ShaderLib[t2];
        n2 = UniformsUtils.clone(e3.uniforms);
      } else n2 = e2.uniforms;
      return n2;
    }, acquireProgram: function(t2, n2) {
      let r2 = d.get(n2);
      return void 0 !== r2 ? ++r2.usedTimes : (r2 = new WebGLProgram(e, n2, t2, a), c.push(r2), d.set(n2, r2)), r2;
    }, releaseProgram: function(e2) {
      if (0 === --e2.usedTimes) {
        const t2 = c.indexOf(e2);
        c[t2] = c[c.length - 1], c.pop(), d.delete(e2.cacheKey), e2.destroy();
      }
    }, releaseShaderCache: function(e2) {
      s.remove(e2);
    }, programs: c, dispose: function() {
      s.dispose();
    } };
  }
  function WebGLProperties() {
    let e = /* @__PURE__ */ new WeakMap();
    return { has: function(t) {
      return e.has(t);
    }, get: function(t) {
      let n = e.get(t);
      return void 0 === n && (n = {}, e.set(t, n)), n;
    }, remove: function(t) {
      e.delete(t);
    }, update: function(t, n, r) {
      e.get(t)[n] = r;
    }, dispose: function() {
      e = /* @__PURE__ */ new WeakMap();
    } };
  }
  function painterSortStable(e, t) {
    return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.materialVariant !== t.materialVariant ? e.materialVariant - t.materialVariant : e.z !== t.z ? e.z - t.z : e.id - t.id;
  }
  function reversePainterSortStable(e, t) {
    return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
  }
  function WebGLRenderList() {
    const e = [];
    let t = 0;
    const n = [], r = [], a = [];
    function i(e2) {
      let t2 = 0;
      return e2.isInstancedMesh && (t2 += 2), e2.isSkinnedMesh && (t2 += 1), t2;
    }
    function o(n2, r2, a2, o2, s, l) {
      let c = e[t];
      return void 0 === c ? (c = { id: n2.id, object: n2, geometry: r2, material: a2, materialVariant: i(n2), groupOrder: o2, renderOrder: n2.renderOrder, z: s, group: l }, e[t] = c) : (c.id = n2.id, c.object = n2, c.geometry = r2, c.material = a2, c.materialVariant = i(n2), c.groupOrder = o2, c.renderOrder = n2.renderOrder, c.z = s, c.group = l), t++, c;
    }
    return { opaque: n, transmissive: r, transparent: a, init: function() {
      t = 0, n.length = 0, r.length = 0, a.length = 0;
    }, push: function(e2, t2, i2, s, l, c, d) {
      true === d.reversedDepth && (l = -l);
      const u = o(e2, t2, i2, s, l, c);
      i2.transmission > 0 ? r.push(u) : true === i2.transparent ? a.push(u) : n.push(u);
    }, unshift: function(e2, t2, i2, s, l, c) {
      const d = o(e2, t2, i2, s, l, c);
      i2.transmission > 0 ? r.unshift(d) : true === i2.transparent ? a.unshift(d) : n.unshift(d);
    }, finish: function() {
      for (let n2 = t, r2 = e.length; n2 < r2; n2++) {
        const t2 = e[n2];
        if (null === t2.id) break;
        t2.id = null, t2.object = null, t2.geometry = null, t2.material = null, t2.group = null;
      }
    }, sort: function(e2, t2) {
      n.length > 1 && n.sort(e2 || painterSortStable), r.length > 1 && r.sort(t2 || reversePainterSortStable), a.length > 1 && a.sort(t2 || reversePainterSortStable);
    } };
  }
  function WebGLRenderLists() {
    let e = /* @__PURE__ */ new WeakMap();
    return { get: function(t, n) {
      const r = e.get(t);
      let a;
      return void 0 === r ? (a = new WebGLRenderList(), e.set(t, [a])) : n >= r.length ? (a = new WebGLRenderList(), r.push(a)) : a = r[n], a;
    }, dispose: function() {
      e = /* @__PURE__ */ new WeakMap();
    } };
  }
  function UniformsCache() {
    const e = {};
    return { get: function(t) {
      if (void 0 !== e[t.id]) return e[t.id];
      let n;
      switch (t.type) {
        case "SunLight":
        case "DirectionalLight":
          n = { direction: new Vector3(), color: new Color() };
          break;
        case "SpotLight":
          n = { position: new Vector3(), direction: new Vector3(), color: new Color(), distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 };
          break;
        case "PointLight":
          n = { position: new Vector3(), color: new Color(), distance: 0, decay: 0 };
          break;
        case "HemisphereLight":
          n = { direction: new Vector3(), skyColor: new Color(), groundColor: new Color() };
          break;
        case "RectAreaLight":
          n = { color: new Color(), position: new Vector3(), halfWidth: new Vector3(), halfHeight: new Vector3() };
      }
      return e[t.id] = n, n;
    } };
  }
  function ShadowUniformsCache() {
    const e = {};
    return { get: function(t) {
      if (void 0 !== e[t.id]) return e[t.id];
      let n;
      switch (t.type) {
        case "SunLight":
        case "DirectionalLight":
        case "SpotLight":
          n = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Vector2() };
          break;
        case "PointLight":
          n = { shadowIntensity: 1, shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Vector2(), shadowCameraNear: 1, shadowCameraFar: 1e3 };
      }
      return e[t.id] = n, n;
    } };
  }
  var nextVersion = 0;
  function shadowCastingAndTexturingLightsFirst(e, t) {
    return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
  }
  function WebGLLights(e) {
    const t = new UniformsCache(), n = ShadowUniformsCache(), r = { version: 0, hash: { sunLength: -1, directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numSunShadows: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], sun: [], sunShadow: [], sunShadowMap: [], sunShadowMatrix: [], sunShadowCascade: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 };
    for (let e2 = 0; e2 < 9; e2++) r.probe.push(new Vector3());
    const a = new Vector3(), i = new Matrix4(), o = new Matrix4();
    return { setup: function(a2) {
      let i2 = 0, o2 = 0, s = 0;
      for (let e2 = 0; e2 < 9; e2++) r.probe[e2].set(0, 0, 0);
      let l = 0, c = 0, d = 0, u = 0, f = 0, p = 0, m = 0, _ = 0, h = 0, g = 0, v = 0, S = 0, E = 0, T = 0;
      a2.sort(shadowCastingAndTexturingLightsFirst);
      for (let e2 = 0, M2 = a2.length; e2 < M2; e2++) {
        const M3 = a2[e2], x = M3.color, R = M3.intensity, A = M3.distance;
        let C = null;
        if (M3.shadow && M3.shadow.map && (C = M3.shadow.map.texture.format === RGFormat ? M3.shadow.map.texture : M3.shadow.map.depthTexture || M3.shadow.map.texture), M3.isAmbientLight) i2 += x.r * R, o2 += x.g * R, s += x.b * R;
        else if (M3.isLightProbe) {
          for (let e3 = 0; e3 < 9; e3++) r.probe[e3].addScaledVector(M3.sh.coefficients[e3], R);
          T++;
        } else if (M3.isSunLight) {
          const e3 = t.get(M3);
          if (e3.color.copy(M3.color).multiplyScalar(M3.intensity), M3.castShadow) {
            const e4 = M3.shadow, t2 = n.get(M3);
            t2.shadowIntensity = e4.intensity, t2.shadowBias = e4.bias, t2.shadowNormalBias = e4.normalBias, t2.shadowRadius = e4.radius, t2.shadowMapSize.copy(e4.mapSize).multiply(e4.getFrameExtents()), r.sunShadow[c] = t2, r.sunShadowMap[c] = C;
            const a3 = e4.getViewportCount();
            for (let t3 = 0; t3 < a3; t3++) r.sunShadowMatrix[d + t3] = e4.getMatrix(t3), r.sunShadowCascade[d + t3] = e4._cascadeData[t3];
            d += a3, c++;
          }
          r.sun[l] = e3, l++;
        } else if (M3.isDirectionalLight) {
          const e3 = t.get(M3);
          if (e3.color.copy(M3.color).multiplyScalar(M3.intensity), M3.castShadow) {
            const e4 = M3.shadow, t2 = n.get(M3);
            t2.shadowIntensity = e4.intensity, t2.shadowBias = e4.bias, t2.shadowNormalBias = e4.normalBias, t2.shadowRadius = e4.radius, t2.shadowMapSize = e4.mapSize, r.directionalShadow[u] = t2, r.directionalShadowMap[u] = C, r.directionalShadowMatrix[u] = M3.shadow.matrix, h++;
          }
          r.directional[u] = e3, u++;
        } else if (M3.isSpotLight) {
          const e3 = t.get(M3);
          e3.position.setFromMatrixPosition(M3.matrixWorld), e3.color.copy(x).multiplyScalar(R), e3.distance = A, e3.coneCos = Math.cos(M3.angle), e3.penumbraCos = Math.cos(M3.angle * (1 - M3.penumbra)), e3.decay = M3.decay, r.spot[p] = e3;
          const a3 = M3.shadow;
          if (M3.map && (r.spotLightMap[S] = M3.map, S++, a3.updateMatrices(M3), M3.castShadow && E++), r.spotLightMatrix[p] = a3.matrix, M3.castShadow) {
            const e4 = n.get(M3);
            e4.shadowIntensity = a3.intensity, e4.shadowBias = a3.bias, e4.shadowNormalBias = a3.normalBias, e4.shadowRadius = a3.radius, e4.shadowMapSize = a3.mapSize, r.spotShadow[p] = e4, r.spotShadowMap[p] = C, v++;
          }
          p++;
        } else if (M3.isRectAreaLight) {
          const e3 = t.get(M3);
          e3.color.copy(x).multiplyScalar(R), e3.halfWidth.set(0.5 * M3.width, 0, 0), e3.halfHeight.set(0, 0.5 * M3.height, 0), r.rectArea[m] = e3, m++;
        } else if (M3.isPointLight) {
          const e3 = t.get(M3);
          if (e3.color.copy(M3.color).multiplyScalar(M3.intensity), e3.distance = M3.distance, e3.decay = M3.decay, M3.castShadow) {
            const e4 = M3.shadow, t2 = n.get(M3);
            t2.shadowIntensity = e4.intensity, t2.shadowBias = e4.bias, t2.shadowNormalBias = e4.normalBias, t2.shadowRadius = e4.radius, t2.shadowMapSize = e4.mapSize, t2.shadowCameraNear = e4.camera.near, t2.shadowCameraFar = e4.camera.far, r.pointShadow[f] = t2, r.pointShadowMap[f] = C, r.pointShadowMatrix[f] = M3.shadow.matrix, g++;
          }
          r.point[f] = e3, f++;
        } else if (M3.isHemisphereLight) {
          const e3 = t.get(M3);
          e3.skyColor.copy(M3.color).multiplyScalar(R), e3.groundColor.copy(M3.groundColor).multiplyScalar(R), r.hemi[_] = e3, _++;
        }
      }
      m > 0 && (true === e.has("OES_texture_float_linear") ? (r.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1, r.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2) : (r.rectAreaLTC1 = UniformsLib.LTC_HALF_1, r.rectAreaLTC2 = UniformsLib.LTC_HALF_2)), r.ambient[0] = i2, r.ambient[1] = o2, r.ambient[2] = s;
      const M = r.hash;
      M.sunLength === l && M.directionalLength === u && M.pointLength === f && M.spotLength === p && M.rectAreaLength === m && M.hemiLength === _ && M.numSunShadows === c && M.numDirectionalShadows === h && M.numPointShadows === g && M.numSpotShadows === v && M.numSpotMaps === S && M.numLightProbes === T || (r.sun.length = l, r.directional.length = u, r.spot.length = p, r.rectArea.length = m, r.point.length = f, r.hemi.length = _, r.sunShadow.length = c, r.sunShadowMap.length = c, r.sunShadowMatrix.length = d, r.sunShadowCascade.length = d, r.directionalShadow.length = h, r.directionalShadowMap.length = h, r.directionalShadowMatrix.length = h, r.pointShadow.length = g, r.pointShadowMap.length = g, r.pointShadowMatrix.length = g, r.spotShadow.length = v, r.spotShadowMap.length = v, r.spotLightMatrix.length = v + S - E, r.spotLightMap.length = S, r.numSpotLightShadowsWithMaps = E, r.numLightProbes = T, M.sunLength = l, M.directionalLength = u, M.pointLength = f, M.spotLength = p, M.rectAreaLength = m, M.hemiLength = _, M.numSunShadows = c, M.numDirectionalShadows = h, M.numPointShadows = g, M.numSpotShadows = v, M.numSpotMaps = S, M.numLightProbes = T, r.version = nextVersion++);
    }, setupView: function(e2, t2) {
      let n2 = 0, s = 0, l = 0, c = 0, d = 0, u = 0;
      const f = t2.matrixWorldInverse;
      for (let t3 = 0, p = e2.length; t3 < p; t3++) {
        const p2 = e2[t3];
        if (p2.isSunLight) {
          const e3 = r.sun[n2];
          e3.direction.setFromMatrixPosition(p2.matrixWorld), e3.direction.transformDirection(f), n2++;
        } else if (p2.isDirectionalLight) {
          const e3 = r.directional[s];
          e3.direction.setFromMatrixPosition(p2.matrixWorld), a.setFromMatrixPosition(p2.target.matrixWorld), e3.direction.sub(a), e3.direction.transformDirection(f), s++;
        } else if (p2.isSpotLight) {
          const e3 = r.spot[c];
          e3.position.setFromMatrixPosition(p2.matrixWorld), e3.position.applyMatrix4(f), e3.direction.setFromMatrixPosition(p2.matrixWorld), a.setFromMatrixPosition(p2.target.matrixWorld), e3.direction.sub(a), e3.direction.transformDirection(f), c++;
        } else if (p2.isRectAreaLight) {
          const e3 = r.rectArea[d];
          e3.position.setFromMatrixPosition(p2.matrixWorld), e3.position.applyMatrix4(f), o.identity(), i.copy(p2.matrixWorld), i.premultiply(f), o.extractRotation(i), e3.halfWidth.set(0.5 * p2.width, 0, 0), e3.halfHeight.set(0, 0.5 * p2.height, 0), e3.halfWidth.applyMatrix4(o), e3.halfHeight.applyMatrix4(o), d++;
        } else if (p2.isPointLight) {
          const e3 = r.point[l];
          e3.position.setFromMatrixPosition(p2.matrixWorld), e3.position.applyMatrix4(f), l++;
        } else if (p2.isHemisphereLight) {
          const e3 = r.hemi[u];
          e3.direction.setFromMatrixPosition(p2.matrixWorld), e3.direction.transformDirection(f), u++;
        }
      }
    }, state: r };
  }
  function WebGLRenderState(e) {
    const t = new WebGLLights(e), n = [], r = [], a = [];
    const i = { lightsArray: n, shadowsArray: r, lightProbeGridArray: a, camera: null, lights: t, transmissionRenderTarget: {}, textureUnits: 0 };
    return { init: function(e2) {
      i.camera = e2, n.length = 0, r.length = 0, a.length = 0;
    }, state: i, setupLights: function() {
      t.setup(n);
    }, setupLightsView: function(e2) {
      t.setupView(n, e2);
    }, pushLight: function(e2) {
      n.push(e2);
    }, pushShadow: function(e2) {
      r.push(e2);
    }, pushLightProbeGrid: function(e2) {
      a.push(e2);
    } };
  }
  function WebGLRenderStates(e) {
    let t = /* @__PURE__ */ new WeakMap();
    return { get: function(n, r = 0) {
      const a = t.get(n);
      let i;
      return void 0 === a ? (i = new WebGLRenderState(e), t.set(n, [i])) : r >= a.length ? (i = new WebGLRenderState(e), a.push(i)) : i = a[r], i;
    }, dispose: function() {
      t = /* @__PURE__ */ new WeakMap();
    } };
  }
  var vertex = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}";
  var fragment = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}";
  var _cubeDirections = [new Vector3(1, 0, 0), new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, -1, 0), new Vector3(0, 0, 1), new Vector3(0, 0, -1)];
  var _cubeUps = [new Vector3(0, -1, 0), new Vector3(0, -1, 0), new Vector3(0, 0, 1), new Vector3(0, 0, -1), new Vector3(0, -1, 0), new Vector3(0, -1, 0)];
  var _projScreenMatrix2 = new Matrix4();
  var _lightPositionWorld2 = new Vector3();
  var _lookTarget2 = new Vector3();
  function WebGLShadowMap(e, t, n) {
    let r = new Frustum();
    const a = new Vector2(), i = new Vector2(), o = new Vector4(), s = new MeshDepthMaterial(), l = new MeshDistanceMaterial(), c = {}, d = n.maxTextureSize, u = { [FrontSide]: BackSide, [BackSide]: FrontSide, [DoubleSide]: DoubleSide }, f = new ShaderMaterial({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new Vector2() }, radius: { value: 4 } }, vertexShader: vertex, fragmentShader: fragment }), p = f.clone();
    p.defines.HORIZONTAL_PASS = 1;
    const m = new BufferGeometry();
    m.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
    const _ = new Mesh(m, f), h = this;
    this.enabled = false, this.autoUpdate = true, this.needsUpdate = false, this.type = PCFShadowMap;
    let g = this.type;
    function v(n2, r2) {
      const i2 = t.update(_);
      f.defines.VSM_SAMPLES !== n2.blurSamples && (f.defines.VSM_SAMPLES = n2.blurSamples, p.defines.VSM_SAMPLES = n2.blurSamples, f.needsUpdate = true, p.needsUpdate = true), null === n2.mapPass ? n2.mapPass = new WebGLRenderTarget(a.x, a.y, { format: RGFormat, type: HalfFloatType }) : n2.mapPass.width === n2.map.width && n2.mapPass.height === n2.map.height || n2.mapPass.setSize(n2.map.width, n2.map.height), f.uniforms.shadow_pass.value = n2.map.depthTexture, f.uniforms.resolution.value.set(n2.map.width, n2.map.height), f.uniforms.radius.value = n2.radius, e.setRenderTarget(n2.mapPass), e.clear(), e.renderBufferDirect(r2, null, i2, f, _, null), p.uniforms.shadow_pass.value = n2.mapPass.texture, p.uniforms.resolution.value.set(n2.map.width, n2.map.height), p.uniforms.radius.value = n2.radius, e.setRenderTarget(n2.map), e.clear(), e.renderBufferDirect(r2, null, i2, p, _, null);
    }
    function S(t2, n2, r2, a2) {
      let i2 = null;
      const o2 = true === r2.isPointLight ? t2.customDistanceMaterial : t2.customDepthMaterial;
      if (void 0 !== o2) i2 = o2;
      else if (i2 = true === r2.isPointLight ? l : s, e.localClippingEnabled && true === n2.clipShadows && Array.isArray(n2.clippingPlanes) && 0 !== n2.clippingPlanes.length || n2.displacementMap && 0 !== n2.displacementScale || n2.alphaMap && n2.alphaTest > 0 || n2.map && n2.alphaTest > 0 || true === n2.alphaToCoverage) {
        const e2 = i2.uuid, t3 = n2.uuid;
        let r3 = c[e2];
        void 0 === r3 && (r3 = {}, c[e2] = r3);
        let a3 = r3[t3];
        void 0 === a3 && (a3 = i2.clone(), r3[t3] = a3, n2.addEventListener("dispose", T)), i2 = a3;
      }
      if (i2.visible = n2.visible, i2.wireframe = n2.wireframe, i2.side = a2 === VSMShadowMap ? null !== n2.shadowSide ? n2.shadowSide : n2.side : null !== n2.shadowSide ? n2.shadowSide : u[n2.side], i2.alphaMap = n2.alphaMap, i2.alphaTest = true === n2.alphaToCoverage ? 0.5 : n2.alphaTest, i2.map = n2.map, i2.clipShadows = n2.clipShadows, i2.clippingPlanes = n2.clippingPlanes, i2.clipIntersection = n2.clipIntersection, i2.displacementMap = n2.displacementMap, i2.displacementScale = n2.displacementScale, i2.displacementBias = n2.displacementBias, i2.wireframeLinewidth = n2.wireframeLinewidth, i2.linewidth = n2.linewidth, true === r2.isPointLight && true === i2.isMeshDistanceMaterial) {
        e.properties.get(i2).light = r2;
      }
      return i2;
    }
    function E(n2, a2, i2, o2, s2) {
      if (false === n2.visible) return;
      if (n2.layers.test(a2.layers) && (n2.isMesh || n2.isLine || n2.isPoints) && (n2.castShadow || n2.receiveShadow && s2 === VSMShadowMap) && (!n2.frustumCulled || n2.intersectsFrustum(r))) {
        n2.modelViewMatrix.multiplyMatrices(i2.matrixWorldInverse, n2.matrixWorld);
        const r2 = t.update(n2), l3 = n2.material;
        if (Array.isArray(l3)) {
          const t2 = r2.groups;
          for (let c2 = 0, d2 = t2.length; c2 < d2; c2++) {
            const d3 = t2[c2], u2 = l3[d3.materialIndex];
            if (u2 && u2.visible) {
              const t3 = S(n2, u2, o2, s2);
              n2.onBeforeShadow(e, n2, a2, i2, r2, t3, d3), e.renderBufferDirect(i2, null, r2, t3, n2, d3), n2.onAfterShadow(e, n2, a2, i2, r2, t3, d3);
            }
          }
        } else if (l3.visible) {
          const t2 = S(n2, l3, o2, s2);
          n2.onBeforeShadow(e, n2, a2, i2, r2, t2, null), e.renderBufferDirect(i2, null, r2, t2, n2, null), n2.onAfterShadow(e, n2, a2, i2, r2, t2, null);
        }
      }
      const l2 = n2.children;
      for (let e2 = 0, t2 = l2.length; e2 < t2; e2++) E(l2[e2], a2, i2, o2, s2);
    }
    function T(e2) {
      e2.target.removeEventListener("dispose", T);
      for (const t2 in c) {
        const n2 = c[t2], r2 = e2.target.uuid;
        if (r2 in n2) {
          n2[r2].dispose(), delete n2[r2];
        }
      }
    }
    this.render = function(t2, n2, s2) {
      if (false === h.enabled) return;
      if (false === h.autoUpdate && false === h.needsUpdate) return;
      if (0 === t2.length) return;
      this.type === PCFSoftShadowMap && (warn("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."), this.type = PCFShadowMap);
      const l2 = e.getRenderTarget(), c2 = e.getActiveCubeFace(), u2 = e.getActiveMipmapLevel(), f2 = e.state;
      f2.setBlending(NoBlending), true === f2.buffers.depth.getReversed() ? f2.buffers.color.setClear(0, 0, 0, 0) : f2.buffers.color.setClear(1, 1, 1, 1), f2.buffers.depth.setTest(true), f2.setScissorTest(false);
      const p2 = g !== this.type;
      p2 && n2.traverse(function(e2) {
        e2.material && (Array.isArray(e2.material) ? e2.material.forEach((e3) => e3.needsUpdate = true) : e2.material.needsUpdate = true);
      });
      for (let l3 = 0, c3 = t2.length; l3 < c3; l3++) {
        const c4 = t2[l3], u3 = c4.shadow;
        if (void 0 === u3) {
          warn("WebGLShadowMap:", c4, "has no shadow.");
          continue;
        }
        if (false === u3.autoUpdate && false === u3.needsUpdate) continue;
        a.copy(u3.mapSize);
        const m2 = u3.getFrameExtents();
        a.multiply(m2), i.copy(u3.mapSize), (a.x > d || a.y > d) && (a.x > d && (i.x = Math.floor(d / m2.x), a.x = i.x * m2.x, u3.mapSize.x = i.x), a.y > d && (i.y = Math.floor(d / m2.y), a.y = i.y * m2.y, u3.mapSize.y = i.y));
        const _2 = e.state.buffers.depth.getReversed();
        if (u3.camera._reversedDepth = _2, null === u3.map || true === p2) {
          if (null !== u3.map && (null !== u3.map.depthTexture && (u3.map.depthTexture.dispose(), u3.map.depthTexture = null), u3.map.dispose()), this.type === VSMShadowMap) {
            if (c4.isPointLight) {
              warn("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
              continue;
            }
            u3.map = new WebGLRenderTarget(a.x, a.y, { format: RGFormat, type: HalfFloatType, minFilter: LinearFilter, magFilter: LinearFilter, generateMipmaps: false }), u3.map.texture.name = c4.name + ".shadowMap", u3.map.depthTexture = new DepthTexture(a.x, a.y, FloatType), u3.map.depthTexture.name = c4.name + ".shadowMapDepth", u3.map.depthTexture.format = DepthFormat, u3.map.depthTexture.compareFunction = null, u3.map.depthTexture.minFilter = NearestFilter, u3.map.depthTexture.magFilter = NearestFilter;
          } else c4.isPointLight ? (u3.map = new WebGLCubeRenderTarget(a.x), u3.map.depthTexture = new CubeDepthTexture(a.x, UnsignedIntType)) : (u3.map = new WebGLRenderTarget(a.x, a.y), u3.map.depthTexture = new DepthTexture(a.x, a.y, UnsignedIntType)), u3.map.depthTexture.name = c4.name + ".shadowMap", u3.map.depthTexture.format = DepthFormat, this.type === PCFShadowMap ? (u3.map.depthTexture.compareFunction = _2 ? GreaterEqualCompare : LessEqualCompare, u3.map.depthTexture.minFilter = LinearFilter, u3.map.depthTexture.magFilter = LinearFilter) : (u3.map.depthTexture.compareFunction = null, u3.map.depthTexture.minFilter = NearestFilter, u3.map.depthTexture.magFilter = NearestFilter);
          u3.camera.updateProjectionMatrix();
        }
        true === u3.map.isWebGLCubeRenderTarget || u3.map.width === a.x && u3.map.height === a.y || u3.map.setSize(a.x, a.y);
        const h2 = u3.map.isWebGLCubeRenderTarget ? 6 : u3.getViewportCount();
        true !== c4.isPointLight && u3.updateMatrices(c4, s2);
        for (let t3 = 0; t3 < h2; t3++) {
          const a2 = u3.getCamera(t3);
          if (c4.isPointLight) {
            const e2 = u3.camera, n3 = u3.matrix, r2 = c4.distance || e2.far;
            r2 !== e2.far && (e2.far = r2, e2.updateProjectionMatrix()), _lightPositionWorld2.setFromMatrixPosition(c4.matrixWorld), e2.position.copy(_lightPositionWorld2), _lookTarget2.copy(e2.position), _lookTarget2.add(_cubeDirections[t3]), e2.up.copy(_cubeUps[t3]), e2.lookAt(_lookTarget2), e2.updateMatrixWorld(), n3.makeTranslation(-_lightPositionWorld2.x, -_lightPositionWorld2.y, -_lightPositionWorld2.z), _projScreenMatrix2.multiplyMatrices(e2.projectionMatrix, e2.matrixWorldInverse), u3._frustum.setFromProjectionMatrix(_projScreenMatrix2, e2.coordinateSystem, e2.reversedDepth);
          }
          if (u3.map.isWebGLCubeRenderTarget) e.setRenderTarget(u3.map, t3), e.clear();
          else {
            0 === t3 && (e.setRenderTarget(u3.map), e.clear());
            const n3 = u3.getViewport(t3);
            o.set(i.x * n3.x, i.y * n3.y, i.x * n3.z, i.y * n3.w), f2.viewport(o);
          }
          r = u3.getFrustum(t3), E(n2, s2, a2, c4, this.type);
        }
        true !== u3.isPointLightShadow && this.type === VSMShadowMap && v(u3, s2), u3.needsUpdate = false;
      }
      g = this.type, h.needsUpdate = false, e.setRenderTarget(l2, c2, u2);
    };
  }
  function WebGLState(e, t) {
    const n = new function() {
      let t2 = false;
      const n2 = new Vector4();
      let r2 = null;
      const a2 = new Vector4(0, 0, 0, 0);
      return { setMask: function(n3) {
        r2 === n3 || t2 || (e.colorMask(n3, n3, n3, n3), r2 = n3);
      }, setLocked: function(e2) {
        t2 = e2;
      }, setClear: function(t3, r3, i2, o2, s2) {
        true === s2 && (t3 *= o2, r3 *= o2, i2 *= o2), n2.set(t3, r3, i2, o2), false === a2.equals(n2) && (e.clearColor(t3, r3, i2, o2), a2.copy(n2));
      }, reset: function() {
        t2 = false, r2 = null, a2.set(-1, 0, 0, 0);
      } };
    }(), r = new function() {
      let n2 = false, r2 = false, a2 = null, i2 = null, o2 = null;
      return { setReversed: function(e2) {
        if (r2 !== e2) {
          const n3 = t.get("EXT_clip_control");
          e2 ? n3.clipControlEXT(n3.LOWER_LEFT_EXT, n3.ZERO_TO_ONE_EXT) : n3.clipControlEXT(n3.LOWER_LEFT_EXT, n3.NEGATIVE_ONE_TO_ONE_EXT), r2 = e2;
          const a3 = o2;
          o2 = null, this.setClear(a3);
        }
      }, getReversed: function() {
        return r2;
      }, setTest: function(t2) {
        t2 ? H(e.DEPTH_TEST) : W(e.DEPTH_TEST);
      }, setMask: function(t2) {
        a2 === t2 || n2 || (e.depthMask(t2), a2 = t2);
      }, setFunc: function(t2) {
        if (r2 && (t2 = ReversedDepthFuncs[t2]), i2 !== t2) {
          switch (t2) {
            case NeverDepth:
              e.depthFunc(e.NEVER);
              break;
            case AlwaysDepth:
              e.depthFunc(e.ALWAYS);
              break;
            case LessDepth:
              e.depthFunc(e.LESS);
              break;
            case LessEqualDepth:
              e.depthFunc(e.LEQUAL);
              break;
            case EqualDepth:
              e.depthFunc(e.EQUAL);
              break;
            case GreaterEqualDepth:
              e.depthFunc(e.GEQUAL);
              break;
            case GreaterDepth:
              e.depthFunc(e.GREATER);
              break;
            case NotEqualDepth:
              e.depthFunc(e.NOTEQUAL);
              break;
            default:
              e.depthFunc(e.LEQUAL);
          }
          i2 = t2;
        }
      }, setLocked: function(e2) {
        n2 = e2;
      }, setClear: function(t2) {
        o2 !== t2 && (o2 = t2, r2 && (t2 = 1 - t2), e.clearDepth(t2));
      }, reset: function() {
        n2 = false, a2 = null, i2 = null, o2 = null, r2 = false;
      } };
    }(), a = new function() {
      let t2 = false, n2 = null, r2 = null, a2 = null, i2 = null, o2 = null, s2 = null, l2 = null, c2 = null;
      return { setTest: function(n3) {
        t2 || (n3 ? H(e.STENCIL_TEST) : W(e.STENCIL_TEST));
      }, setMask: function(r3) {
        n2 === r3 || t2 || (e.stencilMask(r3), n2 = r3);
      }, setFunc: function(t3, n3, o3) {
        r2 === t3 && a2 === n3 && i2 === o3 || (e.stencilFunc(t3, n3, o3), r2 = t3, a2 = n3, i2 = o3);
      }, setOp: function(t3, n3, r3) {
        o2 === t3 && s2 === n3 && l2 === r3 || (e.stencilOp(t3, n3, r3), o2 = t3, s2 = n3, l2 = r3);
      }, setLocked: function(e2) {
        t2 = e2;
      }, setClear: function(t3) {
        c2 !== t3 && (e.clearStencil(t3), c2 = t3);
      }, reset: function() {
        t2 = false, n2 = null, r2 = null, a2 = null, i2 = null, o2 = null, s2 = null, l2 = null, c2 = null;
      } };
    }(), i = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
    let s = {}, l = {}, c = {}, d = /* @__PURE__ */ new WeakMap(), u = [], f = null, p = false, m = null, _ = null, h = null, g = null, v = null, S = null, E = null, T = new Color(0, 0, 0), M = 0, x = false, R = null, A = null, C = null, b = null, L = null;
    const P = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    let U = false, D = 0;
    const w = e.getParameter(e.VERSION);
    -1 !== w.indexOf("WebGL") ? (D = parseFloat(/^WebGL (\d)/.exec(w)[1]), U = D >= 1) : -1 !== w.indexOf("OpenGL ES") && (D = parseFloat(/^OpenGL ES (\d)/.exec(w)[1]), U = D >= 2);
    let y = null, N = {};
    const I = e.getParameter(e.SCISSOR_BOX), F = e.getParameter(e.VIEWPORT), O = new Vector4().fromArray(I), G = new Vector4().fromArray(F);
    function B(t2, n2, r2, a2) {
      const i2 = new Uint8Array(4), o2 = e.createTexture();
      e.bindTexture(t2, o2), e.texParameteri(t2, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t2, e.TEXTURE_MAG_FILTER, e.NEAREST);
      for (let o3 = 0; o3 < r2; o3++) t2 === e.TEXTURE_3D || t2 === e.TEXTURE_2D_ARRAY ? e.texImage3D(n2, 0, e.RGBA, 1, 1, a2, 0, e.RGBA, e.UNSIGNED_BYTE, i2) : e.texImage2D(n2 + o3, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, i2);
      return o2;
    }
    const V = {};
    function H(t2) {
      true !== s[t2] && (e.enable(t2), s[t2] = true);
    }
    function W(t2) {
      false !== s[t2] && (e.disable(t2), s[t2] = false);
    }
    V[e.TEXTURE_2D] = B(e.TEXTURE_2D, e.TEXTURE_2D, 1), V[e.TEXTURE_CUBE_MAP] = B(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), V[e.TEXTURE_2D_ARRAY] = B(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), V[e.TEXTURE_3D] = B(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), n.setClear(0, 0, 0, 1), r.setClear(1), a.setClear(0), H(e.DEPTH_TEST), r.setFunc(LessEqualDepth), q(false), K(CullFaceBack), H(e.CULL_FACE), X(NoBlending);
    const k = { [AddEquation]: e.FUNC_ADD, [SubtractEquation]: e.FUNC_SUBTRACT, [ReverseSubtractEquation]: e.FUNC_REVERSE_SUBTRACT };
    k[MinEquation] = e.MIN, k[MaxEquation] = e.MAX;
    const z = { [ZeroFactor]: e.ZERO, [OneFactor]: e.ONE, [SrcColorFactor]: e.SRC_COLOR, [SrcAlphaFactor]: e.SRC_ALPHA, [SrcAlphaSaturateFactor]: e.SRC_ALPHA_SATURATE, [DstColorFactor]: e.DST_COLOR, [DstAlphaFactor]: e.DST_ALPHA, [OneMinusSrcColorFactor]: e.ONE_MINUS_SRC_COLOR, [OneMinusSrcAlphaFactor]: e.ONE_MINUS_SRC_ALPHA, [OneMinusDstColorFactor]: e.ONE_MINUS_DST_COLOR, [OneMinusDstAlphaFactor]: e.ONE_MINUS_DST_ALPHA, [ConstantColorFactor]: e.CONSTANT_COLOR, [OneMinusConstantColorFactor]: e.ONE_MINUS_CONSTANT_COLOR, [ConstantAlphaFactor]: e.CONSTANT_ALPHA, [OneMinusConstantAlphaFactor]: e.ONE_MINUS_CONSTANT_ALPHA };
    function X(t2, n2, r2, a2, i2, o2, s2, l2, c2, d2) {
      if (t2 !== NoBlending) {
        if (false === p && (H(e.BLEND), p = true), t2 === CustomBlending) i2 = i2 || n2, o2 = o2 || r2, s2 = s2 || a2, n2 === _ && i2 === v || (e.blendEquationSeparate(k[n2], k[i2]), _ = n2, v = i2), r2 === h && a2 === g && o2 === S && s2 === E || (e.blendFuncSeparate(z[r2], z[a2], z[o2], z[s2]), h = r2, g = a2, S = o2, E = s2), false !== l2.equals(T) && c2 === M || (e.blendColor(l2.r, l2.g, l2.b, c2), T.copy(l2), M = c2), m = t2, x = false;
        else if (t2 !== m || d2 !== x) {
          if (_ === AddEquation && v === AddEquation || (e.blendEquation(e.FUNC_ADD), _ = AddEquation, v = AddEquation), d2) switch (t2) {
            case NormalBlending:
              e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
              break;
            case AdditiveBlending:
              e.blendFunc(e.ONE, e.ONE);
              break;
            case SubtractiveBlending:
              e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
              break;
            case MultiplyBlending:
              e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
              break;
            default:
              error("WebGLState: Invalid blending: ", t2);
          }
          else switch (t2) {
            case NormalBlending:
              e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
              break;
            case AdditiveBlending:
              e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
              break;
            case SubtractiveBlending:
              error("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case MultiplyBlending:
              error("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              error("WebGLState: Invalid blending: ", t2);
          }
          h = null, g = null, S = null, E = null, T.set(0, 0, 0), M = 0, m = t2, x = d2;
        }
      } else true === p && (W(e.BLEND), p = false);
    }
    function q(t2) {
      R !== t2 && (t2 ? e.frontFace(e.CW) : e.frontFace(e.CCW), R = t2);
    }
    function K(t2) {
      t2 !== CullFaceNone ? (H(e.CULL_FACE), t2 !== A && (t2 === CullFaceBack ? e.cullFace(e.BACK) : t2 === CullFaceFront ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : W(e.CULL_FACE), A = t2;
    }
    function Y(t2, n2, a2) {
      t2 ? (H(e.POLYGON_OFFSET_FILL), b === n2 && L === a2 || (b = n2, L = a2, r.getReversed() && (n2 = -n2), e.polygonOffset(n2, a2))) : W(e.POLYGON_OFFSET_FILL);
    }
    return { buffers: { color: n, depth: r, stencil: a }, enable: H, disable: W, bindFramebuffer: function(t2, n2) {
      return c[t2] !== n2 && (e.bindFramebuffer(t2, n2), c[t2] = n2, t2 === e.DRAW_FRAMEBUFFER && (c[e.FRAMEBUFFER] = n2), t2 === e.FRAMEBUFFER && (c[e.DRAW_FRAMEBUFFER] = n2), true);
    }, drawBuffers: function(t2, n2) {
      let r2 = u, a2 = false;
      if (t2) {
        r2 = d.get(n2), void 0 === r2 && (r2 = [], d.set(n2, r2));
        const i2 = t2.textures;
        if (r2.length !== i2.length || r2[0] !== e.COLOR_ATTACHMENT0) {
          for (let t3 = 0, n3 = i2.length; t3 < n3; t3++) r2[t3] = e.COLOR_ATTACHMENT0 + t3;
          r2.length = i2.length, a2 = true;
        }
      } else r2[0] !== e.BACK && (r2[0] = e.BACK, a2 = true);
      a2 && e.drawBuffers(r2);
    }, useProgram: function(t2) {
      return f !== t2 && (e.useProgram(t2), f = t2, true);
    }, setBlending: X, setMaterial: function(t2, i2) {
      t2.side === DoubleSide ? W(e.CULL_FACE) : H(e.CULL_FACE);
      let o2 = t2.side === BackSide;
      i2 && (o2 = !o2), q(o2), t2.blending === NormalBlending && false === t2.transparent ? X(NoBlending) : X(t2.blending, t2.blendEquation, t2.blendSrc, t2.blendDst, t2.blendEquationAlpha, t2.blendSrcAlpha, t2.blendDstAlpha, t2.blendColor, t2.blendAlpha, t2.premultipliedAlpha), r.setFunc(t2.depthFunc), r.setTest(t2.depthTest), r.setMask(t2.depthWrite), n.setMask(t2.colorWrite);
      const s2 = t2.stencilWrite;
      a.setTest(s2), s2 && (a.setMask(t2.stencilWriteMask), a.setFunc(t2.stencilFunc, t2.stencilRef, t2.stencilFuncMask), a.setOp(t2.stencilFail, t2.stencilZFail, t2.stencilZPass)), Y(t2.polygonOffset, t2.polygonOffsetFactor, t2.polygonOffsetUnits), true === t2.alphaToCoverage ? H(e.SAMPLE_ALPHA_TO_COVERAGE) : W(e.SAMPLE_ALPHA_TO_COVERAGE);
    }, setFlipSided: q, setCullFace: K, setLineWidth: function(t2) {
      t2 !== C && (U && e.lineWidth(t2), C = t2);
    }, setPolygonOffset: Y, setScissorTest: function(t2) {
      t2 ? H(e.SCISSOR_TEST) : W(e.SCISSOR_TEST);
    }, activeTexture: function(t2) {
      void 0 === t2 && (t2 = e.TEXTURE0 + P - 1), y !== t2 && (e.activeTexture(t2), y = t2);
    }, bindTexture: function(t2, n2, r2) {
      void 0 === r2 && (r2 = null === y ? e.TEXTURE0 + P - 1 : y);
      let a2 = N[r2];
      void 0 === a2 && (a2 = { type: void 0, texture: void 0 }, N[r2] = a2), a2.type === t2 && a2.texture === n2 || (y !== r2 && (e.activeTexture(r2), y = r2), e.bindTexture(t2, n2 || V[t2]), a2.type = t2, a2.texture = n2);
    }, unbindTexture: function() {
      const t2 = N[y];
      void 0 !== t2 && void 0 !== t2.type && (e.bindTexture(t2.type, null), t2.type = void 0, t2.texture = void 0);
    }, compressedTexImage2D: function() {
      try {
        e.compressedTexImage2D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, compressedTexImage3D: function() {
      try {
        e.compressedTexImage3D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, texImage2D: function() {
      try {
        e.texImage2D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, texImage3D: function() {
      try {
        e.texImage3D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, pixelStorei: function(t2, n2) {
      l[t2] !== n2 && (e.pixelStorei(t2, n2), l[t2] = n2);
    }, getParameter: function(t2) {
      return void 0 !== l[t2] ? l[t2] : e.getParameter(t2);
    }, updateUBOMapping: function(t2, n2) {
      let r2 = o.get(n2);
      void 0 === r2 && (r2 = /* @__PURE__ */ new WeakMap(), o.set(n2, r2));
      let a2 = r2.get(t2);
      void 0 === a2 && (a2 = e.getUniformBlockIndex(n2, t2.name), r2.set(t2, a2));
    }, uniformBlockBinding: function(t2, n2) {
      const r2 = o.get(n2).get(t2);
      i.get(n2) !== r2 && (e.uniformBlockBinding(n2, r2, t2.__bindingPointIndex), i.set(n2, r2));
    }, texStorage2D: function() {
      try {
        e.texStorage2D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, texStorage3D: function() {
      try {
        e.texStorage3D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, texSubImage2D: function() {
      try {
        e.texSubImage2D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, texSubImage3D: function() {
      try {
        e.texSubImage3D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, compressedTexSubImage2D: function() {
      try {
        e.compressedTexSubImage2D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, compressedTexSubImage3D: function() {
      try {
        e.compressedTexSubImage3D(...arguments);
      } catch (e2) {
        error("WebGLState:", e2);
      }
    }, scissor: function(t2) {
      false === O.equals(t2) && (e.scissor(t2.x, t2.y, t2.z, t2.w), O.copy(t2));
    }, viewport: function(t2) {
      false === G.equals(t2) && (e.viewport(t2.x, t2.y, t2.z, t2.w), G.copy(t2));
    }, reset: function() {
      e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(true, true, true, true), e.clearColor(0, 0, 0, 0), e.depthMask(true), e.depthFunc(e.LESS), r.setReversed(false), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, false), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), s = {}, l = {}, y = null, N = {}, c = {}, d = /* @__PURE__ */ new WeakMap(), u = [], f = null, p = false, m = null, _ = null, h = null, g = null, v = null, S = null, E = null, T = new Color(0, 0, 0), M = 0, x = false, R = null, A = null, C = null, b = null, L = null, O.set(0, 0, e.canvas.width, e.canvas.height), G.set(0, 0, e.canvas.width, e.canvas.height), n.reset(), r.reset(), a.reset();
    } };
  }
  function WebGLTextures(e, t, n, r, a, i, o) {
    const s = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = "undefined" != typeof navigator && /OculusBrowser/g.test(navigator.userAgent), c = new Vector2(), d = /* @__PURE__ */ new WeakMap(), u = /* @__PURE__ */ new Set();
    let f;
    const p = /* @__PURE__ */ new WeakMap();
    let m = false;
    try {
      m = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d");
    } catch (e2) {
    }
    function _(e2, t2) {
      return m ? new OffscreenCanvas(e2, t2) : createElementNS("canvas");
    }
    function h(e2, t2, n2) {
      let r2 = 1;
      const a2 = z(e2);
      if ((a2.width > n2 || a2.height > n2) && (r2 = n2 / Math.max(a2.width, a2.height)), r2 < 1) {
        if ("undefined" != typeof HTMLImageElement && e2 instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e2 instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e2 instanceof ImageBitmap || "undefined" != typeof VideoFrame && e2 instanceof VideoFrame) {
          const n3 = Math.floor(r2 * a2.width), i2 = Math.floor(r2 * a2.height);
          void 0 === f && (f = _(n3, i2));
          const o2 = t2 ? _(n3, i2) : f;
          o2.width = n3, o2.height = i2;
          return o2.getContext("2d").drawImage(e2, 0, 0, n3, i2), warn("WebGLRenderer: Texture has been resized from (" + a2.width + "x" + a2.height + ") to (" + n3 + "x" + i2 + ")."), o2;
        }
        return "data" in e2 && warn("WebGLRenderer: Image in DataTexture is too big (" + a2.width + "x" + a2.height + ")."), e2;
      }
      return e2;
    }
    function g(e2) {
      return e2.generateMipmaps;
    }
    function v(t2) {
      e.generateMipmap(t2);
    }
    function S(t2) {
      return t2.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t2.isWebGL3DRenderTarget ? e.TEXTURE_3D : t2.isWebGLArrayRenderTarget || t2.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
    }
    function E(n2, r2, a2, i2, o2, s2 = false) {
      if (null !== n2) {
        if (void 0 !== e[n2]) return e[n2];
        warn("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n2 + "'");
      }
      let l2;
      i2 && (l2 = t.get("EXT_texture_norm16"), l2 || warn("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
      let c2 = r2;
      if (r2 === e.RED && (a2 === e.FLOAT && (c2 = e.R32F), a2 === e.HALF_FLOAT && (c2 = e.R16F), a2 === e.UNSIGNED_BYTE && (c2 = e.R8), a2 === e.UNSIGNED_SHORT && l2 && (c2 = l2.R16_EXT), a2 === e.SHORT && l2 && (c2 = l2.R16_SNORM_EXT)), r2 === e.RED_INTEGER && (a2 === e.UNSIGNED_BYTE && (c2 = e.R8UI), a2 === e.UNSIGNED_SHORT && (c2 = e.R16UI), a2 === e.UNSIGNED_INT && (c2 = e.R32UI), a2 === e.BYTE && (c2 = e.R8I), a2 === e.SHORT && (c2 = e.R16I), a2 === e.INT && (c2 = e.R32I)), r2 === e.RG && (a2 === e.FLOAT && (c2 = e.RG32F), a2 === e.HALF_FLOAT && (c2 = e.RG16F), a2 === e.UNSIGNED_BYTE && (c2 = e.RG8), a2 === e.UNSIGNED_SHORT && l2 && (c2 = l2.RG16_EXT), a2 === e.SHORT && l2 && (c2 = l2.RG16_SNORM_EXT)), r2 === e.RG_INTEGER && (a2 === e.UNSIGNED_BYTE && (c2 = e.RG8UI), a2 === e.UNSIGNED_SHORT && (c2 = e.RG16UI), a2 === e.UNSIGNED_INT && (c2 = e.RG32UI), a2 === e.BYTE && (c2 = e.RG8I), a2 === e.SHORT && (c2 = e.RG16I), a2 === e.INT && (c2 = e.RG32I)), r2 === e.RGB_INTEGER && (a2 === e.UNSIGNED_BYTE && (c2 = e.RGB8UI), a2 === e.UNSIGNED_SHORT && (c2 = e.RGB16UI), a2 === e.UNSIGNED_INT && (c2 = e.RGB32UI), a2 === e.BYTE && (c2 = e.RGB8I), a2 === e.SHORT && (c2 = e.RGB16I), a2 === e.INT && (c2 = e.RGB32I)), r2 === e.RGBA_INTEGER && (a2 === e.UNSIGNED_BYTE && (c2 = e.RGBA8UI), a2 === e.UNSIGNED_SHORT && (c2 = e.RGBA16UI), a2 === e.UNSIGNED_INT && (c2 = e.RGBA32UI), a2 === e.BYTE && (c2 = e.RGBA8I), a2 === e.SHORT && (c2 = e.RGBA16I), a2 === e.INT && (c2 = e.RGBA32I)), r2 === e.RGB && (a2 === e.UNSIGNED_SHORT && l2 && (c2 = l2.RGB16_EXT), a2 === e.SHORT && l2 && (c2 = l2.RGB16_SNORM_EXT), a2 === e.UNSIGNED_INT_5_9_9_9_REV && (c2 = e.RGB9_E5), a2 === e.UNSIGNED_INT_10F_11F_11F_REV && (c2 = e.R11F_G11F_B10F)), r2 === e.RGBA) {
        const t2 = s2 ? LinearTransfer : ColorManagement.getTransfer(o2);
        a2 === e.FLOAT && (c2 = e.RGBA32F), a2 === e.HALF_FLOAT && (c2 = e.RGBA16F), a2 === e.UNSIGNED_BYTE && (c2 = t2 === SRGBTransfer ? e.SRGB8_ALPHA8 : e.RGBA8), a2 === e.UNSIGNED_SHORT && l2 && (c2 = l2.RGBA16_EXT), a2 === e.SHORT && l2 && (c2 = l2.RGBA16_SNORM_EXT), a2 === e.UNSIGNED_SHORT_4_4_4_4 && (c2 = e.RGBA4), a2 === e.UNSIGNED_SHORT_5_5_5_1 && (c2 = e.RGB5_A1);
      }
      return c2 !== e.R16F && c2 !== e.R32F && c2 !== e.RG16F && c2 !== e.RG32F && c2 !== e.RGBA16F && c2 !== e.RGBA32F || t.get("EXT_color_buffer_float"), c2;
    }
    function T(t2, n2) {
      let r2;
      return t2 ? null === n2 || n2 === UnsignedIntType || n2 === UnsignedInt248Type ? r2 = e.DEPTH24_STENCIL8 : n2 === FloatType ? r2 = e.DEPTH32F_STENCIL8 : n2 === UnsignedShortType && (r2 = e.DEPTH24_STENCIL8, warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : null === n2 || n2 === UnsignedIntType || n2 === UnsignedInt248Type ? r2 = e.DEPTH_COMPONENT24 : n2 === FloatType ? r2 = e.DEPTH_COMPONENT32F : n2 === UnsignedShortType && (r2 = e.DEPTH_COMPONENT16), r2;
    }
    function M(e2, t2) {
      return true === g(e2) || e2.isFramebufferTexture && e2.minFilter !== NearestFilter && e2.minFilter !== LinearFilter ? Math.log2(Math.max(t2.width, t2.height)) + 1 : void 0 !== e2.mipmaps && e2.mipmaps.length > 0 ? e2.mipmaps.length : e2.isCompressedTexture && Array.isArray(e2.image) ? t2.mipmaps.length : 1;
    }
    function x(e2) {
      const t2 = e2.target;
      t2.removeEventListener("dispose", x), (function(e3) {
        const t3 = r.get(e3);
        if (void 0 === t3.__webglInit) return;
        const n2 = e3.source, a2 = p.get(n2);
        if (a2) {
          const r2 = a2[t3.__cacheKey];
          r2.usedTimes--, 0 === r2.usedTimes && A(e3), 0 === Object.keys(a2).length && p.delete(n2);
        }
        r.remove(e3);
      })(t2), t2.isVideoTexture && d.delete(t2), t2.isHTMLTexture && u.delete(t2);
    }
    function R(t2) {
      const n2 = t2.target;
      n2.removeEventListener("dispose", R), (function(t3) {
        const n3 = r.get(t3);
        t3.depthTexture && (t3.depthTexture.dispose(), r.remove(t3.depthTexture));
        if (t3.isWebGLCubeRenderTarget) for (let t4 = 0; t4 < 6; t4++) {
          if (Array.isArray(n3.__webglFramebuffer[t4])) for (let r2 = 0; r2 < n3.__webglFramebuffer[t4].length; r2++) e.deleteFramebuffer(n3.__webglFramebuffer[t4][r2]);
          else e.deleteFramebuffer(n3.__webglFramebuffer[t4]);
          n3.__webglDepthbuffer && e.deleteRenderbuffer(n3.__webglDepthbuffer[t4]);
        }
        else {
          if (Array.isArray(n3.__webglFramebuffer)) for (let t4 = 0; t4 < n3.__webglFramebuffer.length; t4++) e.deleteFramebuffer(n3.__webglFramebuffer[t4]);
          else e.deleteFramebuffer(n3.__webglFramebuffer);
          if (n3.__webglDepthbuffer && e.deleteRenderbuffer(n3.__webglDepthbuffer), n3.__webglMultisampledFramebuffer && e.deleteFramebuffer(n3.__webglMultisampledFramebuffer), n3.__webglColorRenderbuffer) for (let t4 = 0; t4 < n3.__webglColorRenderbuffer.length; t4++) n3.__webglColorRenderbuffer[t4] && e.deleteRenderbuffer(n3.__webglColorRenderbuffer[t4]);
          n3.__webglDepthRenderbuffer && e.deleteRenderbuffer(n3.__webglDepthRenderbuffer);
        }
        const a2 = t3.textures;
        for (let t4 = 0, n4 = a2.length; t4 < n4; t4++) {
          const n5 = r.get(a2[t4]);
          n5.__webglTexture && (e.deleteTexture(n5.__webglTexture), o.memory.textures--), r.remove(a2[t4]);
        }
        r.remove(t3);
      })(n2);
    }
    function A(t2) {
      const n2 = r.get(t2);
      e.deleteTexture(n2.__webglTexture);
      const a2 = t2.source;
      delete p.get(a2)[n2.__cacheKey], o.memory.textures--;
    }
    let C = 0;
    function b(t2, a2) {
      const i2 = r.get(t2);
      if (t2.isVideoTexture && (function(e2) {
        const t3 = o.render.frame;
        d.get(e2) !== t3 && (d.set(e2, t3), e2.update());
      })(t2), false === t2.isRenderTargetTexture && true !== t2.isExternalTexture && t2.version > 0 && i2.__version !== t2.version) {
        const e2 = t2.image;
        if (null === e2) warn("WebGLRenderer: Texture marked for update but no image data found.");
        else {
          if (false !== e2.complete) return void N(i2, t2, a2);
          warn("WebGLRenderer: Texture marked for update but image is incomplete");
        }
      } else t2.isExternalTexture && (i2.__webglTexture = t2.sourceTexture ? t2.sourceTexture : null);
      n.bindTexture(e.TEXTURE_2D, i2.__webglTexture, e.TEXTURE0 + a2);
    }
    const L = { [RepeatWrapping]: e.REPEAT, [ClampToEdgeWrapping]: e.CLAMP_TO_EDGE, [MirroredRepeatWrapping]: e.MIRRORED_REPEAT }, P = { [NearestFilter]: e.NEAREST, [NearestMipmapNearestFilter]: e.NEAREST_MIPMAP_NEAREST, [NearestMipmapLinearFilter]: e.NEAREST_MIPMAP_LINEAR, [LinearFilter]: e.LINEAR, [LinearMipmapNearestFilter]: e.LINEAR_MIPMAP_NEAREST, [LinearMipmapLinearFilter]: e.LINEAR_MIPMAP_LINEAR }, U = { [NeverCompare]: e.NEVER, [AlwaysCompare]: e.ALWAYS, [LessCompare]: e.LESS, [LessEqualCompare]: e.LEQUAL, [EqualCompare]: e.EQUAL, [GreaterEqualCompare]: e.GEQUAL, [GreaterCompare]: e.GREATER, [NotEqualCompare]: e.NOTEQUAL };
    function D(n2, i2) {
      if (i2.type !== FloatType || false !== t.has("OES_texture_float_linear") || i2.magFilter !== LinearFilter && i2.magFilter !== LinearMipmapNearestFilter && i2.magFilter !== NearestMipmapLinearFilter && i2.magFilter !== LinearMipmapLinearFilter && i2.minFilter !== LinearFilter && i2.minFilter !== LinearMipmapNearestFilter && i2.minFilter !== NearestMipmapLinearFilter && i2.minFilter !== LinearMipmapLinearFilter || warn("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(n2, e.TEXTURE_WRAP_S, L[i2.wrapS]), e.texParameteri(n2, e.TEXTURE_WRAP_T, L[i2.wrapT]), n2 !== e.TEXTURE_3D && n2 !== e.TEXTURE_2D_ARRAY || e.texParameteri(n2, e.TEXTURE_WRAP_R, L[i2.wrapR]), e.texParameteri(n2, e.TEXTURE_MAG_FILTER, P[i2.magFilter]), e.texParameteri(n2, e.TEXTURE_MIN_FILTER, P[i2.minFilter]), i2.compareFunction && (e.texParameteri(n2, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n2, e.TEXTURE_COMPARE_FUNC, U[i2.compareFunction])), true === t.has("EXT_texture_filter_anisotropic")) {
        if (i2.magFilter === NearestFilter) return;
        if (i2.minFilter !== NearestMipmapLinearFilter && i2.minFilter !== LinearMipmapLinearFilter) return;
        if (i2.type === FloatType && false === t.has("OES_texture_float_linear")) return;
        if (i2.anisotropy > 1 || r.get(i2).__currentAnisotropy) {
          const o2 = t.get("EXT_texture_filter_anisotropic");
          e.texParameterf(n2, o2.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(i2.anisotropy, a.getMaxAnisotropy())), r.get(i2).__currentAnisotropy = i2.anisotropy;
        }
      }
    }
    function w(t2, n2) {
      let r2 = false;
      void 0 === t2.__webglInit && (t2.__webglInit = true, n2.addEventListener("dispose", x));
      const a2 = n2.source;
      let i2 = p.get(a2);
      void 0 === i2 && (i2 = {}, p.set(a2, i2));
      const s2 = (function(e2) {
        const t3 = [];
        return t3.push(e2.wrapS), t3.push(e2.wrapT), t3.push(e2.wrapR || 0), t3.push(e2.magFilter), t3.push(e2.minFilter), t3.push(e2.anisotropy), t3.push(e2.internalFormat), t3.push(e2.format), t3.push(e2.type), t3.push(e2.generateMipmaps), t3.push(e2.premultiplyAlpha), t3.push(e2.flipY), t3.push(e2.unpackAlignment), t3.push(e2.colorSpace), t3.join();
      })(n2);
      if (s2 !== t2.__cacheKey) {
        void 0 === i2[s2] && (i2[s2] = { texture: e.createTexture(), usedTimes: 0 }, o.memory.textures++, r2 = true), i2[s2].usedTimes++;
        const a3 = i2[t2.__cacheKey];
        void 0 !== a3 && (i2[t2.__cacheKey].usedTimes--, 0 === a3.usedTimes && A(n2)), t2.__cacheKey = s2, t2.__webglTexture = i2[s2].texture;
      }
      return r2;
    }
    function y(e2, t2, n2) {
      return Math.floor(Math.floor(e2 / n2) / t2);
    }
    function N(t2, o2, s2) {
      let l2 = e.TEXTURE_2D;
      (o2.isDataArrayTexture || o2.isCompressedArrayTexture) && (l2 = e.TEXTURE_2D_ARRAY), o2.isData3DTexture && (l2 = e.TEXTURE_3D);
      const c2 = w(t2, o2), d2 = o2.source;
      n.bindTexture(l2, t2.__webglTexture, e.TEXTURE0 + s2);
      const f2 = r.get(d2);
      if (d2.version !== f2.__version || true === c2) {
        n.activeTexture(e.TEXTURE0 + s2);
        if (false === ("undefined" != typeof ImageBitmap && o2.image instanceof ImageBitmap)) {
          const t4 = ColorManagement.getPrimaries(ColorManagement.workingColorSpace), r3 = o2.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries(o2.colorSpace), a2 = o2.colorSpace === NoColorSpace || t4 === r3 ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
          n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o2.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o2.premultiplyAlpha), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, a2);
        }
        n.pixelStorei(e.UNPACK_ALIGNMENT, o2.unpackAlignment);
        let t3 = h(o2.image, false, a.maxTextureSize);
        t3 = k(o2, t3);
        const r2 = i.convert(o2.format, o2.colorSpace), p2 = i.convert(o2.type);
        let m2, _2 = E(o2.internalFormat, r2, p2, o2.normalized, o2.colorSpace, o2.isVideoTexture);
        D(l2, o2);
        const S2 = o2.mipmaps, x2 = true !== o2.isVideoTexture, R2 = void 0 === f2.__version || true === c2, A2 = d2.dataReady, C2 = M(o2, t3);
        if (o2.isDepthTexture) _2 = T(o2.format === DepthStencilFormat, o2.type), R2 && (x2 ? n.texStorage2D(e.TEXTURE_2D, 1, _2, t3.width, t3.height) : n.texImage2D(e.TEXTURE_2D, 0, _2, t3.width, t3.height, 0, r2, p2, null));
        else if (o2.isDataTexture) if (S2.length > 0) {
          x2 && R2 && n.texStorage2D(e.TEXTURE_2D, C2, _2, S2[0].width, S2[0].height);
          for (let t4 = 0, a2 = S2.length; t4 < a2; t4++) m2 = S2[t4], x2 ? A2 && n.texSubImage2D(e.TEXTURE_2D, t4, 0, 0, m2.width, m2.height, r2, p2, m2.data) : n.texImage2D(e.TEXTURE_2D, t4, _2, m2.width, m2.height, 0, r2, p2, m2.data);
          o2.generateMipmaps = false;
        } else x2 ? (R2 && n.texStorage2D(e.TEXTURE_2D, C2, _2, t3.width, t3.height), A2 && (function(t4, r3, a2, i2) {
          const o3 = t4.updateRanges;
          if (0 === o3.length) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r3.width, r3.height, a2, i2, r3.data);
          else {
            o3.sort((e2, t5) => e2.start - t5.start);
            let s3 = 0;
            for (let e2 = 1; e2 < o3.length; e2++) {
              const t5 = o3[s3], n2 = o3[e2], a3 = t5.start + t5.count, i3 = y(n2.start, r3.width, 4), l4 = y(t5.start, r3.width, 4);
              n2.start <= a3 + 1 && i3 === l4 && y(n2.start + n2.count - 1, r3.width, 4) === i3 ? t5.count = Math.max(t5.count, n2.start + n2.count - t5.start) : (++s3, o3[s3] = n2);
            }
            o3.length = s3 + 1;
            const l3 = n.getParameter(e.UNPACK_ROW_LENGTH), c3 = n.getParameter(e.UNPACK_SKIP_PIXELS), d3 = n.getParameter(e.UNPACK_SKIP_ROWS);
            n.pixelStorei(e.UNPACK_ROW_LENGTH, r3.width);
            for (let t5 = 0, s4 = o3.length; t5 < s4; t5++) {
              const s5 = o3[t5], l4 = Math.floor(s5.start / 4), c4 = Math.ceil(s5.count / 4), d4 = l4 % r3.width, u2 = Math.floor(l4 / r3.width), f3 = c4, p3 = 1;
              n.pixelStorei(e.UNPACK_SKIP_PIXELS, d4), n.pixelStorei(e.UNPACK_SKIP_ROWS, u2), n.texSubImage2D(e.TEXTURE_2D, 0, d4, u2, f3, p3, a2, i2, r3.data);
            }
            t4.clearUpdateRanges(), n.pixelStorei(e.UNPACK_ROW_LENGTH, l3), n.pixelStorei(e.UNPACK_SKIP_PIXELS, c3), n.pixelStorei(e.UNPACK_SKIP_ROWS, d3);
          }
        })(o2, t3, r2, p2)) : n.texImage2D(e.TEXTURE_2D, 0, _2, t3.width, t3.height, 0, r2, p2, t3.data);
        else if (o2.isCompressedTexture) if (o2.isCompressedArrayTexture) {
          x2 && R2 && n.texStorage3D(e.TEXTURE_2D_ARRAY, C2, _2, S2[0].width, S2[0].height, t3.depth);
          for (let a2 = 0, i2 = S2.length; a2 < i2; a2++) if (m2 = S2[a2], o2.format !== RGBAFormat) if (null !== r2) if (x2) {
            if (A2) if (o2.layerUpdates.size > 0) {
              const t4 = getByteLength(m2.width, m2.height, o2.format, o2.type);
              for (const i3 of o2.layerUpdates) {
                const o3 = m2.data.subarray(i3 * t4 / m2.data.BYTES_PER_ELEMENT, (i3 + 1) * t4 / m2.data.BYTES_PER_ELEMENT);
                n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, a2, 0, 0, i3, m2.width, m2.height, 1, r2, o3);
              }
            } else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, a2, 0, 0, 0, m2.width, m2.height, t3.depth, r2, m2.data);
          } else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, a2, _2, m2.width, m2.height, t3.depth, 0, m2.data, 0, 0);
          else warn("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else x2 ? A2 && n.texSubImage3D(e.TEXTURE_2D_ARRAY, a2, 0, 0, 0, m2.width, m2.height, t3.depth, r2, p2, m2.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, a2, _2, m2.width, m2.height, t3.depth, 0, r2, p2, m2.data);
          o2.layerUpdates.size > 0 && o2.clearLayerUpdates();
        } else {
          x2 && R2 && n.texStorage2D(e.TEXTURE_2D, C2, _2, S2[0].width, S2[0].height);
          for (let t4 = 0, a2 = S2.length; t4 < a2; t4++) m2 = S2[t4], o2.format !== RGBAFormat ? null !== r2 ? x2 ? A2 && n.compressedTexSubImage2D(e.TEXTURE_2D, t4, 0, 0, m2.width, m2.height, r2, m2.data) : n.compressedTexImage2D(e.TEXTURE_2D, t4, _2, m2.width, m2.height, 0, m2.data) : warn("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : x2 ? A2 && n.texSubImage2D(e.TEXTURE_2D, t4, 0, 0, m2.width, m2.height, r2, p2, m2.data) : n.texImage2D(e.TEXTURE_2D, t4, _2, m2.width, m2.height, 0, r2, p2, m2.data);
        }
        else if (o2.isDataArrayTexture) if (x2) {
          if (R2 && n.texStorage3D(e.TEXTURE_2D_ARRAY, C2, _2, t3.width, t3.height, t3.depth), A2) if (o2.layerUpdates.size > 0) {
            const a2 = getByteLength(t3.width, t3.height, o2.format, o2.type);
            for (const i2 of o2.layerUpdates) {
              const o3 = t3.data.subarray(i2 * a2 / t3.data.BYTES_PER_ELEMENT, (i2 + 1) * a2 / t3.data.BYTES_PER_ELEMENT);
              n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, i2, t3.width, t3.height, 1, r2, p2, o3);
            }
            o2.clearLayerUpdates();
          } else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t3.width, t3.height, t3.depth, r2, p2, t3.data);
        } else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, _2, t3.width, t3.height, t3.depth, 0, r2, p2, t3.data);
        else if (o2.isData3DTexture) x2 ? (R2 && n.texStorage3D(e.TEXTURE_3D, C2, _2, t3.width, t3.height, t3.depth), A2 && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t3.width, t3.height, t3.depth, r2, p2, t3.data)) : n.texImage3D(e.TEXTURE_3D, 0, _2, t3.width, t3.height, t3.depth, 0, r2, p2, t3.data);
        else if (o2.isFramebufferTexture) {
          if (R2) if (x2) n.texStorage2D(e.TEXTURE_2D, C2, _2, t3.width, t3.height);
          else {
            let a2 = t3.width, i2 = t3.height;
            for (let t4 = 0; t4 < C2; t4++) n.texImage2D(e.TEXTURE_2D, t4, _2, a2, i2, 0, r2, p2, null), a2 >>= 1, i2 >>= 1;
          }
        } else if (o2.isHTMLTexture) {
          if ("texElementImage2D" in e) {
            const n2 = e.canvas;
            if (n2.hasAttribute("layoutsubtree") || n2.setAttribute("layoutsubtree", "true"), t3.parentNode !== n2) return n2.appendChild(t3), u.add(o2), n2.onpaint = (e2) => {
              const t4 = e2.changedElements;
              for (const e3 of u) t4.includes(e3.image) && (e3.needsUpdate = true);
            }, void n2.requestPaint();
            if (3 === e.texElementImage2D.length) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, t3);
            else {
              const n3 = 0, r3 = e.RGBA, a2 = e.RGBA, i2 = e.UNSIGNED_BYTE;
              e.texElementImage2D(e.TEXTURE_2D, n3, r3, a2, i2, t3);
            }
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
          }
        } else if (S2.length > 0) {
          if (x2 && R2) {
            const t4 = z(S2[0]);
            n.texStorage2D(e.TEXTURE_2D, C2, _2, t4.width, t4.height);
          }
          for (let t4 = 0, a2 = S2.length; t4 < a2; t4++) m2 = S2[t4], x2 ? A2 && n.texSubImage2D(e.TEXTURE_2D, t4, 0, 0, r2, p2, m2) : n.texImage2D(e.TEXTURE_2D, t4, _2, r2, p2, m2);
          o2.generateMipmaps = false;
        } else if (x2) {
          if (R2) {
            const r3 = z(t3);
            n.texStorage2D(e.TEXTURE_2D, C2, _2, r3.width, r3.height);
          }
          A2 && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r2, p2, t3);
        } else n.texImage2D(e.TEXTURE_2D, 0, _2, r2, p2, t3);
        g(o2) && v(l2), f2.__version = d2.version, o2.onUpdate && o2.onUpdate(o2);
      }
      t2.__version = o2.version;
    }
    function I(t2, a2, o2, l2, c2, d2) {
      const u2 = i.convert(o2.format, o2.colorSpace), f2 = i.convert(o2.type), p2 = E(o2.internalFormat, u2, f2, o2.normalized, o2.colorSpace), m2 = r.get(a2), _2 = r.get(o2);
      if (_2.__renderTarget = a2, !m2.__hasExternalTextures) {
        const t3 = Math.max(1, a2.width >> d2), r2 = Math.max(1, a2.height >> d2);
        c2 === e.TEXTURE_3D || c2 === e.TEXTURE_2D_ARRAY ? n.texImage3D(c2, d2, p2, t3, r2, a2.depth, 0, u2, f2, null) : n.texImage2D(c2, d2, p2, t3, r2, 0, u2, f2, null);
      }
      n.bindFramebuffer(e.FRAMEBUFFER, t2), W(a2) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, l2, c2, _2.__webglTexture, 0, H(a2)) : (c2 === e.TEXTURE_2D || c2 >= e.TEXTURE_CUBE_MAP_POSITIVE_X && c2 <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, l2, c2, _2.__webglTexture, d2), n.bindFramebuffer(e.FRAMEBUFFER, null);
    }
    function F(t2, n2, r2) {
      if (e.bindRenderbuffer(e.RENDERBUFFER, t2), n2.depthBuffer) {
        const a2 = n2.depthTexture, i2 = a2 && a2.isDepthTexture ? a2.type : null, o2 = T(n2.stencilBuffer, i2), l2 = n2.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        W(n2) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, H(n2), o2, n2.width, n2.height) : r2 ? e.renderbufferStorageMultisample(e.RENDERBUFFER, H(n2), o2, n2.width, n2.height) : e.renderbufferStorage(e.RENDERBUFFER, o2, n2.width, n2.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, l2, e.RENDERBUFFER, t2);
      } else {
        const t3 = n2.textures;
        for (let a2 = 0; a2 < t3.length; a2++) {
          const o2 = t3[a2], l2 = i.convert(o2.format, o2.colorSpace), c2 = i.convert(o2.type), d2 = E(o2.internalFormat, l2, c2, o2.normalized, o2.colorSpace);
          W(n2) ? s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, H(n2), d2, n2.width, n2.height) : r2 ? e.renderbufferStorageMultisample(e.RENDERBUFFER, H(n2), d2, n2.width, n2.height) : e.renderbufferStorage(e.RENDERBUFFER, d2, n2.width, n2.height);
        }
      }
      e.bindRenderbuffer(e.RENDERBUFFER, null);
    }
    function O(t2, a2, o2) {
      const l2 = true === a2.isWebGLCubeRenderTarget;
      if (n.bindFramebuffer(e.FRAMEBUFFER, t2), !a2.depthTexture || !a2.depthTexture.isDepthTexture) throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
      const c2 = r.get(a2.depthTexture);
      if (c2.__renderTarget = a2, c2.__webglTexture && a2.depthTexture.image.width === a2.width && a2.depthTexture.image.height === a2.height || (a2.depthTexture.image.width = a2.width, a2.depthTexture.image.height = a2.height, a2.depthTexture.needsUpdate = true), l2) {
        if (void 0 === c2.__webglInit && (c2.__webglInit = true, a2.depthTexture.addEventListener("dispose", x)), void 0 === c2.__webglTexture) {
          c2.__webglTexture = e.createTexture(), n.bindTexture(e.TEXTURE_CUBE_MAP, c2.__webglTexture), D(e.TEXTURE_CUBE_MAP, a2.depthTexture);
          const t3 = i.convert(a2.depthTexture.format), r2 = i.convert(a2.depthTexture.type);
          let o3;
          a2.depthTexture.format === DepthFormat ? o3 = e.DEPTH_COMPONENT24 : a2.depthTexture.format === DepthStencilFormat && (o3 = e.DEPTH24_STENCIL8);
          for (let n2 = 0; n2 < 6; n2++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + n2, 0, o3, a2.width, a2.height, 0, t3, r2, null);
        }
      } else b(a2.depthTexture, 0);
      const d2 = c2.__webglTexture, u2 = H(a2), f2 = l2 ? e.TEXTURE_CUBE_MAP_POSITIVE_X + o2 : e.TEXTURE_2D, p2 = a2.depthTexture.format === DepthStencilFormat ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      if (a2.depthTexture.format === DepthFormat) W(a2) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p2, f2, d2, 0, u2) : e.framebufferTexture2D(e.FRAMEBUFFER, p2, f2, d2, 0);
      else {
        if (a2.depthTexture.format !== DepthStencilFormat) throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
        W(a2) ? s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, p2, f2, d2, 0, u2) : e.framebufferTexture2D(e.FRAMEBUFFER, p2, f2, d2, 0);
      }
    }
    function G(t2) {
      const a2 = r.get(t2), i2 = true === t2.isWebGLCubeRenderTarget;
      if (a2.__boundDepthTexture !== t2.depthTexture) {
        const e2 = t2.depthTexture;
        if (a2.__depthDisposeCallback && a2.__depthDisposeCallback(), e2) {
          const t3 = () => {
            delete a2.__boundDepthTexture, delete a2.__depthDisposeCallback, e2.removeEventListener("dispose", t3);
          };
          e2.addEventListener("dispose", t3), a2.__depthDisposeCallback = t3;
        }
        a2.__boundDepthTexture = e2;
      }
      if (t2.depthTexture && !a2.__autoAllocateDepthBuffer) if (i2) for (let e2 = 0; e2 < 6; e2++) O(a2.__webglFramebuffer[e2], t2, e2);
      else {
        const e2 = t2.texture.mipmaps;
        e2 && e2.length > 0 ? O(a2.__webglFramebuffer[0], t2, 0) : O(a2.__webglFramebuffer, t2, 0);
      }
      else if (i2) {
        a2.__webglDepthbuffer = [];
        for (let r2 = 0; r2 < 6; r2++) if (n.bindFramebuffer(e.FRAMEBUFFER, a2.__webglFramebuffer[r2]), void 0 === a2.__webglDepthbuffer[r2]) a2.__webglDepthbuffer[r2] = e.createRenderbuffer(), F(a2.__webglDepthbuffer[r2], t2, false);
        else {
          const n2 = t2.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, i3 = a2.__webglDepthbuffer[r2];
          e.bindRenderbuffer(e.RENDERBUFFER, i3), e.framebufferRenderbuffer(e.FRAMEBUFFER, n2, e.RENDERBUFFER, i3);
        }
      } else {
        const r2 = t2.texture.mipmaps;
        if (r2 && r2.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, a2.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, a2.__webglFramebuffer), void 0 === a2.__webglDepthbuffer) a2.__webglDepthbuffer = e.createRenderbuffer(), F(a2.__webglDepthbuffer, t2, false);
        else {
          const n2 = t2.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, r3 = a2.__webglDepthbuffer;
          e.bindRenderbuffer(e.RENDERBUFFER, r3), e.framebufferRenderbuffer(e.FRAMEBUFFER, n2, e.RENDERBUFFER, r3);
        }
      }
      n.bindFramebuffer(e.FRAMEBUFFER, null);
    }
    const B = [], V = [];
    function H(e2) {
      return Math.min(a.maxSamples, e2.samples);
    }
    function W(e2) {
      const n2 = r.get(e2);
      return e2.samples > 0 && true === t.has("WEBGL_multisampled_render_to_texture") && false !== n2.__useRenderToTexture;
    }
    function k(e2, t2) {
      const n2 = e2.colorSpace, r2 = e2.format, a2 = e2.type;
      return true === e2.isCompressedTexture || true === e2.isVideoTexture || n2 !== LinearSRGBColorSpace && n2 !== NoColorSpace && (ColorManagement.getTransfer(n2) === SRGBTransfer ? r2 === RGBAFormat && a2 === UnsignedByteType || warn("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : error("WebGLTextures: Unsupported texture color space:", n2)), t2;
    }
    function z(e2) {
      return "undefined" != typeof HTMLImageElement && e2 instanceof HTMLImageElement ? (c.width = e2.naturalWidth || e2.width, c.height = e2.naturalHeight || e2.height) : "undefined" != typeof VideoFrame && e2 instanceof VideoFrame ? (c.width = e2.displayWidth, c.height = e2.displayHeight) : (c.width = e2.width, c.height = e2.height), c;
    }
    this.allocateTextureUnit = function() {
      const e2 = C;
      return e2 >= a.maxTextures && warn("WebGLTextures: Trying to use " + (e2 + 1) + " texture units while this GPU supports only " + a.maxTextures), C += 1, e2;
    }, this.resetTextureUnits = function() {
      C = 0;
    }, this.getTextureUnits = function() {
      return C;
    }, this.setTextureUnits = function(e2) {
      C = e2;
    }, this.setTexture2D = b, this.setTexture2DArray = function(t2, a2) {
      const i2 = r.get(t2);
      false === t2.isRenderTargetTexture && t2.version > 0 && i2.__version !== t2.version ? N(i2, t2, a2) : (t2.isExternalTexture && (i2.__webglTexture = t2.sourceTexture ? t2.sourceTexture : null), n.bindTexture(e.TEXTURE_2D_ARRAY, i2.__webglTexture, e.TEXTURE0 + a2));
    }, this.setTexture3D = function(t2, a2) {
      const i2 = r.get(t2);
      false === t2.isRenderTargetTexture && t2.version > 0 && i2.__version !== t2.version ? N(i2, t2, a2) : n.bindTexture(e.TEXTURE_3D, i2.__webglTexture, e.TEXTURE0 + a2);
    }, this.setTextureCube = function(t2, o2) {
      const s2 = r.get(t2);
      true !== t2.isCubeDepthTexture && t2.version > 0 && s2.__version !== t2.version ? (function(t3, o3, s3) {
        if (6 !== o3.image.length) return;
        const l2 = w(t3, o3), c2 = o3.source;
        n.bindTexture(e.TEXTURE_CUBE_MAP, t3.__webglTexture, e.TEXTURE0 + s3);
        const d2 = r.get(c2);
        if (c2.version !== d2.__version || true === l2) {
          n.activeTexture(e.TEXTURE0 + s3);
          const t4 = ColorManagement.getPrimaries(ColorManagement.workingColorSpace), r2 = o3.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries(o3.colorSpace), u2 = o3.colorSpace === NoColorSpace || t4 === r2 ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
          n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o3.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o3.premultiplyAlpha), n.pixelStorei(e.UNPACK_ALIGNMENT, o3.unpackAlignment), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, u2);
          const f2 = o3.isCompressedTexture || o3.image[0].isCompressedTexture, p2 = o3.image[0] && o3.image[0].isDataTexture, m2 = [];
          for (let e2 = 0; e2 < 6; e2++) m2[e2] = f2 || p2 ? p2 ? o3.image[e2].image : o3.image[e2] : h(o3.image[e2], true, a.maxCubemapSize), m2[e2] = k(o3, m2[e2]);
          const _2 = m2[0], S2 = i.convert(o3.format, o3.colorSpace), T2 = i.convert(o3.type), x2 = E(o3.internalFormat, S2, T2, o3.normalized, o3.colorSpace), R2 = true !== o3.isVideoTexture, A2 = void 0 === d2.__version || true === l2, C2 = c2.dataReady;
          let b2, L2 = M(o3, _2);
          if (D(e.TEXTURE_CUBE_MAP, o3), f2) {
            R2 && A2 && n.texStorage2D(e.TEXTURE_CUBE_MAP, L2, x2, _2.width, _2.height);
            for (let t5 = 0; t5 < 6; t5++) {
              b2 = m2[t5].mipmaps;
              for (let r3 = 0; r3 < b2.length; r3++) {
                const a2 = b2[r3];
                o3.format !== RGBAFormat ? null !== S2 ? R2 ? C2 && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3, 0, 0, a2.width, a2.height, S2, a2.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3, x2, a2.width, a2.height, 0, a2.data) : warn("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : R2 ? C2 && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3, 0, 0, a2.width, a2.height, S2, T2, a2.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3, x2, a2.width, a2.height, 0, S2, T2, a2.data);
              }
            }
          } else {
            if (b2 = o3.mipmaps, R2 && A2) {
              b2.length > 0 && L2++;
              const t5 = z(m2[0]);
              n.texStorage2D(e.TEXTURE_CUBE_MAP, L2, x2, t5.width, t5.height);
            }
            for (let t5 = 0; t5 < 6; t5++) if (p2) {
              R2 ? C2 && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, 0, 0, 0, m2[t5].width, m2[t5].height, S2, T2, m2[t5].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, 0, x2, m2[t5].width, m2[t5].height, 0, S2, T2, m2[t5].data);
              for (let r3 = 0; r3 < b2.length; r3++) {
                const a2 = b2[r3].image[t5].image;
                R2 ? C2 && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3 + 1, 0, 0, a2.width, a2.height, S2, T2, a2.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3 + 1, x2, a2.width, a2.height, 0, S2, T2, a2.data);
              }
            } else {
              R2 ? C2 && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, 0, 0, 0, S2, T2, m2[t5]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, 0, x2, S2, T2, m2[t5]);
              for (let r3 = 0; r3 < b2.length; r3++) {
                const a2 = b2[r3];
                R2 ? C2 && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3 + 1, 0, 0, S2, T2, a2.image[t5]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t5, r3 + 1, x2, S2, T2, a2.image[t5]);
              }
            }
          }
          g(o3) && v(e.TEXTURE_CUBE_MAP), d2.__version = c2.version, o3.onUpdate && o3.onUpdate(o3);
        }
        t3.__version = o3.version;
      })(s2, t2, o2) : n.bindTexture(e.TEXTURE_CUBE_MAP, s2.__webglTexture, e.TEXTURE0 + o2);
    }, this.rebindTextures = function(t2, n2, a2) {
      const i2 = r.get(t2);
      void 0 !== n2 && I(i2.__webglFramebuffer, t2, t2.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), void 0 !== a2 && G(t2);
    }, this.setupRenderTarget = function(t2) {
      const a2 = t2.texture, s2 = r.get(t2), l2 = r.get(a2);
      t2.addEventListener("dispose", R);
      const c2 = t2.textures, d2 = true === t2.isWebGLCubeRenderTarget, u2 = c2.length > 1;
      if (u2 || (void 0 === l2.__webglTexture && (l2.__webglTexture = e.createTexture()), l2.__version = a2.version, o.memory.textures++), d2) {
        s2.__webglFramebuffer = [];
        for (let t3 = 0; t3 < 6; t3++) if (a2.mipmaps && a2.mipmaps.length > 0) {
          s2.__webglFramebuffer[t3] = [];
          for (let n2 = 0; n2 < a2.mipmaps.length; n2++) s2.__webglFramebuffer[t3][n2] = e.createFramebuffer();
        } else s2.__webglFramebuffer[t3] = e.createFramebuffer();
      } else {
        if (a2.mipmaps && a2.mipmaps.length > 0) {
          s2.__webglFramebuffer = [];
          for (let t3 = 0; t3 < a2.mipmaps.length; t3++) s2.__webglFramebuffer[t3] = e.createFramebuffer();
        } else s2.__webglFramebuffer = e.createFramebuffer();
        if (u2) for (let t3 = 0, n2 = c2.length; t3 < n2; t3++) {
          const n3 = r.get(c2[t3]);
          void 0 === n3.__webglTexture && (n3.__webglTexture = e.createTexture(), o.memory.textures++);
        }
        if (t2.samples > 0 && false === W(t2)) {
          s2.__webglMultisampledFramebuffer = e.createFramebuffer(), s2.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, s2.__webglMultisampledFramebuffer);
          for (let n2 = 0; n2 < c2.length; n2++) {
            const r2 = c2[n2];
            s2.__webglColorRenderbuffer[n2] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, s2.__webglColorRenderbuffer[n2]);
            const a3 = i.convert(r2.format, r2.colorSpace), o2 = i.convert(r2.type), l3 = E(r2.internalFormat, a3, o2, r2.normalized, r2.colorSpace, true === t2.isXRRenderTarget), d3 = H(t2);
            e.renderbufferStorageMultisample(e.RENDERBUFFER, d3, l3, t2.width, t2.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n2, e.RENDERBUFFER, s2.__webglColorRenderbuffer[n2]);
          }
          e.bindRenderbuffer(e.RENDERBUFFER, null), t2.depthBuffer && (s2.__webglDepthRenderbuffer = e.createRenderbuffer(), F(s2.__webglDepthRenderbuffer, t2, true)), n.bindFramebuffer(e.FRAMEBUFFER, null);
        }
      }
      if (d2) {
        n.bindTexture(e.TEXTURE_CUBE_MAP, l2.__webglTexture), D(e.TEXTURE_CUBE_MAP, a2);
        for (let n2 = 0; n2 < 6; n2++) if (a2.mipmaps && a2.mipmaps.length > 0) for (let r2 = 0; r2 < a2.mipmaps.length; r2++) I(s2.__webglFramebuffer[n2][r2], t2, a2, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n2, r2);
        else I(s2.__webglFramebuffer[n2], t2, a2, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n2, 0);
        g(a2) && v(e.TEXTURE_CUBE_MAP), n.unbindTexture();
      } else if (u2) {
        for (let a3 = 0, i2 = c2.length; a3 < i2; a3++) {
          const i3 = c2[a3], o2 = r.get(i3);
          let l3 = e.TEXTURE_2D;
          (t2.isWebGL3DRenderTarget || t2.isWebGLArrayRenderTarget) && (l3 = t2.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(l3, o2.__webglTexture), D(l3, i3), I(s2.__webglFramebuffer, t2, i3, e.COLOR_ATTACHMENT0 + a3, l3, 0), g(i3) && v(l3);
        }
        n.unbindTexture();
      } else {
        let r2 = e.TEXTURE_2D;
        if ((t2.isWebGL3DRenderTarget || t2.isWebGLArrayRenderTarget) && (r2 = t2.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(r2, l2.__webglTexture), D(r2, a2), a2.mipmaps && a2.mipmaps.length > 0) for (let n2 = 0; n2 < a2.mipmaps.length; n2++) I(s2.__webglFramebuffer[n2], t2, a2, e.COLOR_ATTACHMENT0, r2, n2);
        else I(s2.__webglFramebuffer, t2, a2, e.COLOR_ATTACHMENT0, r2, 0);
        g(a2) && v(r2), n.unbindTexture();
      }
      t2.depthBuffer && G(t2);
    }, this.updateRenderTargetMipmap = function(e2) {
      const t2 = e2.textures;
      for (let a2 = 0, i2 = t2.length; a2 < i2; a2++) {
        const i3 = t2[a2];
        if (g(i3)) {
          const t3 = S(e2), a3 = r.get(i3).__webglTexture;
          n.bindTexture(t3, a3), v(t3), n.unbindTexture();
        }
      }
    }, this.updateMultisampleRenderTarget = function(t2) {
      if (t2.samples > 0) {
        if (false === W(t2)) {
          const a2 = t2.textures, i2 = t2.width, o2 = t2.height;
          let s2 = e.COLOR_BUFFER_BIT;
          const c2 = t2.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, d2 = r.get(t2), u2 = a2.length > 1;
          if (u2) for (let t3 = 0; t3 < a2.length; t3++) n.bindFramebuffer(e.FRAMEBUFFER, d2.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t3, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, d2.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t3, e.TEXTURE_2D, null, 0);
          n.bindFramebuffer(e.READ_FRAMEBUFFER, d2.__webglMultisampledFramebuffer);
          const f2 = t2.texture.mipmaps;
          f2 && f2.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, d2.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, d2.__webglFramebuffer);
          for (let n2 = 0; n2 < a2.length; n2++) {
            if (t2.resolveDepthBuffer && (t2.depthBuffer && (s2 |= e.DEPTH_BUFFER_BIT), t2.stencilBuffer && t2.resolveStencilBuffer && (s2 |= e.STENCIL_BUFFER_BIT)), u2) {
              e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, d2.__webglColorRenderbuffer[n2]);
              const t3 = r.get(a2[n2]).__webglTexture;
              e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t3, 0);
            }
            e.blitFramebuffer(0, 0, i2, o2, 0, 0, i2, o2, s2, e.NEAREST), true === l && (B.length = 0, V.length = 0, B.push(e.COLOR_ATTACHMENT0 + n2), t2.depthBuffer && false === t2.storeMultisampledDepthBuffer && (B.push(c2), V.push(c2), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, V)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, B));
          }
          if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), u2) for (let t3 = 0; t3 < a2.length; t3++) {
            n.bindFramebuffer(e.FRAMEBUFFER, d2.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t3, e.RENDERBUFFER, d2.__webglColorRenderbuffer[t3]);
            const i3 = r.get(a2[t3]).__webglTexture;
            n.bindFramebuffer(e.FRAMEBUFFER, d2.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t3, e.TEXTURE_2D, i3, 0);
          }
          n.bindFramebuffer(e.DRAW_FRAMEBUFFER, d2.__webglMultisampledFramebuffer);
        } else if (t2.depthBuffer && false === t2.storeMultisampledDepthBuffer && l) {
          const n2 = t2.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
          e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n2]);
        }
      }
    }, this.setupDepthRenderbuffer = G, this.setupFrameBufferTexture = I, this.useMultisampledRTT = W, this.isReversedDepthBuffer = function() {
      return n.buffers.depth.getReversed();
    };
  }
  function WebGLUtils(e, t) {
    return { convert: function(n, r = NoColorSpace) {
      let a;
      const i = ColorManagement.getTransfer(r);
      if (n === UnsignedByteType) return e.UNSIGNED_BYTE;
      if (n === UnsignedShort4444Type) return e.UNSIGNED_SHORT_4_4_4_4;
      if (n === UnsignedShort5551Type) return e.UNSIGNED_SHORT_5_5_5_1;
      if (n === UnsignedInt5999Type) return e.UNSIGNED_INT_5_9_9_9_REV;
      if (n === UnsignedInt101111Type) return e.UNSIGNED_INT_10F_11F_11F_REV;
      if (n === ByteType) return e.BYTE;
      if (n === ShortType) return e.SHORT;
      if (n === UnsignedShortType) return e.UNSIGNED_SHORT;
      if (n === IntType) return e.INT;
      if (n === UnsignedIntType) return e.UNSIGNED_INT;
      if (n === FloatType) return e.FLOAT;
      if (n === HalfFloatType) return e.HALF_FLOAT;
      if (n === AlphaFormat) return e.ALPHA;
      if (n === RGBFormat) return e.RGB;
      if (n === RGBAFormat) return e.RGBA;
      if (n === DepthFormat) return e.DEPTH_COMPONENT;
      if (n === DepthStencilFormat) return e.DEPTH_STENCIL;
      if (n === RedFormat) return e.RED;
      if (n === RedIntegerFormat) return e.RED_INTEGER;
      if (n === RGFormat) return e.RG;
      if (n === RGIntegerFormat) return e.RG_INTEGER;
      if (n === RGBAIntegerFormat) return e.RGBA_INTEGER;
      if (n === RGB_S3TC_DXT1_Format || n === RGBA_S3TC_DXT1_Format || n === RGBA_S3TC_DXT3_Format || n === RGBA_S3TC_DXT5_Format) if (i === SRGBTransfer) {
        if (a = t.get("WEBGL_compressed_texture_s3tc_srgb"), null === a) return null;
        if (n === RGB_S3TC_DXT1_Format) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (n === RGBA_S3TC_DXT1_Format) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (n === RGBA_S3TC_DXT3_Format) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (n === RGBA_S3TC_DXT5_Format) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else {
        if (a = t.get("WEBGL_compressed_texture_s3tc"), null === a) return null;
        if (n === RGB_S3TC_DXT1_Format) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === RGBA_S3TC_DXT1_Format) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === RGBA_S3TC_DXT3_Format) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === RGBA_S3TC_DXT5_Format) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      if (n === RGB_PVRTC_4BPPV1_Format || n === RGB_PVRTC_2BPPV1_Format || n === RGBA_PVRTC_4BPPV1_Format || n === RGBA_PVRTC_2BPPV1_Format) {
        if (a = t.get("WEBGL_compressed_texture_pvrtc"), null === a) return null;
        if (n === RGB_PVRTC_4BPPV1_Format) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === RGB_PVRTC_2BPPV1_Format) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === RGBA_PVRTC_4BPPV1_Format) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === RGBA_PVRTC_2BPPV1_Format) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
      if (n === RGB_ETC1_Format || n === RGB_ETC2_Format || n === RGBA_ETC2_EAC_Format || n === R11_EAC_Format || n === SIGNED_R11_EAC_Format || n === RG11_EAC_Format || n === SIGNED_RG11_EAC_Format) {
        if (a = t.get("WEBGL_compressed_texture_etc"), null === a) return null;
        if (n === RGB_ETC1_Format || n === RGB_ETC2_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (n === RGBA_ETC2_EAC_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === R11_EAC_Format) return a.COMPRESSED_R11_EAC;
        if (n === SIGNED_R11_EAC_Format) return a.COMPRESSED_SIGNED_R11_EAC;
        if (n === RG11_EAC_Format) return a.COMPRESSED_RG11_EAC;
        if (n === SIGNED_RG11_EAC_Format) return a.COMPRESSED_SIGNED_RG11_EAC;
      }
      if (n === RGBA_ASTC_4x4_Format || n === RGBA_ASTC_5x4_Format || n === RGBA_ASTC_5x5_Format || n === RGBA_ASTC_6x5_Format || n === RGBA_ASTC_6x6_Format || n === RGBA_ASTC_8x5_Format || n === RGBA_ASTC_8x6_Format || n === RGBA_ASTC_8x8_Format || n === RGBA_ASTC_10x5_Format || n === RGBA_ASTC_10x6_Format || n === RGBA_ASTC_10x8_Format || n === RGBA_ASTC_10x10_Format || n === RGBA_ASTC_12x10_Format || n === RGBA_ASTC_12x12_Format) {
        if (a = t.get("WEBGL_compressed_texture_astc"), null === a) return null;
        if (n === RGBA_ASTC_4x4_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === RGBA_ASTC_5x4_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === RGBA_ASTC_5x5_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === RGBA_ASTC_6x5_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === RGBA_ASTC_6x6_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === RGBA_ASTC_8x5_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === RGBA_ASTC_8x6_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === RGBA_ASTC_8x8_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === RGBA_ASTC_10x5_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === RGBA_ASTC_10x6_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === RGBA_ASTC_10x8_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === RGBA_ASTC_10x10_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === RGBA_ASTC_12x10_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === RGBA_ASTC_12x12_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      }
      if (n === RGBA_BPTC_Format || n === RGB_BPTC_SIGNED_Format || n === RGB_BPTC_UNSIGNED_Format) {
        if (a = t.get("EXT_texture_compression_bptc"), null === a) return null;
        if (n === RGBA_BPTC_Format) return i === SRGBTransfer ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === RGB_BPTC_SIGNED_Format) return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === RGB_BPTC_UNSIGNED_Format) return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      }
      if (n === RED_RGTC1_Format || n === SIGNED_RED_RGTC1_Format || n === RED_GREEN_RGTC2_Format || n === SIGNED_RED_GREEN_RGTC2_Format) {
        if (a = t.get("EXT_texture_compression_rgtc"), null === a) return null;
        if (n === RED_RGTC1_Format) return a.COMPRESSED_RED_RGTC1_EXT;
        if (n === SIGNED_RED_RGTC1_Format) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === RED_GREEN_RGTC2_Format) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === SIGNED_RED_GREEN_RGTC2_Format) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      }
      return n === UnsignedInt248Type ? e.UNSIGNED_INT_24_8 : void 0 !== e[n] ? e[n] : null;
    } };
  }
  var _occlusion_vertex = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}";
  var _occlusion_fragment = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}";
  var WebXRDepthSensing = class {
    constructor() {
      this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
    }
    init(e, t) {
      if (null === this.texture) {
        const n = new ExternalTexture(e.texture);
        e.depthNear === t.depthNear && e.depthFar === t.depthFar || (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
      }
    }
    getMesh(e) {
      if (null !== this.texture && null === this.mesh) {
        const t = e.cameras[0].viewport, n = new ShaderMaterial({ vertexShader: _occlusion_vertex, fragmentShader: _occlusion_fragment, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: t.z }, depthHeight: { value: t.w } } });
        this.mesh = new Mesh(new PlaneGeometry(20, 20), n);
      }
      return this.mesh;
    }
    reset() {
      this.texture = null, this.mesh = null;
    }
    getDepthTexture() {
      return this.texture;
    }
  };
  var WebXRManager = class extends EventDispatcher {
    constructor(e, t) {
      super();
      const n = this;
      let r = null, a = 1, i = null, o = "local-floor", s = 1, l = null, c = null, d = null, u = null, f = null, p = null;
      const m = "undefined" != typeof XRWebGLBinding, _ = new WebXRDepthSensing(), h = {}, g = t.getContextAttributes();
      let v = null, S = null;
      const E = [], T = [], M = new Vector2();
      let x = null, R = null;
      const A = new PerspectiveCamera();
      A.viewport = new Vector4();
      const C = new PerspectiveCamera();
      C.viewport = new Vector4();
      const b = [A, C], L = new ArrayCamera();
      let P = null, U = null;
      function D(e2) {
        const t2 = T.indexOf(e2.inputSource);
        if (-1 === t2) return;
        const n2 = E[t2];
        void 0 !== n2 && (n2.update(e2.inputSource, e2.frame, l || i), n2.dispatchEvent({ type: e2.type, data: e2.inputSource }));
      }
      function w() {
        r.removeEventListener("select", D), r.removeEventListener("selectstart", D), r.removeEventListener("selectend", D), r.removeEventListener("squeeze", D), r.removeEventListener("squeezestart", D), r.removeEventListener("squeezeend", D), r.removeEventListener("end", w), r.removeEventListener("inputsourceschange", y);
        for (let e2 = 0; e2 < E.length; e2++) {
          const t2 = T[e2];
          null !== t2 && (T[e2] = null, E[e2].disconnect(t2));
        }
        P = null, U = null, _.reset();
        for (const e2 in h) delete h[e2];
        if (e.setRenderTarget(v), f = null, u = null, d = null, r = null, S = null, G.stop(), n.isPresenting = false, e.setPixelRatio(x), e.setSize(M.width, M.height, false), null !== R) {
          const e2 = R.camera;
          e2.fov = R.fov, e2.zoom = R.zoom, e2.updateProjectionMatrix(), R = null;
        }
        n.dispatchEvent({ type: "sessionend" });
      }
      function y(e2) {
        for (let t2 = 0; t2 < e2.removed.length; t2++) {
          const n2 = e2.removed[t2], r2 = T.indexOf(n2);
          r2 >= 0 && (T[r2] = null, E[r2].disconnect(n2));
        }
        for (let t2 = 0; t2 < e2.added.length; t2++) {
          const n2 = e2.added[t2];
          let r2 = T.indexOf(n2);
          if (-1 === r2) {
            for (let e3 = 0; e3 < E.length; e3++) {
              if (e3 >= T.length) {
                T.push(n2), r2 = e3;
                break;
              }
              if (null === T[e3]) {
                T[e3] = n2, r2 = e3;
                break;
              }
            }
            if (-1 === r2) break;
          }
          const a2 = E[r2];
          a2 && a2.connect(n2);
        }
      }
      this.cameraAutoUpdate = true, this.enabled = false, this.isPresenting = false, this.getController = function(e2) {
        let t2 = E[e2];
        return void 0 === t2 && (t2 = new WebXRController(), E[e2] = t2), t2.getTargetRaySpace();
      }, this.getControllerGrip = function(e2) {
        let t2 = E[e2];
        return void 0 === t2 && (t2 = new WebXRController(), E[e2] = t2), t2.getGripSpace();
      }, this.getHand = function(e2) {
        let t2 = E[e2];
        return void 0 === t2 && (t2 = new WebXRController(), E[e2] = t2), t2.getHandSpace();
      }, this.setFramebufferScaleFactor = function(e2) {
        a = e2, true === n.isPresenting && warn("WebXRManager: Cannot change framebuffer scale while presenting.");
      }, this.setReferenceSpaceType = function(e2) {
        o = e2, true === n.isPresenting && warn("WebXRManager: Cannot change reference space type while presenting.");
      }, this.getReferenceSpace = function() {
        return l || i;
      }, this.setReferenceSpace = function(e2) {
        l = e2;
      }, this.getBaseLayer = function() {
        return null !== u ? u : f;
      }, this.getBinding = function() {
        return null === d && m && (d = new XRWebGLBinding(r, t)), d;
      }, this.getFrame = function() {
        return p;
      }, this.getSession = function() {
        return r;
      }, this.setSession = async function(c2) {
        if (r = c2, null !== r) {
          v = e.getRenderTarget(), r.addEventListener("select", D), r.addEventListener("selectstart", D), r.addEventListener("selectend", D), r.addEventListener("squeeze", D), r.addEventListener("squeezestart", D), r.addEventListener("squeezeend", D), r.addEventListener("end", w), r.addEventListener("inputsourceschange", y), true !== g.xrCompatible && await t.makeXRCompatible(), x = e.getPixelRatio(), e.getSize(M);
          if (m && "createProjectionLayer" in XRWebGLBinding.prototype) {
            let n2 = null, i2 = null, o2 = null;
            g.depth && (o2 = g.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n2 = g.stencil ? DepthStencilFormat : DepthFormat, i2 = g.stencil ? UnsignedInt248Type : UnsignedIntType);
            const s2 = { colorFormat: t.RGBA8, depthFormat: o2, scaleFactor: a };
            d = this.getBinding(), u = d.createProjectionLayer(s2), r.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, false), S = new WebGLRenderTarget(u.textureWidth, u.textureHeight, { format: RGBAFormat, type: UnsignedByteType, depthTexture: new DepthTexture(u.textureWidth, u.textureHeight, i2, void 0, void 0, void 0, void 0, void 0, void 0, n2), stencilBuffer: g.stencil, colorSpace: e.outputColorSpace, samples: g.antialias ? 4 : 0, resolveDepthBuffer: false === u.ignoreDepthValues, resolveStencilBuffer: false === u.ignoreDepthValues, storeMultisampledDepthBuffer: false === u.ignoreDepthValues, storeMultisampledStencilBuffer: false === u.ignoreDepthValues });
          } else {
            const n2 = { antialias: g.antialias, alpha: true, depth: g.depth, stencil: g.stencil, framebufferScaleFactor: a };
            f = new XRWebGLLayer(r, t, n2), r.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, false), S = new WebGLRenderTarget(f.framebufferWidth, f.framebufferHeight, { format: RGBAFormat, type: UnsignedByteType, colorSpace: e.outputColorSpace, stencilBuffer: g.stencil, resolveDepthBuffer: false === f.ignoreDepthValues, resolveStencilBuffer: false === f.ignoreDepthValues, storeMultisampledDepthBuffer: false === f.ignoreDepthValues, storeMultisampledStencilBuffer: false === f.ignoreDepthValues });
          }
          S.isXRRenderTarget = true, this.setFoveation(s), l = null, i = await r.requestReferenceSpace(o), G.setContext(r), G.start(), n.isPresenting = true, n.dispatchEvent({ type: "sessionstart" });
        }
      }, this.getEnvironmentBlendMode = function() {
        if (null !== r) return r.environmentBlendMode;
      }, this.getDepthTexture = function() {
        return _.getDepthTexture();
      };
      const N = new Vector3(), I = new Vector3();
      function F(e2, t2) {
        null === t2 ? e2.matrixWorld.copy(e2.matrix) : e2.matrixWorld.multiplyMatrices(t2.matrixWorld, e2.matrix), e2.matrixWorldInverse.copy(e2.matrixWorld).invert();
      }
      this.updateCamera = function(e2) {
        if (null === r) return;
        let t2 = e2.near, n2 = e2.far;
        null !== _.texture && (_.depthNear > 0 && (t2 = _.depthNear), _.depthFar > 0 && (n2 = _.depthFar)), L.near = C.near = A.near = t2, L.far = C.far = A.far = n2, P === L.near && U === L.far || (r.updateRenderState({ depthNear: L.near, depthFar: L.far }), P = L.near, U = L.far), L.layers.mask = 6 | e2.layers.mask, A.layers.mask = -5 & L.layers.mask, C.layers.mask = -3 & L.layers.mask;
        const a2 = e2.parent, i2 = L.cameras;
        F(L, a2);
        for (let e3 = 0; e3 < i2.length; e3++) F(i2[e3], a2);
        2 === i2.length ? (function(e3, t3, n3) {
          N.setFromMatrixPosition(t3.matrixWorld), I.setFromMatrixPosition(n3.matrixWorld);
          const r2 = N.distanceTo(I), a3 = t3.projectionMatrix.elements, i3 = n3.projectionMatrix.elements, o2 = a3[14] / (a3[10] - 1), s2 = a3[14] / (a3[10] + 1), l2 = (a3[9] + 1) / a3[5], c2 = (a3[9] - 1) / a3[5], d2 = (a3[8] - 1) / a3[0], u2 = (i3[8] + 1) / i3[0], f2 = o2 * d2, p2 = o2 * u2, m2 = r2 / (-d2 + u2), _2 = m2 * -d2;
          if (t3.matrixWorld.decompose(e3.position, e3.quaternion, e3.scale), e3.translateX(_2), e3.translateZ(m2), e3.matrixWorld.compose(e3.position, e3.quaternion, e3.scale), e3.matrixWorldInverse.copy(e3.matrixWorld).invert(), -1 === a3[10]) e3.projectionMatrix.copy(t3.projectionMatrix), e3.projectionMatrixInverse.copy(t3.projectionMatrixInverse);
          else {
            const t4 = o2 + m2, n4 = s2 + m2, a4 = f2 - _2, i4 = p2 + (r2 - _2), d3 = l2 * s2 / n4 * t4, u3 = c2 * s2 / n4 * t4;
            e3.projectionMatrix.makePerspective(a4, i4, d3, u3, t4, n4), e3.projectionMatrixInverse.copy(e3.projectionMatrix).invert();
          }
        })(L, A, C) : L.projectionMatrix.copy(A.projectionMatrix), null === R && e2.isPerspectiveCamera && (R = { camera: e2, fov: e2.fov, zoom: e2.zoom }), (function(e3, t3, n3) {
          null === n3 ? e3.matrix.copy(t3.matrixWorld) : (e3.matrix.copy(n3.matrixWorld), e3.matrix.invert(), e3.matrix.multiply(t3.matrixWorld));
          e3.matrix.decompose(e3.position, e3.quaternion, e3.scale), e3.updateMatrixWorld(true), e3.projectionMatrix.copy(t3.projectionMatrix), e3.projectionMatrixInverse.copy(t3.projectionMatrixInverse), e3.isPerspectiveCamera && (e3.fov = 2 * RAD2DEG * Math.atan(1 / e3.projectionMatrix.elements[5]), e3.zoom = 1);
        })(e2, L, a2);
      }, this.getCamera = function() {
        return L;
      }, this.getFoveation = function() {
        if (null !== u || null !== f) return s;
      }, this.setFoveation = function(e2) {
        s = e2, null !== u && (u.fixedFoveation = e2), null !== f && void 0 !== f.fixedFoveation && (f.fixedFoveation = e2);
      }, this.hasDepthSensing = function() {
        return null !== _.texture;
      }, this.getDepthSensingMesh = function() {
        return _.getMesh(L);
      }, this.getCameraTexture = function(e2) {
        return h[e2];
      };
      let O = null;
      const G = new WebGLAnimation();
      G.setAnimationLoop(function(t2, a2) {
        if (c = a2.getViewerPose(l || i), p = a2, null !== c) {
          const t3 = c.views;
          null !== f && (e.setRenderTargetFramebuffer(S, f.framebuffer), e.setRenderTarget(S));
          let a3 = false;
          t3.length !== L.cameras.length && (L.cameras.length = 0, a3 = true);
          for (let n2 = 0; n2 < t3.length; n2++) {
            const r2 = t3[n2];
            let i3 = null;
            if (null !== f) i3 = f.getViewport(r2);
            else {
              const t4 = d.getViewSubImage(u, r2);
              i3 = t4.viewport, 0 === n2 && (e.setRenderTargetTextures(S, t4.colorTexture, t4.depthStencilTexture), e.setRenderTarget(S));
            }
            let o2 = b[n2];
            void 0 === o2 && (o2 = new PerspectiveCamera(), o2.layers.enable(n2), o2.viewport = new Vector4(), b[n2] = o2), o2.matrix.fromArray(r2.transform.matrix), o2.matrix.decompose(o2.position, o2.quaternion, o2.scale), o2.projectionMatrix.fromArray(r2.projectionMatrix), o2.projectionMatrixInverse.copy(o2.projectionMatrix).invert(), o2.viewport.set(i3.x, i3.y, i3.width, i3.height), 0 === n2 && (L.matrix.copy(o2.matrix), L.matrix.decompose(L.position, L.quaternion, L.scale)), true === a3 && L.cameras.push(o2);
          }
          const i2 = r.enabledFeatures;
          if (i2 && i2.includes("depth-sensing") && "gpu-optimized" == r.depthUsage && m) {
            d = n.getBinding();
            const e2 = d.getDepthInformation(t3[0]);
            e2 && e2.isValid && e2.texture && _.init(e2, r.renderState);
          }
          if (i2 && i2.includes("camera-access") && m) {
            e.state.unbindTexture(), d = n.getBinding();
            for (let e2 = 0; e2 < t3.length; e2++) {
              const n2 = t3[e2].camera;
              if (n2) {
                let e3 = h[n2];
                e3 || (e3 = new ExternalTexture(), h[n2] = e3);
                const t4 = d.getCameraImage(n2);
                e3.sourceTexture = t4;
              }
            }
          }
        }
        for (let e2 = 0; e2 < E.length; e2++) {
          const t3 = T[e2], n2 = E[e2];
          null !== t3 && void 0 !== n2 && n2.update(t3, a2, l || i);
        }
        O && O(t2, a2), a2.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: a2 }), p = null;
      }), this.setAnimationLoop = function(e2) {
        O = e2;
      }, this.dispose = function() {
      };
    }
  };
  var _m12 = new Matrix4();
  var _m = new Matrix3();
  function WebGLMaterials(e, t) {
    function n(e2, t2) {
      true === e2.matrixAutoUpdate && e2.updateMatrix(), t2.value.copy(e2.matrix);
    }
    function r(e2, r2) {
      e2.opacity.value = r2.opacity, r2.color && e2.diffuse.value.copy(r2.color), r2.emissive && e2.emissive.value.copy(r2.emissive).multiplyScalar(r2.emissiveIntensity), r2.map && (e2.map.value = r2.map, n(r2.map, e2.mapTransform)), r2.alphaMap && (e2.alphaMap.value = r2.alphaMap, n(r2.alphaMap, e2.alphaMapTransform)), r2.bumpMap && (e2.bumpMap.value = r2.bumpMap, n(r2.bumpMap, e2.bumpMapTransform), e2.bumpScale.value = r2.bumpScale, r2.side === BackSide && (e2.bumpScale.value *= -1)), r2.normalMap && (e2.normalMap.value = r2.normalMap, n(r2.normalMap, e2.normalMapTransform), e2.normalScale.value.copy(r2.normalScale), r2.side === BackSide && e2.normalScale.value.negate()), r2.displacementMap && (e2.displacementMap.value = r2.displacementMap, n(r2.displacementMap, e2.displacementMapTransform), e2.displacementScale.value = r2.displacementScale, e2.displacementBias.value = r2.displacementBias), r2.emissiveMap && (e2.emissiveMap.value = r2.emissiveMap, n(r2.emissiveMap, e2.emissiveMapTransform)), r2.specularMap && (e2.specularMap.value = r2.specularMap, n(r2.specularMap, e2.specularMapTransform)), r2.alphaTest > 0 && (e2.alphaTest.value = r2.alphaTest);
      const a = t.get(r2), i = a.envMap, o = a.envMapRotation;
      i && (e2.envMap.value = i, e2.envMapRotation.value.setFromMatrix4(_m12.makeRotationFromEuler(o)).transpose(), i.isCubeTexture && false === i.isRenderTargetTexture && e2.envMapRotation.value.premultiply(_m), e2.reflectivity.value = r2.reflectivity, e2.ior.value = r2.ior, e2.refractionRatio.value = r2.refractionRatio), r2.lightMap && (e2.lightMap.value = r2.lightMap, e2.lightMapIntensity.value = r2.lightMapIntensity, n(r2.lightMap, e2.lightMapTransform)), r2.aoMap && (e2.aoMap.value = r2.aoMap, e2.aoMapIntensity.value = r2.aoMapIntensity, n(r2.aoMap, e2.aoMapTransform));
    }
    return { refreshFogUniforms: function(t2, n2) {
      n2.color.getRGB(t2.fogColor.value, getUnlitUniformColorSpace(e)), n2.isFog ? (t2.fogNear.value = n2.near, t2.fogFar.value = n2.far) : n2.isFogExp2 && (t2.fogDensity.value = n2.density);
    }, refreshMaterialUniforms: function(e2, a, i, o, s) {
      a.isNodeMaterial ? a.uniformsNeedUpdate = false : a.isMeshBasicMaterial ? r(e2, a) : a.isMeshLambertMaterial ? (r(e2, a), a.envMap && (e2.envMapIntensity.value = a.envMapIntensity)) : a.isMeshToonMaterial ? (r(e2, a), (function(e3, t2) {
        t2.gradientMap && (e3.gradientMap.value = t2.gradientMap);
      })(e2, a)) : a.isMeshPhongMaterial ? (r(e2, a), (function(e3, t2) {
        e3.specular.value.copy(t2.specular), e3.shininess.value = Math.max(t2.shininess, 1e-4);
      })(e2, a), a.envMap && (e2.envMapIntensity.value = a.envMapIntensity)) : a.isMeshStandardMaterial ? (r(e2, a), (function(e3, t2) {
        e3.metalness.value = t2.metalness, t2.metalnessMap && (e3.metalnessMap.value = t2.metalnessMap, n(t2.metalnessMap, e3.metalnessMapTransform));
        e3.roughness.value = t2.roughness, t2.roughnessMap && (e3.roughnessMap.value = t2.roughnessMap, n(t2.roughnessMap, e3.roughnessMapTransform));
        t2.envMap && (e3.envMapIntensity.value = t2.envMapIntensity);
      })(e2, a), a.isMeshPhysicalMaterial && (function(e3, t2, r2) {
        e3.ior.value = t2.ior, t2.sheen > 0 && (e3.sheenColor.value.copy(t2.sheenColor).multiplyScalar(t2.sheen), e3.sheenRoughness.value = t2.sheenRoughness, t2.sheenColorMap && (e3.sheenColorMap.value = t2.sheenColorMap, n(t2.sheenColorMap, e3.sheenColorMapTransform)), t2.sheenRoughnessMap && (e3.sheenRoughnessMap.value = t2.sheenRoughnessMap, n(t2.sheenRoughnessMap, e3.sheenRoughnessMapTransform)));
        t2.clearcoat > 0 && (e3.clearcoat.value = t2.clearcoat, e3.clearcoatRoughness.value = t2.clearcoatRoughness, t2.clearcoatMap && (e3.clearcoatMap.value = t2.clearcoatMap, n(t2.clearcoatMap, e3.clearcoatMapTransform)), t2.clearcoatRoughnessMap && (e3.clearcoatRoughnessMap.value = t2.clearcoatRoughnessMap, n(t2.clearcoatRoughnessMap, e3.clearcoatRoughnessMapTransform)), t2.clearcoatNormalMap && (e3.clearcoatNormalMap.value = t2.clearcoatNormalMap, n(t2.clearcoatNormalMap, e3.clearcoatNormalMapTransform), e3.clearcoatNormalScale.value.copy(t2.clearcoatNormalScale), t2.side === BackSide && e3.clearcoatNormalScale.value.negate()));
        t2.dispersion > 0 && (e3.dispersion.value = t2.dispersion);
        t2.retroreflectivity > 0 && (e3.retroreflectivity.value = t2.retroreflectivity);
        t2.iridescence > 0 && (e3.iridescence.value = t2.iridescence, e3.iridescenceIOR.value = t2.iridescenceIOR, e3.iridescenceThicknessMinimum.value = t2.iridescenceThicknessRange[0], e3.iridescenceThicknessMaximum.value = t2.iridescenceThicknessRange[1], t2.iridescenceMap && (e3.iridescenceMap.value = t2.iridescenceMap, n(t2.iridescenceMap, e3.iridescenceMapTransform)), t2.iridescenceThicknessMap && (e3.iridescenceThicknessMap.value = t2.iridescenceThicknessMap, n(t2.iridescenceThicknessMap, e3.iridescenceThicknessMapTransform)));
        t2.transmission > 0 && (e3.transmission.value = t2.transmission, e3.transmissionSamplerMap.value = r2.texture, e3.transmissionSamplerSize.value.set(r2.width, r2.height), t2.transmissionMap && (e3.transmissionMap.value = t2.transmissionMap, n(t2.transmissionMap, e3.transmissionMapTransform)), e3.thickness.value = t2.thickness, t2.thicknessMap && (e3.thicknessMap.value = t2.thicknessMap, n(t2.thicknessMap, e3.thicknessMapTransform)), e3.attenuationDistance.value = t2.attenuationDistance, e3.attenuationColor.value.copy(t2.attenuationColor));
        t2.anisotropy > 0 && (e3.anisotropyVector.value.set(t2.anisotropy * Math.cos(t2.anisotropyRotation), t2.anisotropy * Math.sin(t2.anisotropyRotation)), t2.anisotropyMap && (e3.anisotropyMap.value = t2.anisotropyMap, n(t2.anisotropyMap, e3.anisotropyMapTransform)));
        e3.specularIntensity.value = t2.specularIntensity, e3.specularColor.value.copy(t2.specularColor), t2.specularColorMap && (e3.specularColorMap.value = t2.specularColorMap, n(t2.specularColorMap, e3.specularColorMapTransform));
        t2.specularIntensityMap && (e3.specularIntensityMap.value = t2.specularIntensityMap, n(t2.specularIntensityMap, e3.specularIntensityMapTransform));
      })(e2, a, s)) : a.isMeshMatcapMaterial ? (r(e2, a), (function(e3, t2) {
        t2.matcap && (e3.matcap.value = t2.matcap);
      })(e2, a)) : a.isMeshDepthMaterial ? r(e2, a) : a.isMeshDistanceMaterial ? (r(e2, a), (function(e3, n2) {
        const r2 = t.get(n2).light;
        e3.referencePosition.value.setFromMatrixPosition(r2.matrixWorld), e3.nearDistance.value = r2.shadow.camera.near, e3.farDistance.value = r2.shadow.camera.far;
      })(e2, a)) : a.isMeshNormalMaterial ? r(e2, a) : a.isLineBasicMaterial ? ((function(e3, t2) {
        e3.diffuse.value.copy(t2.color), e3.opacity.value = t2.opacity, t2.map && (e3.map.value = t2.map, n(t2.map, e3.mapTransform));
      })(e2, a), a.isLineDashedMaterial && (function(e3, t2) {
        e3.dashSize.value = t2.dashSize, e3.totalSize.value = t2.dashSize + t2.gapSize, e3.scale.value = t2.scale;
      })(e2, a)) : a.isPointsMaterial ? (function(e3, t2, r2, a2) {
        e3.diffuse.value.copy(t2.color), e3.opacity.value = t2.opacity, e3.size.value = t2.size * r2, e3.scale.value = 0.5 * a2, t2.map && (e3.map.value = t2.map, n(t2.map, e3.uvTransform));
        t2.alphaMap && (e3.alphaMap.value = t2.alphaMap, n(t2.alphaMap, e3.alphaMapTransform));
        t2.alphaTest > 0 && (e3.alphaTest.value = t2.alphaTest);
      })(e2, a, i, o) : a.isSpriteMaterial ? (function(e3, t2) {
        e3.diffuse.value.copy(t2.color), e3.opacity.value = t2.opacity, e3.rotation.value = t2.rotation, t2.map && (e3.map.value = t2.map, n(t2.map, e3.mapTransform));
        t2.alphaMap && (e3.alphaMap.value = t2.alphaMap, n(t2.alphaMap, e3.alphaMapTransform));
        t2.alphaTest > 0 && (e3.alphaTest.value = t2.alphaTest);
      })(e2, a) : a.isShadowMaterial ? (e2.color.value.copy(a.color), e2.opacity.value = a.opacity) : a.isShaderMaterial && (a.uniformsNeedUpdate = false);
    } };
  }
  function WebGLUniformsGroups(e, t, n, r) {
    let a = {}, i = {}, o = [];
    const s = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
    function l(t2, n2, r2, a2) {
      if (true === (function(e2, t3, n3, r3) {
        const a3 = e2.value, i2 = t3 + "_" + n3;
        if (void 0 === r3[i2]) return "number" == typeof a3 || "boolean" == typeof a3 ? r3[i2] = a3 : ArrayBuffer.isView(a3) ? r3[i2] = a3.slice() : r3[i2] = a3.clone(), true;
        {
          const e3 = r3[i2];
          if ("number" == typeof a3 || "boolean" == typeof a3) {
            if (e3 !== a3) return r3[i2] = a3, true;
          } else {
            if (ArrayBuffer.isView(a3)) return true;
            if (false === e3.equals(a3)) return e3.copy(a3), true;
          }
        }
        return false;
      })(t2, n2, r2, a2)) {
        const n3 = t2.__offset, r3 = t2.value;
        if (Array.isArray(r3)) {
          let e2 = 0;
          for (let n4 = 0; n4 < r3.length; n4++) {
            const a3 = r3[n4], i2 = d(a3);
            c(a3, t2.__data, e2), "number" == typeof a3 || "boolean" == typeof a3 || a3.isMatrix3 || ArrayBuffer.isView(a3) || (e2 += i2.storage / Float32Array.BYTES_PER_ELEMENT);
          }
        } else c(r3, t2.__data, 0);
        e.bufferSubData(e.UNIFORM_BUFFER, n3, t2.__data);
      }
    }
    function c(e2, t2, n2) {
      "number" == typeof e2 || "boolean" == typeof e2 ? t2[0] = e2 : e2.isMatrix3 ? (t2[0] = e2.elements[0], t2[1] = e2.elements[1], t2[2] = e2.elements[2], t2[3] = 0, t2[4] = e2.elements[3], t2[5] = e2.elements[4], t2[6] = e2.elements[5], t2[7] = 0, t2[8] = e2.elements[6], t2[9] = e2.elements[7], t2[10] = e2.elements[8], t2[11] = 0) : ArrayBuffer.isView(e2) ? t2.set(new e2.constructor(e2.buffer, e2.byteOffset, t2.length)) : e2.toArray(t2, n2);
    }
    function d(e2) {
      const t2 = { boundary: 0, storage: 0 };
      return "number" == typeof e2 || "boolean" == typeof e2 ? (t2.boundary = 4, t2.storage = 4) : e2.isVector2 ? (t2.boundary = 8, t2.storage = 8) : e2.isVector3 || e2.isColor ? (t2.boundary = 16, t2.storage = 12) : e2.isVector4 ? (t2.boundary = 16, t2.storage = 16) : e2.isMatrix3 ? (t2.boundary = 48, t2.storage = 48) : e2.isMatrix4 ? (t2.boundary = 64, t2.storage = 64) : e2.isTexture ? warn("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e2) ? (t2.boundary = 16, t2.storage = e2.byteLength) : warn("WebGLRenderer: Unsupported uniform value type.", e2), t2;
    }
    function u(t2) {
      const n2 = t2.target;
      n2.removeEventListener("dispose", u);
      const r2 = o.indexOf(n2.__bindingPointIndex);
      o.splice(r2, 1), e.deleteBuffer(a[n2.id]), delete a[n2.id], delete i[n2.id];
    }
    return { bind: function(e2, t2) {
      const n2 = t2.program;
      r.uniformBlockBinding(e2, n2);
    }, update: function(n2, c2) {
      let f = a[n2.id];
      void 0 === f && (!(function(e2) {
        const t2 = e2.uniforms;
        let n3 = 0;
        const r2 = 16;
        for (let e3 = 0, a3 = t2.length; e3 < a3; e3++) {
          const a4 = Array.isArray(t2[e3]) ? t2[e3] : [t2[e3]];
          for (let e4 = 0, t3 = a4.length; e4 < t3; e4++) {
            const t4 = a4[e4], i2 = Array.isArray(t4.value) ? t4.value : [t4.value];
            for (let e5 = 0, a5 = i2.length; e5 < a5; e5++) {
              const a6 = d(i2[e5]), o2 = n3 % r2, s2 = o2 % a6.boundary, l2 = o2 + s2;
              n3 += s2, 0 !== l2 && r2 - l2 < a6.storage && (n3 += r2 - l2), t4.__data = new Float32Array(a6.storage / Float32Array.BYTES_PER_ELEMENT), t4.__offset = n3, n3 += a6.storage;
            }
          }
        }
        const a2 = n3 % r2;
        a2 > 0 && (n3 += r2 - a2);
        e2.__size = n3, e2.__cache = {};
      })(n2), f = (function(t2) {
        const n3 = (function() {
          for (let e2 = 0; e2 < s; e2++) if (-1 === o.indexOf(e2)) return o.push(e2), e2;
          return error("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
        })();
        t2.__bindingPointIndex = n3;
        const r2 = e.createBuffer(), a2 = t2.__size, i2 = t2.usage;
        return e.bindBuffer(e.UNIFORM_BUFFER, r2), e.bufferData(e.UNIFORM_BUFFER, a2, i2), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, n3, r2), r2;
      })(n2), a[n2.id] = f, n2.addEventListener("dispose", u));
      const p = c2.program;
      r.updateUBOMapping(n2, p);
      const m = t.render.frame;
      i[n2.id] !== m && (!(function(t2) {
        const n3 = a[t2.id], r2 = t2.uniforms, i2 = t2.__cache;
        e.bindBuffer(e.UNIFORM_BUFFER, n3);
        for (let e2 = 0, t3 = r2.length; e2 < t3; e2++) {
          const t4 = r2[e2];
          if (Array.isArray(t4)) for (let n4 = 0, r3 = t4.length; n4 < r3; n4++) l(t4[n4], e2, n4, i2);
          else l(t4, e2, 0, i2);
        }
        e.bindBuffer(e.UNIFORM_BUFFER, null);
      })(n2), i[n2.id] = m);
    }, dispose: function() {
      for (const t2 in a) e.deleteBuffer(a[t2]);
      o = [], a = {}, i = {};
    } };
  }
  _m.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
  var DATA = new Uint16Array([12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883, 9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808, 3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183]);
  var lut = null;
  function getDFGLUT() {
    return null === lut && (lut = new DataTexture(DATA, 16, 16, RGFormat, HalfFloatType), lut.name = "DFG_LUT", lut.minFilter = LinearFilter, lut.magFilter = LinearFilter, lut.wrapS = ClampToEdgeWrapping, lut.wrapT = ClampToEdgeWrapping, lut.generateMipmaps = false, lut.needsUpdate = true), lut;
  }
  var WebGLRenderer = class {
    constructor(e = {}) {
      const { canvas: t = createCanvasElement(), context: n = null, depth: r = true, stencil: a = false, alpha: i = false, antialias: o = false, premultipliedAlpha: s = true, preserveDrawingBuffer: l = false, powerPreference: c = "default", failIfMajorPerformanceCaveat: d = false, reversedDepthBuffer: u = false, outputBufferType: f = UnsignedByteType } = e;
      let p;
      if (this.isWebGLRenderer = true, null !== n) {
        if ("undefined" != typeof WebGLRenderingContext && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
        p = n.getContextAttributes().alpha;
      } else p = i;
      const m = f, _ = /* @__PURE__ */ new Set([RGBAIntegerFormat, RGIntegerFormat, RedIntegerFormat]), h = /* @__PURE__ */ new Set([UnsignedByteType, UnsignedIntType, UnsignedShortType, UnsignedInt248Type, UnsignedShort4444Type, UnsignedShort5551Type]), g = new Uint32Array(4), v = new Int32Array(4), S = new Vector3();
      let E = null, T = null;
      const M = [], x = [];
      let R = null;
      this.domElement = t, this.debug = { checkShaderErrors: true, diagnostics: { keywords: false }, onShaderError: null }, this.autoClear = true, this.autoClearColor = true, this.autoClearDepth = true, this.autoClearStencil = true, this.sortObjects = true, this.clippingPlanes = [], this.localClippingEnabled = false, this.toneMapping = NoToneMapping, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
      const A = this;
      let C = false, b = null, L = null, P = null, U = null;
      this._outputColorSpace = SRGBColorSpace;
      let D = 0, w = 0, y = null, N = -1, I = null;
      const F = new Vector4(), O = new Vector4();
      let G = null;
      const B = new Color(0);
      let V = 0, H = t.width, W = t.height, k = 1, z = null, X = null;
      const q = new Vector4(0, 0, H, W), K = new Vector4(0, 0, H, W);
      let Y = false;
      const j = new Frustum();
      let $ = false, Z = false;
      const Q = new Matrix4(), J = new Vector3(), ee = new Vector4(), te = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: true };
      let ne = false;
      function re() {
        return null === y ? k : 1;
      }
      let ae, ie, oe, se, le, ce, de, ue, fe, pe, me, _e, he, ge, ve, Se, Ee, Te, Me, xe, Re, Ae, Ce, be = n;
      function Le(e2, n2) {
        return t.getContext(e2, n2);
      }
      try {
        const e2 = { alpha: true, depth: r, stencil: a, antialias: o, premultipliedAlpha: s, preserveDrawingBuffer: l, powerPreference: c, failIfMajorPerformanceCaveat: d };
        if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${REVISION}`), t.addEventListener("webglcontextlost", De, false), t.addEventListener("webglcontextrestored", we, false), t.addEventListener("webglcontextcreationerror", ye, false), null === be) {
          const t2 = "webgl2";
          if (be = Le(t2, e2), null === be) throw Le(t2) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
        }
        Pe();
      } catch (e2) {
        throw t.removeEventListener("webglcontextlost", De, false), t.removeEventListener("webglcontextrestored", we, false), t.removeEventListener("webglcontextcreationerror", ye, false), error("WebGLRenderer: " + e2.message), e2;
      }
      function Pe() {
        ae = new WebGLExtensions(be), ae.init(), Re = new WebGLUtils(be, ae), ie = new WebGLCapabilities(be, ae, e, Re), oe = new WebGLState(be, ae), ie.reversedDepthBuffer && u && oe.buffers.depth.setReversed(true), L = be.createFramebuffer(), P = be.createFramebuffer(), U = be.createFramebuffer(), se = new WebGLInfo(be), le = new WebGLProperties(), ce = new WebGLTextures(be, ae, oe, le, ie, Re, se), de = new WebGLEnvironments(A), ue = new WebGLAttributes(be), Ae = new WebGLBindingStates(be, ue), fe = new WebGLGeometries(be, ue, se, Ae), pe = new WebGLObjects(be, fe, ue, Ae, se), Te = new WebGLMorphtargets(be, ie, ce), ve = new WebGLClipping(le), me = new WebGLPrograms(A, de, ae, ie, Ae, ve), _e = new WebGLMaterials(A, le), he = new WebGLRenderLists(), ge = new WebGLRenderStates(ae), Ee = new WebGLBackground(A, de, oe, pe, p, s), Se = new WebGLShadowMap(A, pe, ie), Ce = new WebGLUniformsGroups(be, se, ie, oe), Me = new WebGLBufferRenderer(be, ae, se), xe = new WebGLIndexedBufferRenderer(be, ae, se), se.programs = me.programs, A.capabilities = ie, A.extensions = ae, A.properties = le, A.renderLists = he, A.shadowMap = Se, A.state = oe, A.info = se;
      }
      m !== UnsignedByteType && (R = new WebGLOutput(m, t.width, t.height, o, r, a));
      const Ue = new WebXRManager(A, be);
      function De(e2) {
        e2.preventDefault(), log("WebGLRenderer: Context Lost."), C = true;
      }
      function we() {
        log("WebGLRenderer: Context Restored."), C = false;
        const e2 = se.autoReset, t2 = Se.enabled, n2 = Se.autoUpdate, r2 = Se.needsUpdate, a2 = Se.type;
        Pe(), se.autoReset = e2, Se.enabled = t2, Se.autoUpdate = n2, Se.needsUpdate = r2, Se.type = a2;
      }
      function ye(e2) {
        error("WebGLRenderer: A WebGL context could not be created. Reason: ", e2.statusMessage);
      }
      function Ne(e2) {
        const t2 = e2.target;
        t2.removeEventListener("dispose", Ne), (function(e3) {
          (function(e4) {
            const t3 = le.get(e4).programs;
            void 0 !== t3 && (t3.forEach(function(e5) {
              me.releaseProgram(e5);
            }), e4.isShaderMaterial && me.releaseShaderCache(e4));
          })(e3), le.remove(e3);
        })(t2);
      }
      function Ie(e2, t2, n2, r2) {
        null !== b && e2.isNodeMaterial && b.setObject(r2, e2), true === $ && ve.setState(e2, n2, false), true === e2.transparent && e2.side === DoubleSide && false === e2.forceSinglePass ? (e2.side = BackSide, e2.needsUpdate = true, Xe(e2, t2, r2), e2.side = FrontSide, e2.needsUpdate = true, Xe(e2, t2, r2), e2.side = DoubleSide) : Xe(e2, t2, r2);
      }
      this.xr = Ue, this.getContext = function() {
        return be;
      }, this.getContextAttributes = function() {
        return be.getContextAttributes();
      }, this.forceContextLoss = function() {
        const e2 = ae.get("WEBGL_lose_context");
        e2 && e2.loseContext();
      }, this.forceContextRestore = function() {
        const e2 = ae.get("WEBGL_lose_context");
        e2 && e2.restoreContext();
      }, this.getPixelRatio = function() {
        return k;
      }, this.setPixelRatio = function(e2) {
        void 0 !== e2 && (k = e2, this.setSize(H, W, false));
      }, this.getSize = function(e2) {
        return e2.set(H, W);
      }, this.setSize = function(e2, n2, r2 = true) {
        Ue.isPresenting ? warn("WebGLRenderer: Can't change size while VR device is presenting.") : (H = e2, W = n2, t.width = Math.floor(e2 * k), t.height = Math.floor(n2 * k), true === r2 && (t.style.width = e2 + "px", t.style.height = n2 + "px"), null !== R && R.setSize(t.width, t.height), this.setViewport(0, 0, e2, n2));
      }, this.getDrawingBufferSize = function(e2) {
        return e2.set(H * k, W * k).floor();
      }, this.setDrawingBufferSize = function(e2, n2, r2) {
        H = e2, W = n2, k = r2, t.width = Math.floor(e2 * r2), t.height = Math.floor(n2 * r2), this.setViewport(0, 0, e2, n2);
      }, this.setEffects = function(e2) {
        if (m !== UnsignedByteType) {
          if (e2) {
            for (let t2 = 0; t2 < e2.length; t2++) if (true === e2[t2].isOutputPass) {
              warn("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
              break;
            }
          }
          R.setEffects(e2 || []);
        } else error("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
      }, this.getCurrentViewport = function(e2) {
        return e2.copy(F);
      }, this.getViewport = function(e2) {
        return e2.copy(q);
      }, this.setViewport = function(e2, t2, n2, r2) {
        e2.isVector4 ? q.set(e2.x, e2.y, e2.z, e2.w) : q.set(e2, t2, n2, r2), oe.viewport(F.copy(q).multiplyScalar(k).round());
      }, this.getScissor = function(e2) {
        return e2.copy(K);
      }, this.setScissor = function(e2, t2, n2, r2) {
        e2.isVector4 ? K.set(e2.x, e2.y, e2.z, e2.w) : K.set(e2, t2, n2, r2), oe.scissor(O.copy(K).multiplyScalar(k).round());
      }, this.getScissorTest = function() {
        return Y;
      }, this.setScissorTest = function(e2) {
        oe.setScissorTest(Y = e2);
      }, this.setOpaqueSort = function(e2) {
        z = e2;
      }, this.setTransparentSort = function(e2) {
        X = e2;
      }, this.getClearColor = function(e2) {
        return e2.copy(Ee.getClearColor());
      }, this.setClearColor = function() {
        Ee.setClearColor(...arguments);
      }, this.getClearAlpha = function() {
        return Ee.getClearAlpha();
      }, this.setClearAlpha = function() {
        Ee.setClearAlpha(...arguments);
      }, this.clear = function(e2 = true, t2 = true, n2 = true) {
        let r2 = 0;
        if (e2) {
          let e3 = false;
          if (null !== y) {
            const t3 = y.texture.format;
            e3 = _.has(t3);
          }
          if (e3) {
            const e4 = y.texture.type, t3 = h.has(e4), n3 = Ee.getClearColor(), r3 = Ee.getClearAlpha(), a2 = n3.r, i2 = n3.g, o2 = n3.b;
            t3 ? (g[0] = a2, g[1] = i2, g[2] = o2, g[3] = r3, be.clearBufferuiv(be.COLOR, 0, g)) : (v[0] = a2, v[1] = i2, v[2] = o2, v[3] = r3, be.clearBufferiv(be.COLOR, 0, v));
          } else r2 |= be.COLOR_BUFFER_BIT;
        }
        t2 && (r2 |= be.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(true)), n2 && (r2 |= be.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), 0 !== r2 && be.clear(r2);
      }, this.clearColor = function() {
        this.clear(true, false, false);
      }, this.clearDepth = function() {
        this.clear(false, true, false);
      }, this.clearStencil = function() {
        this.clear(false, false, true);
      }, this.setNodesHandler = function(e2) {
        e2.setRenderer(this), b = e2;
      }, this.dispose = function() {
        t.removeEventListener("webglcontextlost", De, false), t.removeEventListener("webglcontextrestored", we, false), t.removeEventListener("webglcontextcreationerror", ye, false), Ee.dispose(), he.dispose(), ge.dispose(), le.dispose(), de.dispose(), pe.dispose(), Ae.dispose(), Ce.dispose(), me.dispose(), Ue.dispose(), Ue.removeEventListener("sessionstart", Oe), Ue.removeEventListener("sessionend", Ge), Be.stop();
      }, this.renderBufferDirect = function(e2, t2, n2, r2, a2, i2) {
        null === t2 && (t2 = te);
        const o2 = a2.isMesh && a2.matrixWorld.determinantAffine() < 0, s2 = (function(e3, t3, n3, r3, a3) {
          true !== t3.isScene && (t3 = te);
          ce.resetTextureUnits();
          const i3 = t3.fog, o3 = r3.isMeshStandardMaterial || r3.isMeshLambertMaterial || r3.isMeshPhongMaterial ? t3.environment : null, s3 = null === y ? A.outputColorSpace : true === y.isXRRenderTarget ? y.texture.colorSpace : ColorManagement.workingColorSpace, l3 = r3.isMeshStandardMaterial || r3.isMeshLambertMaterial && !r3.envMap || r3.isMeshPhongMaterial && !r3.envMap, c3 = de.get(r3.envMap || o3, l3), d3 = true === r3.vertexColors && !!n3.attributes.color && 4 === n3.attributes.color.itemSize, u3 = !!n3.attributes.tangent && (!!r3.normalMap || r3.anisotropy > 0), f3 = !!n3.morphAttributes.position, p3 = !!n3.morphAttributes.normal, m3 = !!n3.morphAttributes.color;
          let _3 = NoToneMapping;
          r3.toneMapped && (null !== y && true !== y.isXRRenderTarget || (_3 = A.toneMapping));
          const h3 = n3.morphAttributes.position || n3.morphAttributes.normal || n3.morphAttributes.color, g2 = void 0 !== h3 ? h3.length : 0, v2 = le.get(r3), E2 = T.state.lights;
          if (true === $ && (true === Z || e3 !== I)) {
            const t4 = e3 === I && r3.id === N;
            ve.setState(r3, e3, t4);
          }
          let M2 = false;
          r3.version === v2.__version ? v2.needsLights && v2.lightsStateVersion !== E2.state.version || v2.outputColorSpace !== s3 || a3.isBatchedMesh && false === v2.batching ? M2 = true : a3.isBatchedMesh || true !== v2.batching ? a3.isBatchedMesh && true === v2.batchingColor && null === a3._colorsTexture || a3.isBatchedMesh && false === v2.batchingColor && null !== a3._colorsTexture || a3.isInstancedMesh && false === v2.instancing ? M2 = true : a3.isInstancedMesh || true !== v2.instancing ? a3.isSkinnedMesh && false === v2.skinning ? M2 = true : a3.isSkinnedMesh || true !== v2.skinning ? a3.isInstancedMesh && true === v2.instancingColor && null === a3.instanceColor || a3.isInstancedMesh && false === v2.instancingColor && null !== a3.instanceColor || a3.isInstancedMesh && true === v2.instancingMorph && null === a3.morphTexture || a3.isInstancedMesh && false === v2.instancingMorph && null !== a3.morphTexture || v2.envMap !== c3 || true === r3.fog && v2.fog !== i3 ? M2 = true : void 0 === v2.numClippingPlanes || v2.numClippingPlanes === ve.numPlanes && v2.numIntersection === ve.numIntersection ? (v2.vertexAlphas !== d3 || v2.vertexTangents !== u3 || v2.morphTargets !== f3 || v2.morphNormals !== p3 || v2.morphColors !== m3 || v2.toneMapping !== _3 || v2.morphTargetsCount !== g2 || !!v2.lightProbeGrid != T.state.lightProbeGridArray.length > 0) && (M2 = true) : M2 = true : M2 = true : M2 = true : M2 = true : (M2 = true, v2.__version = r3.version);
          let x2 = v2.currentProgram;
          true === M2 && (x2 = Xe(r3, t3, a3), b && r3.isNodeMaterial && b.onUpdateProgram(r3, x2, v2));
          let R2 = false, C2 = false, L2 = false;
          const P2 = x2.getUniforms(), U2 = v2.uniforms;
          oe.useProgram(x2.program) && (R2 = true, C2 = true, L2 = true);
          r3.id !== N && (N = r3.id, C2 = true);
          if (v2.needsLights) {
            const e4 = (function(e5, t4) {
              if (0 === e5.length) return null;
              if (1 === e5.length) return null !== e5[0].texture ? e5[0] : null;
              S.setFromMatrixPosition(t4.matrixWorld);
              for (let t5 = 0, n4 = e5.length; t5 < n4; t5++) {
                const n5 = e5[t5];
                if (null !== n5.texture && n5.boundingBox.containsPoint(S)) return n5;
              }
              return null;
            })(T.state.lightProbeGridArray, a3);
            v2.lightProbeGrid !== e4 && (v2.lightProbeGrid = e4, C2 = true);
          }
          if (R2 || I !== e3) {
            oe.buffers.depth.getReversed() && true !== e3.reversedDepth && (e3._reversedDepth = true, e3.updateProjectionMatrix()), P2.setValue(be, "projectionMatrix", e3.projectionMatrix), P2.setValue(be, "viewMatrix", e3.matrixWorldInverse);
            const t4 = P2.map.cameraPosition;
            void 0 !== t4 && t4.setValue(be, J.setFromMatrixPosition(e3.matrixWorld)), ie.logarithmicDepthBuffer && P2.setValue(be, "logDepthBufFC", 2 / (Math.log(e3.far + 1) / Math.LN2)), (r3.isMeshPhongMaterial || r3.isMeshToonMaterial || r3.isMeshLambertMaterial || r3.isMeshBasicMaterial || r3.isMeshStandardMaterial || r3.isShaderMaterial) && P2.setValue(be, "isOrthographic", true === e3.isOrthographicCamera), I !== e3 && (I = e3, C2 = true, L2 = true);
          }
          v2.needsLights && (E2.state.sunShadowMap.length > 0 && P2.setValue(be, "sunShadowMap", E2.state.sunShadowMap, ce), E2.state.directionalShadowMap.length > 0 && P2.setValue(be, "directionalShadowMap", E2.state.directionalShadowMap, ce), E2.state.spotShadowMap.length > 0 && P2.setValue(be, "spotShadowMap", E2.state.spotShadowMap, ce), E2.state.pointShadowMap.length > 0 && P2.setValue(be, "pointShadowMap", E2.state.pointShadowMap, ce));
          if (a3.isSkinnedMesh) {
            P2.setOptional(be, a3, "bindMatrix"), P2.setOptional(be, a3, "bindMatrixInverse");
            const e4 = a3.skeleton;
            e4 && (null === e4.boneTexture && e4.computeBoneTexture(), P2.setValue(be, "boneTexture", e4.boneTexture, ce));
          }
          a3.isBatchedMesh && (P2.setOptional(be, a3, "batchingTexture"), P2.setValue(be, "batchingTexture", a3._matricesTexture, ce), P2.setOptional(be, a3, "batchingIdTexture"), P2.setValue(be, "batchingIdTexture", a3._indirectTexture, ce), P2.setOptional(be, a3, "batchingColorTexture"), null !== a3._colorsTexture && P2.setValue(be, "batchingColorTexture", a3._colorsTexture, ce));
          const D2 = n3.morphAttributes;
          void 0 === D2.position && void 0 === D2.normal && void 0 === D2.color || Te.update(a3, n3, x2);
          (C2 || v2.receiveShadow !== a3.receiveShadow) && (v2.receiveShadow = a3.receiveShadow, P2.setValue(be, "receiveShadow", a3.receiveShadow));
          (r3.isMeshStandardMaterial || r3.isMeshLambertMaterial || r3.isMeshPhongMaterial) && null === r3.envMap && null !== t3.environment && (U2.envMapIntensity.value = t3.environmentIntensity);
          void 0 !== U2.dfgLUT && (U2.dfgLUT.value = getDFGLUT());
          if (C2) {
            if (P2.setValue(be, "toneMappingExposure", A.toneMappingExposure), v2.needsLights && (F2 = L2, (w2 = U2).ambientLightColor.needsUpdate = F2, w2.lightProbe.needsUpdate = F2, w2.sunLights.needsUpdate = F2, w2.sunLightShadows.needsUpdate = F2, w2.directionalLights.needsUpdate = F2, w2.directionalLightShadows.needsUpdate = F2, w2.pointLights.needsUpdate = F2, w2.pointLightShadows.needsUpdate = F2, w2.spotLights.needsUpdate = F2, w2.spotLightShadows.needsUpdate = F2, w2.rectAreaLights.needsUpdate = F2, w2.hemisphereLights.needsUpdate = F2), i3 && true === r3.fog && _e.refreshFogUniforms(U2, i3), _e.refreshMaterialUniforms(U2, r3, k, W, T.state.transmissionRenderTarget[e3.id]), v2.needsLights && v2.lightProbeGrid) {
              const e4 = v2.lightProbeGrid;
              U2.probesSH.value = e4.texture, U2.probesMin.value.copy(e4.boundingBox.min), U2.probesMax.value.copy(e4.boundingBox.max), U2.probesResolution.value.copy(e4.resolution);
            }
            WebGLUniforms.upload(be, qe(v2), U2, ce);
          }
          var w2, F2;
          r3.isShaderMaterial && true === r3.uniformsNeedUpdate && (WebGLUniforms.upload(be, qe(v2), U2, ce), r3.uniformsNeedUpdate = false);
          r3.isSpriteMaterial && P2.setValue(be, "center", a3.center);
          if (P2.setValue(be, "modelViewMatrix", a3.modelViewMatrix), P2.setValue(be, "normalMatrix", a3.normalMatrix), P2.setValue(be, "modelMatrix", a3.matrixWorld), void 0 !== r3.uniformsGroups) {
            const e4 = r3.uniformsGroups;
            for (let t4 = 0, n4 = e4.length; t4 < n4; t4++) {
              const n5 = e4[t4];
              Ce.update(n5, x2), Ce.bind(n5, x2);
            }
          }
          return x2;
        })(e2, t2, n2, r2, a2);
        oe.setMaterial(r2, o2);
        let l2 = n2.index, c2 = 1;
        if (true === r2.wireframe) {
          if (l2 = fe.getWireframeAttribute(n2), void 0 === l2) return;
          c2 = 2;
        }
        const d2 = n2.drawRange, u2 = n2.attributes.position;
        let f2 = d2.start * c2, p2 = (d2.start + d2.count) * c2;
        null !== i2 && (f2 = Math.max(f2, i2.start * c2), p2 = Math.min(p2, (i2.start + i2.count) * c2)), null !== l2 ? (f2 = Math.max(f2, 0), p2 = Math.min(p2, l2.count)) : null != u2 && (f2 = Math.max(f2, 0), p2 = Math.min(p2, u2.count));
        const m2 = p2 - f2;
        if (m2 < 0 || m2 === 1 / 0) return;
        let _2;
        Ae.setup(a2, r2, s2, n2, l2);
        let h2 = Me;
        if (null !== l2 && (_2 = ue.get(l2), h2 = xe, h2.setIndex(_2)), a2.isMesh) true === r2.wireframe ? (oe.setLineWidth(r2.wireframeLinewidth * re()), h2.setMode(be.LINES)) : h2.setMode(be.TRIANGLES);
        else if (a2.isLine) {
          let e3 = r2.linewidth;
          void 0 === e3 && (e3 = 1), oe.setLineWidth(e3 * re()), a2.isLineSegments ? h2.setMode(be.LINES) : a2.isLineLoop ? h2.setMode(be.LINE_LOOP) : h2.setMode(be.LINE_STRIP);
        } else a2.isPoints ? h2.setMode(be.POINTS) : a2.isSprite && h2.setMode(be.TRIANGLES);
        if (a2.isBatchedMesh) if (ae.get("WEBGL_multi_draw")) h2.renderMultiDraw(a2._multiDrawStarts, a2._multiDrawCounts, a2._multiDrawCount);
        else {
          const e3 = a2._multiDrawStarts, t3 = a2._multiDrawCounts, n3 = a2._multiDrawCount, i3 = l2 ? ue.get(l2).bytesPerElement : 1, o3 = le.get(r2).currentProgram.getUniforms();
          for (let r3 = 0; r3 < n3; r3++) o3.setValue(be, "_gl_DrawID", r3), h2.render(e3[r3] / i3, t3[r3]);
        }
        else if (a2.isInstancedMesh) h2.renderInstances(f2, m2, a2.count);
        else if (n2.isInstancedBufferGeometry) {
          const e3 = void 0 !== n2._maxInstanceCount ? n2._maxInstanceCount : 1 / 0, t3 = Math.min(n2.instanceCount, e3);
          h2.renderInstances(f2, m2, t3);
        } else h2.render(f2, m2);
      }, this.compile = function(e2, t2, n2 = null) {
        null === n2 && (n2 = e2), null !== b && b.renderStart(e2, t2, n2), T = ge.get(n2), T.init(t2), x.push(T), n2.traverseVisible(function(e3) {
          e3.isLight && e3.layers.test(t2.layers) && (T.pushLight(e3), e3.castShadow && T.pushShadow(e3));
        }), e2 !== n2 && e2.traverseVisible(function(e3) {
          e3.isLight && e3.layers.test(t2.layers) && (T.pushLight(e3), e3.castShadow && T.pushShadow(e3));
        }), T.setupLights(), null !== b && b.updateLights(T.state.lightsArray), Z = this.localClippingEnabled, $ = ve.init(this.clippingPlanes, Z), true === $ && ve.setGlobalState(this.clippingPlanes, t2), null !== b && Se.render(T.state.shadowsArray, n2, t2);
        const r2 = /* @__PURE__ */ new Set();
        return e2.traverse(function(e3) {
          if (!(e3.isMesh || e3.isPoints || e3.isLine || e3.isSprite)) return;
          const a2 = e3.material;
          if (a2) if (Array.isArray(a2)) for (let i2 = 0; i2 < a2.length; i2++) {
            const o2 = a2[i2];
            Ie(o2, n2, t2, e3), r2.add(o2);
          }
          else Ie(a2, n2, t2, e3), r2.add(a2);
        }), T = x.pop(), null !== b && b.renderEnd(), r2;
      }, this.compileAsync = function(e2, t2, n2 = null) {
        const r2 = this.compile(e2, t2, n2);
        return new Promise((t3) => {
          function n3() {
            r2.forEach(function(e3) {
              const t4 = le.get(e3).currentProgram;
              (void 0 === t4 || t4.isReady()) && r2.delete(e3);
            }), 0 !== r2.size ? setTimeout(n3, 10) : t3(e2);
          }
          null !== ae.get("KHR_parallel_shader_compile") ? n3() : setTimeout(n3, 10);
        });
      };
      let Fe = null;
      function Oe() {
        Be.stop();
      }
      function Ge() {
        Be.start();
      }
      const Be = new WebGLAnimation();
      function Ve(e2, t2, n2, r2) {
        if (false === e2.visible) return;
        if (e2.layers.test(t2.layers)) {
          if (e2.isGroup) n2 = e2.renderOrder;
          else if (e2.isLOD) true === e2.autoUpdate && e2.update(t2);
          else if (e2.isLightProbeGrid) T.pushLightProbeGrid(e2);
          else if (e2.isLight) T.pushLight(e2), e2.castShadow && T.pushShadow(e2);
          else if (e2.isSprite) {
            if (!e2.frustumCulled || e2.intersectsFrustum(j)) {
              r2 && ee.setFromMatrixPosition(e2.matrixWorld).applyMatrix4(Q);
              const a3 = pe.update(e2), i2 = e2.material;
              i2.visible && E.push(e2, a3, i2, n2, ee.z, null, t2);
            }
          } else if ((e2.isMesh || e2.isLine || e2.isPoints) && (!e2.frustumCulled || e2.intersectsFrustum(j))) {
            const a3 = pe.update(e2), i2 = e2.material;
            if (r2 && (void 0 !== e2.boundingSphere ? (null === e2.boundingSphere && e2.computeBoundingSphere(), ee.copy(e2.boundingSphere.center)) : (null === a3.boundingSphere && a3.computeBoundingSphere(), ee.copy(a3.boundingSphere.center)), ee.applyMatrix4(e2.matrixWorld).applyMatrix4(Q)), Array.isArray(i2)) {
              const r3 = a3.groups;
              for (let o2 = 0, s2 = r3.length; o2 < s2; o2++) {
                const s3 = r3[o2], l2 = i2[s3.materialIndex];
                l2 && l2.visible && E.push(e2, a3, l2, n2, ee.z, s3, t2);
              }
            } else i2.visible && E.push(e2, a3, i2, n2, ee.z, null, t2);
          }
        }
        const a2 = e2.children;
        for (let e3 = 0, i2 = a2.length; e3 < i2; e3++) Ve(a2[e3], t2, n2, r2);
      }
      function He(e2, t2, n2, r2) {
        const { opaque: a2, transmissive: i2, transparent: o2 } = e2;
        T.setupLightsView(n2), true === $ && ve.setGlobalState(A.clippingPlanes, n2), r2 && oe.viewport(F.copy(r2)), a2.length > 0 && ke(a2, t2, n2), i2.length > 0 && ke(i2, t2, n2), o2.length > 0 && ke(o2, t2, n2), oe.buffers.depth.setTest(true), oe.buffers.depth.setMask(true), oe.buffers.color.setMask(true), oe.setPolygonOffset(false);
      }
      function We(e2, t2, n2, r2) {
        if (null !== (true === n2.isScene ? n2.overrideMaterial : null)) return;
        if (void 0 === T.state.transmissionRenderTarget[r2.id]) {
          const e3 = ae.has("EXT_color_buffer_half_float") || ae.has("EXT_color_buffer_float");
          T.state.transmissionRenderTarget[r2.id] = new WebGLRenderTarget(1, 1, { generateMipmaps: true, type: e3 ? HalfFloatType : UnsignedByteType, minFilter: LinearMipmapLinearFilter, samples: Math.max(4, ie.samples), stencilBuffer: a, resolveDepthBuffer: false, resolveStencilBuffer: false, storeMultisampledDepthBuffer: false, storeMultisampledStencilBuffer: false, colorSpace: ColorManagement.workingColorSpace });
        }
        const i2 = T.state.transmissionRenderTarget[r2.id], o2 = r2.viewport || F;
        i2.setSize(o2.z * A.transmissionResolutionScale, o2.w * A.transmissionResolutionScale);
        const s2 = A.getRenderTarget(), l2 = A.getActiveCubeFace(), c2 = A.getActiveMipmapLevel();
        A.setRenderTarget(i2), A.getClearColor(B), V = A.getClearAlpha(), V < 1 && A.setClearColor(16777215, 0.5), A.clear(), ne && Ee.render(n2);
        const d2 = A.toneMapping;
        A.toneMapping = NoToneMapping;
        const u2 = r2.viewport;
        if (void 0 !== r2.viewport && (r2.viewport = void 0), T.setupLightsView(r2), true === $ && ve.setGlobalState(A.clippingPlanes, r2), ke(e2, n2, r2), ce.updateMultisampleRenderTarget(i2), ce.updateRenderTargetMipmap(i2), false === ae.has("WEBGL_multisampled_render_to_texture")) {
          let e3 = false;
          for (let a2 = 0, i3 = t2.length; a2 < i3; a2++) {
            const i4 = t2[a2], { object: o3, geometry: s3, material: l3, group: c3 } = i4;
            if (l3.side === DoubleSide && o3.layers.test(r2.layers)) {
              const t3 = l3.side;
              l3.side = BackSide, l3.needsUpdate = true, ze(o3, n2, r2, s3, l3, c3), l3.side = t3, l3.needsUpdate = true, e3 = true;
            }
          }
          true === e3 && (ce.updateMultisampleRenderTarget(i2), ce.updateRenderTargetMipmap(i2));
        }
        A.setRenderTarget(s2, l2, c2), A.setClearColor(B, V), void 0 !== u2 && (r2.viewport = u2), A.toneMapping = d2;
      }
      function ke(e2, t2, n2) {
        const r2 = true === t2.isScene ? t2.overrideMaterial : null;
        for (let a2 = 0, i2 = e2.length; a2 < i2; a2++) {
          const i3 = e2[a2], { object: o2, geometry: s2, group: l2 } = i3;
          let c2 = i3.material;
          true === c2.allowOverride && null !== r2 && (c2 = r2), o2.layers.test(n2.layers) && ze(o2, t2, n2, s2, c2, l2);
        }
      }
      function ze(e2, t2, n2, r2, a2, i2) {
        null !== b && a2.isNodeMaterial && b.setObject(e2, a2), e2.onBeforeRender(A, t2, n2, r2, a2, i2), e2.modelViewMatrix.multiplyMatrices(n2.matrixWorldInverse, e2.matrixWorld), e2.normalMatrix.getNormalMatrix(e2.modelViewMatrix), a2.onBeforeRender(A, t2, n2, r2, e2, i2), true === a2.transparent && a2.side === DoubleSide && false === a2.forceSinglePass ? (a2.side = BackSide, a2.needsUpdate = true, A.renderBufferDirect(n2, t2, r2, a2, e2, i2), a2.side = FrontSide, a2.needsUpdate = true, A.renderBufferDirect(n2, t2, r2, a2, e2, i2), a2.side = DoubleSide) : A.renderBufferDirect(n2, t2, r2, a2, e2, i2), e2.onAfterRender(A, t2, n2, r2, a2, i2);
      }
      function Xe(e2, t2, n2) {
        true !== t2.isScene && (t2 = te);
        const r2 = le.get(e2), a2 = T.state.lights, i2 = T.state.shadowsArray, o2 = a2.state.version, s2 = me.getParameters(e2, a2.state, i2, t2, n2, T.state.lightProbeGridArray), l2 = me.getProgramCacheKey(s2);
        let c2 = r2.programs;
        r2.environment = e2.isMeshStandardMaterial || e2.isMeshLambertMaterial || e2.isMeshPhongMaterial ? t2.environment : null, r2.fog = t2.fog;
        const d2 = e2.isMeshStandardMaterial || e2.isMeshLambertMaterial && !e2.envMap || e2.isMeshPhongMaterial && !e2.envMap;
        r2.envMap = de.get(e2.envMap || r2.environment, d2), r2.envMapRotation = null !== r2.environment && null === e2.envMap ? t2.environmentRotation : e2.envMapRotation, void 0 === c2 && (e2.addEventListener("dispose", Ne), c2 = /* @__PURE__ */ new Map(), r2.programs = c2);
        let u2 = c2.get(l2);
        if (void 0 !== u2) {
          if (r2.currentProgram === u2 && r2.lightsStateVersion === o2) return Ke(e2, s2), u2;
        } else s2.uniforms = me.getUniforms(e2), null !== b && e2.isNodeMaterial && b.build(e2, n2, s2), e2.onBeforeCompile(s2, A), u2 = me.acquireProgram(s2, l2), c2.set(l2, u2), r2.uniforms = s2.uniforms;
        const f2 = r2.uniforms;
        return (e2.isShaderMaterial || e2.isRawShaderMaterial) && true !== e2.clipping || (f2.clippingPlanes = ve.uniform), Ke(e2, s2), r2.needsLights = (function(e3) {
          return e3.isMeshLambertMaterial || e3.isMeshToonMaterial || e3.isMeshPhongMaterial || e3.isMeshStandardMaterial || e3.isShadowMaterial || e3.isShaderMaterial && true === e3.lights;
        })(e2), r2.lightsStateVersion = o2, r2.needsLights && (f2.ambientLightColor.value = a2.state.ambient, f2.lightProbe.value = a2.state.probe, f2.sunLights.value = a2.state.sun, f2.sunLightShadows.value = a2.state.sunShadow, f2.directionalLights.value = a2.state.directional, f2.directionalLightShadows.value = a2.state.directionalShadow, f2.spotLights.value = a2.state.spot, f2.spotLightShadows.value = a2.state.spotShadow, f2.rectAreaLights.value = a2.state.rectArea, f2.ltc_1.value = a2.state.rectAreaLTC1, f2.ltc_2.value = a2.state.rectAreaLTC2, f2.pointLights.value = a2.state.point, f2.pointLightShadows.value = a2.state.pointShadow, f2.hemisphereLights.value = a2.state.hemi, f2.sunShadowMatrix.value = a2.state.sunShadowMatrix, f2.sunShadowCascade.value = a2.state.sunShadowCascade, f2.directionalShadowMatrix.value = a2.state.directionalShadowMatrix, f2.spotLightMatrix.value = a2.state.spotLightMatrix, f2.spotLightMap.value = a2.state.spotLightMap, f2.pointShadowMatrix.value = a2.state.pointShadowMatrix), r2.lightProbeGrid = T.state.lightProbeGridArray.length > 0, r2.currentProgram = u2, r2.uniformsList = null, u2;
      }
      function qe(e2) {
        if (null === e2.uniformsList) {
          const t2 = e2.currentProgram.getUniforms();
          e2.uniformsList = WebGLUniforms.seqWithValue(t2.seq, e2.uniforms);
        }
        return e2.uniformsList;
      }
      function Ke(e2, t2) {
        const n2 = le.get(e2);
        n2.outputColorSpace = t2.outputColorSpace, n2.batching = t2.batching, n2.batchingColor = t2.batchingColor, n2.instancing = t2.instancing, n2.instancingColor = t2.instancingColor, n2.instancingMorph = t2.instancingMorph, n2.skinning = t2.skinning, n2.morphTargets = t2.morphTargets, n2.morphNormals = t2.morphNormals, n2.morphColors = t2.morphColors, n2.morphTargetsCount = t2.morphTargetsCount, n2.numClippingPlanes = t2.numClippingPlanes, n2.numIntersection = t2.numClipIntersection, n2.vertexAlphas = t2.vertexAlphas, n2.vertexTangents = t2.vertexTangents, n2.toneMapping = t2.toneMapping;
      }
      function Ye(e2) {
        const t2 = le.get(e2);
        return t2.__readFormat === e2.format && t2.__readType === e2.type || (t2.__readFormat = e2.format, t2.__readType = e2.type, t2.__formatReadable = ie.textureFormatReadable(e2.format), t2.__typeReadable = ie.textureTypeReadable(e2.type)), t2;
      }
      Be.setAnimationLoop(function(e2) {
        Fe && Fe(e2);
      }), "undefined" != typeof self && Be.setContext(self), this.setAnimationLoop = function(e2) {
        Fe = e2, Ue.setAnimationLoop(e2), null === e2 ? Be.stop() : Be.start();
      }, Ue.addEventListener("sessionstart", Oe), Ue.addEventListener("sessionend", Ge), this.render = function(e2, t2) {
        if (void 0 !== t2 && true !== t2.isCamera) return void error("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        if (true === C) return;
        null !== b && b.renderStart(e2, t2);
        const n2 = true === Ue.enabled && true === Ue.isPresenting, r2 = null !== R && (null === y || n2) && R.begin(A, y);
        if (true === e2.matrixWorldAutoUpdate && e2.updateMatrixWorld(), null === t2.parent && true === t2.matrixWorldAutoUpdate && t2.updateMatrixWorld(), true !== Ue.enabled || true !== Ue.isPresenting || null !== R && false !== R.isCompositing() || (true === Ue.cameraAutoUpdate && Ue.updateCamera(t2), t2 = Ue.getCamera()), true === e2.isScene && e2.onBeforeRender(A, e2, t2, y), T = ge.get(e2, x.length), T.init(t2), T.state.textureUnits = ce.getTextureUnits(), x.push(T), Q.multiplyMatrices(t2.projectionMatrix, t2.matrixWorldInverse), j.setFromProjectionMatrix(Q, WebGLCoordinateSystem, t2.reversedDepth), Z = this.localClippingEnabled, $ = ve.init(this.clippingPlanes, Z), E = he.get(e2, M.length), E.init(), M.push(E), true === Ue.enabled && true === Ue.isPresenting) {
          const e3 = A.xr.getDepthSensingMesh();
          null !== e3 && Ve(e3, t2, -1 / 0, A.sortObjects);
        }
        Ve(e2, t2, 0, A.sortObjects), E.finish(), null !== b && b.updateLights(T.state.lightsArray), true === A.sortObjects && E.sort(z, X), ne = false === Ue.enabled || false === Ue.isPresenting || false === Ue.hasDepthSensing(), ne && Ee.addToRenderList(E, e2), this.info.render.frame++, true === this.info.autoReset && this.info.reset(), true === $ && ve.beginShadows();
        const a2 = T.state.shadowsArray;
        Se.render(a2, e2, t2), true === $ && ve.endShadows();
        if (false === (r2 && R.hasRenderPass())) {
          const n3 = E.opaque, r3 = E.transmissive;
          if (T.setupLights(), t2.isArrayCamera) {
            const a3 = t2.cameras;
            if (r3.length > 0) for (let t3 = 0, i2 = a3.length; t3 < i2; t3++) {
              We(n3, r3, e2, a3[t3]);
            }
            ne && Ee.render(e2);
            for (let t3 = 0, n4 = a3.length; t3 < n4; t3++) {
              const n5 = a3[t3];
              He(E, e2, n5, n5.viewport);
            }
          } else r3.length > 0 && We(n3, r3, e2, t2), ne && Ee.render(e2), He(E, e2, t2);
        }
        null !== y && 0 === w && (ce.updateMultisampleRenderTarget(y), ce.updateRenderTargetMipmap(y)), r2 && R.end(A), true === e2.isScene && e2.onAfterRender(A, e2, t2), Ae.resetDefaultState(), N = -1, I = null, x.pop(), x.length > 0 ? (T = x[x.length - 1], ce.setTextureUnits(T.state.textureUnits), true === $ && ve.setGlobalState(A.clippingPlanes, T.state.camera)) : T = null, M.pop(), E = M.length > 0 ? M[M.length - 1] : null, null !== b && b.renderEnd();
      }, this.getActiveCubeFace = function() {
        return D;
      }, this.getActiveMipmapLevel = function() {
        return w;
      }, this.getRenderTarget = function() {
        return y;
      }, this.setRenderTargetTextures = function(e2, t2, n2) {
        const r2 = le.get(e2);
        r2.__autoAllocateDepthBuffer = false === e2.resolveDepthBuffer, false === r2.__autoAllocateDepthBuffer && (r2.__useRenderToTexture = false), le.get(e2.texture).__webglTexture = t2, le.get(e2.depthTexture).__webglTexture = r2.__autoAllocateDepthBuffer ? void 0 : n2, r2.__hasExternalTextures = true;
      }, this.setRenderTargetFramebuffer = function(e2, t2) {
        const n2 = le.get(e2);
        n2.__webglFramebuffer = t2, n2.__useDefaultFramebuffer = void 0 === t2;
      }, this.setRenderTarget = function(e2, t2 = 0, n2 = 0) {
        y = e2, D = t2, w = n2;
        let r2 = null, a2 = false, i2 = false;
        if (e2) {
          const o2 = le.get(e2);
          if (void 0 !== o2.__useDefaultFramebuffer) return oe.bindFramebuffer(be.FRAMEBUFFER, o2.__webglFramebuffer), F.copy(e2.viewport), O.copy(e2.scissor), G = e2.scissorTest, oe.viewport(F), oe.scissor(O), oe.setScissorTest(G), void (N = -1);
          if (void 0 === o2.__webglFramebuffer) ce.setupRenderTarget(e2);
          else if (o2.__hasExternalTextures) ce.rebindTextures(e2, le.get(e2.texture).__webglTexture, le.get(e2.depthTexture).__webglTexture);
          else if (e2.depthBuffer) {
            const t3 = e2.depthTexture;
            if (o2.__boundDepthTexture !== t3) {
              if (null !== t3 && le.has(t3) && (e2.width !== t3.image.width || e2.height !== t3.image.height)) throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
              ce.setupDepthRenderbuffer(e2);
            }
          }
          const s2 = e2.texture;
          (s2.isData3DTexture || s2.isDataArrayTexture || s2.isCompressedArrayTexture) && (i2 = true);
          const l2 = le.get(e2).__webglFramebuffer;
          e2.isWebGLCubeRenderTarget ? (r2 = Array.isArray(l2[t2]) ? l2[t2][n2] : l2[t2], a2 = true) : r2 = e2.samples > 0 && false === ce.useMultisampledRTT(e2) ? le.get(e2).__webglMultisampledFramebuffer : Array.isArray(l2) ? l2[n2] : l2, F.copy(e2.viewport), O.copy(e2.scissor), G = e2.scissorTest;
        } else F.copy(q).multiplyScalar(k).floor(), O.copy(K).multiplyScalar(k).floor(), G = Y;
        0 !== n2 && (r2 = L);
        if (oe.bindFramebuffer(be.FRAMEBUFFER, r2) && oe.drawBuffers(e2, r2), oe.viewport(F), oe.scissor(O), oe.setScissorTest(G), a2) {
          const r3 = le.get(e2.texture);
          be.framebufferTexture2D(be.FRAMEBUFFER, be.COLOR_ATTACHMENT0, be.TEXTURE_CUBE_MAP_POSITIVE_X + t2, r3.__webglTexture, n2);
        } else if (i2) {
          const r3 = t2;
          for (let t3 = 0; t3 < e2.textures.length; t3++) {
            const a3 = le.get(e2.textures[t3]);
            be.framebufferTextureLayer(be.FRAMEBUFFER, be.COLOR_ATTACHMENT0 + t3, a3.__webglTexture, n2, r3);
          }
        } else if (null !== e2 && 0 !== n2) {
          const t3 = le.get(e2.texture);
          be.framebufferTexture2D(be.FRAMEBUFFER, be.COLOR_ATTACHMENT0, be.TEXTURE_2D, t3.__webglTexture, n2);
        }
        N = -1;
      }, this.readRenderTargetPixels = function(e2, t2, n2, r2, a2, i2, o2, s2 = 0) {
        if (!e2 || !e2.isWebGLRenderTarget) return void error("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        let l2 = le.get(e2).__webglFramebuffer;
        if (e2.isWebGLCubeRenderTarget && void 0 !== o2 && (l2 = l2[o2]), l2) {
          oe.bindFramebuffer(be.FRAMEBUFFER, l2);
          try {
            const o3 = e2.textures[s2], l3 = o3.format, c2 = o3.type;
            e2.textures.length > 1 && be.readBuffer(be.COLOR_ATTACHMENT0 + s2);
            const d2 = Ye(o3);
            if (false === d2.__formatReadable) return void error("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            if (false === d2.__typeReadable) return void error("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            t2 >= 0 && t2 <= e2.width - r2 && n2 >= 0 && n2 <= e2.height - a2 && be.readPixels(t2, n2, r2, a2, Re.convert(l3), Re.convert(c2), i2);
          } finally {
            const e3 = null !== y ? le.get(y).__webglFramebuffer : null;
            oe.bindFramebuffer(be.FRAMEBUFFER, e3);
          }
        }
      }, this.readRenderTargetPixelsAsync = async function(e2, t2, n2, r2, a2, i2, o2, s2 = 0) {
        if (!e2 || !e2.isWebGLRenderTarget) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        let l2 = le.get(e2).__webglFramebuffer;
        if (e2.isWebGLCubeRenderTarget && void 0 !== o2 && (l2 = l2[o2]), l2) {
          if (t2 >= 0 && t2 <= e2.width - r2 && n2 >= 0 && n2 <= e2.height - a2) {
            oe.bindFramebuffer(be.FRAMEBUFFER, l2);
            const o3 = e2.textures[s2], c2 = o3.format, d2 = o3.type;
            e2.textures.length > 1 && be.readBuffer(be.COLOR_ATTACHMENT0 + s2);
            const u2 = Ye(o3);
            if (false === u2.__formatReadable) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
            if (false === u2.__typeReadable) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
            const f2 = be.createBuffer();
            be.bindBuffer(be.PIXEL_PACK_BUFFER, f2), be.bufferData(be.PIXEL_PACK_BUFFER, i2.byteLength, be.STREAM_READ), be.readPixels(t2, n2, r2, a2, Re.convert(c2), Re.convert(d2), 0), be.bindBuffer(be.PIXEL_PACK_BUFFER, null);
            const p2 = null !== y ? le.get(y).__webglFramebuffer : null;
            oe.bindFramebuffer(be.FRAMEBUFFER, p2);
            const m2 = be.fenceSync(be.SYNC_GPU_COMMANDS_COMPLETE, 0);
            return be.flush(), await probeAsync(be, m2, 4), be.bindBuffer(be.PIXEL_PACK_BUFFER, f2), be.getBufferSubData(be.PIXEL_PACK_BUFFER, 0, i2), be.bindBuffer(be.PIXEL_PACK_BUFFER, null), be.deleteBuffer(f2), be.deleteSync(m2), i2;
          }
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
        }
      }, this.copyFramebufferToTexture = function(e2, t2 = null, n2 = 0) {
        const r2 = Math.pow(2, -n2), a2 = Math.floor(e2.image.width * r2), i2 = Math.floor(e2.image.height * r2), o2 = null !== t2 ? t2.x : 0, s2 = null !== t2 ? t2.y : 0;
        ce.setTexture2D(e2, 0), be.copyTexSubImage2D(be.TEXTURE_2D, n2, 0, 0, o2, s2, a2, i2), oe.unbindTexture();
      }, this.copyTextureToTexture = function(e2, t2, n2 = null, r2 = null, a2 = 0, i2 = 0) {
        let o2, s2, l2, c2, d2, u2, f2, p2, m2;
        const _2 = e2.isCompressedTexture ? e2.mipmaps[i2] : e2.image;
        if (null !== n2) o2 = n2.max.x - n2.min.x, s2 = n2.max.y - n2.min.y, l2 = n2.isBox3 ? n2.max.z - n2.min.z : 1, c2 = n2.min.x, d2 = n2.min.y, u2 = n2.isBox3 ? n2.min.z : 0;
        else {
          const t3 = Math.pow(2, -a2);
          o2 = Math.floor(_2.width * t3), s2 = Math.floor(_2.height * t3), l2 = e2.isDataArrayTexture ? _2.depth : e2.isData3DTexture ? Math.floor(_2.depth * t3) : 1, c2 = 0, d2 = 0, u2 = 0;
        }
        null !== r2 ? (f2 = r2.x, p2 = r2.y, m2 = r2.z) : (f2 = 0, p2 = 0, m2 = 0);
        const h2 = Re.convert(t2.format), g2 = Re.convert(t2.type);
        let v2;
        t2.isData3DTexture ? (ce.setTexture3D(t2, 0), v2 = be.TEXTURE_3D) : t2.isDataArrayTexture || t2.isCompressedArrayTexture ? (ce.setTexture2DArray(t2, 0), v2 = be.TEXTURE_2D_ARRAY) : (ce.setTexture2D(t2, 0), v2 = be.TEXTURE_2D), oe.activeTexture(be.TEXTURE0), oe.pixelStorei(be.UNPACK_FLIP_Y_WEBGL, t2.flipY), oe.pixelStorei(be.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t2.premultiplyAlpha), oe.pixelStorei(be.UNPACK_ALIGNMENT, t2.unpackAlignment);
        const S2 = oe.getParameter(be.UNPACK_ROW_LENGTH), E2 = oe.getParameter(be.UNPACK_IMAGE_HEIGHT), T2 = oe.getParameter(be.UNPACK_SKIP_PIXELS), M2 = oe.getParameter(be.UNPACK_SKIP_ROWS), x2 = oe.getParameter(be.UNPACK_SKIP_IMAGES);
        oe.pixelStorei(be.UNPACK_ROW_LENGTH, _2.width), oe.pixelStorei(be.UNPACK_IMAGE_HEIGHT, _2.height), oe.pixelStorei(be.UNPACK_SKIP_PIXELS, c2), oe.pixelStorei(be.UNPACK_SKIP_ROWS, d2), oe.pixelStorei(be.UNPACK_SKIP_IMAGES, u2);
        const R2 = e2.isDataArrayTexture || e2.isData3DTexture, A2 = t2.isDataArrayTexture || t2.isData3DTexture;
        if (e2.isDepthTexture) {
          const n3 = le.get(e2), r3 = le.get(t2), _3 = le.get(n3.__renderTarget), h3 = le.get(r3.__renderTarget);
          oe.bindFramebuffer(be.READ_FRAMEBUFFER, _3.__webglFramebuffer), oe.bindFramebuffer(be.DRAW_FRAMEBUFFER, h3.__webglFramebuffer);
          for (let n4 = 0; n4 < l2; n4++) R2 && (be.framebufferTextureLayer(be.READ_FRAMEBUFFER, be.COLOR_ATTACHMENT0, le.get(e2).__webglTexture, a2, u2 + n4), be.framebufferTextureLayer(be.DRAW_FRAMEBUFFER, be.COLOR_ATTACHMENT0, le.get(t2).__webglTexture, i2, m2 + n4)), be.blitFramebuffer(c2, d2, o2, s2, f2, p2, o2, s2, be.DEPTH_BUFFER_BIT, be.NEAREST);
          oe.bindFramebuffer(be.READ_FRAMEBUFFER, null), oe.bindFramebuffer(be.DRAW_FRAMEBUFFER, null);
        } else if (0 !== a2 || e2.isRenderTargetTexture || le.has(e2)) {
          const n3 = le.get(e2), r3 = le.get(t2);
          oe.bindFramebuffer(be.READ_FRAMEBUFFER, P), oe.bindFramebuffer(be.DRAW_FRAMEBUFFER, U);
          for (let e3 = 0; e3 < l2; e3++) R2 ? be.framebufferTextureLayer(be.READ_FRAMEBUFFER, be.COLOR_ATTACHMENT0, n3.__webglTexture, a2, u2 + e3) : be.framebufferTexture2D(be.READ_FRAMEBUFFER, be.COLOR_ATTACHMENT0, be.TEXTURE_2D, n3.__webglTexture, a2), A2 ? be.framebufferTextureLayer(be.DRAW_FRAMEBUFFER, be.COLOR_ATTACHMENT0, r3.__webglTexture, i2, m2 + e3) : be.framebufferTexture2D(be.DRAW_FRAMEBUFFER, be.COLOR_ATTACHMENT0, be.TEXTURE_2D, r3.__webglTexture, i2), 0 !== a2 ? be.blitFramebuffer(c2, d2, o2, s2, f2, p2, o2, s2, be.COLOR_BUFFER_BIT, be.NEAREST) : A2 ? be.copyTexSubImage3D(v2, i2, f2, p2, m2 + e3, c2, d2, o2, s2) : be.copyTexSubImage2D(v2, i2, f2, p2, c2, d2, o2, s2);
          oe.bindFramebuffer(be.READ_FRAMEBUFFER, null), oe.bindFramebuffer(be.DRAW_FRAMEBUFFER, null);
        } else A2 ? e2.isDataTexture || e2.isData3DTexture ? be.texSubImage3D(v2, i2, f2, p2, m2, o2, s2, l2, h2, g2, _2.data) : t2.isCompressedArrayTexture ? be.compressedTexSubImage3D(v2, i2, f2, p2, m2, o2, s2, l2, h2, _2.data) : be.texSubImage3D(v2, i2, f2, p2, m2, o2, s2, l2, h2, g2, _2) : e2.isDataTexture ? be.texSubImage2D(be.TEXTURE_2D, i2, f2, p2, o2, s2, h2, g2, _2.data) : e2.isCompressedTexture ? be.compressedTexSubImage2D(be.TEXTURE_2D, i2, f2, p2, _2.width, _2.height, h2, _2.data) : be.texSubImage2D(be.TEXTURE_2D, i2, f2, p2, o2, s2, h2, g2, _2);
        oe.pixelStorei(be.UNPACK_ROW_LENGTH, S2), oe.pixelStorei(be.UNPACK_IMAGE_HEIGHT, E2), oe.pixelStorei(be.UNPACK_SKIP_PIXELS, T2), oe.pixelStorei(be.UNPACK_SKIP_ROWS, M2), oe.pixelStorei(be.UNPACK_SKIP_IMAGES, x2), 0 === i2 && t2.generateMipmaps && be.generateMipmap(v2), oe.unbindTexture();
      }, this.initRenderTarget = function(e2) {
        void 0 === le.get(e2).__webglFramebuffer && ce.setupRenderTarget(e2);
      }, this.initTexture = function(e2) {
        e2.isCubeTexture ? ce.setTextureCube(e2, 0) : e2.isData3DTexture ? ce.setTexture3D(e2, 0) : e2.isDataArrayTexture || e2.isCompressedArrayTexture ? ce.setTexture2DArray(e2, 0) : ce.setTexture2D(e2, 0), oe.unbindTexture();
      }, this.resetState = function() {
        D = 0, w = 0, y = null, oe.reset(), Ae.reset();
      }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
    get coordinateSystem() {
      return WebGLCoordinateSystem;
    }
    get outputColorSpace() {
      return this._outputColorSpace;
    }
    set outputColorSpace(e) {
      this._outputColorSpace = e;
      const t = this.getContext();
      t.drawingBufferColorSpace = ColorManagement._getDrawingBufferColorSpace(e), t.unpackColorSpace = ColorManagement._getUnpackColorSpace();
    }
  };

  // source/js/index14.js
  gsap.registerPlugin(ScrollTrigger);
  var lenis;
  var items = [];
  var wraps = [];
  var textures = [];
  var planes = [];
  var renderer;
  var scene;
  var camera;
  var lastTop = null;
  var needsRender = true;
  var scrollVelocity = 0;
  var viewport = { width: 0, height: 0 };
  var marqueeInner = document.querySelector(".mark > .mark__inner");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var textureLoader = new TextureLoader();
  var waterUniforms = {
    uStrength: { value: reduceMotion ? 0 : 0.55 },
    uRipple: { value: 0 },
    uTime: { value: 0 }
  };
  var preloadTextures = (selector) => {
    return Promise.all(
      gsap.utils.toArray(selector).map((item) => {
        const url = item.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)[1];
        return textureLoader.loadAsync(url);
      })
    );
  };
  var vertexShader = (
    /* glsl */
    `
  uniform vec2 uSize;
  uniform vec2 uCenter;
  uniform float uSwirl;
  uniform float uStrength;
  uniform float uRipple;
  uniform float uTime;

  varying vec2 vUv;
  varying float vDepth;

  mat2 rotate(float angle) {
    return mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
  }

  void main() {
    vec3 pos = position * vec3(uSize, 1.0);
    float strength = uStrength;

    // The whirlpool sits a little off-centre, and its pull fades out softly, so there's no sharp tip.
    vec2 center = uCenter * uSize;
    vec2 local = pos.xy - center;
    float dist = length(local / (uSize * 0.5));
    float pull = exp(-dist * dist * 4.0);

    // The images are always in the whirlpool. Around it they turn faster, then the whole image turns a little and is drawn in.
    pos.xy = center + rotate(uSwirl * pull * 4.0) * local;
    pos.xy = rotate(uSwirl * 0.35) * pos.xy * (1.0 - strength * 0.4);

    // A rounded hollow where it sinks in, with an uneven, softer surface around it.
    pos.z = -pull * strength * 320.0;
    pos.z -= (1.0 + sin(local.x * 0.02 + uSwirl * 2.0) * cos(local.y * 0.017)) * strength * 20.0;

    // Rings run across it while scrolling.
    pos.z += (sin(dist * 18.0 - uTime * 5.0) - 1.0) * uRipple * 8.0 * pull;

    vUv = uv;
    vDepth = pull * strength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`
  );
  var fragmentShader = (
    /* glsl */
    `
  uniform sampler2D uTexture;
  uniform vec2 uSize;
  uniform vec2 uImageSize;

  varying vec2 vUv;
  varying float vDepth;

  void main() {
    // Same as background-size: cover
    vec2 ratio = vec2(
      min((uSize.x / uSize.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uSize.y / uSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    vec3 color = texture2D(uTexture, (vUv - 0.5) * ratio + 0.5).rgb;

    // The deeper into the funnel, the darker.
    color *= 1.0 - vDepth * 0.75;

    gl_FragColor = vec4(color, 1.0);
  }
`
  );
  function initSmoothScrolling() {
    lenis = window.SourceDemo.createLenis(Lenis);
    lenis.on("scroll", ({ velocity }) => {
      scrollVelocity = Math.abs(velocity);
      ScrollTrigger.update();
    });
    window.SourceDemo.addTicker(gsap, (time) => {
      lenis.raf(time * 1e3);
    });
    gsap.ticker.lagSmoothing(0);
  }
  function createGalleryWrappers() {
    items = gsap.utils.toArray(".gallery__item");
    items.forEach((item) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("gallery__item-wrap");
      item.parentNode.insertBefore(wrapper, item);
      wrapper.appendChild(item);
    });
    wraps = gsap.utils.toArray(".gallery__item-wrap");
  }
  function positionGalleryItems() {
    const freeSpace = (window.innerWidth - wraps[0].offsetWidth) / 2;
    const amplitude = Math.min(window.innerWidth * 0.15, freeSpace);
    wraps.forEach((wrap, i) => {
      const angle = i * 0.8;
      gsap.set(wrap, {
        x: Math.sin(angle) * amplitude
      });
    });
  }
  function initWebGL() {
    renderer = new WebGLRenderer({
      canvas: document.querySelector(".webgl"),
      antialias: true,
      alpha: true
    });
    window.SourceDemo.watchRenderer(renderer);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    scene = new Scene();
    camera = new PerspectiveCamera(45, 1, 10, 5e3);
    camera.position.z = 1e3;
    const geometry = new PlaneGeometry(1, 1, 96, 96);
    planes = textures.map((texture) => {
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const plane = new Mesh(
        geometry,
        new ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTexture: { value: texture },
            uImageSize: { value: new Vector2(texture.image.width, texture.image.height) },
            uSize: { value: new Vector2() },
            ...waterUniforms,
            uCenter: { value: new Vector2(gsap.utils.random(-0.15, 0.15), gsap.utils.random(-0.15, 0.15)) },
            uSwirl: { value: 0 }
          }
        })
      );
      plane.frustumCulled = false;
      scene.add(plane);
      return plane;
    });
    resizeWebGL();
  }
  function resizeWebGL() {
    viewport.width = renderer.domElement.clientWidth;
    viewport.height = renderer.domElement.clientHeight;
    renderer.setSize(viewport.width, viewport.height, false);
    camera.aspect = viewport.width / viewport.height;
    camera.fov = 2 * Math.atan(viewport.height / 2 / camera.position.z) * (180 / Math.PI);
    camera.updateProjectionMatrix();
    needsRender = true;
  }
  function render() {
    const top = items[0].getBoundingClientRect().top;
    const settling = scrollVelocity > 0 || waterUniforms.uRipple.value > 1e-3;
    if (!needsRender && !settling && top === lastTop) return;
    needsRender = false;
    lastTop = top;
    updateGallery();
    renderer.render(scene, camera);
  }
  function updateGallery() {
    const ease = 1 - Math.pow(1 - 0.06, gsap.ticker.deltaRatio());
    const ripple = Math.min(scrollVelocity / 30, 1);
    waterUniforms.uRipple.value = gsap.utils.interpolate(waterUniforms.uRipple.value, ripple, ease);
    waterUniforms.uTime.value = gsap.ticker.time;
    planes.forEach((plane, i) => {
      const rect = items[i].getBoundingClientRect();
      const { uniforms } = plane.material;
      const offset = viewport.height / 2 - rect.top - rect.height / 2;
      const direction = i % 2 === 0 ? 1 : -1;
      uniforms.uSwirl.value = reduceMotion ? 0 : direction * gsap.utils.clamp(-2, 2, offset / (viewport.height / 2));
      plane.position.x = rect.left + rect.width / 2 - viewport.width / 2;
      plane.position.y = offset;
      uniforms.uSize.value.set(rect.width, rect.height);
    });
  }
  var animateMarquee = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector(".gallery"),
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    }).fromTo(
      marqueeInner,
      {
        x: "100vw"
      },
      {
        x: "-100%",
        ease: "none"
      }
    );
  };
  function initEvents() {
    window.addEventListener("resize", () => {
      positionGalleryItems();
      resizeWebGL();
    });
  }
  function init() {
    createGalleryWrappers();
    positionGalleryItems();
    initWebGL();
    if (!reduceMotion) animateMarquee();
    initEvents();
    if (!reduceMotion) {
      initSmoothScrolling();
    }
    window.SourceDemo.addTicker(gsap, render);
  }
  document.addEventListener("DOMContentLoaded", () => {
    window.SourceDemo.bindInitialization((async () => {
      textures = await preloadTextures(".gallery__item");
      if (window.SourceDemo.disposed) {
        textures.forEach((texture) => texture.dispose());
        return;
      }
      document.body.classList.remove("loading");
      init();
      render();
    })());
  });
  window.SourceDemo.register({ dispose() {
    for (const plane of planes) {
      plane.geometry?.dispose();
      if (Array.isArray(plane.material)) plane.material.forEach((material) => material.dispose());
      else plane.material?.dispose();
    }
    textures.forEach((texture) => texture.dispose());
    renderer?.dispose();
    renderer?.forceContextLoss();
    scene?.clear();
    planes = [];
    textures = [];
  } });
})();
