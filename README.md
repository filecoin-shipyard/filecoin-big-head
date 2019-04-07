filecoin-big-head
=================

A simple command line tool to display the height of the
[Filecoin](https://filecoin.io/) blockchain that your node has synced.

# Install

```
npm install -g filecoin-big-head
```

Or just try it out without installing:

```
npx filecoin-big-head
```

# Examples

```
npx filecoin-big-head
```
![Example 1](filecoin-big-head-1.gif)

```
npx filecoin-big-head --font=3d --color=cyanBright,blue --flash-color=whiteBright
```

![Example 2](filecoin-big-head-2.gif)

For more font examples, see [cfonts](https://github.com/dominikwilkowski/cfonts).

# Implementation

* Built with [React](https://reactjs.org/) and [Ink](https://github.com/vadimdemedes/ink)
* Uses [js-filecoin-api-client](https://github.com/filecoin-project/js-filecoin-api-client)

# License

MIT

