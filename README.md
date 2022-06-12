# react-starwit

This is the frontend commons package for managing general components for npm projects with react

## Quickstart

Install react-startwit in your project of choice directly from npm: \
`npm install --save @starwit/react-starwit --legacy-peer-deps`

## Documentation
In planning.

## Dev setup

run `npm install` for installing all dependencies required for developing the package.

### Build package

run `npm run build`

### Live build

run `npm run start`

### Encountered Problems

dev setup with npm link is not working due to an invalid hook issue. This might come down to an issue that there are
multiple react instances.

Otherwise you can link this repository in the root folder with `npm link` when this command is executed you can go to
the desired react app and install the package with `npm link @starwit/react-starwit`

## Publishing

Execute `npm run build && npm publish` to execute 
