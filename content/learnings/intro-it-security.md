---
id: it-security-introduction
title: Introduction — Importance of IT Security
---


# IT Security Reviewer: Core Concepts

At its simplest, IT Security is just about protecting digital information from getting stolen, messed up, or lost. It's the digital version of locking doors and keeping important papers safe.


## The Most Important Thing: The CIA Triad

Everything in security really comes back to these three ideas. The **CIA Triad** is the foundation for all of it.


### 1. Confidentiality: Keeping Info Secret

Basically, making sure that only the right people can see the data. It's all about privacy.

* **Example:** My private messages should only be seen by me and the person I sent them to.

* **How it's protected:**
  * **Encryption:** Scrambling data so that only someone with the right key can read it.
  * **Access Controls:** Things like passwords or permissions that only let certain people view certain files or folders.


### 2. Integrity: Keeping Info Trustworthy

This means the data is accurate and hasn't been tampered with. I need to be able to trust that the information I'm seeing is the real deal.

* **Example:** My bank account balance needs to be accurate. If someone could secretly change it, it would have lost its integrity.

* **How it's protected:**
  * **Digital Signatures:** A cryptographic way to prove that a document hasn't been altered.
  * **Version Control:** Systems that track every single change made to a document, so you can see the history and revert any unauthorized changes.


### 3. Availability: Making Sure I Can Access My Stuff

This just means that the information and systems are working and accessible when I need them. It's no good if my data is safe but I can't get to it.

* **Example:** A hospital's patient records system has to be online 24/7 for the doctors.

* **How it's protected:**
  * **Redundancy:** Having backup copies of data so if one system fails, another one takes over.
  * **DDoS Protection:** Defenses against "Distributed Denial of Service" attacks, where hackers flood a server with so much traffic that it crashes and becomes unavailable.## The Other Key Ideas (Information Assurance)

The CIA Triad is the core, but a full security plan (what the prof calls **Information Assurance**) adds a couple more important concepts to the mix.


### 4. Authenticity: Proving It's Really You

This is all about verification. Making sure the person or thing is who or what it claims to be.

* **How it's done:** Passwords prove you know something, while **biometrics** (like your fingerprint or face ID) prove you are someone. A **digital signature** is a cryptographic way to prove a document was sent by a specific person and wasn't faked.


### 5. Non-Repudiation: No Take-Backs

This sounds complicated, but it just means having solid proof that someone did something. They can't deny sending that email or signing that document later. This is super important for legal and financial transactions.

* **How it's done:** Digital signatures and secure timestamps create a permanent, verifiable record that ties an action directly to a person and a specific time.


## How the Bad Guys Get In (Initial Access)

So, how do hackers usually get their foot in the door? It's often by tricking a person, not a computer.


### Phishing: The Classic Scam

This is the most common one. It's a fake email or message that looks real, trying to get me to click a bad link or give up my password.

* **Spear Phishing:** A more dangerous version where the attacker researches their target (me, for example) and creates a personalized email that seems much more believable.

* **Things to watch out for:**
  * **"URGENT ACTION REQUIRED!"** - They try to make you panic so you don't think.
  * **Bad grammar and spelling** - A dead giveaway.
  * **Weird links** - I should always hover over a link to see the real destination address before I even think about clicking it.


### Weak Passwords

This is a no-brainer. Using easy-to-guess passwords or reusing the same password everywhere is just asking for trouble.

* **Why it's bad:** Hackers use automated tools for **brute-force attacks** (trying millions of password combinations in seconds) and **credential stuffing** (using lists of passwords stolen from other website breaches to see if they work on your other accounts).


### Malware

This is malicious software designed to harm or exploit. It can get onto a system through a phishing link, a fake software download, or even a USB drive. Types include:

* **Viruses:** Attach to clean files and spread.
* **Ransomware:** Locks up your files and demands a payment to get them back.
* **Spyware:** Secretly records what you do.


## Why This Matters: Real-World Context

Security breaches are increasingly common and have real consequences. Understanding these fundamentals helps protect your data, your organization, and your digital identity.
