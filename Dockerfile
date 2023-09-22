FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY tsconfig.json .
COPY biome.json .
COPY src src

RUN bun install --production


ENV NODE_ENV production
CMD ["bun", "run", "deploy"]

EXPOSE 3000