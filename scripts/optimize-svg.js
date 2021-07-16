#!/usr/bin/env node
/*
 * Script to optimize all files under public/images/icons
 * Based on:
 *   https://github.com/svg/svgo/blob/master/examples/test.js
 *   https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
 */
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const { optimize } = require('svgo');

const directoryPath = path.join(__dirname, '../public/images/icons');

// Populate with filenames which are not being optimized
// for example those which contain animations
const blacklist = ['logo.svg'];

const config = {
  plugins: [
    'cleanupAttrs',
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'removeEditorsNSData',
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    'removeEmptyContainers',
    // 'removeViewBox',
    'cleanupEnableBackground',
    'convertStyleToAttrs',
    'convertColors',
    'convertPathData',
    'convertTransform',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeUnusedNS',
    'cleanupIDs',
    'cleanupNumericValues',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    // 'removeRasterImages',
    'mergePaths',
    'convertShapeToPath',
    'sortAttrs',
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: '(stroke|fill)' } },
  ],
};

const optimizeFile = async function (filepath) {
  fs.readFile(filepath, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    const result = optimize(data, { path: filepath, ...config });
    // Result model for optimize method (use as a reference)
    // {
    //     // optimized SVG data string
    //     data: '<svg width="10" height="20">test</svg>'
    //     // additional info such as width/height
    //     info: {
    //         width: '10',
    //         height: '20'
    //     }
    // }

    fs.writeFile(filepath, result.data, function (err) {
      if (err) return console.log(err);
    });
  });
};

(async function main() {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      if (blacklist.includes(file)) {
        console.log(`Blacklisted ${chalk.cyan(file)}`);
      } else {
        const filepath = path.join(directoryPath, file);
        console.log(`Optimizing ${chalk.green(file)}`);
        optimizeFile(filepath);
      }
    });
  });
})();
