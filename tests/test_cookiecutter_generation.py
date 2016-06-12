# -*- coding: utf-8 -*-

import os
import re
import sh

import pytest
from binaryornot.check import is_binary

PATTERN = '{{(\s?cookiecutter)[.](.*?)}}'
RE_OBJ = re.compile(PATTERN)


@pytest.fixture
def context():
    return {
        "project_name": "project_name",
        "repo_name": "project_name",
        "repo_owner": "github_username",
        "static_root": "src",
        "local_output_path": "src/bundles/",
        "production_output_path": "src/dist/",
        "author_name": "Your Name",
        "email": "Your email",
        "description": "A short description of the project.",
        "version": "0.1.0",
        "existing_project": "n",
        "css_extension": "none",
        "use_ejs": "n"
    }


def build_files_list(root_dir):
    """Build a list containing absolute paths to the generated files."""
    return [
        os.path.join(dirpath, file_path)
        for dirpath, subdirs, files in os.walk(root_dir)
        for file_path in files
    ]


def check_paths(paths):
    """Method to check all paths have correct substitutions,
    used by other tests cases
    """
    # Assert that no match is found in any of the files
    for path in paths:
        if is_binary(path):
            continue
        for line in open(path, 'r'):
            match = RE_OBJ.search(line)
            msg = 'cookiecutter variable not replaced in {}'
            assert match is None, msg.format(path)


def check_lint(result):
    """generated project should pass project eslint,
    used by other test cases
    """
    try:
        sh.eslint(
            str(result.project),
            c='{}/.eslintrc'.format(str(result.project)),
            ignore_path='{}/.eslintignore'.format(str(result.project))
        )
    except sh.ErrorReturnCode as e:
        pytest.fail(e)


def test_default_configuration(cookies, context):
    result = cookies.bake(extra_context=context)
    assert result.exit_code == 0
    assert result.exception is None
    assert result.project.basename == context['repo_name']
    assert result.project.isdir()

    paths = build_files_list(str(result.project))
    assert paths
    check_paths(paths)
    check_lint(result)


@pytest.fixture(params=['existing_project', 'use_ejs'])
def existing_project_context(request, context):
    static_root = '{}/static/{}'.format(context['repo_name'], context['repo_name'])
    context.update({request.param: 'y'})
    context.update({
        "static_root": static_root,
        "local_output_path": '{}/bundles/'.format(static_root),
        "production_output_path": '{}/dist/'.format(static_root)
    })
    return context

def test_existing_project_features(cookies, existing_project_context):
    result = cookies.bake(extra_context=existing_project_context)
    assert result.exit_code == 0
    assert result.exception is None
    assert result.project.basename == existing_project_context['repo_name']
    assert result.project.join(
        existing_project_context['repo_name'],
        'static',
        existing_project_context['repo_name']
    ).isdir()

    assert result.project.isdir()

    paths = build_files_list(str(result.project))
    assert paths
    check_paths(paths)
    check_lint(result)


@pytest.fixture(params=['css_extension'])
def less_project_context(request, context):
    context.update({request.param: 'less'})
    return context

def test_less(cookies, less_project_context):
    result = cookies.bake(extra_context=less_project_context)
    assert result.exit_code == 0
    assert result.exception is None
    assert result.project.basename == less_project_context['repo_name']
    assert result.project.isdir()

    paths = build_files_list(str(result.project))
    assert paths
    check_paths(paths)
    check_lint(result)


@pytest.fixture(params=['css_extension'])
def sass_project_context(request, context):
    context.update({request.param: 'sass'})
    return context

def test_sass(cookies, sass_project_context):
    result = cookies.bake(extra_context=sass_project_context)
    assert result.exit_code == 0
    assert result.exception is None
    assert result.project.basename == sass_project_context['repo_name']
    assert result.project.isdir()

    paths = build_files_list(str(result.project))
    assert paths
    check_paths(paths)
    check_lint(result)
