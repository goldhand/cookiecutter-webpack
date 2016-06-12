
test:
	npm test

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


.PHONY: changelog examples test
