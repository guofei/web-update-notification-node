## Installation

### Install with docker
```
git clone git@github.com:guofei/web-update-notification-node.git
cd web-update-notification-node
docker build -t guofei/web-update-notification-node-api .
docker run --restart unless-stopped -d -p 8181:3000 guofei/web-update-notification-node-api
```


#### Setup log
```
docker run --restart unless-stopped -d -p 8181:3000 --log-opt max-size=100m --log-opt max-file=10 -v /hostpath/logs:/usr/src/app/tmp/logs guofei/web-update-notification-node-api
```

#### Logs path
/var/log/webnofity
