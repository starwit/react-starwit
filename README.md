# frontend-commons

This is the frontend commons package for managing general components for npm projects with react

## Dev setup

### Build package

run `npm run build`

### Live build

run `npm run start`

### Encountered Problems

dev setup with npm link is not working due to an invalid hook issue. This might come down to an issue that there are
multiple react instances.

Otherwise you can link this repository in the root folder with `npm link` when this command is executed you can go to
the desired react app and install the package with `npm link @starwit/frontend-commons`
