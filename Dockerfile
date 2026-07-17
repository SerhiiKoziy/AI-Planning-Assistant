# --- Shared deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- Dev stage: vite dev server with HMR, used by docker-compose for local dev ---
FROM deps AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --- Build stage: production static bundle ---
FROM deps AS build
COPY . .
RUN npm run build

# --- Serve stage: production nginx serving the static bundle ---
FROM nginx:1.27-alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
