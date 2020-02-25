FROM node:12-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y python3-pip imagemagick poppler-utils
RUN pip3 install diff-pdf-visually
