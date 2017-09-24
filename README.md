## Installation

```
git clone git@github.com:guofei/web-update-notification-node.git
cd web-update-notification-node
docker build -t guofei/node-web-app .
# shm-size see: https://github.com/c0b/chrome-in-docker/issues/1
docker run -p 3000:3000 --shm-size=2gb -e NEWRELIC_LICENSE=license_key -v /hostpath/logs:/usr/src/app/tmp/logs guofei/node-web-app
```
