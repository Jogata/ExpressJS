// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-modules-names');
const sayHi = require('./05-modules-utils');
const data = require('./06-alternative-flavor');
require('./07-mind-grenade');
sayHi('susan');
sayHi(names.john);
sayHi(names.peter);

// Built-In Module - require whitout ('./')
    //  OS - 08-os-module.js
    const os = require('os');
    // PATH - 09-path-module.js
    const path = require('path');
    // FS (File System) - 10-fs-sync.js / 11-fs-async.js
    const fs = require('fs');
    // HTTP - 12-http.js
    const http = require('http');
