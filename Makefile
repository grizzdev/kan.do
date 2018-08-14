ESLINT := node_modules/.bin/eslint --fix --cache --ext .js
PHP := /usr/bin/php
PHPCBF := ${shell pwd}/vendor/bin/phpcbf
PHPCS := ${shell pwd}/vendor/bin/phpcs
SASSLINT := node_modules/.bin/sass-lint
YARN := /usr/bin/yarn

lint: lint-sass lint-js lint-php

lint-sass:
	$(SASSLINT) --verbose --no-exit --max-warnings 0

lint-js:
	$(ESLINT) --env node,browser,commonjs resources/assets/js

lint-php:
	$(PHPCBF) --encoding=utf8 || $(PHPCS) --colors -p --encoding=utf8 -s

build: lint-sass lint-js build-dev

build-dev:
	$(PHP) artisan view:clear
	$(PHP) artisan cache:clear
	$(PHP) artisan route:clear
	$(PHP) artisan laroute:generate
	$(YARN) dev

build-development:
	$(PHP) artisan view:clear
	$(PHP) artisan cache:clear
	$(PHP) artisan route:clear
	$(PHP) artisan laroute:generate
	$(YARN) dev

build-prod:
	$(PHP) artisan view:clear
	$(PHP) artisan cache:clear
	$(PHP) artisan config:cache
	$(PHP) artisan route:cache
	$(PHP) artisan laroute:generate
	$(YARN) prod

build-production:
	$(PHP) artisan view:clear
	$(PHP) artisan cache:clear
	$(PHP) artisan config:cache
	$(PHP) artisan route:cache
	$(PHP) artisan laroute:generate
	$(YARN) production

watch:
	$(YARN) watch

watch-poll:
	$(YARN) watch-poll
