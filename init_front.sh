
#create logs directory
mkdir backend/logs

#Install dependences frontend
docker-compose run --rm frontend yarn --cwd ./front
