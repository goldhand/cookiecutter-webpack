import os
import shutil

from cookiecutter.config import DEFAULT_CONFIG
from cookiecutter.main import cookiecutter
# Get the root project directory
PROJECT_DIRECTORY = os.path.realpath(os.path.curdir)

local_output_path = '{{ cookiecutter.local_output_path }}'
production_output_path = '{{ cookiecutter.production_output_path }}'
is_existing = '{{ cookiecutter.existing_project }}' == 'y'


def remove_file(project_directory, file_name):
    """Removes nginx files"""
    file_location = os.path.join(
        project_directory,
        file_name
    )
    os.remove(file_location)

def remove_tilda(project_directory, file_name):
    current_location = os.path.join(
        PROJECT_DIRECTORY,
        '~{}'.format(file_name)
    )
    new_location = os.path.join(
        project_directory,
        file_name
    )
    shutil.move(current_location, new_location)

def add_webpack_to_gitignore(project_directory):

    file_location = os.path.join(
        project_directory,
        '.gitignore'
    )
    with open(file_location, 'a') as f:
        f.write("\n# Webpack\n%s\n%s\n" % (local_output_path, production_output_path))


if is_existing:
    # remove the webpack gitignore and readme, use existitng project versions instead
    remove_file(PROJECT_DIRECTORY, '.gitignore')
    remove_file(PROJECT_DIRECTORY, 'README.md')
    remove_tilda(PROJECT_DIRECTORY, '.gitignore')
    add_webpack_to_gitignore(PROJECT_DIRECTORY)


