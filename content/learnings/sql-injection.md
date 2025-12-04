---
id: sql-injection
title: SQL Injection (CWE-89)
---


# SQL Injection (CWE-89): A Detailed Guide

This guide breaks down SQL Injection (SQLi), one of the most common and destructive web application vulnerabilities. We will explore what it is, the different ways it can be exploited, and the most effective methods to prevent it.


## 1. First, What is SQL?

Before diving into the attack, it's important to understand what SQL is.

* **What it stands for:** **S**tructured **Q**uery **L**anguage.
    
* **What it is:** SQL is the standard programming language used to communicate with and manage data in a **relational database**. Think of a database as a massive collection of organized spreadsheets (tables), and SQL is the language you use to ask it questions or give it commands.
    
* **Common Uses:**
    
    * **Read data:** `SELECT` information from a table.
    * **Add data:** `INSERT` new records into a table.
    * **Update data:** `UPDATE` an existing record.
    * **Delete data:** `DELETE` an old record.


## 2. What is SQL Injection (SQLi)?

**The Core Idea:** An SQL Injection is an attack where a hacker inserts (or "injects") their own malicious SQL commands into a web application's query.

This happens when the application takes input from a user (e.g., from a login form, search bar, or URL) and directly includes it in a database query without properly sanitizing it first. The attacker's goal is to manipulate the original query to make the database do something it wasn't supposed to do.

**A Simple Analogy (The Login Form):**

1. **The Application's Intended Query:** A website has a login page. When you enter your username, the server builds a query like this: `SELECT * FROM users WHERE username = 'YOUR_USERNAME';`
    
2. **The Attacker's Input:** Instead of a normal username, the attacker enters: `' OR '1'='1' --`
    
3. **The Vulnerability:** The application blindly trusts this input and builds the following malicious query: `SELECT * FROM users WHERE username = '' OR '1'='1' --';`
    
4. **The Result:** Let's break down what the database sees:
    
    * `username = ''` — This is false (the username field is empty).
    * `OR '1'='1'` — This is always true (1 always equals 1).
    * `--` — This is a comment, which means everything after it is ignored, including the closing quote and semicolon.
    * Because the `WHERE` clause is now true for every user, the database returns all users, and the attacker is logged in, often as the first user in the database (usually an admin).


## 3. Why is SQLi So Dangerous?

A successful SQLi attack is not a minor bug; it can be catastrophic for a business and its users. The potential consequences include:

* **Data Breach:** Attackers can read sensitive data from the database, including user credentials, personal information, credit card numbers, and trade secrets.
    
* **Data Loss or Corruption:** Attackers can use commands like `UPDATE` or `DELETE` to modify or destroy data, crippling the application.
    
* **Unauthorized Access:** As shown in the login example, attackers can bypass authentication controls to impersonate users or gain administrative privileges.
    
* **Full System Compromise:** In some cases, attackers can escalate their privileges from the database to the underlying operating system, allowing them to execute OS commands and take complete control of the server.


## 4. How Does it Work? Breaking the Code vs. Data Barrier

The fundamental problem behind SQLi is that the application **mixes code (the SQL query) and data (the user input) together**. When an attacker provides specially crafted input, a vulnerable application can't distinguish between the intended command and the attacker's malicious command. The database sees the entire string as one single command to be executed.


## 5. The Main Variants of SQLi Attacks

Attackers use different techniques depending on how the application behaves.


### a. In-band (Classic) SQLi

This is the most direct type, where the attacker uses the same channel to launch the attack and see the results.

* **Error-Based:** The attacker submits malicious input designed to make the database produce an error message. These error messages can often contain valuable information about the database's structure, table names, and column names.
    
* **Union-Based:** The attacker uses the `UNION` SQL operator to combine the results of the original, legitimate query with the results of a malicious query they control. This allows them to extract data from other tables in the database and have it displayed on the page.


### b. Out-of-band SQLi

This technique is used when the application doesn't return the results of the query on the webpage. The attacker injects a command that forces the database to make a network connection to an external server the attacker controls (e.g., an HTTP request or a DNS lookup). This confirms the vulnerability is present and can be used to slowly exfiltrate data.


### c. Inferential (Blind) SQLi

In this type, the application doesn't display the results directly, and there are no error messages. The attacker has to infer whether their attack worked based on subtle differences in the application's response (like page load time or slight changes in content).


## 6. How to Prevent SQL Injection

The most effective defenses include:

* **Parameterized Queries (Prepared Statements):** This is the gold standard. You write a template of your SQL query with placeholders, and then provide the user input separately. The database engine treats the input as pure data, not as executable code. Every major programming language has built-in support for this.
    
* **Input Validation:** Validate all user input on the server side. Check the type (is it a number or a string?), length, format, and content. Use a whitelist approach: only allow known-good inputs.
    
* **Escape Special Characters:** If parameterized queries are not possible, escape special characters that have meaning in SQL (like single quotes) before including them in the query. However, this is less reliable than parameterized queries.
    
* **Principle of Least Privilege:** Ensure that database user accounts used by the application have only the minimum permissions they need to function. For example, a user account that only needs to read data should not have `DELETE` or `UPDATE` permissions.
    
* **Web Application Firewall (WAF):** A WAF can detect and block SQL injection attempts based on known attack patterns.


## 7. Testing for SQL Injection

* **Manual Testing:** Try common payloads like `'`, `' OR '1'='1`, `UNION SELECT`, etc., in different input fields.
    
* **Automated Scanning:** Tools like Burp Suite and OWASP ZAP can automatically test for SQLi.
    
* **Code Review:** Inspect the application code for any instances where user input is directly concatenated into SQL queries.


## 8. Defense-in-Depth

Always practice defense-in-depth by using strict input validation and applying the Principle of Least Privilege (where database user accounts have only the minimum permissions they need to function).
