## Installation

### Install with docker
```
git clone git@github.com:guofei/web-update-notification-node.git
cd web-update-notification-node
docker build -t guofei/node-web-app .
docker run --restart unless-stopped -d -p 8181:3000 --log-opt max-size=100m --log-opt max-file=10 -e NEWRELIC_LICENSE=license_key -v /hostpath/logs:/usr/src/app/tmp/logs guofei/node-web-app
```

#### Logs path
/var/log/webnofity

#### NEWRELIC_LICENSE
https://rpm.newrelic.com
