# Development Docker commands
DOCKER_DEV_CONTAINER_NAME=todo-list-api-dev

DOCKER_DEV_BUILD_CMD=docker build -t todo-list-api:dev -f docker/Dockerfile.dev .
DOCKER_DEV_RUN_CMD=docker run -p 3000:3000 --name $(DOCKER_DEV_CONTAINER_NAME) -v $(shell pwd):/app -d todo-list-api:dev
DOCKER_DEV_COVERAGE_CMD=docker run -v $(shell pwd):/app -w /app todo-list-api:dev bun run test:coverage
DOCKER_DEV_LINT_CMD=docker run -v $(shell pwd):/app -w /app todo-list-api:dev bun run lint

# Production Docker commands
DOCKER_PROD_BUILD_CMD=docker build -t todo-list-api:prod -f docker/Dockerfile.prod .

.PHONY: start coverage lint sh build-prod

up:
	${DOCKER_DEV_BUILD_CMD}
	
start:
	-docker rm -f $(DOCKER_DEV_CONTAINER_NAME)
	$(DOCKER_DEV_RUN_CMD)
	docker exec -it $(DOCKER_DEV_CONTAINER_NAME) bun install

coverage:
	$(DOCKER_DEV_COVERAGE_CMD)

lint:
	$(DOCKER_DEV_LINT_CMD)

sh:
	docker exec -it $(DOCKER_DEV_CONTAINER_NAME) bash

build-prod:
	$(DOCKER_PROD_BUILD_CMD)
