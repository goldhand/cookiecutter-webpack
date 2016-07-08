BUILD_WEBPACK_CMD := cookiecutter --no-input --config-file build_test_config.yml .
BUILD_PATH := './build_test'

examples: clean
	@$(BUILD_WEBPACK_CMD)
	@cd $(BUILD_PATH) && npm install

testbuild: examples
	cd $(BUILD_PATH) && npm test

test:
	py.test tests
	make testbuild

major:
	npm version major

minor:
	npm version minor

patch:
	npm version patch

changelog.template.ejs:
	@echo "### [<%= new Date().toDateString() %>]\n<% commits.forEach(function(commit) { -%>\n* <%= commit.title %>\n<% }) -%>" > changelog.template.ejs

changelog: changelog.template.ejs
	@touch CHANGELOG.md
	@git-release-notes $$(git describe --abbrev=0)..HEAD $< | cat - CHANGELOG.md >> CHANGELOG.md.new
	@mv CHANGELOG.md{.new,}
	@rm changelog.template.ejs
	@echo "Added changes since $$(git describe --abbrev=0) to CHANGELOG.md"

clean:
	@rm -rf $(BUILD_PATH)


.PHONY: changelog examples test clean
