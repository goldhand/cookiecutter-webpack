Cookiecutter-webpack
====================
Boilerplate for setting up [webpack 2][webpack2] configuration with [hot reloading][hmr], [babel][babel] for es6 modules, [react][react] + [redux][redux] for views and state, and [karma][karma] + [mocha][mocha] + [expect][expect] for testing.

[webpack2]: https://github.com/webpack/webpack/tree/v2.1.0-beta.13
[hmr]: https://github.com/gaearon/react-transform-hmr
[babel]: https://babeljs.io/
[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/index.html
[karma]: https://github.com/karma-runner/karma
[mocha]: https://github.com/mochajs/mocha
[expect]: https://github.com/mjackson/expect

Getting Started
---------------

Download `cookiecutter` to a global python path

    $ pip install cookiecutter

In your project directory run

    $ cookiecutter git@github.com:hzdg/cookiecutter-webpack.git

Answer the prompts then `cd` into your newly created project directory.

Install npm packages

    $ npm install

Start the server

    $ npm start

Open up http://localhost:8080 in your browser.

You will have a React / Redux counter app running with redux dev-tools. See the generated `README.md` for an explanation of the react / redux project structure.


You can run the test suite

    $ npm test


You should also create a new git repo and push it to github

```
$ git init
$ git add .
$ git commit -m "Init"
$ git remote add origin git@github.com:hzdg/project_name.git
$ git push -u origin master
```


Options
-------

* `project_name`: Your Project Name
* `repo_name`: Name of this projects git repository
* `repo_owner`: Your github username
* `static_root`: Path to where this projects source code lives, or path to static files directory if integrating into an existing project
* `production_output_path`: Path where your compiled bundles should go
* `author_name`: Your Name
* `description`: A short description of the project for the `README.md` file
* `version`: Project version number
* `existing_project`: `n` if this is a new project and `y` if you're integrating into an existing project. See the notes below about integrating into an existing project.
* `css_extension`: [`none`, `less`, `sass`] - use `less` or `sass` to preprocess styles.
* `use_ejs`: `y` if you want to include `ejs` templates and loaders in the project. Recommended if not using an existing project.


Integrating into existing projects
----------------------------------

You can chain this into an existing cookiecutter project by installing via the projects `./hooks/post_gen_project.py` file or just installing it via the command line.

### Using post hooks
Here is a django project post hook example that chains this through a django cookiecutter project.

```python
from cookiecutter.main import cookiecutter

  cookiecutter(
      'git@github.com:hzdg/cookiecutter-webpack.git',
      replay=False, overwrite_if_exists=True, output_dir='../',
      checkout=None, no_input=True, extra_context={
          'project_name': '{{ cookiecutter.project_name }}',
          'repo_name': '{{ cookiecutter.repo_name }}',
          'repo_owner': 'hzdg',
          'static_root': '{{ cookiecutter.project_dir }}/static/{{ cookiecutter.project_dir }}',
          'production_output_path': '{{ cookiecutter.project_dir }}/static/{{ cookiecutter.project_dir }}/dist/',
          'author_name': '{{ cookiecutter.author_name }}',
          'description': '{{ cookiecutter.description }}',
          'version': '{{ cookiecutter.version }}',
          'existing_project': 'y',
          'css_extension': 'sass',
          'use_ejs': 'n'
      })
```

The flag `existing_project` will move/remove some files and dependencies and also add supporting configurations for a django project.

### Using command line
Just make sure you use the `--overwrite-if-exists` [ or `-f`] flag so cookiecutter can work within your existing project structure. You will also probably want to point to your existing projects parent directory and make sure you use the same `repo_name` as the project directory so your `package.json` files are installed at the project root.

	cookiecutter -f -output-dir ../ git@github.com:hzdg/cookiecutter-webpack.git


Contributing
------------

Accepting pull requests!

Clone the project:
```sh
$ git clone git@github.com:hzdg/cookiecutter-webpack.git
```
Install python and npm dependencies:
```sh
$ pip install -r requirements.txt && npm install
```
Run build tests:
```sh
$ npm test
```
