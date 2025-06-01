FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add --no-cache libc6-compat && \
    yarn install --frozen-lockfile || \
    yarn install --network-timeout 1000000

COPY . .

RUN yarn build 

# --- ESTÁGIO DE PRODUÇÃO (RUNNER) ---
# Usa uma imagem Nginx leve para servir os arquivos estáticos.
FROM nginx:alpine

# Remove a configuração padrão do Nginx para evitar conflitos.
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]