# Chapter 9 - Deploying Our App

Please note: This step is optional and not specific to UI5, but rather covers the basics of how to use the [SAP Approuter](https://www.npmjs.com/package/@sap/approuter), the [Cloud MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/), and the [Cloud Foundry Command Line Interface](https://docs.cloudfoundry.org/cf-cli/). 

## Prerequisites

To be able to complete this chapter you need to fulfill ***all*** of the following requirements:
- You need to have an account on the SAP Business Technology platform (SAP BTP) with the Cloud Foundry Environment enabled. Learn more about how to get an account [here](https://developers.sap.com/group.btp-setup.html). You also need at least 2 units of Cloud Foundry Runtime assigned to your subaccount and available to consume.
- You need to have the [Cloud Foundry Command Line Interface](https://docs.cloudfoundry.org/cf-cli/) installed in your development environment. If you work in the SAP Business Application Studio or in a devcontainer using the [provided configuration](/.devcontainer) this is already taken care of. You can verify your installation by running `cf -v`.

## Deploying Our App

At the end of this chapter we will have deployed our UI5 to the Cloud Foundry Environment on the SAP BTP. To keep it as simple as possible, we will not deploy the backend application of this project that we used for local development, but consume a remote service instead.

## Steps

[1. Wrap the UI5 app into a Node.js based application using the `@sap/approuter` package](#1-wrap-the-ui5-app-into-a-nodejs-based-application-using-the-sapapprouter-package)<br>
[2. Define routes for the approuter in an `app/webapp/xs-app.json` file](#2-define-routes-for-the-approuter-in-an-appwebappxs-appjson-file)<br>
[3. Create a new `app/remote-destination.json` file to define a destination](#3-create-a-new-appremote-destinationjson-file-to-define-a-destination)<br>
[4. Create an `app/mta.yaml` file to describe the build process](#4-create-an-appmtayaml-file-to-describe-the-build-process)<br>
[5. Navigate into the `app` directory](#5-navigate-into-the-app-directory)<br>
[6. Install the dependencies](#6-install-the-dependencies)<br>
[7. Build the multitarget application](#7-build-the-multitarget-application)<br>
[8. Log in to the Cloud Foundry Environment](#8-log-in-to-the-cloud-foundry-environment)<br>
[9. Deploy the multitarget application](#9-deploy-the-multitarget-application)<br>
[10. Test the bookshop in the cloud](#10-test-the-bookshop-in-the-cloud)<br>

### 1. Wrap the UI5 app into a Node.js based application using the `@sap/approuter` package

We want to wrap our UI5 app into a Node.js based application that uses the `@sap/approuter` package, which allows us to handle incoming and outgoing requests to and from our app. The approuter will be the entry point to our app. You can learn more about the SAP Approuter [here](https://blogs.sap.com/2020/04/03/sap-application-router/).

➡️ Create a new file `app/package.json` and paste the following code into it:

```json
{
    "name": "bookshop-approuter",
    "dependencies": {
        "@sap/approuter": "^10"
    },
    "devDependencies": {
        "mbt": "^1.2.7"
    },
    "scripts": {
        "start": "node node_modules/@sap/approuter/approuter.js",
        "build": "mbt build"
    }
}
```

We initialized a Node.js based application inside our `app` directory. It uses the `@sap/approuter` package which makes it a so called 'standalone approuter'.
    
### 2. Define routes for the approuter in an `app/webapp/xs-app.json` file

An approuter requires an `xs-app.json` file defining all the routes it should handle.

➡️ Create a new file `app/xs-app.json` and paste the following content into it:

```json
{
    "welcomeFile": "index.html",
    "authenticationMethod": "none",
    "routes": [
        {
            "source": "/browse(.*)",
            "destination": "browse-bookshop",
            "authenticationType": "none"
        },
        {
            "source": "^(.*)$",
            "target": "$1",
            "authenticationType": "none",
            "localDir": "webapp/"
        }
    ]
}
```

We defined all routes for our approuter. Each route has a source (based on a regular expression) and additional  properties that define it. The most important route is the second one (`^(.*)$`), which states that all incoming requests will be proxied to our local `webapp/` directory. This in combination with `index.html` as our `welcomeFile` makes users get to the UI5 app when accessing the approuter. The `/browse(.*)` route makes sure that requests to the backend (see the `capBooks` data source in our `app/webapp/manifest.json`) will be proxied to a destination called `browse-bookshop`. Let us define this destination in the next step.

### 3. Create a new `app/remote-destination.json` file to define a destination

➡️ Create a new `app/remote-destination.json` file and paste the following code into it:

```json
{
    "init_data": {
        "instance": {
            "existing_destinations_policy": "update",
            "destinations": [
                {
                    "Name": "browse-bookshop",
                    "Authentication": "NoAuthentication",
                    "ProxyType": "Internet",
                    "Type": "HTTP",
                    "URL": "https://cf-ic2022-ll-supporters-bookshop-srv.cfapps.eu10-004.hana.ondemand.com"
                }
            ]
        }
    }
}
```

We defined a destination named `browse-bookshop` that we already referenced in our `app/xs-app.json` and that points to the remote service we want to consume.

### 4. Create an `app/mta.yaml` file to describe the build process

We can now put all the pieces together.

➡️ Create an `app/mta.yaml` file and paste the following code into it (make sure the indentation is 100% correct as `.yaml` files are very strict in that regard):

```yaml
_schema-version: '3.1'
ID: bookshop
version: 1.0.0
parameters:
  enable-parallel-deployments: true
   
build-parameters:
  before-all:
   - builder: custom
     commands:
      - npm install --production

modules:
 # ---------------------------------
 - name: bookshop-approuter
 # ---------------------------------
   type: approuter.nodejs
   path: .
   requires:
    - name: bookshop-destination

resources:
 # ----------------------------------
 - name: bookshop-destination
 # ----------------------------------
   type: org.cloudfoundry.managed-service
   parameters:
     service-plan: lite
     service: destination
     path: ./remote-destination.json
```

We described the build process for our multitarget application. Our UI5 app is now part of a 'multitarget application' because we not only want to deploy the approuter module (proxying requests to our UI5 app), but also an instance of the destination service in Cloud Foundry. This instance is listed under `resources` and points to the `app/remote-destination.json` file defining the destination. The `bookshop-approuter` module `requires` this particular resource, which makes sure they will be bound during deployment.

This is what our project's structure now looks like:

![The project's structure](/chapters/chapter009/chapter009-01.png)

Don't worry about the error you might receive which says that certain dependencies are not yet installed. We will take care of that in the next steps.

### 5. Navigate into the `app` directory

➡️ Open a new terminal sessions and execute the following command to navigate into the `app` directory:

```bash
cd app
```

### 6. Install the dependencies

➡️ Run the following command in the same terminal session to install the dependencies that are declared in the `app/package.json`:

```bash
npm install
```

### 7. Build the multitarget application

➡️ Execute the following command in the same terminal session to trigger the build:

```bash
npm run build
```

We executed the `npm run build` script that is defined as `mbt build` in the `app/package.json`. The `mbt build` command refers to the [Cloud MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/), which is the corresponding build tool for `mta.yaml` files. The build process may take some time, but once it's done, we can see a new `app/mta_archives/` directory has been created with an `.mtar` file inside. This is the file we will later deploy to Cloud Foundry.

### 8. Log in to the Cloud Foundry Environment

We can now log in to the Cloud Foundry environment on the SAP Business Technology Platform. 

➡️ Execute the following command in a terminal session and enter your API endpoint (you can find it in the SAP BTP Cockpit in the subaccount overview) and credentials when prompted. Also select the Cloud Foundry organization and space you want to deploy the project:

```bash
cf login
```

### 9. Deploy the multitarget application

We can now deploy the project.

➡️ Execute the following command in the same terminal session you previously triggered the build from:

```bash
cf deploy mta_archives/bookshop_1.0.0.mtar
```

The deployment may take a while. This is nothing to worry about.

### 10. Test the bookshop in the cloud

If the build was successful and finished with no errors, we can test our bookshop app in the cloud. 

➡️ Go into the SAP BTP Cockpit and navigate to the space you deployed the project into. Click on `bookshop-approuter` and open the route displayed at the top. You should see your bookshop running in the cloud.

![SAP BTP Cockpit](/chapters/chapter009/chapter009-result1.png)
![Bookshop in the cloud](/chapters/chapter009/chapter009-result2.png)

We successfully deployed our UI5 app to the Cloud Foundry Environment as part of a multitarget application. It consumes a remote service as the data source when running in the cloud (during local development we used a local backend application), so don't be surprised if the stock amounts suddenly decrease. Someone else might be using the same remote service at the same time.

Continue to [Chapter 10 - Further Improvements and Learning Material](/chapters/chapter010)