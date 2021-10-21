'use strict';
/* eslint-disable no-undef */

// beforeEach(() => {
//   cy.task('resetDb');
// });

describe('CRUD', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes');

    cy.login();
    cy.wait('@getNotes');
    cy.task('resetDb');
  });
});

describe('The Home Page', () => {
  it('can successfully load', () => {
    cy.visit('/');
  });
});

describe('link to LogIn', () => {
  it('can displays the link to LogIn', () => {
    cy.visit('/');
    cy.contains('Log-in').click();
    cy.url().should('include', '/log-in');
  });
});

describe('link to SignUp', () => {
  it('can displays link to SignUp', () => {
    cy.visit('/');
    cy.contains('Sign-Up').click();
    cy.url().should('include', '/sign-up');
  });
});

describe('The SignUp Page', () => {
  it('can signUp', function () {
    cy.visit('/');
    cy.contains('Sign-Up').click();
    cy.url().should('include', '/sign-up');
    cy.visit('/sign-up');
    cy.get('input[name=name]').type('Adriana');
    cy.get('input[name=email]').type('test@test.uk');
    cy.get('input[name=password]').type('test');
    cy.get("button[type='submit']").click();
  });
});

describe('The Login Page', () => {
  it('can log in', function () {
    cy.visit('/');
    cy.contains('Sign-Up').click();
    cy.url().should('include', '/sign-up');
    cy.visit('/sign-up');
    cy.get('input[name=name]').type('Adriana');
    cy.get('input[name=email]').type('test@test.uk');
    cy.get('input[name=password]').type('test');
    cy.get("button[type='submit']").click();
    cy.visit('/log-in');
    cy.get('input[name=email]').type('test@test.uk');
    cy.get('input[name=password]').type('test');
    cy.get("button[type='submit']").click();
    cy.get('title').should('contain', 'Home');
  });
});

describe('add a new post', () => {
  it('can add a new post', () => {
    cy.visit('/');
    cy.contains('Sign-Up').click();
    cy.url().should('include', '/sign-up');
    cy.visit('/sign-up');
    cy.get('input[name=name]').type('Adriana');
    cy.get('input[name=email]').type('test@test.uk');
    cy.get('input[name=password]').type('test');
    cy.get("button[type='submit']").click();
    cy.visit('/log-in');
    cy.get('input[name=email]').type('test@test.uk');
    cy.get('input[name=password]').type('test');
    cy.get("button[type='submit']").click();
    cy.get('title').should('contain', 'Home');
    cy.visit('/add-picture');

    cy.fixture('../../images/schema.png').then((fileContent) => {
      cy.get('input[type="file"]').as('clueImage').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'schema.png',
        mimeType: 'image/png',
      });
    });

    cy.get("button[type='submit']").click();
    cy.url().should('include', '/');
  });
});
