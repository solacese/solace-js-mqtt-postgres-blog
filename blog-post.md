# Project Starter — Solace, JavaScript, MQTT, PostgreSQL

## Introduction

It's 2020 and starting a new project has never been easier. There are "batteries included" open source tools that solve so many categories of problems. Our job as developers is to stand on top the shoulders of the maturing IaaS, PaaS, SaaS, and Docker/K8 ecosystems and "build cool stuff". Yet ironically, developers sit down today, with the power of decades of innovation awaiting their GUI-issued commands, and don't do their one job. They don't immediately start building cool stuff 👎

Developers sit there completely overtaken by [analysis paralysis](https://en.wikipedia.org/wiki/Analysis_paralysis#Software_development) and thrash between shiny new objects until they forget they were even starting a project in the first place.

But there's a better way: aim to get started as quickly as possible and budget for a period of trial and error in the project’s timeline. This way, the decisions you make about what tools to use for the project will be founded by your own experiences. Instead of front-loading the start of a project with research heavy decision making, we should front-load our projects with broader architectural planning and give ourselves an iterative feedback mechanism for the smaller decisions. Win 👍

I'd also argue that decoupling the activity of researching technologies from the starts of projects (as much as possible) is best practice. Make researching in small intervals a part of your daily routine, keep good notes, and make a list of different tools that solve categories of problems. When you run into that category of problem, try out the tools you have lined up for it. This way, when you want to start your project, there are a list of action items waiting for you instead of a list of research assignments with unclear deliverables.

My personal strategy for beating analysis paralysis goes something like this: default to using well-vetted open source protocols, languages, and frameworks, and whenever possible, leverage free tier SaaS products that are built on top of open source technologies. When my toolbelt is full, I create an event mesh using Solace's PS+ Event Brokers and plug my tools into it. Since both the event mesh and each one of its nodes (the tools) are scalable, I can tinker around with app specific business logic happily assuming the resources underneath it aren't going to give out.

In this blog post, I’m going to walk through a tech stack that can easily be extended to meet a wide range of use cases: Solace, JavaScript, MQTT, and PostgreSQL.

**📚 Specifically, we’re going to cover:**

- How to set up a Solace Cloud Messaging Service
- How to build a basic Node.js MQTT producer and consumer
- How to set up a free managed PostgreSQL service using Heroku
- How to set up pgadmin4 to interact with your PostgreSQL service [ Optional ]
- How to configure Prisma Client JS so that we can interact with our managed PostgreSQL service
- How to create objects in our PostgreSQL service from our Node.js MQTT consumer app

**🛠️ Tools Used:**

- [Solace PubSub+ Cloud](https://console.solace.cloud/login/new-account)

  - Enterprise-grade messaging as a service, on demand in your favorite public and virtual private clouds.

- [MQTT](http://mqtt.org/)

  - MQTT is a machine-to-machine (M2M)/“Internet of Things” connectivity protocol. It was designed as an extremely lightweight publish/subscribe messaging transport.

- [MQTT.js · GitHub](https://github.com/mqttjs)

  - MQTT.js is a client library for the [MQTT](http://mqtt.org/) protocol, written in JavaScript for Node.js and the browser.

- [Heroku Postgres](https://www.heroku.com/postgres)

  - Heroku offers a managed Postgres service with a generous free tier and ability to scale up effortlessly, what’s not to love?

- [pgadmin4](https://hub.docker.com/r/dpage/pgadmin4/)

  - pgAdmin 4 is a web based administration tool for the PostgreSQL database.

- [Prisma Client JS](https://github.com/prisma/prisma-client-js)
  - Prisma Client JS is an auto-generated database client that enables type-safe database access and reduces boilerplate. You can use it as an alternative to traditional ORMs such as Sequelize, TypeORM or Knex.js.

---

## Setting Up a Solace Cloud Messaging Service

**⏩ Feel free to skip this section if you already have access to a Solace event broker.**

There’s no better tool for beating analysis paralysis than Solace’s PubSub+ Advanced Event Broker. Open protocol support and any-to-any protocol translation built into the broker means there is absolutely no vendor lock-in with Solace.

In interest of keeping this article short, I’m not going to walk through the instructions for setting up a Solace Cloud Service here. Instead, follow along with the instructions here: [Creating Your First Messaging Service — 1.0 documentation](https://solace.com/cloud-learning/group_getting_started/ggs_signup.html)

## Building a Node.js MQTT Producer Microservice

Tags:
