FROM node:12.6

# Based on
# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN usermod --groups audio,video node &&\
  mkdir -p /home/node/Downloads

WORKDIR /opt/storage
COPY example/storage .

WORKDIR /opt/end-to-end-test
COPY example/end-to-end-test/package.json example/end-to-end-test/package-lock.json ./
RUN npm install

COPY example/end-to-end-test .

USER node

CMD ["npm", "start"]
