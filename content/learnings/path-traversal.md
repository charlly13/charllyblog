---
id: path-traversal
title: Path Traversal (CWE-35)
---


# Path Traversal (CWE-35): A Detailed Guide

This guide explains Path Traversal (also known as Directory Traversal), a security vulnerability that allows an attacker to read files on a server that they should not be able to access. We will break down how it works, why it's dangerous, and the essential methods for preventing it.


## 1. What is Path Traversal?

**The Core Idea:** A Path Traversal attack tricks a web application into accessing files and directories located outside of the web server's root directory.

Normally, a web server should only provide files from a specific folder (often called the "web root" or `www`). This vulnerability allows an attacker to "traverse" up the file system hierarchy and access sensitive files anywhere on the server.

**An Analogy (The Library):**

* **The Web Root:** Imagine a library where you are only allowed to access books in the "Public Reading" section.
    
* **A Normal Request:** You ask the librarian for a specific book by its title, and they bring it to you from the Public Reading section.
    
* **A Path Traversal Attack:** Instead of a title, you give the librarian a set of instructions like, "Go back to the main hallway, turn left into the restricted 'Staff Only' area, and get me the employee records file." If the librarian follows these instructions without question, they have been successfully attacked.


## 2. How Does It Work? The File System Tree

To understand this attack, you need to know how file systems are organized. They use a tree-like structure, with directories (folders) inside other directories.

* **File System Navigation:** We use special symbols to move around this tree.
    
    * `/` (a forward slash) refers to the **root** directory (the very top level of the file system).
    * `.` (a single dot) refers to the **current** directory (where we are right now).
    * `..` (a double dot) refers to the **parent** directory (one level up).
        
* **The Attack:** Path Traversal attacks exploit the `..` sequence. By repeatedly using `..`, an attacker can move up from the web root directory to access the rest of the file system.
    
    * On **Linux** systems, this is done with `../`.
    * On **Windows** systems, this is done with `..\`.


## 3. Other Names for This Attack

This vulnerability is known by several names, all referring to the same core problem:

* Directory Traversal
    
* Dot-Dot-Slash (`../`)
    
* Directory Climbing
    
* Backtracking


## 4. Example Attack Scenario

Let's look at how an application uses file parameters and how an attacker can exploit them.

**A Normal, Legitimate Request:** A user wants to view their report, so the application requests a file. The URL looks like this: `http://some_site.com/get-files.jsp?file=report.pdf` The application is designed to find `report.pdf` inside the public web directory and show it to the user.

**A Malicious Path Traversal Request:** An attacker wants to read the system's password file, which is highly sensitive and stored outside the web directory. They craft a special URL: `http://some_site.com/get-files.jsp?file=../../../../etc/passwd`

**Breaking Down the Attack:**

* `../../../../`: Each `../` tells the server to go up one directory. The attacker uses enough of these to "climb" out of the web root directory and reach the server's root (`/`) directory.
    
* `etc/passwd`: Once at the root directory, the attacker provides the path to the sensitive file they want to access.
    
* **The Result:** If the application is vulnerable, it will process this path and return the contents of the `/etc/passwd` file, which contains a list of all users on the system.

**Note on Operating Systems:** The following distinction is important:

* On a **Linux** server, an attacker can potentially navigate the entire disk.
    
* On a **Windows** server, an attacker is often restricted to navigating within the single partition where the web root is located (e.g., they can't jump from the `C:\` drive to the `D:\` drive).


## 5. Common Attack Vectors

Attackers can inject the Path Traversal payload in several parts of an HTTP request:

1. **HTTP GET Request:** The malicious string is placed directly in the URL's query parameters, as seen in the example above. This is the most common method.
    
2. **HTTP POST Request:** The payload is sent in the body of the request, often from a form submission. This is less visible than a GET request.
    
3. **Cookies:** An attacker can modify a cookie value in their browser to contain the traversal sequence. When the server reads the cookie, it might use that value to build a file path, triggering the vulnerability.


## 6. Where is This Vulnerability Found?

Path Traversal is not specific to one language. It can be found in any language where the application code takes user-controllable input and uses it to access files, including:

* PHP
    
* Java / JSP
    
* .NET / ASP
    
* Python
    
* Perl


## 7. How to Prevent Path Traversal

The most effective defenses include:

* **Input Validation:** Reject any input containing `..` or path separators. Use a whitelist of allowed filenames.
    
* **Path Canonicalization:** Convert the path to its absolute, canonical form and verify it's within the allowed directory.
    
* **Sandboxing:** Restrict file access to a specific directory using chroot or similar OS mechanisms.
    
* **Use Safe APIs:** Use framework functions designed for secure file serving rather than building paths manually.
    
* **Principle of Least Privilege:** Ensure the web application user has minimal file system permissions.


## 8. Testing for Path Traversal

* **Manual Testing:** Try common payloads like `../`, `..\\`, `....//`, etc.
    
* **Automated Tools:** Burp Suite Scanner and OWASP ZAP can detect these vulnerabilities.
    
* **Metasploit:** A penetration testing framework with modules for exploiting this vulnerability.
