# Chapter 10 - Further Improvements and Learning Material

## Further Improvements

If you followed the steps described in this repository successfully you have built a fully functional UI5 app that makes use of most core principles of the framework. But of course the material did not cover everything UI5 has to offer. There is a lot more you can do with UI5 and a lot of features you could add to take your bookshop app to the next level. Here are a few ideas, but feel free to improve the app in whatever way you would like to:
- You could split the view (`app/webapp/view/App.view.xml`) up into multiple views using a concept called [nested views](https://sapui5.hana.ondemand.com/#/topic/df8c9c3d79b54c928855162bafcd88ee), making its structure easier to read and understand.

- You could replace the `<ObjectStatus id="orderStatus" text="" />` message with a pop-up `<Dialog />` and turn it into a reusable [fragment](https://sapui5.hana.ondemand.com/#/topic/4da72985139b4b83b5f1c1e0c0d2ed5a).

- You could add more pages to your app and split its content up. At this stage, the bookshop's complexity doesn't necessarily require [routing and navigation](https://sapui5.hana.ondemand.com/#/topic/e5200ee755f344c8aef8efcbab3308fb), but it's certainly a good feature to know how to implement.

- You could run the UI5 app on its own webserver during development (instead of using the `@sap/cds` server) leveraging the [UI5 Tooling](https://sap.github.io/ui5-tooling/). This enables you to use a lot of great open source tools and packages. You could for example try consuming a remote service in your app using a [package that mocks Cloud Foundry destination locally](https://www.npmjs.com/package/ui5-middleware-cfdestination).

- The UI5 Tooling also comes with a useful build command that you could use to prepare your app for deployment. 

## Further Learning Material

Here are some further learning recommendations in case you are looking for more structured content to follow:

- The [UI5 Walkthrough](https://sapui5.hana.ondemand.com/#/topic/3da5f4be63264db99f2e5b04c5e853db) takes you on a tour through all the development paradigms of UI5. It's a great resource to start with as it covers everything from the most basic steps to advanced functionalities.

- The video series [2 Minutes of SAPUI5](https://www.youtube.com/watch?v=J9NMwsipMkw&list=PL6RpkC85SLQC4kuj22e4hw85Sa1pClD8y) is inspired by UI5 Walkthrough, but introduces the fundamentals of UI% in short and easy to digest videos and also covers additional topics such as authorization and deployment.

- There is a great [openSAP course on SAPUI5](https://open.sap.com/courses/ui52).