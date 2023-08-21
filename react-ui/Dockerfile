# This file performs a multi-stage build, starting with Node.js to compile
# the React appliaction using Vite and TypeScript tooling
FROM registry.access.redhat.com/ubi8/nodejs-18 as build

# Default value for build environment variables
ENV VITE_SHORT_URL_HOST https://l.nk.city/
ENV VITE_LINK_TTL_HOURS 24

WORKDIR /usr/src/app

# Install dependencies and enable a cached dependencies layer
COPY --chown=1001:0 package*.json .
RUN npm ci

# Copy other sources and build the application
COPY --chown=1001:0 . .
RUN npm run build

# The second stage of the build copies the built React application into an
# NGINX container image that can be deployed to serve the application
FROM registry.access.redhat.com/ubi8/nginx-120

# Copy the React application from the prior build step
COPY --chown=1001:0 --from=build /usr/src/app/dist .

# Copy the custom nginx.conf that will proxy API calls to the backend!
COPY --chown=1001:0 nginx.conf .

# envsubst replaces the API_URL in the template nginx.conf and writes it to
# the $NGINX_CONF_PATH defined by the base image. It also sets the nameservers
# to ensure that NGINX can resolve the internal API hostname
CMD cat /etc/resolv.conf && NAMESERVERS=$(grep -oE 'nameserver ([0-9a-fA-F:.]+)' /etc/resolv.conf | awk '/:/ { print "["$2"]" }') envsubst '$PORT,$API_URL,$NAMESERVERS' < 'nginx.conf' > $NGINX_CONF_PATH && nginx -g "daemon off;"