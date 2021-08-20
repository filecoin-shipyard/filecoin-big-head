filecoin-big-head
=================

## Status

This repository is in a **frozen** state. It is not being maintained or kept in sync with the libraries it depends on. This library was designed for an early version of _go-filecoin_, which is now known as [Venus](https://venus.filecoin.io/). An API client for Lotus can be found at https://github.com/filecoin-shipyard/js-lotus-client-rpc that may be used to build similar functionality. Even though work on this repository has been **shelved**, anyone interested in updating or maintaining this library should express their interest on one Filecoin community conversation mediums: <https://github.com/filecoin-project/community#join-the-community>.

---

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

MIT/Apache-2 ([Permissive License Stack](https://protocol.ai/blog/announcing-the-permissive-license-stack/))
