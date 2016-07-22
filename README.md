# Users Management System

React-Redux application for simple users manegement control. 

## API

API server is written on `node.js` / `koa` (https://github.com/diedsmiling/ums_api) is deployed to `heroku`, so you don't need to install it: https://nameless-tundra-42195.herokuapp.com. `CORS` headers are set for enpoint requests.  

## Requirements
* node `^4.2.0`
* npm `^3.0.0`

## Getting Started

```bash
$ git clone https://github.com/davezuko/react-redux-starter-kit.git
$ cd react-redux-starter-kit
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
```
Open in the browser: `http://localhost:3000`
Enjoy!

## Some remarks

* Due to time limits, tests don't cover whole code. Have written them just to show the techinques I use.
 

## Self criticism

* `enzyme` was probably not the best tool for component's testing, since `redux` uses high order component `connect` for wrapping components, but `shallow` rendering gets problems with it. 
* `shallow` rendering also might be unstable with `material-ui` components, because they need to be wrapped in theme wrapper.
* Material UI spams all over `Unknown props` warnings. In `0.15.2` release they will be gone.
* Didn't handle all requests stages, didn't show any spinners while they are being executed
* Some components might be devided into smaller ones, but had to hurry up, because of time limits
* Some duplicated code could be avoided but had to hurry up due to time limits. My perfectionism is disadvanteged. 
