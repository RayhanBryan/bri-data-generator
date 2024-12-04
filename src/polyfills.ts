/***************************************************************************************************
 * BROWSER POLYFILLS
 */

// Polyfill untuk mendukung Promise
import 'core-js/es/promise'; // Harus dimuat sebelum zone.js

// Polyfill untuk mendukung Array.includes()
import 'core-js/es/array/includes';

// Polyfill untuk mendukung Promise.finally()
import 'core-js/es/promise/finally';

// Polyfill untuk mendukung Symbol
import 'core-js/es/symbol';

// Polyfill untuk mendukung Array.find()
import 'core-js/es/array/find';

// Polyfill untuk mendukung fitur iterasi (for...of loop, map, set, dll.)
import 'core-js/es/array/iterator';
import 'core-js/es/map';
import 'core-js/es/set';

// Polyfill untuk mendukung Object.assign()
import 'core-js/es/object/assign';

// Polyfill untuk mendukung Object.entries()
import 'core-js/es/object/entries';

// Polyfill untuk mendukung Object.values()
import 'core-js/es/object/values';

// Polyfill untuk mendukung string.includes()
import 'core-js/es/string/includes';

// Polyfill untuk mendukung String.startsWith() dan String.endsWith()
import 'core-js/es/string/starts-with';
import 'core-js/es/string/ends-with';

// Polyfill untuk mendukung Array.from()
import 'core-js/es/array/from';

// Polyfill untuk mendukung WeakMap dan WeakSet
import 'core-js/es/weak-map'; // Jika Anda menggunakan WeakMap
import 'core-js/es/weak-set'; // Jika Anda menggunakan WeakSet

/***************************************************************************************************
 * Zone JS digunakan oleh Angular untuk manajemen perubahan.
 */
import 'zone.js';  // Harus dimuat setelah semua polyfills lainnya
