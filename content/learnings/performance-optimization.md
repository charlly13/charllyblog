---
id: performance-optimization
title: Performance Optimization for React Apps
---


Performance is critical for user experience. In this topic I cover techniques like code-splitting, lazy loading, memoization with `React.memo` and `useMemo`, minimizing re-renders, and using the profiler to identify bottlenecks. I also include notes on image optimization and HTTP caching strategies.

Key takeaways:

* Use `React.memo` for pure functional components.
* Prefer data virtualization for long lists.
* Monitor with Lighthouse and React Profiler.
