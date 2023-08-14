FROM node:16.13-slim
WORKDIR /app
COPY package.json yarn.lock ./
ENV NEXT_PUBLIC_WORDPRESS_API_URL=https://admin.techstore.mn/wp/graphql
ENV NEXT_PUBLIC_ERXES_API_URL=https://techstore.erxes.io/gateway
ENV NEXT_PUBLIC_MAIN_SUBS_DOMAIN=wss://techstore.erxes.io/gateway/graphql
ENV NEXT_PUBLIC_ERXES_POS_TOKEN=iQUf6AwefUeml8G3ihxzR6GsVGE6lRdj
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]