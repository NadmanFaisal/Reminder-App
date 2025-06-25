FROM node:20-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest @expo/ngrok@^4.1.0

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/react_native_app
WORKDIR /opt/react_native_app
ENV PATH /opt/react_native_app/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm install

# copy in our source code last, as it changes the most
WORKDIR /opt/react_native_app
# for development, we bind mount volumes; comment out for production
COPY . .

ENTRYPOINT ["npx", "expo", "start"]
CMD ["--web", "--tunnel"]
