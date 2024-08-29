from node:18

WORKDIR /usr/app

COPY . .
RUN npm install
# RUN npx prisma generate
# RUN npx prisma db push

EXPOSE 3000


CMD ["npm","run","dev"]                                                                                                                                                                                                 