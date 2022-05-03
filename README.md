[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/ui5-exercises-codejam)](https://api.reuse.software/info/github.com/SAP-samples/ui5-exercises-codejam)

# SAP CodeJam - UI5

This repository contains the material for SAP CodeJam events on UI5.

Please check the [prerequisites](/prerequisites.md) before the event an make sure you meet them.

## Overview

The material in this repository introduces you to the core principles of UI5, an enterprise-ready web development framework used to build apps that follow the Fiori design guidelines. This repository is a step-by-step guide explaining how build a frontend web application using UI5. The finished app is a bookshop app, where users can browse and order books. The app sits on top of the well-known [bookshop](https://github.com/SAP-samples/cloud-cap-samples/tree/main/bookshop) backend application built with the Node.js flavour of the SAP Cloud Application Programming Model (CAP).

![The finished app](/finished-app.png)

The finished UI5 bookshop app already exists in the [bookshop/app/finished-webapp](/bookshop/app/finished-webapp/) directory, but we want to rebuild it from scratch step by step. You can compare the finished app with your version in case you have issues along the way.

After reading all chapters and following the instructions, you will be able to build your own UI5 applications leveraging the official [SAPUI5 API Reference](https://sapui5.hana.ondemand.com/#/api).

## Previous Knowledge

The material in this repository aims to be beginner friendly. If you have never built a (UI5) web app before, you will still be able to follow along. No prior knowledge is required, although it certainly helps to have experience in (web) development.

The material includes additional explanations in collapsable sections (see example below), whenever a concept is used that web developers are probably already familiar with, but beginners might not be. You can decide for yourself whether you want to read or skip them. 

See this example:

<details>
<summary>What is SAPUI5? 💬</summary>

<br>

> SAPUI5 is an HTML5 framework for creating cross-platform, enterprise-grade web applications in an efficient way.
>
> See this [blog post](https://blogs.sap.com/2021/08/23/what-is-sapui5/) for more information.

</details>

## Material Organization

The material consists of a series of chapters. The chapters build on top of each other and are meant to be completed in the given order. Each of the [chapters](/chapters/) has its own 'readme' file with explanations, instructions, code samples and screen shots.

## Chapters

0. [Preparing the Development Environment](/chapters/chapter00)
1. [Scaffolding the App - Our First View](/chapters/chapter01)
1. [Creating and Consuming Our First Model](/chapters/chapter02)
1. [Creating and Extending Our First Controller](/chapters/chapter03)
1. [Adding an 'Order' Feature to Our Bookshop](/chapters/chapter04)
1. [Adding a 'Search' Feature to Our Bookshop](/chapters/chapter05)
1. [Adding Custom Formatting](/chapters/chapter06)
1. [Adding i18n Features](/chapters/chapter07)
1. [Adding Custom CSS](/chapters/chapter08)
1. [Deploying Our App](/chapters/chapter09) (Optional)
1. [Further Improvements and Learning Material](/chapters/chapter10)

## SAPUI5 vs. OpenUI5

You will often read about either SAPUI5 or OpenUI5 when working with the framework. The main difference between the two is the license. Whereas SAPUI5 requires a license and is integrated into a lot of SAP products, OpenUI5 is open source and generally available under an Apache 2.0 license. SAPUI5 includes more libraries than OpenUI5, but the latter still contains all central functionality and most commonly used control libraries are identical in both deliveries.

The material in this repository would work with both deliveries, but uses OpenUI5. For the sake of simplicity and to indicate that the material would work with SAPUI5, too, the material simply refers to the framework as 'UI5'.

You can find more information about this in the [SAPUI5 Documentation](https://sapui5.hana.ondemand.com/#/topic/5982a9734748474aa8d4af9c3d8f31c0).

## Support

Support for the content in this repository is available during SAP CodeJam events, for which this content has been designed. Otherwise, this content is provided 'as-is' with no other support.

## Contributing
If you wish to contribute code, offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](/LICENSE) file.
