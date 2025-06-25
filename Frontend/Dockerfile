FROM node:20-slim

# Use development mode
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Ports for Expo & Metro Bundler
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002 8081

# Global npm path for Expo CLI & Ngrok
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

# Install global tools
RUN npm i --unsafe-perm --allow-root -g npm@latest @expo/ngrok@^4.1.0

# Create app directory
RUN mkdir /opt/react_native_app
WORKDIR /opt/react_native_app

# Copy source code
COPY . .

# Install all dependencies (including devDependencies)
RUN npm install

# Default command to start Expo with tunneling
CMD ["npx", "expo", "start", "--web", "--tunnel"]
