FROM node:lts-alpine

ENV NODE_ENV=production DEPLOYMENT=beamup PORT=80

WORKDIR /usr/src/wizdom

COPY package* /usr/src/wizdom/

RUN npm ci --only=production

COPY ["index.js", "config.js", "wizdom.js", "landingTemplate.js", "README.md", "/usr/src/wizdom/"]

CMD ["npm", "start"]

EXPOSE 80

