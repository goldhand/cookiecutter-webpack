{{ cookiecutter.project_name }}
===============================
{{ cookiecutter.description }}


Getting Started
---------------

Install npm packages

    $ npm install

Start the server

    $ npm start


---------------------------------


React-Redux Project Structure
-----------------
Outline the structure of the project.

### Source `./{{ cookiecutter.static_root }}/`
Main project source.

#### Actions `./{{ cookiecutter.static_root }}/actions/`
Action creators. These are triggered by events and return an action object that will notify reducers that a change needs to be reflected in the state.

#### Components `./{{ cookiecutter.static_root }}/components/`
React components. Mostly __dumb__ components.

#### Constants `./{{ cookiecutter.static_root }}/constants/`
Stuff that doesn't change. Redux action types.

#### Containers `./{{ cookiecutter.static_root }}/containers/`
React components that serve as containers for multiple _dumb_ components. These should connect React components to a Redux store using the [react-redux connect method](https://github.com/reactjs/react-redux/blob/253ce8b3068d9d9bfe55f70a6f18a5fde313b326/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options).

The _connect_ method will __map state to props__ by subscribing to a __store__ that has been passed though the components __context__ and will tell the component to update whenever the state changes.

_Connect_ can also __map dispatch to props__ by connecting _action creators_ to and to the _store dispatch_ method allowing the _props_ to be invoked directly (rather than `store.dispatch({type: 'MY_ACTION', id: 1, other_stuff: 'blah'})`).

#### Reducers `./{{ cookiecutter.static_root }}/reducers/`
Reducer functions that take in the _current state_ and an _action type_ then return a new state.

#### Store `./{{ cookiecutter.static_root }}/store/`
Custom store for adding middleware.


---------------------------------


Configuration
-------------

### Settings
There are two setting configurations: _Local_ and _Production_. Both of these settings inherit from the _Base_ settings.

#### Base `./webpack.base.config.js`
* Provide entry endpoints
* Output endpoints
* Common plugins

#### Local `./webpack.local.config.js`
* Point to the local publicPath
* Local plugins

#### Production `./webpack.production.config.js`
* Point to the production publicPath
* Minimize code
* Production plugins


### Templates
[Template options](https://github.com/jaketrent/html-webpack-template/blob/faac42d0720d52b444e65aa9a151e0ad8504effc/README.md#basic-usage)


-----------------------------------

Redux Dev Tools
---------------
Redux dev tools allows you to debug redux. See the [redux-devtools github repository](https://github.com/gaearon/redux-devtools) for more info.

You can add more [monitors](https://github.com/gaearon/redux-devtools/blob/a21905cbdeb22fc67c3f16caa8752cb5b4133b32/README.md#custom-monitors) by installing the monitors package and adding the component inside the `DockMonitor` component found in [`./{{ cookiecutter.static_root }}/containers/DevTools.js`](containers/DevTools.js).

### Controls
The controls can be configured by editing the `DockMonitor` component's attributes. Currently the controls are:

    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
