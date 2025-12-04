---
id: network-traffic-analysis
title: Network Traffic Analysis (NTA)
---

## Network Traffic Analysis (NTA)

**Source:** Practical network monitoring guide.
**Tag:** #NTA

### 1.1. Fundamentals and Purpose

* **Definition:** The practice of capturing, inspecting, and analyzing data flow across a network. Provides crucial visibility into real-time network activity.
* **Key Goals:**
    * **Baseline Establishment:** Defining "normal" traffic patterns to quickly identify anomalies.
    * **Threat Hunting:** Detecting command-and-control (C2) communication, malware, or data exfiltration.
    * **Diagnosis:** Troubleshooting latency, failures, and protocol errors.

### 1.2. The OSI Model: Conceptual Framework

The Open Systems Interconnection (OSI) model divides network communication into seven layers, defining where specific protocols and data units reside.

| Layer | Name | Function / Explanation | Common Protocols/Devices | PDU (Protocol Data Unit) |
| :---: | :---: | :--- | :--- | :--- |
| **7** | **Application** | User interaction with the network; handles data access and services. | HTTP, FTP, SMTP | Data |
| **6** | **Presentation**| Data formatting, conversion, and encryption/decryption. | JPG, SSL, TLS | Data |
| **5** | **Session** | Establishes, manages, and terminates connections between applications. | NetBIOS | Data |
| **4** | **Transport** | Manages end-to-end communication; provides reliability (TCP) or speed (UDP). | TCP, UDP | Segment/Datagram |
| **3** | **Network** | Handles logical addressing (IP) and routing decisions across networks. | IP, Routers, L3 Switches | Packet |
| **2** | **Data Link** | Provides physical addressing (MAC) and controls access to the shared media. | Ethernet, Switches | Frame |
| **1** | **Physical** | Transmits raw binary bits over the physical medium (cables, wireless). | Network Cards, Cabling | Bit |

### 1.3. Analysis Tools and Techniques

* **Wireshark:** The standard, open-source tool for deep packet inspection.
* **Filtering:**
    * **Capture Filters:** Applied **before** capture to reduce file size (e.g., `host 192.168.1.1`).
    * **Display Filters:** Applied **after** capture to selectively view captured data (e.g., `http.request`).
* **TCP Stream Following:** Allows analysts to reassemble the entire conversation (e.g., a file transfer or web session) from fragmented packets into a single, readable stream.
