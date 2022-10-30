FROM node:alpine3.15

LABEL Description='Theosis' Version='latest'

WORKDIR /home/node

COPY . .

ENV NODE_ENV="production" \
    CONFIG_FILE="./config.json"

RUN /usr/local/bin/npm install && rm -rf build.sh package* *.log .idea .git .gitignore theosis.iml Docker*

EXPOSE 3000

USER node

CMD ["/usr/local/bin/node", "/home/node/bin/www"]
