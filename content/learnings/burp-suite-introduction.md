---
id: burp-suite-introduction
title: Getting Started with Burp Suite
---


# Getting Started with Burp Suite: A Detailed Guide

This guide provides a beginner-friendly introduction to Burp Suite, the all-in-one toolkit for web application security testing. We will cover what it is, its core tools, how to set it up, and how to use it responsibly.


## 1. What is Burp Suite?

**The Core Idea:** Burp Suite is an integrated platform designed for security professionals and bug bounty hunters to test the security of web applications. Think of it as a powerful **magnifying glass and toolkit** that sits between your web browser and the internet, allowing you to inspect, modify, and analyze all the traffic that goes back and forth.

Its primary purpose is to help you find vulnerabilities in web applications before malicious hackers do.


## 2. The Core Components of Burp Suite

Burp Suite is made up of several powerful tools that work together. Here are the most important ones for beginners:


### a. Proxy

* **What it is:** The Proxy is the heart of Burp Suite. It acts as a "man-in-the-middle," intercepting all the communication between your browser and the web server.
    
* **What it does:** It allows you to see the raw HTTP/S requests your browser sends (e.g., when you log in or click a link) and the raw HTTP/S responses the server sends back. You can pause, view, and even modify this traffic before it reaches its destination.
    
* **Why it's useful:** This is essential for understanding how a web application works and for finding vulnerabilities by changing the data being sent.


### b. Repeater

* **What it is:** A tool for manually manipulating and re-sending individual HTTP requests over and over again.
    
* **What it does:** You can take any request you captured in the Proxy, send it to Repeater, change parts of it (like a user ID in the URL or a form field), and send it again to see how the server's response changes.
    
* **Why it's useful:** It's perfect for detailed, manual testing of a specific vulnerability. For example, you can use it to test for SQL injection by trying different malicious inputs in a parameter.


### c. Intruder

* **What it is:** A tool for automating customized attacks against a web application.
    
* **What it does:** Intruder is a powerful and highly configurable tool. You can select parts of a request to be your "payload positions" and then provide Intruder with a list of payloads (e.g., a list of common passwords, usernames, or XSS attack strings). Intruder will then send a request for every single payload, allowing you to quickly test for many vulnerabilities.
    
* **Why it's useful:** It automates repetitive tasks like brute-force attacks or fuzzing for input validation flaws.


### d. Scanner

* **What it is:** An automated tool that scans a web application for a wide range of common security vulnerabilities.
    
* **What it does:** The Scanner automatically crawls through a website, analyzes the traffic, and identifies potential security flaws like SQL injection, XSS, and path traversal. It presents its findings in a clear report.
    
* **Why it's useful:** It provides a quick way to find "low-hanging fruit" vulnerabilities, though it should always be supplemented with manual testing.


### e. Other Tools

* **Sequencer:** Used to analyze the randomness of session tokens and other data that is supposed to be unpredictable.
    
* **Decoder:** A utility for converting data between different formats (e.g., URL encoding, Base64, Hex).
    
* **Comparer:** A tool to visually compare two pieces of data (like two different server responses) to see the differences.


## 3. How to Set Up Burp Suite

Getting started involves three main steps:

1. **Download & Install:** Get the appropriate version of Burp Suite (Community Edition is free) from the official PortSwigger website and install it on your computer.
    
2. **Configure Your Browser:** You need to tell your web browser (like Firefox or Chrome) to send all its traffic to the Burp Suite Proxy instead of directly to the internet. This is typically done by changing the proxy settings in your browser to point to `127.0.0.1` on port `8080`.
    
3. **Install Burp's CA Certificate:** Modern websites use HTTPS (encrypted traffic). For Burp to act as a man-in-the-middle for this traffic, it needs to decrypt it, view it, and then re-encrypt it. Your browser will not trust Burp's re-encrypted traffic by default. You must install Burp's unique Certificate Authority (CA) certificate into your browser's trusted certificate store. This tells your browser to trust the traffic coming from Burp Suite.


## 4. A Typical Web Security Testing Workflow

A standard testing process using Burp Suite looks like this:

1. **Map the Application:** Use your browser, configured with the Burp Proxy, to click through every part of the web application. Log in, view pages, submit forms, etc. Burp will passively build a complete "site map" of the application, showing you all the pages and resources it uses.
    
2. **Analyze Traffic:** Review the captured requests and responses to understand how the application works, what parameters are being sent, and where potential vulnerabilities might exist.
    
3. **Test for Vulnerabilities:** Use the Repeater and Intruder tools to manually test inputs for common vulnerabilities like SQL injection, XSS, authentication bypasses, etc.
    
4. **Document Findings:** Keep detailed notes of what you found, including the exact steps to reproduce each vulnerability, its impact, and how to fix it.
    
5. **Report:** Present your findings to the organization in a clear, actionable report.
