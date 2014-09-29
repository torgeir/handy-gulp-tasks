# A set of handy, reusable gulp tasks.

- Compile of es6 -> es5 (es6ify/traceur)
- Compile less -> css
- Sourcemaps js (es6) and css (less)
- Recompile on file change (watch)
- Minify js, css and html
- Revision files (js and ss) with version numbers in the file name, based on a hash of the files contents
- Lint of js (jshint)
- Optimize of images (gif, jpeg, png, svg)
- Automatically add css vendor-prefixes
- Js tests on node with mocha
- Some handy less mixins, font awesome

Install

`npm install`

Run in watch mode

`npm run watch`

Compile

`npm run compile`

Compile for prod

`npm run compile-prod`

Example node server

`npm run start`
