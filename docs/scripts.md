### Scripts

The scripts for this project are run through [Yarn](https://yarnpkg.com/en/).
The scripts can be found in [`package.json`](https://github.com/cipriane/OneRegistrationOff/blob/master/package.json)
Scripts are run by typing `yarn <script-name>` in the console while located in a directory anywhere under or including the ROOT directory.
Scripts that are prepended by `pre` or `post` will be run before or after the script.
For example, if there are three scripts`build`, `prebuild`, and `postbuild`,
typing `yarn build` will run the script `prebuild` and then run `build` and then `postbuild`.

#### `yarn install`
This is a built-in script that installs all of the dependencies listed in `package.json` into a `node_modules` folder.  

#### `yarn start`
This script will run `yarn dev` and the Django server at the same time.  

#### `yarn start-prod`
This script will run `yarn build` and then run the Django server.  

#### `yarn dev`
This script will build the javascript bundle in DEVELOPMENT mode and rebuild on code changes.  

#### `yarn build`
This script will build the javascript bundle in PRODUCTION mode.  

#### `yarn clean`
This script empties the build directory.  
