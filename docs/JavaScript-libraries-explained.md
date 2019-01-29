### JavaScript Libraries Explained

This document gives a brief overview of the main JavaScript libraries used in this project.

#### Babel

Babel is a JavaScript compiler. It reads JS code and outputs
that code into older versions of JS so that older browsers can still correctly
interpret the code. (The output is put into `backend/server/static/main.js`)

We do not run Babel directly. Rather we use it via Webpack.

#### Webpack

Webpack is a bundling tool. Notice how all of our JS is spread across many files.
This would result in a performance nightmare if a website needed to make the
hundreds of requests to GET all of the code. Webpack can pack all of files
into one (or multiple) bundles. (Our bundle is in `backend/server/static/main.js`)

Webpack is also used to make optimizations and other changes to the code.
We have Webpack setup to use Babel, so our code is translated into older style of JS.
These optimizations are customized in the `webpack.config.js` file.

#### Yarn

Yarn is a dependency management tool. Yarn looks at the dependencies in `package.json`
and downloads them into `node_modules`. Yarn creates a `yarn.lock` file to help
coordinate downloading the correct versions.

Yarn may also be used as a script runner. For example, we use `yarn start`.
See `docs/scripts.md` for more information on the scripts that we use yarn to run.

#### React

React is a JS library for building user interfaces. Once a page has been loaded,
React handles everything on the client side, including routing (notice that
navigating to a new page does not actually cause a page reload). React interacts
with the backend API by using calls such as `fetch("api/path")` (this assumes
the api exists on the same server that the React bundle has been served from).

React breaks everything in Components, encouraging modular design. Each component
has `state` (aka its fields) and `props` (aka its arguments). Components are
automatically setup with the Observer pattern, so any changes to `state` or `props`
will re-render that component.

#### Redux

Redux is a library for managing global state. It should be used sparingly,
but it is useful when state needs to be saved across page navigations or if
two separate React components have state that influence each other.

Our Redux is setup to implement the Observer pattern, so any update to global
state will automatically re-render the components.
