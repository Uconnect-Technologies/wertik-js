define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/article/apple/response",
    "title": "Apple module response",
    "name": "response",
    "group": "Article",
    "description": "<p>Just a message. Smile.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>an object {message: true}.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/activate-account",
    "title": "Activate account",
    "name": "activate_account",
    "group": "Auth",
    "description": "<p>Activates a user account..</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>with user activatation token, like: {activationToken: String}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>a user object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/login",
    "title": "Login",
    "name": "login",
    "group": "Auth",
    "description": "<p>Allows login a user..</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>user email and password, like: {email: String, password: String}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>a user object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/login-with-access-token",
    "title": "Login with access token",
    "name": "login_with_access_token",
    "group": "Auth",
    "description": "<p>Login with access token.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>with accessToken, like: {accessToken: String}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>a user object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/refresh-token",
    "title": "Refresh token",
    "name": "refresh_token",
    "group": "Auth",
    "description": "<p>Refreshes access and refresh token based on users previous refresh token.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>like: {refreshToken: String}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>a user object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/signup",
    "title": "Signup",
    "name": "signup",
    "group": "Auth",
    "description": "<p>Allows registering/signup  a user..</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>user email, password and confirmpassword, like: {email: String, password: String, confirmPassword: }.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>a user object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/two-factor-login",
    "title": "Two factor login",
    "name": "two_factor_login",
    "group": "Auth",
    "description": "<p>Creates two factor code and send it on user email for 2 factor auth.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>Email of the user, like: {email: String}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>object with message {message: String}.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/two-factor-login-validate",
    "title": "Two factor validate",
    "name": "two_factor_login_validate",
    "group": "Auth",
    "description": "<p>Allows login with two factor code.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "input",
            "description": "<p>two factor code, like: {twoFactorCode: String}.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "returns",
            "description": "<p>a user object.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "lib/framework/apiDocs/docs.js",
    "groupTitle": "Auth"
  }
] });
