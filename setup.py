#!/usr/bin/env python

import os
import re
import sys

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


def get_version(*file_paths):
    filename = os.path.join(os.path.dirname(__file__), *file_paths)
    version_file = open(filename).read()
    version_match = re.search(r"^  \"version\": ['\"]([^'\"]*)['\"]",
                              version_file, re.M)
    if version_match:
        return version_match.group(1)
    raise RuntimeError('Unable to find version string.')

version = get_version('./', 'package.json')

if sys.argv[-1] == 'publish':
    try:
        import wheel
    except ImportError:
        print('Wheel library missing. Please run "pip install wheel"')
        sys.exit()
    os.system('python setup.py sdist upload')
    os.system('python setup.py bdist_wheel upload')
    sys.exit()

with open('README.md') as readme_file:
    readme = readme_file.read()

with open('CHANGELOG.md') as changelog:
    changelog = changelog.read()

setup(
    name='cookiecutter-webpack',
    version=version,
    description='Boilerplate for setting up webpack 2 configuration with hot reloading, babel for es6 modules, react + redux.',
    long_description=readme + '\n\n' + changelog,
    author='Will Farley',
    author_email='a.will.farley@gmail.com',
    url='https://github.com/goldhand/cookiecutter-webpack',
    packages=[],
    license='BSD',
    zip_safe=False,
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'Natural Language :: English',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
        'Topic :: Software Development',
    ],
    keywords=(
        'cookiecutter, Python, projects, project templates, django, '
        'skeleton, scaffolding, project directory, setup.py'
    ),
)
