FROM mhart/alpine-node:5

MAINTAINER StoryXpress <Sanyam Kapoor "sanyam@storyxpress.co">

ADD . /app

EXPOSE 3000

WORKDIR /app

# List of all runtime envrironment variables

# Optional (recommended defaults)
ENV NODE_ENV=production \
  PORT=3000 \

  # Required (indicative defaults)
  APP_KEY=randomappkey \

  REDIS_HOST=127.0.0.1 \
  REDIS_PORT=6379

CMD ["npm", "-s", "start"]
