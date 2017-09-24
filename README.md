## Installation

### Install with docker
```
git clone git@github.com:guofei/web-update-notification-node.git
cd web-update-notification-node
docker build -t guofei/node-web-app .
# shm-size see: https://github.com/c0b/chrome-in-docker/issues/1
docker run --restart unless-stopped -d -p 8181:3000 --shm-size=4gb -e NEWRELIC_LICENSE=license_key -v /hostpath/logs:/usr/src/app/tmp/logs guofei/node-web-app
```

#### Logs path
/var/log/webnofity

#### NEWRELIC_LICENSE
https://rpm.newrelic.com

### Create a local backup server
```
echo BACKUP_HOST=http://localhost:8182 > .env
docker run --restart unless-stopped -d -p 8181:3000 --shm-size=4gb -e NEWRELIC_LICENSE=license_key -v /hostpath/logs:/usr/src/app/tmp/logs guofei/node-web-app
docker run --restart unless-stopped -d -p 8182:3000 --shm-size=4gb -e NEWRELIC_LICENSE=license_key -v /hostpath/logs:/usr/src/app/tmp/logs guofei/node-web-app
```
