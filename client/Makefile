SHELL:=/bin/bash

NG := "./node_modules/@angular/cli/bin/ng.js"

$(shell cp --update=none .config.default config.ini)
-include config.ini

local:
	ulimit -n 51200; \
	$(NG) serve --watch --poll 2000 --port $(port) --host 127.0.0.1

init:
	NG_CLI_ANALYTICS=ci npm install
	npm audit fix
	# ./node_modules/sass-migrator/sass-migrator.js division './node_modules/font-awesome/scss/*.scss'
	cp node_modules/katex/dist/katex.min.css src/assets
	# cp node_modules/bootstrap/dist/js/bootstrap.bundle.js* src/assets
	# cp node_modules/@popperjs/core/dist/umd/popper.min.js* src/assets

prod:
	./dist/build.sh w-juno.pages.dev prod
	./dist/cp.sh
	# ssh casca 'mkdir -p /www/orca/prod'
	# rsync --partial -vzrtopg -e ssh ./dist/prod/browser/ casca:/www/orca/prod

preview:
	./dist/build.sh lumos-preview.diandian.info/muggle/ preview
	ssh casca 'mkdir -p /www/orca/preview'
	rsync --partial -vzrtopg -e ssh ./dist/preview/browser/ casca:/www/orca/preview
