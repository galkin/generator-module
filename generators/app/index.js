const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const path = require('path');
const assert = require('assert');

module.exports = class extends Generator {
  prompting () {
    assert.strictEqual(process.version.split('.')[0], 'v8', 'The generator required Node.js v8');
    this.log('Welcome to @galkin/generator-package generator!');
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your package?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of the package?',
        default: ''
      },
      {
        type: 'input',
        name: 'authorGithub',
        message: 'What is your github user name?',
        default: 'galkin'
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'What is your name?',
        default: 'Nikita Galkin'
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  default () {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Your package must be inside a folder named ${this.props.name}`);
      this.log('I\'ll automatically create this folder.');
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing () {
    this.createPackageJson();
    this.copyFiles();
    this.fillTemplates();
  }

  install () {
    this.npmInstall([
      'eslint@4',
      'eslint-config-standard',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-promise',
      'eslint-plugin-standard',
      'jest'
    ], { 'save-dev': true });
  }

  createPackageJson () {
    this.fs.extendJSON('package.json', {
      name: `${this.props.name}`,
      version: '0.1.0',
      description: `${this.props.description}`,
      repository: {
        type: 'git',
        url: `git+https://github.com/${this.props.authorGithub}/${this.props.name}.git`
      },
      license: 'ISC',
      author: `${this.props.authorName}`,
      files: [
        'src'
      ],
      main: 'src/index.js',
      scripts: {
        lint: 'eslint src __tests__',
        'lint-fix': 'eslint src __tests__ --fix',
        test: 'npm run lint && jest'
      },
      jest: {
        testEnvironment: 'node',
        collectCoverage: true
      },
      dependencies: {},
      devDependencies: {},
      engines: {
        node: '^8.11.3'
      }
    });
  }

  copyFiles () {
    [
      '.eslintrc.json',
      '.travis.yml',
      'src/index.js',
      '__tests__/.eslintrc.json',
      '__tests__/index.js'
    ].forEach(name => this.fs.copy(this.templatePath(name), this.destinationPath(name)));
    this.fs.copy(this.templatePath('.gitignore.example'), this.destinationPath('.gitignore'));
  }

  fillTemplates () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props);
  }
};
