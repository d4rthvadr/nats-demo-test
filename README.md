## Setup

## Requirements

[Working demo](./screenshots/sc001.png)

## Port-forward requests to pod in k7s
Since the NATS Streaming service is running inside a pod, it isn't directly accessible from the local environment. Setting up port forwarding will quickly resolve this issue.
```shell
k port-forward nats-deployment-XXXXX-XXX 4222:4222

```