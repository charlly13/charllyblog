---
id: burp-suite-introduction
title: Getting Started with Burp Suite
---

# Getting Started with Burp Suite: A Detailed Guide

This guide provides a beginner-friendly introduction to Burp Suite, the all-in-one toolkit for web application security testing. We cover the core tools, setup, and responsible usage.

## Core Components

- Proxy: intercept and modify browser traffic.
- Repeater: manually edit and resend requests.
- Intruder: automate payload-based testing.
- Scanner: automated scanning (in paid editions).
- Sequencer, Decoder, Comparer: utilities for analysis.

## Setup

1. Install Burp Suite (Community or Professional).
2. Configure your browser to use `127.0.0.1:8080` as proxy.
3. Install Burp's CA certificate in the browser to intercept HTTPS.

## Workflow

- Map the application via the proxy.
- Test inputs with Repeater/Intruder.
- Use Scanner (if available) and always complement with manual testing.

***
