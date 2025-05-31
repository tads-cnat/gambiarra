FROM node:20 AS build

WORKDIR /app
# Copy package.json and package-lock.json

COPY gamb-front/package.json gamb-front/yarn.lock* ./

RUN apk add --no-cache libc6-compat && \
    yarn install --frozen-lockfile || \
    yarn install --network-timeout 1000000

COPY gamb-front ./
# Install dependencies
RUN yarn build

EXPOSE 5173

CMD ["yarn", "dev"]