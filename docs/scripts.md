### Scripts

The scripts for this project are run through [Yarn](https://yarnpkg.com/en/).  
The scripts can be found in [`package.json`](https://github.com/cipriane/OneRegistrationOff/blob/master/package.json)  
Scripts are run by typing `yarn <script-name>`.
Scripts that are prepended by `pre` or `post` will be run before or after the script.  
For example, there is the script `build` and `prebuild`. Typing `yarn build` will run the script `prebuild` first and then run `build`

### `yarn install`
This is a built-in script that installs all of the frontend dependencies into a `node_modules` folder.  

### `yarn start`
This script will build the javascript bundle in DEVELOPMENT mode, copy the files to the backend, and then start the server.  

### `yarn startprod`
Same as `yarn start` but in PRODUCTION mode.

### `yarn clean`
This script empties the build directory.  

### `yarn copy`
This script copies the build directory to the static files in the backend project.  
