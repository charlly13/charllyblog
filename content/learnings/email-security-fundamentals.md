---
id: email-security-fundamentals
title: Email Security Fundamentals
---

## Email Security Fundamentals

**Source:** Email security best practices.
**Tag:** #EmailSecurity

### 2.1. Email Transmission and Protocols

* **SMTP (Simple Mail Transfer Protocol):** The core protocol used by mail servers to send and relay email messages.
* **DNS & MX Records:** The sending mail server uses DNS to look up the recipient domain's **MX (Mail Exchange) record**, which directs the message to the correct destination mail server.

### 2.2. Core Security Principles (CIA Triad +)

Email security is designed to enforce the following:

* **Confidentiality:** Ensuring only the intended recipient can read the message (via encryption).
* **Integrity:** Guaranteeing the message has not been altered during transit (via digital signatures).
* **Authentication:** Verifying the identity of the sender, preventing unauthorized impersonation.
* **Non-repudiation:** Providing proof that the message was sent by the claimed party.

### 2.3. Encryption Standards

* **S/MIME (Secure/Multipurpose Internet Mail Extensions):** Enterprise-focused, relies on a centralized **Public Key Infrastructure (PKI)** and Certificate Authorities (CAs) to manage keys and identities.
* **OpenPGP (Pretty Good Privacy):** Community-focused, relies on a decentralized **"Web of Trust"** model for key validation.
* **Key Exchange:** Encryption is performed using the recipient's **Public Key** (shared), while decryption requires the recipient's **Private Key** (secret).

### 2.4. Authentication Protocols (Combating Spoofing)

These protocols are recorded in the email header and checked by the receiving server:

* **SPF (Sender Policy Framework):** A DNS record that explicitly lists which IP addresses are authorized to send email for a domain.
* **DKIM (DomainKeys Identified Mail):** Adds a cryptographic signature to the header, verifying the message integrity and confirming it originated from an authorized sender.
* **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** An organizational policy that dictates what the receiving server should do if both SPF and DKIM fail (e.g., reject, quarantine, or deliver).
