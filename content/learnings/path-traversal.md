---
id: path-traversal
title: Path Traversal (CWE-35)
---

# Path Traversal (CWE-35): A Detailed Guide

This guide explains Path Traversal (also known as Directory Traversal), a security vulnerability that allows an attacker to read files on a server that they should not be able to access. We will break down how it works, why it's dangerous, and the essential methods for preventing it.

## 1. What is Path Traversal?

**The Core Idea:** A Path Traversal attack tricks a web application into accessing files and directories located outside of the web server's root directory.

Normally, a web server should only provide files from a specific folder (often called the "web root" or `www`). This vulnerability allows an attacker to "traverse" up the file system hierarchy and access the rest of the file system.

## 2. How Does It Work?

The attack often exploits use of `..` (dot-dot) sequences in user-supplied file paths (on Windows `..\`). By using repeated `../` segments an attacker can escape the intended directory and access arbitrary files.

## 3. Example Attack Scenario

- Normal: `http://site.com/get-files?file=report.pdf` (server loads `report.pdf` from a safe folder)
- Attack: `http://site.com/get-files?file=../../../../etc/passwd` — attacker climbs out of the web root and reads `/etc/passwd` (on Linux).

## 4. Common Attack Vectors

- Query parameters (GET)
- POST body fields
- Cookies or headers if used to assemble paths

## 5. Where is This Vulnerability Found?

Any language that uses user input to construct file paths: PHP, Java, .NET, Node.js, Python, etc.

## 6. How to Prevent Path Traversal

- Canonicalize and validate paths.
- Restrict file access to a safe directory (chroot or sandboxing patterns).
- Reject any path containing `..` segments or normalize and ensure resolved path is inside allowed dir.
- Use safe APIs (e.g., serve static files with framework helpers rather than reading arbitrary file paths).

## 7. Tools and Testing

- Use scanners and manual testing (e.g., Burp) to verify protections.

***
