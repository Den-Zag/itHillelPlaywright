FROM mcr.microsoft.com/playwright:v1.46.0-jammy

RUN tests

WORKDIR tests

COPY . .

RUN npm ci

CMD ["npm", "run", "test"]
