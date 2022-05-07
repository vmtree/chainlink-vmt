FROM node:16
ENV NODE_ENV production
WORKDIR /app
COPY . ./
RUN yarn
EXPOSE 8080
ENTRYPOINT ["yarn"]