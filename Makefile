# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mbouthai <mbouthai@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/05/15 10:41:46 by mbouthai          #+#    #+#              #
#    Updated: 2023/11/04 02:23:25 by mbouthai         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

COMPOSE_FILE := ./docker-compose.yaml
COMPOSE_CMD := docker compose -f

all:
	@echo "Building and running docker images...\n"
	@$(COMPOSE_CMD) $(COMPOSE_FILE) up -d --build

start:
	@echo "Starting docker containers...\n"
	@$(COMPOSE_CMD) $(COMPOSE_FILE) start

logs:
	@echo "Docker compose logs:"
	@$(COMPOSE_CMD) $(COMPOSE_FILE) logs

stop:
	@echo "Stopping docker containers...\n"
	@$(COMPOSE_CMD) $(COMPOSE_FILE) stop

clean: down
	@echo "Deleting docker containers...\n"
	@$(COMPOSE_CMD) $(COMPOSE_FILE) down

fclean:
	@echo "Deleting containers, images, networks and volumes...\n"
	@$(COMPOSE_CMD) $(COMPOSE_FILE) down --rmi local -v --remove-orphans


re: fclean all

.PHONY	: all build down re clean fclean