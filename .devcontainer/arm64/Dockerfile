# Base build stage
FROM arm64v8/debian:latest as foundry

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates gnupg curl && \
    rm -rf /var/lib/apt/lists/*

# Install the Cloud Foundry CLI
RUN curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&version=v7" | tar -zx && \
    mv cf7 /usr/local/bin/cf && \
    chmod +x /usr/local/bin/cf

# Final build stage
ARG VARIANT="18-buster-slim"
FROM arm64v8/node:${VARIANT}

COPY --from=foundry /usr/local/bin/cf /usr/local/bin/cf

# Update local package index and run installs
RUN apt-get update

RUN apt-get install -y sqlite3
RUN apt-get install -y git 

# Install global node modules for SAP CAP and frontend development
RUN npm install -g @ui5/cli @sap/cds-dk yo mbt

EXPOSE 8080
EXPOSE 8081
