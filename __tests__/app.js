const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-package:app', () => {
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({ name: 'pkg-example' }));

  test('should create files in root folder', () => {
    assert.file([
      '.eslintrc.json',
      '.gitignore',
      '.travis.yml',
      'package.json',
      'README.md'
    ]);
  });

  test('should create files in src folder', () => {
    assert.file([
      'src/index.js'
    ]);
  });

  test('should create files in __tests__ folder', () => {
    assert.file([
      '__tests__/.eslintrc.json',
      '__tests__/index.js'
    ]);
  });
});
