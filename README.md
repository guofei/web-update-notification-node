## Installation

```
git clone git@github.com:guofei/web-update-notification-node.git
cd web-update-notification-node
docker build -t guofei/node-web-app .
docker run -p 3000:3000 -e NEWRELIC_LICENSE=license_key -v /hostpath/logs:/usr/src/app/tmp/logs guofei/node-web-app
```
