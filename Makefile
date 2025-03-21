.PHONY: build-dev run-dev build-prod run-prod stop logs restart-dev restart-prod prune clean

# Build development container without cache
build-dev:
	docker-compose build --no-cache template-nextjs

# Run development container
run-dev:
	docker-compose up --remove-orphans template-nextjs -d

# Build production container without cache
build-prod:
	docker-compose build --no-cache template-nextjs-prod

# Run production container in detached mode
run-prod:
	docker-compose up -d --remove-orphans template-nextjs-prod

# Stop and remove all containers
stop:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# Restart services
restart-dev: stop build-dev run-dev
restart-prod: stop build-prod run-prod

# Remove unused Docker resources
prune:
	docker system prune -af --volumes

# Clean everything (stops, removes images, volumes, and networks)
clean:
	docker-compose down -v --remove-orphans
	docker system prune -af --volumes
