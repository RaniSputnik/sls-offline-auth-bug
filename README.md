# SLS Offline Auth bug

A small example project that demonstrates a bug in Serverless offline.

Running serverless offline we see an unauthorised message:
```sh
$ npx serverless offline
$ curl http://localhost:3000/dev
{"statusCode":401,"error":"Unauthorized","message":"Unauthorized"}
```

## Expected behaviour

Running serverless offline with the `--useChildProcesses` flag results in the same behaviour.

## Actual behaviour

Running with the `--useChildProcesses` flag, the request hangs:

```sh
$ npx serverless offline --useChildProcesses
$ curl http://localhost:3000/dev
# The above request never completes
```

If you check the output from the serverless offline server, you will see the following:

```
offline: Running Authorization function for get /dev (λ: authorizer)
Error: something went wrong
    at authorizer (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/.webpack/service/src/handlers.js:18:9)
    at InProcessRunner.run (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js:178:16)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async process.<anonymous> (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/node_modules/serverless-offline/dist/lambda/handler-runner/child-process-runner/childProcessHelper.js:40:14)
Error: something went wrong
    at authorizer (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/.webpack/service/src/handlers.js:18:9)
    at InProcessRunner.run (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js:178:16)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async process.<anonymous> (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/node_modules/serverless-offline/dist/lambda/handler-runner/child-process-runner/childProcessHelper.js:40:14)
(node:90419) UnhandledPromiseRejectionWarning: Error: something went wrong
    at authorizer (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/.webpack/service/src/handlers.js:18:9)
    at InProcessRunner.run (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/node_modules/serverless-offline/dist/lambda/handler-runner/in-process-runner/InProcessRunner.js:178:16)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at async process.<anonymous> (/Users/ryan.loader/Code/experiments/sls-offline-auth-bug/node_modules/serverless-offline/dist/lambda/handler-runner/child-process-runner/childProcessHelper.js:40:14)
(node:90419) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)
(node:90419) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```
