const {username, password} = Cypress.env('adminUser')
const {firstname, lastname, zipCode} = Cypress.env('userInfo')


describe('Visit, Login and Buy', () => {
    beforeEach(() => {
        cy.log('enter the base url and verify the title')
        cy.visit('/')
        cy.title().should('eq', 'Swag Labs')
        cy.get('[data-test="username"]').type(username, {log: false})
        cy.get('[data-test="password"]').type(password , {log: false})
        cy.get('[data-test="login-button"]').click()
        cy.location('pathname').should('eq', '/inventory.html')
    });
    it('Select an option to buy', () => {
        cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
        cy.get('#item_2_title_link > div').should('have.text', 'Sauce Labs Onesie')
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_badge').should('have.text', '1').click()
        cy.location('pathname').should('eq', '/cart.html')
    });
    it('Process to checkout', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_badge').click()
        cy.get('.title').should('be.visible')
        cy.get('.inventory_item_price').should('have.text', '$7.99')
        cy.get('[data-test="checkout"]').click()
    });
    it('User Information Checkout and Confirm Order', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_badge').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type(firstname, {log: false})
        cy.get('[data-test="lastName"]').type(lastname, {log: false})
        cy.get('[data-test="postalCode"]').type(zipCode, {log: false})
        cy.get('[data-test="continue"]').click()
        cy.location('pathname').should('eq', '/checkout-step-two.html')
        cy.get('.summary_total_label').should('have.text', 'Total: $8.63')
        cy.get('[data-test="finish"]').click()
    });
    it('Checkout Complete!', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        cy.get('.shopping_cart_badge').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type(firstname, {log: false})
        cy.get('[data-test="lastName"]').type(lastname, {log: false})
        cy.get('[data-test="postalCode"]').type(zipCode, {log: false})
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.get('.title').should('have.text', 'Checkout: Complete!')
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('[data-test="back-to-products"]').click()
        cy.location('pathname').should('eq', '/inventory.html')
    });
});
