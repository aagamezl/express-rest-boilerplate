FROM node:lts

# Create app directory
RUN mkdir /brodevhood
WORKDIR /brodevhood
ADD . /brodevhood

# Install app dependencies
COPY package.json package-lock.json /brodevhood/

# Run npm and install modules
RUN npm install

# Expose application port
EXPOSE 3020

# Run start command
CMD ["npm", "run", "dev"]
