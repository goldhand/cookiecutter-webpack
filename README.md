Cookiecutter-webpack
====================

Boilerplate for setting up webpack 2 configuration with hot reloading, babel for es6 modules, react + redux.


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

You will have a React / Redux counter app running with redux dev-tools. See the generated `README.md` for an explanation of the react / redux project structure.


Integrating into existing projects
----------------------------------

You can chain this into an existing cookiecutter project by installing via the projects `./hooks/post_gen_project.py` file or just installing it via the command line.

### Using post hooks
Here is a django project post hook example that chains this through a django cookiecutter project.

	from cookiecutter.main import cookiecutter

    cookiecutter(
        'git@github.com:hzdg/cookiecutter-webpack.git',
        replay=False, overwrite_if_exists=True, output_dir='../',
        checkout=None, no_input=True, extra_context={
            'project_name': '{{ cookiecutter.project_name }}',
            'repo_name': '{{ cookiecutter.repo_name }}',
            'repo_owner': 'hzdg',
            'static_root': '{{ cookiecutter.project_dir }}/static/{{ cookiecutter.project_dir }}',
            'local_output_path': '{{ cookiecutter.project_dir }}/static/{{ cookiecutter.project_dir }}/bundles/',
            'production_output_path': '{{ cookiecutter.project_dir }}/static/{{ cookiecutter.project_dir }}/dist/',
            'author_name': '{{ cookiecutter.author_name }}',
            'email': '{{ cookiecutter.email }}',
            'description': '{{ cookiecutter.description }}',
            'version': '{{ cookiecutter.version }}',
            'existing_project': 'y'
        })

The flag `existing_project` will move/remove some files and dependencies and also add supporting configurations for a django project.

### Using command line
Just make sure you use the `--overwrite-if-exists` [ or `-f`] flag so cookiecutter can work within your existing project structure. You will also probably want to point to your existing projects parent directory and make sure you use the same `repo_name` as the project directory so your `package.json` files are installed at the project root.

	cookiecutter -f -output-dir ../ git@github.com:hzdg/cookiecutter-webpack.git
