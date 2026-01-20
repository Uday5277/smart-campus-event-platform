# SeatLock — A Concurrency-Safe Event Registration System

SeatLock is a production-ready campus event and resource management platform designed to handle **high-concurrency event registrations** without overbooking.  
The system focuses on **correctness under load**, leveraging Redis atomic operations and PostgreSQL transactions to safely manage limited-capacity resources.

---

## 🔍 Problem Statement

Traditional event registration systems that rely solely on database checks are prone to **race conditions** under concurrent access.  
When multiple users attempt to register simultaneously, seat overbooking can occur due to non-atomic availability checks.

SeatLock solves this problem by introducing a **fast, atomic concurrency layer** while maintaining strong data consistency.

---

## 🏗️ Architecture Overview

The system follows a clean, service-oriented architecture:

- **Frontend:** React-based client for users and admins  
- **Backend:** Node.js + Express REST API  
- **Database:** PostgreSQL (source of truth)  
- **Cache / Concurrency Layer:** Redis (atomic seat counters)  
- **Infrastructure:** Docker & Docker Compose  
- **CI/CD:** GitHub Actions  
- **Deployment:** Cloud-hosted (backend & frontend)

### Key Design Principle
> PostgreSQL ensures consistency, while Redis ensures safety under concurrency.

---

## ⚙️ Core Features

- JWT-based authentication with role separation (Admin / Student)
- Admin-controlled event creation with seat limits
- Concurrency-safe event registration using Redis atomic operations
- Automatic rollback handling on failures
- RESTful API design with proper authorization boundaries
- Fully containerized multi-service setup
- Automated CI/CD pipeline for build and deployment

---

## 🚦 Concurrency Handling (Core Highlight)

### Problem
Database-only seat availability checks fail under concurrent requests, leading to race conditions and overbooking.

### Solution
- Each event maintains an **atomic seat counter in Redis**
- Registration flow:
  1. Atomically decrement available seats using Redis
  2. Reject request if seats drop below zero
  3. Persist registration in PostgreSQL within a transaction
  4. Roll back Redis state if database insertion fails

This guarantees:
- No overbooking
- High performance
- Fault tolerance

---

## 🧠 Tech Stack

**Frontend**
- React

**Backend**
- Node.js
- Express

**Data & Caching**
- PostgreSQL
- Redis

**Infrastructure & DevOps**
- Docker
- Docker Compose
- GitHub Actions

**Deployment**
- Cloud-hosted backend and frontend

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Docker
- Docker Compose

### Setup
```bash
git clone <repository-url>
cd seatlock
docker-compose up
