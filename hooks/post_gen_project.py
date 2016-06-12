import os
import shutil

# Get the root project directory
PROJECT_DIRECTORY = os.path.realpath(os.path.curdir)

production_output_path = '{{ cookiecutter.production_output_path }}'
static_root = '{{ cookiecutter.static_root }}'
is_existing = '{{ cookiecutter.existing_project }}' == 'y'
use_ejs = '{{ cookiecutter.use_ejs }}' == 'y'
css_extension = '{{ cookiecutter.css_extension }}'


def remove_tilda(project_directory, file_name):
    """Remove a tilda from a file that was being protected."""
    current_location = os.path.join(
        project_directory,
        '~{}'.format(file_name)
    )
    new_location = os.path.join(
        project_directory,
        file_name
    )
    if os.path.isfile(current_location):
        shutil.move(current_location, new_location)


def remove_file(project_directory, file_name):
    """Remove a file."""
    file_location = os.path.join(
        project_directory,
        file_name
    )
    if os.path.isfile(file_location):
        os.remove(file_location)


def remove_dir(project_directory, dir_name):
    """Remove a dir."""
    dir_location = os.path.join(
        project_directory,
        dir_name
    )
    if os.path.isdir(dir_location):
        shutil.rmtree(dir_location)


def amend_file(project_directory, file_name, amendment):
    """Amend a file with a string."""
    file_location = os.path.join(
        project_directory,
        file_name,
    )
    if os.path.isfile(file_name):
        with open(file_location, 'a') as f:
            f.write(amendment)
            f.close()


def move_file(project_directory, file_name, target_directory):
    """Move a file to another directory."""
    current_location = os.path.join(
        project_directory,
        file_name
    )
    new_location = os.path.join(
        project_directory,
        target_directory,
        file_name
    )
    if os.path.isfile(current_location):
        shutil.move(current_location, new_location)


def add_webpack_to_gitignore(project_directory):
    """Add webpack config to gitignore."""
    amend_str = "\n# Webpack\n%s\n%s\n%s" % (
        production_output_path,
        'webpack-stats.json',
        'webpack-stats-production.json')
    amend_file(project_directory, '.gitignore', amend_str)


if not use_ejs:
    """Remove the ejs templates."""
    remove_dir(static_root, 'templates')


if css_extension != 'less':
    """Remove less demo"""
    remove_dir(static_root, 'components/Counter/Counter.less')


if css_extension != 'sass':
    """Remove scss demo"""
    remove_dir(static_root, 'components/Counter/Counter.scss')


if is_existing:
    """
    remove the webpack gitignore
    use existitng project versions instead
    """
    remove_file(PROJECT_DIRECTORY, '.gitignore')
    remove_tilda(PROJECT_DIRECTORY, '.gitignore')
    add_webpack_to_gitignore(PROJECT_DIRECTORY)
    if os.path.isfile('~README.md') or os.path.isfile('README.rst'):
        # There's another README
        move_file(PROJECT_DIRECTORY, 'README.md', static_root)
        remove_tilda(PROJECT_DIRECTORY, 'README.md')
