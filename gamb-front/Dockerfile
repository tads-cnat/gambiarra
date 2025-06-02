# Etapa 1: build do frontend
FROM node:20-alpine AS build

WORKDIR /app

# Argumentos de build (serão passados via --build-arg)
ARG VITE_API_URL
ARG VITE_WS_HOST

# Torna essas variáveis visíveis para o Vite (usadas em import.meta.env)
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_WS_HOST=$VITE_WS_HOST

# Debug (opcional)
RUN echo "🛠️ VITE_API_URL=$VITE_API_URL"
RUN echo "🛠️ VITE_WS_HOST=$VITE_WS_HOST"

# Instala dependências
COPY package.json yarn.lock ./
RUN apk add --no-cache libc6-compat && \
    yarn install --frozen-lockfile || yarn install --network-timeout 1000000

# Copia o restante do código
COPY . .

# Build do Vite (que usa as variáveis de ambiente)
RUN yarn build

# Etapa 2: imagem final com nginx
FROM nginx:alpine

# Remove conf padrão
RUN rm /etc/nginx/conf.d/default.conf

# Adiciona a conf customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos do frontend compilado
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
