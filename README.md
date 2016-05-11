
# Setup and run mongodb
https://community.c9.io/t/setting-up-mongodb/1717
./mongod

# Setup server env settings
cp example.env .env 
nano .env
(fill in settings)

https://github.com/settings/applications/new


# Install dependencies
npm i webpack -g  && npm i

# Watch and compile static assets
webpack --watch

# Start the server
npm start
