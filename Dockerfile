FROM mhart/alpine-node:5

MAINTAINER StoryXpress <Sanyam Kapoor "1sanyamkapoor@gmail.com">

ADD . /app

EXPOSE 3000

WORKDIR /app

ENV NODE_ENV=production PORT=3000

CMD ["npm", "-s", "start"]
