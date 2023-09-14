# Chapter 1.10 - Deploying the App

Please note: This step is optional and not specific to UI5, but rather covers the basics of how to use the [SAP Approuter](https://www.npmjs.com/package/@sap/approuter), the [Cloud MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/), and the [Cloud Foundry Command Line Interface](https://docs.cloudfoundry.org/cf-cli/). 

## Prerequisites

To be able to complete this chapter you need to fulfill ***all*** of the following requirements:
- You need to have an account on the SAP Business Technology platform (SAP BTP) with the Cloud Foundry Environment enabled. Learn more about how to get an account [here](https://developers.sap.com/group.btp-setup.html). You also need at least 2 units of Cloud Foundry Runtime assigned to your subaccount and available to consume.
- You need to have the [Cloud Foundry Command Line Interface](https://docs.cloudfoundry.org/cf-cli/) installed in your development environment. If you work in the SAP Business Application Studio or in a devcontainer using the [provided configuration](/.devcontainer) this is already taken care of. You can verify your installation by running `cf -v`.

## Deploying Our App

At the end of this chapter we will have deployed our UI5 to the Cloud Foundry Environment on the SAP BTP. To keep it as simple as possible, we will not deploy the backend application of this project that we used for local development, but consume a remote service instead.

## Steps

[1. Add the `@sap/approuter` package](#1-add-the-sapapprouter-package)<br>
[2. Define routes for the approuter in a `webapp/xs-app.json` file](#2-define-routes-for-the-approuter-in-a-webappxs-appjson-file)<br>
[3. Create a `manifest.yaml` file](#3-create-a-manifestyaml-file)<br>
[4. Install the dependencies and build the UI5 app](#4-install-the-dependencies-and-build-the-ui5-app)<br>
[5. Log in to the Cloud Foundry Environment](#5-log-in-to-the-cloud-foundry-environment)<br>
[6. Deploy the application](#6-deploy-the-application)<br>
[7. Test the bookshop in the cloud](#7-test-the-bookshop-in-the-cloud)<br>

### 1. Add the `@sap/approuter` package

We want to run our app using the `@sap/approuter` package, which allows us to handle incoming and outgoing requests to and from our app. The approuter will be the entry point to our app. You can learn more about the SAP Approuter [here](https://blogs.sap.com/2020/04/03/sap-application-router/).

➡️ Replace the current content of the `package.json` file with the following code:

```json
{
  "name": "bookshop",
  "version": "0.0.1",
  "scripts": {
    "start": "node node_modules/@sap/approuter/approuter.js",
    "dev": "ui5 serve --open \"index.html\"",
    "build": "ui5 build"
  },
  "dependencies": {
    "@sap/approuter": "^14"
  },
  "devDependencies": {
    "@ui5/cli": "^3",
    "@sap/ux-ui5-tooling": "^1"
  },
  "ui5": {
    "dependencies": [
      "@sap/ux-ui5-tooling"
    ]
  }
}
```

Our Node.js based application now uses the `@sap/approuter` package which makes it a so-called 'standalone approuter'.
    
### 2. Define routes for the approuter in a `webapp/xs-app.json` file

An approuter requires an `xs-app.json` file defining all the routes it should handle.

➡️ Create a new file `xs-app.json` and paste the following content into it:

```json
{
    "welcomeFile": "index.html",
    "authenticationMethod": "none",
    "routes": [
        {
            "source": "/v2/browse(.*)",
            "destination": "remote-bookshop",
            "authenticationType": "none"
        },
        {
            "source": "^(.*)$",
            "target": "$1",
            "authenticationType": "none",
            "localDir": "dist/"
        }
    ]
}
```

We defined all routes for our approuter. Each route has a source (based on a regular expression) and additional  properties that define it. The most important route is the second one (`^(.*)$`), which states that all incoming requests will be proxied to a local `dist/` directory, which we will be created shortly. This in combination with `index.html` as our `welcomeFile` makes users get to the UI5 app when accessing the approuter. The `/v2/browse(.*)` route makes sure that requests to the backend (see the `capBooks` data source in our `webapp/manifest.json`) will be proxied to a destination called `browse-bookshop`. Let us define the details of this destination in the next step.

### 3. Create a `manifest.yaml` file

We can now put all the pieces together and describe our application in a manifest.

➡️ Create a `manifest.yaml` file and paste the following code into it (make sure the indentation is 100% correct as `.yaml` files are very strict in that regard):

```yaml
applications:
- name: bookshop-ui5
  path: .
  buildpacks:
  - https://github.com/cloudfoundry/nodejs-buildpack
  memory: 256M
  command: npm run start
  random-route: true
  env:
    destinations: "[{\"name\":\"remote-bookshop\", \"url\":\"https://developer-advocates-free-tier-central-hana-cloud-instan3b540fd6.cfapps.us10.hana.ondemand.com\"}]"
```

We described our application in a `manifest.yaml` file. This file will be picked up and interpreted by Cloud Foundry to deploy the application. We define some basic information regarding our app and how it should run in Cloud Foundry. Most interestingly, we define the `destinations` environment variable that includes the actual URL of the of the service we want to use the backend. The approuter will look for this destination information every time a request hits the `/v2/browse(.*)` route (see [step 2](#2-define-routes-for-the-approuter-in-an-webappxs-appjson-file) of this chapter).

This is what our project's structure now looks like:

This is what our project's structure now looks like:

```text
- bookshop/
    + node_modules/
    + webapp/
    - manifest.yaml
    - package-lock.json
    - package.json
    - ui5.yaml
    - xs-app.json
```

> BTW: There are other options to deploy applications to deploy Cloud Foundry. The most prominent approach is using `multi-target applications` (MTAs). See the [SAP BTP documentation](https://help.sap.com/docs/btp/sap-business-technology-platform/multitarget-applications-in-cloud-foundry-environment) for more information.

### 4. Install the dependencies and build the UI5 app

➡️ Run the following command to install all dependencies declared in the `package.json` and start the build process:

```bash
npm install && npm run build
```

We executed the `npm run build` script that is defined as `ui5 build` in the `package.json`. The `ui5 build` command refers to the UI5 Tooling that we also used to run our application locally. The build command creates the `dist/` directory and moves a performance optimized version of our app into it. This is the directory that will be served by the approuter, as per definition in the `xs-app.json` file.

### 5. Log in to the Cloud Foundry Environment

We can now log in to the Cloud Foundry environment on the SAP Business Technology Platform. 

➡️ Execute the following command in a terminal session and enter your API endpoint (you can find it in the SAP BTP Cockpit in the subaccount overview) and credentials when prompted. Also select the Cloud Foundry organization and space you want to deploy the project:

```bash
cf login
```

### 6. Deploy the application

We can now deploy the application.

➡️ Execute the following command in the same terminal session you previously triggered the build from:

```bash
cf push
```

The deployment may take a while. This is nothing to worry about.

### 7. Test the bookshop in the cloud

If the build was successful and finished with no errors, we can test our bookshop app in the cloud. 

➡️ Go into the SAP BTP Cockpit and navigate to the space you deployed the project into. Click on `bookshop-ui5` and open the route displayed at the top. You should see your bookshop running in the cloud. Alternatively, you can see the URL of the deployed application in the terminal output of the deployment.

![result1](result1.png#border)
![result2](result2.png#border)

We successfully deployed our UI5 app to the Cloud Foundry Environment. It consumes a remote service as the data source when running in the cloud via the destination environment variable.

Continue to [Chapter 1.11 - Further Improvements and Learning Material](/chapters/1.11-further-improvements/)
