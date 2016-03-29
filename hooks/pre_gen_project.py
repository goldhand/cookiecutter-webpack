import os
import shutil

is_existing = '{{ cookiecutter.existing_project }}'
# Get the root project directory
PROJECT_DIRECTORY = os.path.realpath(os.path.curdir)

def add_tilda(project_directory, file_name):
    current_location = os.path.join(
        PROJECT_DIRECTORY,
        file_name
    )
    new_location = os.path.join(
        project_directory,
        '~{}'.format(file_name)
    )
    shutil.move(current_location, new_location)

if is_existing:
    add_tilda(PROJECT_DIRECTORY, '.gitignore')
