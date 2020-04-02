/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const ghPages = require('gh-pages');
const path = require('path');

let cwd = process.cwd();

if (cwd.endsWith(`${path.sep}scripts`)) {
  cwd = path.join(cwd, '..');
}

ghPages.publish(`${cwd}/build`, {}, (err) => {
  if (err) {
    throw err;
  }

  console.log('published! success');
});
