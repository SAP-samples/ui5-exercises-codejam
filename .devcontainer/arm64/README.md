# Info Dockerfile for arm64

## Trivia

Based on the original Dockerfile from this repo, this one will create a base image with which one can natively run a containerized exercise app on an M1/M2 MacBook.

## Issues

Opening the running app via https://localhost:8080 may fail.

To solve this, one needs to add `--accept-remote-connections` to `ui5 serve`.
