---
id: xss
title: Cross-Site Scripting (XSS)
---


# Cross-Site Scripting (XSS) (CWE-79): A Detailed Guide

This guide explains Cross-Site Scripting (XSS), a widespread web security vulnerability that allows attackers to compromise the interactions users have with a vulnerable application. We will cover how it works, its different forms, and the best ways to stop it.


## 1. What is Cross-Site Scripting (XSS)?

**The Core Idea:** XSS is a vulnerability that lets an attacker inject malicious scripts (usually JavaScript) into a web page viewed by other users. When an unsuspecting user visits the compromised page, their browser will execute the malicious script, believing it came from a trusted source.

The root cause is the application's failure to properly handle user-supplied data. When a website takes input from a user (like a name, a comment, or a search term) and displays it back on a page without cleaning or "neutralizing" it first, an attacker can supply a script instead of normal text.

**The Goal:** The ultimate goal for the attacker is to bypass the **Same-Origin Policy (SOP)**. The SOP is a critical security rule in web browsers that prevents a script from one website (e.g., `evil.com`) from accessing data on another website (e.g., `your-bank.com`). By injecting a script directly into `your-bank.com`, the attacker's code runs with the same permissions as the legitimate website, allowing it to access the user's sensitive data for that site.


## 2. How Does XSS Work?

The attack follows a simple but effective pattern:

1. **Injection:** The attacker finds a part of a website that accepts user input and displays it back, such as a search bar or a comments section. Instead of regular text, they submit a malicious script.
    
2. **Delivery:** The vulnerable website saves this malicious input and includes it in the HTML of the web page without sanitizing it.
    
3. **Execution:** When a victim visits this page, their web browser receives the HTML, sees the malicious script, and executes it because it trusts the source (the vulnerable website).

**A Simple Analogy (The Public Message Board):**

* **The Website:** A public message board where people can post comments for others to see.
    
* **The Attacker (Mallory):** Instead of posting a text message like "Hello!", Mallory posts a comment that is actually a script: `<script>alert('You have been hacked!')</script>`.
    
* **The Vulnerability:** The message board website doesn't check the content of the post. It just saves it and displays it to everyone.
    
* **The Victim (Alice):** When Alice visits the message board, her browser loads all the comments. When it gets to Mallory's post, it doesn't display the text `<script>...`—it sees a command and executes the script, causing a popup to appear on Alice's screen.


## 3. The Three Main Types of XSS Attacks

XSS vulnerabilities are categorized based on how the malicious script is delivered to the victim's browser.


### a. Reflected XSS (Non-Persistent)

This is the most common type. The injected script is "reflected" off the web server and sent to the victim.

* **How it Works:** The malicious script is part of the URL or another request parameter. The attacker must trick the victim into clicking a specially crafted link (e.g., through a phishing email). When the victim clicks the link, the script is sent to the vulnerable server, which then includes it in the web page it sends back to the victim's browser. The script is never permanently stored on the server.
    
* **Example:** A search page displays the search term. The URL is `https://example.com/search?term=apples`. An attacker crafts a URL like: `https://example.com/search?term=<script>steal_cookie()</script>`. When a victim clicks this, the page will display the script, and the browser will run it.


### b. Stored XSS (Persistent)

This is the most dangerous type because it can affect many users without any direct interaction.

* **How it Works:** The attacker injects the malicious script, and the vulnerable application permanently stores it on the server (e.g., in a database, as a blog comment, or in a user's profile name). Every time any user visits the page containing this stored data, the server sends the script to their browser, which then executes it.
    
* **Example:** An attacker posts a comment on a blog. The comment is a malicious script. The blog's server saves this comment to its database. Now, every person who views that blog post will have their browser execute the attacker's script.


### c. DOM-based XSS

This is a more modern and subtle variant where the entire attack happens in the victim's browser. The server is not directly involved in the vulnerability.

* **How it Works:** The vulnerability lies in the website's client-side JavaScript code. The code takes data from a source controlled by the user (like the part of the URL after the `#` symbol) and dynamically writes it into the page's HTML without sanitizing it. The server never even sees the malicious payload.
    
* **Example:** A website has a feature where it shows your name in the page based on the URL: `https://example.com/hello#Alice`. The JavaScript code does something like: `document.getElementById('greeting').innerHTML = 'Hello, ' + location.hash;` If an attacker changes the URL to `https://example.com/hello#<script>steal_cookie()</script>`, the script will be executed.


## 4. Why XSS is Dangerous

The consequences of a successful XSS attack can be severe:

* **Steal Session Cookies:** An attacker can steal the cookies that store your login session, allowing them to impersonate you without knowing your password.
    
* **Steal Sensitive Information:** Scripts can access data on the page (like credit card numbers or personal information) and send it to the attacker's server.
    
* **Redirect to Malicious Sites:** The script can redirect you to a fake login page that looks real, tricking you into giving up your credentials.
    
* **Perform Actions on Your Behalf:** The script can use your authenticated session to make purchases, post messages, or change your account settings.
    
* **Spread Malware:** The script can download and install malware onto your computer.
    
* **Deface the Website:** The attacker can change what the page displays to all users.


## 5. How to Prevent XSS

The most effective defenses include:

* **Output Encoding:** When displaying user input, encode it so that any special characters (like `<` and `>`) are converted into harmless representations (like `&lt;` and `&gt;`). This prevents the browser from interpreting it as HTML or JavaScript.
    
* **Input Validation:** Validate user input on the server side. Check that it matches the expected format. For example, if a field should only contain numbers, reject anything else.
    
* **Content Security Policy (CSP):** This is a security header that you send with your web pages. It tells the browser which sources of scripts and other resources are trustworthy. For example, you can say, "Only execute scripts that come from my own domain."
    
* **HTML Sanitization Libraries:** If you absolutely must allow users to enter HTML (e.g., for rich text editing), use a library that removes potentially dangerous tags and attributes while preserving safe formatting.
    
* **HttpOnly Cookies:** Set the `HttpOnly` flag on sensitive cookies. This prevents JavaScript from accessing them, so even if an XSS attack is successful, the attacker can't steal the session cookie.


## 6. Testing for XSS

* **Manual Testing:** Try common payloads like `<script>alert('XSS')</script>`, `<img src=x onerror=alert('XSS')>`, etc., in different input fields.
    
* **Automated Scanning:** Tools like Burp Suite and OWASP ZAP can automatically test for XSS.
    
* **Code Review:** Inspect the application code for any instances where user input is directly included in HTML output without encoding.
