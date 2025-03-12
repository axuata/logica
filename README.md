# What is Logica?
**Logica** is _a lightweight customizable_ logger library.

# Example
You can use it easily!

```typescript
import {Logger} from "./logger";

const logger = new Logger();

logger.addStatus('info', 'primary').addMessage('Hello World').out('log');
// => logs " INFO  Hello World"

logger.addStackTrace(new Error('Test Error')).out('log');
// => logs with stacktrace
```

# Installation
Thanks for considering this library!
```shell
# npm
npm install @axuata/logica

# yarn
yarn add @axuata/logica

# pnpm
pnpm add @axuata/logica
```

# Questions
- What happened to **the Logify library**?  
=> It has been integrated into **Logica**.  

# Functions
## Logger
- `addMessage(message: string)`  
=> pushes a new message to the log queue.  
- `addStatus(level: LogLevel, theme: Theme)`  
=> pushes a status message to the log queue.  
- `addStackTrace(error: Error)`  
=> pushes a stack trace to the log queue.  
- `addTimestamp(format: string)`  
=> pushes a formatted timestamp to the log queue.  
- `addAffix(affix: string)`  
=> pushes an affix to the log queue.  
- `addEnvironment(env: 'development' | 'production')`  
=> pushes an environment label to the log queue.  
- `addProgressBar(percent: number)`  
=> pushes a progress bar to the log queue.  
- `addIndentation(depth: number)`  
=> pushes indents to the log queue.  
- `addDivider()`  
=> pushes a divider to the log queue.  
## Utils
- `startGroup(label: string)`  
=> starts a new group with the specified label.  
- `startGroupCollapsed(label: string)`  
=> starts a new collapsable group with the specified label.  
- `endGroup()`  
=> ends the current group.  

# Types
- `LogLevel`  
= 'log' | 'debug' | 'info' | 'warn' | 'error'    
- `Theme`  
= 'primary' | 'secondary'  