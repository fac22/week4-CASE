'use strict';
/* eslint-disable no-undef */

beforeEach(() => {
  cy.task('resetDb');
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
    cy.get('title').should('contain', 'Posts');
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
    cy.get('title').should('contain', 'Posts');
    cy.visit('/write-post');
    cy.get("input[name='post']").type('hello');
    cy.get("button[type='submit']").click();
    cy.url().should('include', '/posts');
  });
});

describe('delete a post', () => {
  it('can delete a post', () => {
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
    cy.get('title').should('contain', 'Posts');
    cy.visit('/write-post');
    cy.get("input[name='post']").type('hello');
    cy.get("button[type='submit']").click();
    cy.visit('/posts');
    cy.get("button[aria-label='Delete post'").click();
    cy.contains('hello').should('not.exist');
  });
});
