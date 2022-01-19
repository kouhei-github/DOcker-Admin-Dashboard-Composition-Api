FROM node:16.1-alpine

WORKDIR /frontend

ADD ./source/package.json /frontend
ADD ./source/package-lock.json /frontend

RUN apk update && \
    apk add git && \
    apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh && \
    yarn install


