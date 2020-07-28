FROM node:8-alpine
COPY . /dockernode/jwtDemo
WORKDIR /dockernode/jwtDemo
RUN npm i
EXPOSE 3011
ENTRYPOINT [ "npm", "start" ]
