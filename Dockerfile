FROM oven/bun AS builder

WORKDIR /src

COPY package.json bun.lockb .

COPY . .

RUN bun compile

FROM oven/bun AS deploy

WORKDIR /app

COPY --from=builder /src/dist .
COPY --from=builder /src/node_modules node_modules

ENTRYPOINT ["bun", "main.js"]
