FROM python:3.6.0
MAINTAINER AleBustos
ENV PYTHONUNBUFFERED 1

RUN echo "deb http://deb.debian.org/debian jessie main" > /etc/apt/sources.list
RUN apt-get update -y \
    && apt-get -y install ruby-sass binutils \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app && cd /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r /usr/src/app/requirements.txt --no-cache-dir

RUN chmod 777 /usr/src/app/init_local.sh
RUN chmod +x /usr/src/app/init_local.sh

CMD ['/usr/src/app/init_local.sh']