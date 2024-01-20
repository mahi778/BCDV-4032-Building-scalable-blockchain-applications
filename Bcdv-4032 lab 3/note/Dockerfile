# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Setting up the work directory
WORKDIR /app

# ENV REACT_APP_SERVER_URL=http://localhost:5000 # for docker-compose

# Installing dependencies
COPY package*.json .
RUN npm install

# Copying all the files in our project
COPY . .

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx:stable-alpine

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
