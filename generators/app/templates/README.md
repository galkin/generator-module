# <%= name %>
[![Build Status](https://travis-ci.org/<%= authorGithub %>/<%= name %>.svg?branch=master)](https://travis-ci.org/<%= authorGithub %>/<%= name %>)
[![Dependency Status](https://david-dm.org/<%= authorGithub %>/<%= name %>.svg)](https://david-dm.org/<%= authorGithub %>/<%= name %>)
[![devDependency Status](https://david-dm.org/<%= authorGithub %>/<%= name %>/dev-status.svg)](https://david-dm.org/<%= authorGithub %>/<%= name %>#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/github/<%= authorGithub %>/<%= name %>/badge.svg?branch=master)](https://coveralls.io/github/<%= authorGithub %>/<%= name %>?branch=master)

## Overview

<%= description %>

## Development Tooling

- [Node.js](https://nodejs.org/en/)

## Installation

`npm install <%= name %>`

## Usage

TBD

## Testing Approach

- [eslint](http://eslint.org) is used for checking code style and JS best practice. Use `npm run lint-fix` for autofixing common eslint errors.
- [jest](https://facebook.github.io/jest/) is used for unit tests.
- To run tests in a local environment use `npm test`
