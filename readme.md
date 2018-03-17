# Data Schema

```js
{
    url: string().required().unique(),
    reviewedAt:number(), // time when the url was checked
    rebootAt: number(), //  time when the instance is rebooted
    timeout: number(), // time to wait response, if is broken is concidered DOWN
    rebootIfIsDown: boolean() // if reboot instance when is down
}
```

# Configuration

|Variable|Mean|Default|
|---|---|---|
|TIMEOUT| time to wait for a response from server after this a error is thrown| 3000 |
|STATUS_TO_WAIT|status to wait in response|200|
|GROUP_NAME|group name to cloudwatch logs||
|TABLE_NAME| The table name of dynamodb to get urls| |
|REGION| To config of AWS_SDK|'us-east-1' |
|NODE_ENV| If set to test dynamodb point to localhost| |
|LAMBDA_NAME_RESTART_INSTANCE| name lambda function to restart the instance|
|TIME_TO_WAIT_TO_RESTART_INSTANCE| time to wait until try again to restart instance|600000|


# Deploy 

```bash
zip -ru lambda.zip *
```

# Log Schema

```js
{
    url: string().url(),
    delay: number().gt(0).le(TIMEOUT || timeout),
    status: string().valid('UNREACHABLE', 'DOWN', 'UP')
    error: string().when({
        status: {
            is:['DOWN', 'UNREACHABLE']
        }
    })
}
```