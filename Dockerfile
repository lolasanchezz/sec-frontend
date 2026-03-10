FROM --platform=linux/arm node:18.17-bullseye

WORKDIR /usr/app/sec-frontend
COPY ./package.json ./

# Install dependencies
RUN npm install
 
# Copy the rest  of your application files
COPY . ./
 
# Expose the port your app runs on



#RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]